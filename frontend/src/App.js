
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png'; // Logo image in src/

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [protocols, setProtocols] = useState([]);
  const [doses, setDoses] = useState([]);
  const [selectedProtocolId, setSelectedProtocolId] = useState('');
  const [role, setRole] = useState('technician'); // 'admin' or 'technician'

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/protocols`);
        const data = await res.json();
        setProtocols(data);
      } catch (error) {
        console.error('Error fetching protocols:', error);
      }
    };
    fetchProtocols();
  }, []);

  useEffect(() => {
    if (!selectedProtocolId) {
      setDoses([]);
      return;
    }
    const fetchDoses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/doses/${selectedProtocolId}`);
        const data = await res.json();
        setDoses(data);
      } catch (error) {
        console.error('Error fetching doses:', error);
      }
    };
    fetchDoses();
  }, [selectedProtocolId]);

  const handleComplete = async (doseId) => {
    await fetch(`${API_BASE_URL}/doses/${doseId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'complete' }),
    });

    const res = await fetch(`${API_BASE_URL}/doses/${selectedProtocolId}`);
    const updated = await res.json();
    setDoses(updated);
  };

  return (
    <div className="page">
      <div className="topbar"></div>
      <header className="main-nav">
        <img src={logo} alt="Hinckley Medical" className="logo" />
        <ul className="nav-links">
          <li>
            <a href="https://hinckleymed.com/#products" target="_blank" rel="noopener noreferrer" className="nav-link">
              Products
            </a>
          </li>
          <li>
            <a href="https://hinckleymed.com/#resources" target="_blank" rel="noopener noreferrer" className="nav-link">
              Resources
            </a>
          </li>
          <li>
            <a href="https://hinckleymed.com/#about" target="_blank" rel="noopener noreferrer" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="https://hinckleymed.com/#demo" target="_blank" rel="noopener noreferrer" className="nav-link">
              <button className="demo-btn">Free Demo</button>
            </a>
          </li>
        </ul>
      </header>

      <main className="container">
        <h1 className="title">OneDose Protocol Renderer</h1>

        <div className="mb-4">
          <label htmlFor="role" className="mr-2">Select Role:</label>
          <select
            id="role"
            className="dropdown"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="technician">Technician</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <select
          className="dropdown"
          onChange={(e) => setSelectedProtocolId(e.target.value)}
          value={selectedProtocolId}
        >
          <option value="">Select Patient Protocol</option>
          {protocols.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <div className="protocol-box">
          {doses.length > 0 ? (
            doses.map((item, index) => (
              <div key={item.id} className="protocol-step">
                <strong>Step {index + 1}:</strong> {item.step} — <em>{item.status}</em>
                {role === 'technician' && item.status !== 'complete' && (
                  <button
                    onClick={() => handleComplete(item.id)}
                    className="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="placeholder">No protocol loaded. Select one above.</p>
          )}
        </div>

        <p className="disclaimer">
          *This prototype is for demonstration only. Not for clinical use.
        </p>
      </main>

      <footer className="footer">
        <div className="footer-columns">
          <div>
            <h4>Site Links</h4>
            <ul>
              <li>
                <a href="https://hinckleymed.com/#products" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="https://hinckleymed.com/#resources" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  Resources
                </a>
              </li>
              <li>
                <a href="https://hinckleymed.com/#about" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://hinckleymed.com/#demo" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  Demo
                </a>
              </li>
              <li>
                <a href="https://hinckleymed.com/#support" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  Support
                </a>
              </li>
              <li>
                <a href="https://hinckleymed.com/privacy" target="_blank" rel="noopener noreferrer"  className="footer-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <p>Hinckley Medical, Inc.<br/>Lakeville, MN 55044<br/>helpdesk@hinckleymed.com</p>
          </div>
          <div>
            <h4>&copy;2025</h4>
            <p><strong>OneWeight</strong> and <strong>OneDose</strong> are trademarks of Hinckley Medical, Inc.</p>
            <p>U.S. Patent No. 12,117,334</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
