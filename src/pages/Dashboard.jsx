import { useEffect, useState } from 'react';
import { Shield, Plus, Users, FileCheck, Clock, User, GraduationCap, Calendar } from 'lucide-react';

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // axios.get(`${import.meta.env.VITE_API_URL}/documents`)
    //   .then(response => setDocuments(response.data))
    //   .catch(error => console.error(error));
  }, []);

  const getDocumentTypeIcon = (type) => {
    if (type.includes('Ijazah')) return <GraduationCap className="w-5 h-5 text-purple-400" />;
    if (type.includes('Transkrip')) return <FileCheck className="w-5 h-5 text-cyan-400" />;
    if (type.includes('Sertifikat')) return <Shield className="w-5 h-5 text-emerald-400" />;
    return <FileCheck className="w-5 h-5 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="mt-20 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-xl shadow-lg mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard Admin
              </h2>
              <p className="text-gray-300 mt-1">Kelola dan verifikasi dokumen akademik</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg mr-4">
                  <FileCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Dokumen</p>
                  <p className="text-2xl font-bold text-white">{documents.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Mahasiswa Terdaftar</p>
                  <p className="text-2xl font-bold text-white">{documents.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Verifikasi Hari Ini</p>
                  <p className="text-2xl font-bold text-white">0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <a 
              href="/upload" 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Sahkan Dokumen Baru</span>
            </a>
          </div>
        </header>

        {/* Documents Section */}
        <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-xl mr-4">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Daftar Dokumen</h3>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-slate-700/30 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg">Belum ada dokumen yang tersimpan</p>
              <p className="text-gray-500 text-sm mt-2">Dokumen yang disahkan akan muncul di sini</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map(doc => (
                <div 
                  key={doc.id}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-slate-600/50 p-3 rounded-lg">
                        {getDocumentTypeIcon(doc.document_type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <h4 className="text-lg font-semibold text-white">{doc.student_name}</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">NIM:</span>
                            <span className="text-gray-300 font-medium">{doc.student_nim}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Jenis:</span>
                            <span className="text-gray-300">{doc.document_type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date().toLocaleDateString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;