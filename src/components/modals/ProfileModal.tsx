"use client";
import React from "react";
import Modal from "../ui/Modal";
import Avatar from "../ui/Avatar";

export default function ProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title="Your Profile">
      <div className="flex items-center gap-4">
        <Avatar name="You" size={12} />
        <div>
          <div className="font-semibold">You</div>
          <div className="text-sm text-gray-500">you@example.com</div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-1 rounded border">Settings</button>
            <button className="px-3 py-1 rounded bg-red-50 text-red-600">
              Logout
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
