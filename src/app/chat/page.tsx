"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import MessageInput from "@/components/chat/MessageInput";
import React from "react";

const ChatPage = () => {
  return (
    <>
      <div className="p-4 max-w-lg mx-auto">
        <ChatWindow />
        <MessageInput />
      </div>
    </>
  );
};

export default ChatPage;
