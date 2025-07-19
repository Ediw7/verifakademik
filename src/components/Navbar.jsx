import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex space-x-4 items-center">
        <Link to="/" className="hover:text-gray-300 p-2">Penjelasan</Link>
        <Link to="/" className="hover:text-gray-300 p-2">Fitur</Link>
        <Link to="/" className="hover:text-gray-300 p-2">Manfaat</Link>
        <Link to="/dashboard" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Masuk Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;