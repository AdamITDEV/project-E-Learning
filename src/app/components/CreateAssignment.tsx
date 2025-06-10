"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateAssignment() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, deadline }),
    });
    const data = await res.json();
    alert(data.message);
  };

  if (!session?.user?.isTeacher) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white text-black p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Tạo Bài Tập Mới</h2>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      />
      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Tạo bài
      </button>
    </form>
  );
}
