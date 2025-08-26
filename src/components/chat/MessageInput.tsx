"use client";
import React, { useState } from "react";

export default function MessageInput({
  onSend,
  disabled = false,
}: {
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!text.trim()) return;
    setSending(true);
    try {
      await onSend(text.trim());
      setText("");
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <button className="p-2 rounded hover:bg-gray-100">😊</button>
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 resize-none h-12"
            placeholder="Type a message..."
            disabled={disabled || sending}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={sending || disabled}
          className="ml-2 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
