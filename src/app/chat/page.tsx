"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import CreateGroupModal from "@/components/modals/CreateGroupModal";
import NewChatModal from "@/components/modals/NewChatModal";
import ProfileModal from "@/components/modals/ProfileModal";

/* Dummy data — replace with API data */
const initialChats = [
  {
    id: "c1",
    partnerName: "Alice",
    lastMessage: "See you!",
    lastAt: "2:11 PM",
  },
  {
    id: "c2",
    partnerName: "Engineering Team",
    name: "Engineering Team",
    lastMessage: "Standup in 10",
    lastAt: "1:00 PM",
  },
];

export default function ChatPage() {
  const [chats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(
    initialChats[0].id
  );
  const [messages, setMessages] = useState([
    {
      id: "m1",
      content: "Hello Alice!",
      senderName: "You",
      isMine: true,
      time: "2:00 PM",
    },
    {
      id: "m2",
      content: "Hi! How are you?",
      senderName: "Alice",
      isMine: false,
      time: "2:01 PM",
    },
  ]);

  const [openNewChat, setOpenNewChat] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  function handleStartChat(userId: string) {
    // Replace: call backend createChat -> setActiveChatId(returnedChatId)
    console.log("start chat with", userId);
    setOpenNewChat(false);
  }

  function handleCreateGroup(payload: any) {
    // Replace: create group backend -> refresh chats
    console.log("create group", payload);
  }

  async function handleSend(text: string) {
    // Replace: post message to backend; optimistic update shown below
    const newMsg = {
      id: String(Date.now()),
      content: text,
      senderName: "You",
      isMine: true,
      time: "Now",
    };
    setMessages((prev) => [...prev, newMsg]);
    // call API...
  }

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="flex h-screen">
      <Sidebar
        onOpenNewChat={() => setOpenNewChat(true)}
        onOpenCreateGroup={() => setOpenCreateGroup(true)}
        onSelectChat={(id) => setActiveChatId(id)}
        chats={chats}
      />

      <div className="flex-1 flex flex-col">
        <ChatHeader
          title={activeChat?.name || activeChat?.partnerName}
          subtitle={activeChat ? "Online" : ""}
          onOpenOptions={() => console.log("open options")}
          onOpenMembers={() => console.log("open members")}
        />
        <ChatWindow messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>

      <NewChatModal
        open={openNewChat}
        onClose={() => setOpenNewChat(false)}
        onStart={handleStartChat}
      />
      <CreateGroupModal
        open={openCreateGroup}
        onClose={() => setOpenCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
      <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />
    </div>
  );
}
