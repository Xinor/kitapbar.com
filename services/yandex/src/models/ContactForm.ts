import mongoose from 'mongoose';

interface IContactForm {
  userId: mongoose.ObjectId;
  email: string;
  title: string;
  message: string;
  createdAt: Date;
}

const ContactFormSchema = new mongoose.Schema<IContactForm>({
  userId: mongoose.Schema.Types.ObjectId,
  email: String,
  title: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
}, {
  collection: 'contactforms',
  timestamps: false
});

export const ContactForm = mongoose.model<IContactForm>('ContactForm', ContactFormSchema);
