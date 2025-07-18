// src/AdminPage.js
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

export default function AdminPage() {
  const [protocols, setProtocols] = useState([]);

  useEffect(() => {
    const fetchProtocols = async () => {
      const res = await fetch(`${API_BASE_URL}/protocols`);
      const data = await res.json();
      setProtocols(data);
    };

    fetchProtocols();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Protocols</h1>

      {protocols.length === 0 ? (
        <p>No protocols found.</p>
      ) : (
        <ul className="space-y-2">
          {protocols.map((p) => (
            <li key={p.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
