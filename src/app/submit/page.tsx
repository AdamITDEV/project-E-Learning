"use client";

import { useSession } from "next-auth/react";
import CreateAssignment from "../components/CreateAssignment";
import SubmitAssignment from "../components/SubmitAssignment";
import SubmissionsList from "../components/SubmissionsList"; // bạn sẽ tạo ở bước 2

export default function SubmitPage() {
  const { data: session } = useSession();

  if (!session)
    return <p className="text-center mt-10">Vui lòng đăng nhập...</p>;

  const isTeacher = session.user?.isTeacher;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {isTeacher ? (
        <>
          <CreateAssignment />
          <SubmissionsList />
        </>
      ) : (
        <SubmitAssignment />
      )}
    </div>
  );
}
