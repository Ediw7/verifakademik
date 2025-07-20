import express from 'express';
import { Pool } from 'pg';
import CryptoJS from 'crypto-js';
import { KJUR, hextob64 } from 'jsrsasign';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function connectToDatabase() {
  try {
    const client = await pool.connect();
    console.log('Connected to Neon DB');
    client.release();
  } catch (error) {
    console.error('Failed to connect to Neon DB:', error.message);
    process.exit(1);
  }
}
connectToDatabase();

app.get('/api/documents', async (req, res) => {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query('SELECT id, student_name, student_nim, document_type, created_at FROM documents');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dokumen.' });
  } finally {
    if (client) client.release();
  }
});

app.post('/api/upload', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'Harap unggah file PDF.' });
  }
  if (!req.body.student_name || !req.body.student_nim || !req.body.document_type) {
    return res.status(400).json({ error: 'Harap isi semua kolom.' });
  }

  const { student_name, student_nim, document_type } = req.body;
  const file = req.files.file;

  try {
    const fileWordArray = CryptoJS.lib.WordArray.create(file.data);
    const file_hash = CryptoJS.SHA256(fileWordArray).toString();

    const privateKey = process.env.PRIVATE_KEY;
    const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    sig.init(privateKey);
    sig.updateString(file_hash);
    const signature = hextob64(sig.sign());

    const client = await pool.connect();
    try {
      const query = 'INSERT INTO documents (student_name, student_nim, document_type, file_hash, signature) VALUES ($1, $2, $3, $4, $5)';
      await client.query(query, [student_name, student_nim, document_type, file_hash, signature]);
      res.status(201).json({ message: 'Dokumen berhasil disahkan.' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Gagal memproses dokumen.' });
  }
});

app.post('/api/verify', async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'Harap unggah file PDF.' });
  }

  const file = req.files.file;

  try {
    const fileWordArray = CryptoJS.lib.WordArray.create(file.data);
    const hashToVerify = CryptoJS.SHA256(fileWordArray).toString();

    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM documents WHERE file_hash = $1', [hashToVerify]);

      if (result.rows.length === 0) {
        return res.status(404).json({ valid: false, message: 'Dokumen tidak terdaftar atau telah diubah.' });
      }

      const doc = result.rows[0];
      const signatureFromDB = doc.signature;
      const publicKey = process.env.PUBLIC_KEY;

      const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
      sig.init(publicKey);
      sig.updateString(hashToVerify);
      const isValid = sig.verify(signatureFromDB);

      if (isValid) {
        res.status(200).json({ valid: true, message: 'Dokumen Asli dan Terverifikasi', data: doc });
      } else {
        res.status(400).json({ valid: false, message: 'Verifikasi Gagal: Tanda tangan tidak valid.' });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Verify Error:', error);
    res.status(500).json({ error: 'Gagal memverifikasi dokumen.' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));