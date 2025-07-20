import { Shield, Lock, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              VerifAkademik
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('penjelasan')} className="text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
              Penjelasan
            </button>
            <button onClick={() => scrollToSection('fitur')} className="text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
              Fitur
            </button>
            <button onClick={() => scrollToSection('manfaat')} className="text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
              Manfaat
            </button>
            <button onClick={() => scrollToSection('verifikasi')} className="text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
              Verifikasi
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg">
              <LogIn className="w-4 h-4" />
              <span>Masuk Admin</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <div className="flex flex-col space-y-2 pt-4">
              <button onClick={() => scrollToSection('penjelasan')} className="text-left text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
                Penjelasan
              </button>
              <button onClick={() => scrollToSection('fitur')} className="text-left text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
                Fitur
              </button>
              <button onClick={() => scrollToSection('manfaat')} className="text-left text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
                Manfaat
              </button>
              <button onClick={() => scrollToSection('verifikasi')} className="text-left text-gray-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all duration-300">
                Verifikasi
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2 shadow-lg mt-2">
                <LogIn className="w-4 h-4" />
                <span>Masuk Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
