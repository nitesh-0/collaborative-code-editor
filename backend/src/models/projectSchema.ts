import mongoose from "mongoose";
// File Schema
const fileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  content: { type: String, default: '' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
  language: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

// History Schema
const historySchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  changes: { type: String, required: true },
});

const History = mongoose.model('history', historySchema);

// Project Schema
const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  collaborators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
      role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' },
    },
  ],
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
  theme: { type: String, default: 'light' },
  activeUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  socketRoomId: { type: String, required: true },
  version: { type: Number, default: 1 },
  tags: [{ type: String }],
  forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add Indexes for Optimization
projectSchema.index({ projectId: 1 });
projectSchema.index({ ownerId: 1 });
projectSchema.index({ socketRoomId: 1 });

const Project = mongoose.model('project', projectSchema);

export {
  Project,
  File,
  History,
};
