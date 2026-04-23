"use client";

import { useState } from "react";
import { useChat } from "../features/chat/hooks/useChat";

export default function ChatBox() {
  const { messages, sendMessage, loading } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
