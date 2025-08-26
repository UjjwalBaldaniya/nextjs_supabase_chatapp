"use client";
import React, { useEffect, useRef } from "react";

export default function ChatWindow({ messages }: { messages: any[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No messages yet. Say hello 👋
        </div>
      )}

      {messages.map((m) => {
        const mine = m.isMine;
        return (
          <div
            key={m.id}
            className={`flex ${mine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`${mine ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"} max-w-[75%] p-3 rounded-2xl shadow-sm`}
            >
              {!mine && (
                <div className="text-xs text-gray-500 mb-1">{m.senderName}</div>
              )}
              <div>{m.content}</div>
              <div className="text-xs text-gray-300 mt-2 text-right">
                {m.time}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
