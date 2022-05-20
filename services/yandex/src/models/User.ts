import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  hash: string;
  registerAt: Date;
}
const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  registerAt: { type: Date, default: Date.now },
}, { collection: 'users' });
export const User = mongoose.model<IUser>('User', UserSchema);
