import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/models/Task";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = (await getServerSession(authOptions)) as {
    user?: { isTeacher?: boolean; id?: string };
  } | null;

  if (!session?.user?.isTeacher) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { title, content, deadline } = await req.json();

  const newTask = await Task.create({
    title,
    content,
    deadline,
    teacherId: session.user.id,
    createdBy: session.user.id,
  });

  return NextResponse.json({ message: "Task created", task: newTask });
}

export async function GET() {
  await connectDB();
  const tasks = await Task.find().sort({ deadline: -1 });
  return NextResponse.json({ tasks });
}
