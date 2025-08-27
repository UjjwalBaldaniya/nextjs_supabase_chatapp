"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { getProfiles, Profile } from "@/services/profile.services";

export default function NewChatModal({
  open,
  onClose,
  onStart,
}: {
  open: boolean;
  onClose: () => void;
  onStart: (userId: string) => void;
}) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [query, setQuery] = useState<string>("");

  const filtered = users.filter((u) =>
    u.full_name.toLowerCase().includes(query.toLowerCase())
  );

  const fetchProfiles = async () => {
    try {
      const response = await getProfiles();
      setUsers(response.data.profile ?? []);
    } catch (err: any) {
      console.error("Error fetching profiles:", err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

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
                {u.full_name[0]}
              </div>
              <div>{u.full_name}</div>
            </div>
            <button
              onClick={() => {
                onStart(u.id);
                onClose();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer"
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
