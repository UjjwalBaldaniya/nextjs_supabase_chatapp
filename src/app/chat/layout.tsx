import React from "react";

export const metadata = {
  title: "Chat",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen bg-white text-gray-900">{children}</div>;
}
