
Wild Heaven Beach Villa & Restaurant — Vercel-ready website
---------------------------------------------------------

Files included:
- index.html
- order.html
- styles.css
- script.js
- /assets/logo.jpg (placeholder - replace with your real logo.jpg if you have it)
- /api/order.js  (serverless function that forwards orders to Telegram)
- vercel.json

Important:
- The Telegram Bot Token and Chat ID you provided are embedded in api/order.js.
  When you deploy to Vercel this function will send order messages to Telegram user ID 6706839017 via the bot token.
- If you prefer not to embed the token in the repo, replace the token with an environment variable:
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  and set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Vercel dashboard (recommended).

Deploy instructions (quick):
1. Zip these files or push to a GitHub repo.
2. In Vercel dashboard, import the GitHub repo or drag-and-drop the zip.
3. If you used env vars, add them in the project settings.
4. After deploy, open https://your-project.vercel.app/order.html to test the form.

Notes:
- The placeholder assets/logo.jpg is a small 1x1 image. Replace /assets/logo.jpg with your real logo.jpg.
- The UI uses Google Fonts and adaptive CSS. Modify styles.css to tweak colors, fonts or layout.
- If telegram send fails due to ParseMode MarkdownV2, you can change parse_mode to "HTML" in the fetch body.
