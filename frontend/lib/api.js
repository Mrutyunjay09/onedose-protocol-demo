// frontend/lib/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export async function getProtocols() {
  const res = await fetch(`${API_BASE_URL}/protocols`);
  return res.json();
}

export async function getDoses(protocolId) {
  const res = await fetch(`${API_BASE_URL}/doses/${protocolId}`);
  return res.json();
}

export async function updateDoseStatus(doseId, status) {
  const res = await fetch(`${API_BASE_URL}/doses/${doseId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return res.json();
}
