const express = require('express');
const { Client } = require('@neondatabase/serverless');
const CryptoJS = require('crypto-js');
const { KJUR, hextob64 } = require('jsrsasign');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to Neon DB');
  } catch (error) {
    console.error('Failed to connect to Neon DB:', error.message);
    process.exit(1);
  }
}
connectToDatabase();

app.get('/api/documents', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM documents');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data dokumen: ' + error.message });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    console.log('Received upload request:', {
      body: req.body,
      files: req.files ? Object.keys(req.files) : null
    });

    // Validasi input
    if (!req.files || !req.files.file) {
      console.error('No file uploaded');
      return res.status(400).json({ error: 'Harap unggah file PDF' });
    }
    if (!req.body.student_name || !req.body.student_nim || !req.body.document_type) {
      console.error('Missing required fields:', req.body);
      return res.status(400).json({ error: 'Harap isi semua kolom (nama, NIM, jenis dokumen)' });
    }

    const { student_name, student_nim, document_type } = req.body;
    const file = req.files.file;

    // Validasi format file
    if (!file.mimetype.includes('pdf')) {
      console.error('Invalid file type:', file.mimetype);
      return res.status(400).json({ error: 'File harus berformat PDF' });
    }

    // Enkripsi AES
    let ciphertext;
    try {
      const key = CryptoJS.enc.Hex.parse(process.env.AES_KEY);
      const iv = CryptoJS.lib.WordArray.random(16);
      ciphertext = CryptoJS.AES.encrypt(file.data.toString('binary'), key, { iv }).toString();
    } catch (error) {
      console.error('AES encryption failed:', error.message);
      return res.status(500).json({ error: 'Gagal mengenkripsi dokumen: ' + error.message });
    }

    // Tanda tangan RSA
    let signature;
    try {
      const timestamp = new Date().toISOString();
      const dataToSign = ciphertext + timestamp;
      const prvKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n').trim();
      
      // Validasi kunci privat
      if (!prvKey.includes('-----BEGIN PRIVATE KEY-----') || !prvKey.includes('-----END PRIVATE KEY-----')) {
        console.error('Invalid private key format');
        return res.status(500).json({ error: 'Format kunci privat tidak valid' });
      }

      const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
      try {
        sig.init(prvKey);
      } catch (error) {
        console.error('RSA init failed:', error.message);
        return res.status(500).json({ error: 'Gagal menginisialisasi tanda tangan RSA: ' + error.message });
      }
      sig.updateString(dataToSign);
      signature = hextob64(sig.sign()); // Konversi ke base64 untuk konsistensi
    } catch (error) {
      console.error('RSA signature failed:', error.message);
      return res.status(500).json({ error: 'Gagal membuat tanda tangan digital: ' + error.message });
    }

    // Simpan ke database
    try {
      await client.query(
        'INSERT INTO documents (student_name, student_nim, document_type, ciphertext, signature, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [student_name, student_nim, document_type, ciphertext, signature, new Date()]
      );
    } catch (error) {
      console.error('Database insert failed:', error.message);
      return res.status(500).json({ error: 'Gagal menyimpan dokumen ke database: ' + error.message });
    }

    res.json({ message: 'Dokumen berhasil disahkan' });
  } catch (error) {
    console.error('Error in /api/upload:', error.message);
    res.status(500).json({ error: 'Gagal mengunggah dokumen: ' + error.message });
  }
});

app.post('/api/verify', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      console.error('No file uploaded for verification');
      return res.status(400).json({ error: 'Harap unggah file PDF' });
    }

    const file = req.files.file;

    // Enkripsi AES
    let ciphertext;
    try {
      const key = CryptoJS.enc.Hex.parse(process.env.AES_KEY);
      const iv = CryptoJS.lib.WordArray.random(16);
      ciphertext = CryptoJS.AES.encrypt(file.data.toString('binary'), key, { iv }).toString();
    } catch (error) {
      console.error('AES encryption failed:', error.message);
      return res.status(500).json({ error: 'Gagal mengenkripsi dokumen: ' + error.message });
    }

    // Cari ciphertext
    const result = await client.query('SELECT * FROM documents WHERE ciphertext = $1', [ciphertext]);
    if (result.rows.length === 0) {
      console.error('Document not found for ciphertext:', ciphertext);
      return res.status(404).json({ error: 'Dokumen tidak ditemukan' });
    }

    const { signature, student_name, student_nim, document_type, created_at } = result.rows[0];
    let isValid;
    try {
      const dataToVerify = ciphertext + created_at.toISOString();
      const pubKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n').trim();
      
      // Validasi kunci publik
      if (!pubKey.includes('-----BEGIN PUBLIC KEY-----') || !pubKey.includes('-----END PUBLIC KEY-----')) {
        console.error('Invalid public key format');
        return res.status(500).json({ error: 'Format kunci publik tidak valid' });
      }

      const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
      try {
        sig.init(pubKey);
      } catch (error) {
        console.error('RSA verification init failed:', error.message);
        return res.status(500).json({ error: 'Gagal menginisialisasi verifikasi RSA: ' + error.message });
      }
      sig.updateString(dataToVerify);
      isValid = sig.verify(signature);
    } catch (error) {
      console.error('RSA verification failed:', error.message);
      return res.status(500).json({ error: 'Gagal memverifikasi tanda tangan: ' + error.message });
    }

    if (isValid) {
      res.json({
        message: 'Dokumen asli dan terverifikasi',
        data: { student_name, student_nim, document_type, created_at }
      });
    } else {
      console.error('Signature verification failed');
      return res.status(400).json({ error: 'Verifikasi gagal: Tanda tangan tidak valid' });
    }
  } catch (error) {
    console.error('Error in /api/verify:', error.message);
    return res.status(500).json({ error: 'Gagal memverifikasi dokumen: ' + error.message });
  }
});

app.listen(3000, () => console.log('Server berjalan di port 3000'));