import mongoose from 'mongoose';

const certSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  image: {
    type: String,
    default: '/placeholder.svg',
  },
  deletedAt: { type: Date, default: null },
});

const Certification =
  mongoose.models.Certification || mongoose.model('Certification', certSchema);

export { Certification };
