// src/app/api/submissions/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Submission } from "@/app/models/Submission";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.isTeacher) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const submissions = await Submission.find().sort({ submittedAt: -1 });

  return NextResponse.json({ submissions });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.isTeacher) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const url = new URL(req.url);
  const id = url.searchParams.get("id"); // xóa từng submission theo id
  const taskId = url.searchParams.get("taskId"); // xóa tất cả submission của task

  if (id) {
    // Xóa 1 bài nộp theo id
    await Submission.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted submission" });
  } else if (taskId) {
    // Xóa tất cả bài nộp của 1 task
    await Submission.deleteMany({ taskId });
    return NextResponse.json({ message: "Deleted all submissions for task" });
  } else {
    return NextResponse.json(
      { message: "Missing id or taskId" },
      { status: 400 }
    );
  }
}
