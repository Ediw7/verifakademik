import { useState } from 'react';
import axios from 'axios';

function UploadDocument() {
  const [formData, setFormData] = useState({
    student_name: '',
    student_nim: '',
    document_type: '',
    file: null
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      setStatus('Harap pilih file PDF');
      return;
    }

    const data = new FormData();
    data.append('student_name', formData.student_name);
    data.append('student_nim', formData.student_nim);
    data.append('document_type', formData.document_type);
    data.append('file', formData.file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus('Dokumen berhasil disahkan');
      setFormData({ student_name: '', student_nim: '', document_type: '', file: null });
      document.getElementById('fileInput').value = ''; // Reset input file
    } catch (error) {
      setStatus('Gagal mengunggah dokumen: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Tambah Dokumen</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nama Mahasiswa:</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">NIM:</label>
          <input
            type="text"
            name="student_nim"
            value={formData.student_nim}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">Jenis Dokumen:</label>
          <input
            type="text"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block">File PDF:</label>
          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Tanda Tangan & Sahkan Dokumen
        </button>
      </form>
      {status && (
        <p className={`mt-4 ${status.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </div>
  );
}

export default UploadDocument;