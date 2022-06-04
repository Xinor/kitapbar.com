import mongoose from 'mongoose';

interface IDownload {
  bookId: mongoose.ObjectId;
  userId: mongoose.ObjectId;
  createdAt: Date;
}

const DownloadSchema = new mongoose.Schema<IDownload>({
  bookId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'downloads',
  timestamps: false
});

export const Download = mongoose.model<IDownload>('Download', DownloadSchema);
