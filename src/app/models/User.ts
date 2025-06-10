import { Schema, Document, models, model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isTeacher: boolean;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isTeacher: { type: Boolean, default: false }, // <-- Thêm dòng này
});

export default models.User || model<IUser>("User", UserSchema);
