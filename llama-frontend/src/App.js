
import React, { useState } from "react";
import "./App.css";
let RUNNING = false; 
let MODE = false; 

function App() {
 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  async function sendMessage() {
    if (!input.trim()) return;

   
    const userMessage = { role: "user", content: input };
    const newHistory = [...messages, userMessage];

    try {
      
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory, 
        }),
      });

      const data = await res.json();

      
      const assistantMessage = data.message; 

      const updatedHistory = [...newHistory, assistantMessage];

      setMessages(updatedHistory);
      setInput("");

      console.log("History now:", updatedHistory);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  return (
    <div className="main">
      <h2>ChatBot with Ollama3.2</h2>

      
      <div className="chat-window">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.role === "user" ? "msg msg-user" : "msg msg-bot"}
          >
            {m.role === "user" ?
            (
              <strong><div className="userbox">:You</div></strong>
              )
            :
            (
              <strong><div className="llamabox">Llama:</div></strong>
              )
              } <pre className="msg-content">{m.content}</pre>
          </div>
        ))}
      </div>

      <div className="input-row">
        <textarea className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
          rows={3}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
