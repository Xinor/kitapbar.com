import mongoose from 'mongoose';

interface IDisk {
  public_url: string;
  public_key: string;
  name: string;
  created: Date;
  modified: Date;
  owner: string;
  createdAt: Date;
  lastCheck: Date | null;
  lastScan: Date | null;
}

const DiskSchema = new mongoose.Schema<IDisk>({
  public_url: {type: String, required: true},
  public_key: {type: String, required: true},
  name: {type: String, required: true},
  created: {type: Date, required: true},
  modified: {type: Date, required: true},
  owner: {type: String, required: true},
  lastCheck: {type: Date, default: null},
  lastScan: {type: Date, default: null}
}, {
  collection: 'disks',
  timestamps: {createdAt: true, updatedAt: false}
});

DiskSchema.index({createdAt: 1});

export const Disk = mongoose.model<IDisk>('Disk', DiskSchema);
