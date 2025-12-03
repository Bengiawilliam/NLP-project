const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL_NAME = "llama3.2"; // or llama3.1 etc.

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    const messages = [
      ...(history || []),
      { role: "user", content: message }
    ];

    const payload = {
      model: MODEL_NAME,
      messages: messages,
      stream: false
    };

    const response = await axios.post(OLLAMA_URL, payload);

    const reply = response.data.message?.content || "";

    res.json({ reply });
  } catch (err) {
    console.error("Error talking to Ollama:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
