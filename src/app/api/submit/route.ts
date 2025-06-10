import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/app/lib/db";
import { Submission } from "@/app/models/Submission";
import { Task } from "@/app/models/Task"; // 👈 Thêm import Task model
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
interface TaskType {
  _id: string;
  title: string;
  content?: string;
  deadline?: Date;
  createdBy: string;
}

// Để xử lý multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.isTeacher) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;
  const taskId = formData.get("taskId")?.toString();

  if (!file || !taskId) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await writeFile(`${uploadDir}/${filename}`, buffer);

  await connectDB();

  // 👉 Lấy tiêu đề bài tập từ DB
  const task = await Task.findById(taskId).lean<TaskType | null>();

  if (!task) {
    return NextResponse.json(
      { message: "Bài tập không tồn tại." },
      { status: 404 }
    );
  }

  await Submission.create({
    studentName: session.user.name,
    studentId: session.user.id,
    taskId: task._id,
    taskTitle: task.title, // ✅ Dữ liệu đầy đủ để không lỗi
    fileUrl: `/uploads/${filename}`,
    submittedAt: new Date(),
  });

  return NextResponse.json({ message: "Đã nộp bài thành công!" });
}
