"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type Task = {
  _id: string;
  title: string;
  content?: string;
};

export default function SubmitAssignment() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittedTaskIds, setSubmittedTaskIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load danh sách bài tập
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch(console.error);
  }, []);

  // Load danh sách các bài tập đã nộp của user khi có session
  useEffect(() => {
    async function fetchSubmissions() {
      if (!session?.user?.id) {
        setSubmittedTaskIds([]);
        return;
      }
      try {
        const res = await fetch(
          `/api/submissions?studentId=${session.user.id}`
        );
        const data = await res.json();
        // Giả sử API trả về { submissions: [ { taskId: "..." }, ... ] }
        type Submission = { taskId: string };
        const taskIds =
          data.submissions?.map((s: Submission) => s.taskId) || [];
        setSubmittedTaskIds(taskIds);
      } catch (error) {
        console.error("Failed to fetch submissions", error);
        setSubmittedTaskIds([]);
      }
    }
    fetchSubmissions();
  }, [session]);

  const hasSubmitted = selectedTaskId
    ? submittedTaskIds.includes(selectedTaskId)
    : false;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedTaskId) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("taskId", selectedTaskId);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        // Cập nhật danh sách đã nộp để UI cập nhật luôn mà không cần reload
        setSubmittedTaskIds((prev) => [...prev, selectedTaskId]);
        setSelectedFile(null);
      }
    } catch {
      alert("Có lỗi xảy ra khi nộp bài.");
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.isTeacher) return null;

  const selectedTask = tasks.find((task) => task._id === selectedTaskId);

  return (
    <form
      onSubmit={handleUpload}
      className="max-w-lg mx-auto p-6 bg-white text-black shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4">Nộp Bài Tập</h2>

      <label className="block mb-2">Chọn bài tập:</label>
      <select
        value={selectedTaskId}
        onChange={(e) => setSelectedTaskId(e.target.value)}
        className="w-full border p-2 mb-3"
        required
      >
        <option value="">Chọn bài tập</option>
        {tasks.map((task) => (
          <option key={task._id} value={task._id}>
            {task.title}
            {submittedTaskIds.includes(task._id) ? " (Đã nộp)" : ""}
          </option>
        ))}
      </select>

      {selectedTask && (
        <div className="mb-4 p-3 border rounded bg-gray-50 text-gray-700">
          <h3 className="font-semibold mb-1">{selectedTask.title}</h3>
          <p>{selectedTask.content || "Không có nội dung chi tiết."}</p>
        </div>
      )}

      {hasSubmitted ? (
        <p className="text-green-600 font-semibold mb-4">
          Bạn đã nộp bài cho bài tập này.
        </p>
      ) : (
        <>
          <label className="block mb-2">Tải file Word:</label>
          <input
            type="file"
            accept=".doc,.docx"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full mb-4"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Đang nộp..." : "Nộp bài"}
          </button>
        </>
      )}
    </form>
  );
}
