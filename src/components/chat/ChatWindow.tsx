import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

interface MessagesResponse {
  data: { messages: Message[] };
  message: string;
  statusCode: number;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // ✅ Fetch initial messages
    const fetchMessages = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        console.error("Not authenticated");
        return;
      }

      const res = await fetch("http://localhost:4000/messages", {
        headers: {
          Authorization: `Bearer ${session.access_token}`, // ✅ Add token
        },
      });

      const data: MessagesResponse = await res.json();
      setMessages(data.data.messages);
    };

    fetchMessages();

    // ✅ Real-time subscription
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="border rounded p-4 h-96 overflow-y-auto">
      {messages?.map((msg) => (
        <div key={msg.id} className="mb-2">
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
