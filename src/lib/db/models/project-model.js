import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  techStack: {
    type: [String],
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

export { Project };
