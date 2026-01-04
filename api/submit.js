export default async function handler(req, res) {
  // Header CORS agar browser tidak memblokir
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxQbpgqyyHrwh1M5fWbLVLmxX4e2jlsOJ4s5RYwABFkKML20gozF-Rg8CjBuuLzv5CQ/exec";

  try {
    if (req.method === 'POST') {
      // Kirim data ke Google
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body) 
      });
      const data = await response.json();
      return res.status(200).json(data);
    } 
    
    if (req.method === 'GET') {
      const user = req.query.user || '';
      const response = await fetch(`${SCRIPT_URL}?user=${encodeURIComponent(user)}`);
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
