import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/documents`)
      .then(response => setDocuments(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Dashboard Admin</h2>
      <a href="/upload" className="bg-green-500 text-white p-2 rounded mb-4 inline-block hover:bg-green-600">
        + Tambah Dokumen
      </a>
      <h3 className="text-xl mb-2">Daftar Dokumen</h3>
      <ul className="list-disc pl-5">
        {documents.length > 0 ? (
          documents.map(doc => (
            <li key={doc.id}>
              {doc.student_name} ({doc.student_nim}) - {doc.document_type}
            </li>
          ))
        ) : (
          <p>Tidak ada dokumen tersedia.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;