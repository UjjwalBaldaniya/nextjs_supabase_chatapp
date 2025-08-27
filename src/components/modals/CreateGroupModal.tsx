"use client";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { getProfiles, Profile } from "@/services/profile.services";

export default function CreateGroupModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (payload: any) => void;
}) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [name, setName] = useState("");
  const [members, setMembers] = useState<string[]>([]);

  function toggleMember(id: string) {
    setMembers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

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
    <Modal open={open} onClose={onClose} title="Create Group">
      <div className="space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group name"
          className="w-full border rounded px-3 py-2"
        />
        <div className="text-sm text-gray-500">Add members</div>
        <div className="max-h-40 overflow-auto border rounded p-2">
          {users.map((u) => (
            <label
              key={u.id}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                checked={members.includes(u.id)}
                onChange={() => toggleMember(u.id)}
              />
              <div>{u.full_name}</div>
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onCreate({ name, members });
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
