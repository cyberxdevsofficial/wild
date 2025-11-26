document.getElementById("orderForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const product = document.getElementById("product").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const note = document.getElementById("note").value;

    const botToken = "7752346075:AAEjLAL6hPX8hfnLawhMB5pvTqxYO6vR0cU";
    const chatId = "6706839017";

    const text = `
🍽 *New Order Received!*
---------------------------------
🛒 *Product:* ${product}
📞 *Phone:* ${phone}
📧 *Email:* ${email}
📝 *Note:* ${note || "No special notes"}
---------------------------------
🏖 Wild Heaven Beach Villa Restaurant
    `;

    const status = document.getElementById("status");
    status.innerHTML = "Sending order...";

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: "Markdown"
                })
            }
        );

        if (response.ok) {
            status.innerHTML = "✅ Order Sent Successfully!";
            document.getElementById("orderForm").reset();
        } else {
            status.innerHTML = "❌ Failed to send order.";
        }
    } catch (error) {
        status.innerHTML = "❌ Error sending order.";
    }
});
