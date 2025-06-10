import { Schema, models, model, Types } from "mongoose";

const SubmissionSchema = new Schema({
  studentId: { type: Types.ObjectId, ref: "User", required: true }, // ID người nộp bài
  studentName: { type: String, required: true },
  taskId: { type: String, required: true }, // thêm vào Schema nếu chưa có

  taskTitle: { type: String, required: true },
  fileUrl: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const Submission =
  models.Submission || model("Submission", SubmissionSchema);
