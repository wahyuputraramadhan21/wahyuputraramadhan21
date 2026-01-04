export default async function handler(req, res) {
  // 1. Header untuk Mengatasi CORS (Penting!)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwANMw3WXCsKTweHzDZv9QOoGuc-XhhyhfFO9vuvBanj2UDh39RXXIl54IwHJW550X1/exec"; // <--- Pastikan URL /exec sudah benar

  // === LOGIKA UNTUK GET (Ambil Data) ===
  if (req.method === 'GET') {
    try {
      // Mengambil parameter 'user' dari URL (misal: ?user=Budi)
      const { user } = req.query;
      const finalUrl = `${SCRIPT_URL}?user=${encodeURIComponent(user || '')}`;
      
      const response = await fetch(finalUrl);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Gagal ambil data: " + err.message });
    }
  }

  // === LOGIKA UNTUK POST (Simpan Data) ===
  if (req.method === 'POST') {
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      const result = await response.json();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: "Gagal simpan data: " + err.message });
    }
  }

  res.status(405).json({ message: "Metode tidak diizinkan" });
}
