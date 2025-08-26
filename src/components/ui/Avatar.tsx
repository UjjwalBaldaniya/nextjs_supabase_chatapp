"use client";
import React from "react";

export default function Avatar({
  name,
  size = 8,
}: {
  name?: string;
  size?: number;
}) {
  const initials = name
    ? name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-medium`}
      style={{ width: size * 4, height: size * 4 }}
    >
      {initials}
    </div>
  );
}
