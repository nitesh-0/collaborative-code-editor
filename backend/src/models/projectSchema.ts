import mongoose from "mongoose"

const fileSchema = new mongoose.Schema({
    fileName: { 
        type: String, 
        required: true 
    },
    filePath: { 
        type: String,   
        required: true 
    },
    content: { 
        type: String, 
        default: '' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },

    description: { type: String },

    collaborators: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            role: { type: String, enum: ['owner', 'editor', 'viewer'], default: 'viewer' },
        },
    ],

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },

    visibility: { type: String, enum: ['private', 'public'], default: 'private' },
    
    theme: { type: String, default: 'light' },
    
    files: [fileSchema],
    
    activeUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    
    socketRoomId: { type: String, required: true },
    
    version: { type: Number, default: 1 },

    history: [
        {
          versionId: { type: String },
          timestamp: { type: Date, default: Date.now },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
          changes: { type: String },
        },
    ],
    tags: [{ type: String }],
    forkedFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'project' }
})


export const Project = mongoose.model('project', projectSchema);

