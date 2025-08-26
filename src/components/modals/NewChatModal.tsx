"use client";
import React, { useState } from "react";
import Modal from "../ui/Modal";

export default function NewChatModal({
  open,
  onClose,
  onStart,
}: {
  open: boolean;
  onClose: () => void;
  onStart: (userId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const dummyUsers = [
    { id: "u1", name: "Alice" },
    { id: "u2", name: "Bob" },
    { id: "u3", name: "Charlie" },
  ];
  const filtered = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <Modal open={open} onClose={onClose} title="Start new chat">
      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <ul className="space-y-2 max-h-64 overflow-auto">
        {filtered.map((u) => (
          <li
            key={u.id}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {u.name[0]}
              </div>
              <div>{u.name}</div>
            </div>
            <button
              onClick={() => {
                onStart(u.id);
                onClose();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Start
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
