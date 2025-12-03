import React, { useState } from "react";
import './App.css'
function App() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend returned error status:", res.status, text);
      return;
    }

    const data = await res.json();
    setReply(data.reply);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

  return (
    <div className="main" style={{ padding: 20 }}>
      <h2>React → Node Communication</h2>
      <div className ="inputbox">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something"
        />
        </div>
      <button onClick={sendMessage} style={{ marginLeft: 10 }}>
        Send
      </button>

      <p>Node says: {reply}</p>
    </div>
  );
}

export default App;
