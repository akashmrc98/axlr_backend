import bcrypt from "bcrypt";
import mongoose from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<User>("save", async function (next) {
  // Hash password before saving to the database
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<User>("User", UserSchema);

export default UserModel;
