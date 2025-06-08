import { Schema, Document, models, model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

export default models.User || model<IUser>("User", UserSchema);
