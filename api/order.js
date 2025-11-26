
// Vercel serverless function to forward order to Telegram
// Deploy this file as /api/order.js in Vercel
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const TELEGRAM_BOT_TOKEN = "7752346075:AAEjLAL6hPX8hfnLawhMB5pvTqxYO6vR0cU";
const TELEGRAM_CHAT_ID = "6706839017";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { product, quantity, phone, email, note } = req.body || {};
    if (!product || !phone || !email) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }
    const text = `📩 *New Order to Wild Heaven Beach*%0A
*Product:* ${product}%0A*Quantity:* ${quantity}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Note:* ${note || '-'}%0A
*Time:* ${new Date().toLocaleString()}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'MarkdownV2'
      })
    });
    const j = await resp.json();
    if (!j.ok) {
      console.error('TG error', j);
      res.status(500).json({ error: 'Telegram API error', details: j });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
