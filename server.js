
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434/api/chat";
const MODEL_NAME = "llama3.2";

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body; 

    const payload = {
      model: MODEL_NAME,
      messages,      
      stream: false,
    };

    const response = await axios.post(OLLAMA_URL, payload);

    
    const assistantMessage = response.data.message;

    res.json({ message: assistantMessage });
  } catch (err) {
    console.error("Error talking to Ollama:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
