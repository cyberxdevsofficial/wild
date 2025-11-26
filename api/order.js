export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { product, size, phone, email } = req.body;

    if (!product || !phone || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Telegram Credentials
    const BOT_TOKEN = "7752346075:AAEjLAL6hPX8hfnLawhMB5pvTqxYO6vR0cU";
    const USER_ID = "6706839017"; // Your Telegram user ID

    // Create message text
    const message = `
🍽️ *New Order Received*
--------------------------------
📌 *Product:* ${product}
📏 *Size:* ${size || "N/A"}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📌 *Note:* ${note}
--------------------------------
    `;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: USER_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const data = await telegramRes.json();

    if (!telegramRes.ok) {
      console.error("Telegram Error:", data);
      return res.status(500).json({ error: "Telegram send failed", details: data });
    }

    return res.status(200).json({ success: true, message: "Order submitted successfully!" });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
