import mongoose from 'mongoose';

interface IBook extends mongoose.Document {
  mediaType: string;
  antivirusStatus: 'clean' | 'unknown';
  size: number;
  mimeType: string;
  fileType: string | null;
  sha256: string;
  md5: string;
  createdAt: Date;
  disks: { name: string, public_key: string, path: string }[]
}

const BookSchema = new mongoose.Schema<IBook>({
  mediaType: { type: String, required: true },
  antivirusStatus: String,
  size: Number,
  mimeType: String,
  fileType: { type: String, default: null },
  sha256: String,
  md5: String,
  disks: [{ name: String, public_key: String, path: String}]
}, {
  collection: 'books',
  timestamps: { createdAt: true, updatedAt: false }
});

BookSchema.index({ 'disks.name': 'text' }, { default_language: 'turkish' });

export const Book = mongoose.model<IBook>('Book', BookSchema);
