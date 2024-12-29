import mongoose from 'mongoose';

const techSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    enum: [
      'Frontend',
      'Backend',
      'DevOps',
      'Testing & Quality Assurance',
      'Monitoring & Logging',
      'Language',
    ],
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const Tech = mongoose.models.Tech || mongoose.model('Tech', techSchema);

export { Tech };
