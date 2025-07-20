import { useState } from 'react';
import { Shield, FileCheck, Lock, Cpu, Upload, CheckCircle, XCircle, Eye } from 'lucide-react';

function VerifyDocument() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!file) {
      setResult({ error: 'Harap pilih file PDF' });
      return;
    }

    setIsVerifying(true);
    const data = new FormData();
    data.append('file', file);

    try {
      // Simulated API call since axios isn't available
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response for demo
      if (Math.random() > 0.5) {
        setResult({
          message: 'Dokumen berhasil diverifikasi dan terbukti asli',
          data: {
            student_name: 'Ahmad Rizki Pratama',
            student_nim: '2019081001',
            document_type: 'Ijazah Sarjana Teknik Informatika',
            created_at: '2024-07-15 14:30:22'
          }
        });
      } else {
        setResult({ error: 'Dokumen tidak valid atau tidak terdaftar dalam sistem' });
      }
    } catch (error) {
      setResult({ error: 'Verifikasi gagal: ' + error.message });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="text-center mt-20 mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-2xl shadow-2xl">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            VerifAkademik
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Sistem Verifikasi Dokumen Akademik Berbasis Kriptografi
          </p>
        </header>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Enkripsi AES-256</h3>
            <p className="text-gray-300">Dokumen dienkripsi menggunakan Advanced Encryption Standard 256-bit untuk keamanan maksimal.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Tanda Tangan RSA</h3>
            <p className="text-gray-300">Menggunakan algoritma RSA untuk tanda tangan digital yang memastikan autentikasi dokumen.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Verifikasi Real-time</h3>
            <p className="text-gray-300">Proses verifikasi instan dengan teknologi kriptografi modern dan secure hash functions.</p>
          </div>
        </section>

        {/* Main Verification Section */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-xl mr-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Verifikasi Dokumen</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-lg font-medium mb-3">Upload File PDF</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full p-8 border-2 border-dashed border-purple-500/50 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-slate-700/30 transition-all duration-300"
                  >
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <p className="text-white font-medium">
                        {file ? file.name : 'Klik untuk memilih file PDF'}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        Maksimal ukuran file 10MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Memverifikasi...
                  </div>
                ) : (
                  'Verifikasi Sekarang'
                )}
              </button>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 p-6 rounded-xl border transition-all duration-500 animate-fadeIn">
                <div className="flex items-center mb-4">
                  {result.message ? (
                    <CheckCircle className="w-8 h-8 text-emerald-400 mr-3" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400 mr-3" />
                  )}
                  <h3 className="text-2xl font-semibold text-white">Hasil Verifikasi</h3>
                </div>

                {result.message ? (
                  <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-6">
                    <p className="text-emerald-300 font-medium text-lg mb-4">{result.message}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Nama Mahasiswa</p>
                        <p className="text-white font-semibold">{result.data.student_name}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">NIM</p>
                        <p className="text-white font-semibold">{result.data.student_nim}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Jenis Dokumen</p>
                        <p className="text-white font-semibold">{result.data.document_type}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-gray-400 text-sm">Tanggal Verifikasi</p>
                        <p className="text-white font-semibold">{result.data.created_at}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
                    <p className="text-red-300 font-medium text-lg">{result.error}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Mengapa VerifAkademik?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Keamanan Tinggi',
                desc: 'Teknologi enkripsi militer-grade dengan AES-256 dan RSA',
                color: 'from-purple-500 to-indigo-500'
              },
              {
                title: 'Anti Pemalsuan',
                desc: 'Sistem hash kriptografi mencegah manipulasi dokumen',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                title: 'Verifikasi Instan',
                desc: 'Hasil verifikasi real-time dalam hitungan detik',
                color: 'from-emerald-500 to-teal-500'
              },
              {
                title: 'Transparan',
                desc: 'Audit trail lengkap untuk setiap proses verifikasi',
                color: 'from-orange-500 to-red-500'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                <div className={`bg-gradient-to-r ${benefit.color} w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-lg">Powered by Advanced Cryptography Technology</p>
          <p className="text-sm mt-2">© 2024 VerifAkademik. Semua hak dilindungi undang-undang.</p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default VerifyDocument;