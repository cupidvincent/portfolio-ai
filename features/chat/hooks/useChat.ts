import { useState } from "react";

export function useChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setLoading(true);

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    loading,
  };
}
