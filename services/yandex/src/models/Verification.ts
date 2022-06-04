import mongoose from "mongoose";

interface IVerification {
  email: string;
  code: string;
  createdAt: Date;
}
const VerificationSchema = new mongoose.Schema<IVerification>({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'verifications', timestamps: false });

export const Verification = mongoose.model<IVerification>('Verification', VerificationSchema);
