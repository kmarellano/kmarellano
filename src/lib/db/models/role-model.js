import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  isPromotion: {
    type: Boolean,
    default: false,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  deletedAt: { type: Date, default: null },
});

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export { Role };
