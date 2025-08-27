"use client";
import React, { useState } from "react";
import Avatar from "./ui/Avatar";

export default function Sidebar({
  onOpenNewChat,
  onOpenCreateGroup,
  onSelectChat,
  chats = [],
}: {
  onOpenNewChat: () => void;
  onOpenCreateGroup: () => void;
  onSelectChat: (chatId: string) => void;
  chats?: any[];
}) {
  const [query, setQuery] = useState("");

  const filtered = chats.filter((c: any) =>
    (c.name || c.partnerName || "Unknown")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <aside className="w-full md:w-80 lg:w-96 border-r h-screen flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name="Current User" />
          <div>
            <div className="font-semibold">You</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onOpenNewChat}
            className="px-3 py-1 rounded bg-blue-600 text-white text-sm cursor-pointer"
          >
            New
          </button>
          <button
            onClick={onOpenCreateGroup}
            className="px-3 py-1 rounded border text-sm cursor-pointer"
          >
            Group
          </button>
        </div>
      </div>

      <div className="px-4">
        <input
          type="search"
          placeholder="Search chats or users..."
          className="w-full border rounded px-3 py-2 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="px-2 py-3 overflow-auto flex-1">
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 px-3">No chats yet</div>
        )}
        <ul className="space-y-2">
          {filtered.map((chat: any) => (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className="flex items-center gap-3 p-3 rounded hover:bg-gray-50 cursor-pointer"
            >
              <Avatar name={chat.name || chat.partnerName} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <div className="font-medium truncate">
                    {chat.name || chat.partnerName || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-400">
                    {chat.lastAt || ""}
                  </div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {chat.lastMessage || "Say hi!"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t text-xs text-gray-500">© Your Chat App</div>
    </aside>
  );
}
