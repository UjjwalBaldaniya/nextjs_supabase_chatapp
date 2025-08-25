import { supabase } from "@/lib/supabaseClient";
import React, { useState } from "react";

const MessageInput = () => {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      alert("You are not authenticated!");
      return;
    }

    await fetch("http://localhost:4000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // ✅ Add token
      },
      body: JSON.stringify({ content: input, user_id: session.user.id }),
    });

    setInput("");
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="border p-2 flex-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
