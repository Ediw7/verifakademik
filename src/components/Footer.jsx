import { Lock } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center text-gray-400 relative z-10 container mx-auto px-6 py-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-2 rounded-lg">
          <Lock className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-lg">Powered by Advanced Cryptography Technology</p>
      <p className="text-sm mt-2">© {currentYear} VerifAkademik. Semua hak dilindungi undang-undang.</p>
    </footer>
  );
}

export default Footer;