import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Shield, Upload, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

function UploadDocument() {
  const [formData, setFormData] = useState({ student_name: '', student_nim: '', document_type: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ message: '', isError: false, show: false });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ message: 'Harap pilih file PDF terlebih dahulu', isError: true, show: true });
      return;
    }

    setIsUploading(true);
    setStatus({ ...status, show: false });

    const data = new FormData();
    data.append('student_name', formData.student_name);
    data.append('student_nim', formData.student_nim);
    data.append('document_type', formData.document_type);
    data.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus({ message: 'Dokumen berhasil disahkan! Anda akan diarahkan kembali...', isError: false, show: true });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Gagal mengunggah dokumen.';
      setStatus({ message: errorMessage, isError: true, show: true });
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fadeIn">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/dashboard" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span>Kembali ke Dashboard</span>
          </Link>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-xl mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Sahkan Dokumen Baru</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Nama Mahasiswa</label>
                  <input type="text" name="student_name" onChange={handleChange} required className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">NIM</label>
                  <input type="text" name="student_nim" onChange={handleChange} required className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Jenis Dokumen</label>
                <input type="text" name="document_type" onChange={handleChange} required placeholder="Contoh: Ijazah Sarjana, Transkrip Nilai" className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Upload File PDF</label>
                <label htmlFor="file-upload" className="flex items-center justify-center w-full p-6 border-2 border-dashed border-purple-500/50 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-slate-700/30 transition-all duration-300">
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <p className="text-white font-medium">{file ? file.name : 'Klik untuk memilih file'}</p>
                  </div>
                  <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" required />
                </label>
              </div>

              <button type="submit" disabled={isUploading} className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg">
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Memproses...
                  </div>
                ) : (
                  'Tanda Tangan & Sahkan Dokumen'
                )}
              </button>
            </form>

            {status.show && (
              <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 text-white ${status.isError ? 'bg-red-900/30 border border-red-500/30' : 'bg-emerald-900/30 border border-emerald-500/30'}`}>
                {status.isError ? <XCircle className="w-6 h-6 text-red-400" /> : <CheckCircle className="w-6 h-6 text-emerald-400" />}
                <p>{status.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
       <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default UploadDocument;