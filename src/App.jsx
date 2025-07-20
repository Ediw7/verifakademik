import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import VerifyDocument from './pages/VerifyDocument';

function App() {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<VerifyDocument />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDocument />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;