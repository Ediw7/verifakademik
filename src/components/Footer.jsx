function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full p-8 text-center text-gray-500 border-t border-gray-800">
      <p>&copy; {currentYear} VerifAkademik. Menjamin Integritas dengan Kriptografi.</p>
    </footer>
  );
}

export default Footer;