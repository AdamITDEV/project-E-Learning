"use client";

import { useEffect, useState } from "react";

type Submission = {
  _id: string;
  studentName: string;
  fileUrl: string;
  taskTitle: string;
  taskId: string; // bổ sung taskId để nhóm theo task
  submittedAt: string;
};

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  // Thêm hàm tải xuống zip

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    const res = await fetch("/api/submissions");
    const data = await res.json();
    setSubmissions(data.submissions || []);
    setLoading(false);
  }

  // Xóa 1 submission
  async function handleDeleteSubmission(id: string) {
    if (!confirm("Bạn có chắc muốn xóa bài nộp này?")) return;

    await fetch(`/api/submissions?id=${id}`, { method: "DELETE" });
    fetchSubmissions();
  }

  // Xóa tất cả bài nộp theo taskId
  async function handleDeleteAllByTask(taskId: string) {
    if (!confirm("Bạn có chắc muốn xóa tất cả bài nộp của bài tập này?"))
      return;

    await fetch(`/api/submissions?taskId=${taskId}`, { method: "DELETE" });
    fetchSubmissions();
  }

  // Lấy danh sách task và gom nhóm theo task
  const submissionsByTask = submissions.reduce((acc, cur) => {
    if (!acc[cur.taskId]) acc[cur.taskId] = [];
    acc[cur.taskId].push(cur);
    return acc;
  }, {} as Record<string, Submission[]>);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bài đã nộp</h2>
      {loading && <p>Đang tải...</p>}

      {!loading && submissions.length === 0 && (
        <p>Chưa có học sinh nào nộp bài.</p>
      )}

      {!loading &&
        Object.entries(submissionsByTask).map(([taskId, submissions]) => (
          <div
            key={taskId}
            className="mb-8 p-4 bg-gray-50 rounded border border-gray-300"
          >
            <h3 className="font-semibold mb-2 text-black">
              Bài tập: {submissions[0].taskTitle}
            </h3>
            <button
              onClick={() => handleDeleteAllByTask(taskId)}
              className="mb-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Xóa tất cả bài nộp của bài tập này
            </button>

            <ul className="space-y-4">
              {submissions.map((submission) => (
                <li
                  key={submission._id}
                  className="bg-white text-black p-4 rounded shadow border border-gray-200"
                >
                  <p>
                    🧑 <strong>{submission.studentName}</strong> đã nộp bài{" "}
                    <strong>{submission.taskTitle}</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    🕒 {new Date(submission.submittedAt).toLocaleString()}
                  </p>
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-1 inline-block"
                    download
                  >
                    📄 Tải xuống file
                  </a>
                  <button
                    onClick={() => handleDeleteSubmission(submission._id)}
                    className="ml-4 text-red-600 hover:underline"
                  >
                    Xóa bài nộp
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
