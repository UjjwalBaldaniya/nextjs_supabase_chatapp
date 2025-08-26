"use client";
import React from "react";
import Avatar from "../ui/Avatar";

export default function ChatHeader({
  title,
  subtitle,
  onOpenOptions,
  onOpenMembers,
}: {
  title?: string;
  subtitle?: string;
  onOpenOptions?: () => void;
  onOpenMembers?: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar name={title} />
        <div>
          <div className="font-semibold">{title || "Select a chat"}</div>
          <div className="text-xs text-gray-500">{subtitle || "Offline"}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onOpenMembers && (
          <button
            onClick={onOpenMembers}
            className="text-sm px-2 py-1 rounded hover:bg-gray-100"
          >
            Members
          </button>
        )}
        <button
          onClick={onOpenOptions}
          className="p-2 rounded hover:bg-gray-100"
        >
          ⋮
        </button>
      </div>
    </div>
  );
}
