import { useState } from 'react';
import axios from 'axios';

function VerifyDocument() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!file) {
      setResult({ error: 'Harap pilih file PDF' });
      return;
    }

    const data = new FormData();
    data.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/verify`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: 'Verifikasi gagal: ' + error.message });
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">VerifAkademik</h1>
      
      <section id="penjelasan" className="mb-8">
        <h2 className="text-2xl mb-4">Penjelasan</h2>
        <p className="text-gray-700">
          VerifAkademik adalah solusi berbasis kriptografi untuk memverifikasi keaslian dokumen akademik, seperti ijazah, untuk mencegah pemalsuan. Sistem ini menggunakan AES-256-CBC untuk mengenkripsi dokumen dan RSA untuk tanda tangan digital, memastikan integritas dan autentikasi dokumen.
        </p>
      </section>

      <section id="fitur" className="mb-8">
        <h2 className="text-2xl mb-4">Fitur</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Verifikasi dokumen cepat dan aman untuk publik.</li>
          <li>Pengunggahan dokumen oleh admin dengan enkripsi dan tanda tangan digital.</li>
          <li>Dasbor admin untuk melihat daftar dokumen terverifikasi.</li>
          <li>Antarmuka ramah pengguna dengan desain modern.</li>
        </ul>
      </section>

      <section id="manfaat" className="mb-8">
        <h2 className="text-2xl mb-4">Manfaat</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Meningkatkan kepercayaan terhadap dokumen akademik.</li>
          <li>Mengurangi risiko pemalsuan ijazah.</li>
          <li>Proses verifikasi yang efisien dan transparan.</li>
          <li>Mendukung institusi akademik dalam menjaga integritas data.</li>
        </ul>
      </section>

      <section id="verifikasi" className="mb-8">
        <h2 className="text-2xl mb-4">Verifikasi Dokumen</h2>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-gray-700">File PDF:</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Verifikasi Sekarang
          </button>
        </form>
        {result && (
          <div className="mt-4">
            <h3 className="text-xl">Hasil Verifikasi</h3>
            {result.message ? (
              <div className="text-green-600">
                <p>{result.message}</p>
                <p>Nama: {result.data.student_name}</p>
                <p>NIM: {result.data.student_nim}</p>
                <p>Jenis Dokumen: {result.data.document_type}</p>
                <p>Tanggal: {result.data.created_at}</p>
              </div>
            ) : (
              <p className="text-red-600">{result.error}</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default VerifyDocument;