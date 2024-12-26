import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  company: {
    type: String,
    unique: true,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  endDate: Date,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  deletedAt: { type: Date, default: null },
});

const Company =
  mongoose.models.Company || mongoose.model('Company', companySchema);

export { Company };
