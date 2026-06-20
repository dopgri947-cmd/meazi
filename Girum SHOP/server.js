const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Send order to Telegram
app.post("/order", async (req, res) => {
    const { name, phone, items, total } = req.body;

    const message = `
🛒 NEW ORDER FROM MEAZI SHOP

👤 Name: ${name}
📞 Phone: ${phone}

🛍 Items:
${items.map(i => `- ${i.name} x${i.qty}`).join("\n")}

💰 Total: ETB ${total}
`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message
        });

        res.json({ success: true });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});