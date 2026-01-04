// api/submit.js
export default async function handler(req, res) {
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwANMw3WXCsKTweHzDZv9QOoGuc-XhhyhfFO9vuvBanj2UDh39RXXIl54IwHJW550X1/exec";

  if (req.method === 'POST') {
    const response = await fetch(GOOGLE_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    return res.status(200).json(result);
  }
}
