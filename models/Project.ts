import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    shortDescription: string;
    imageUrl: string;
    category: 'tester' | 'voir';
    linkType: 'external' | 'internal';
    externalLink?: string;
    slug?: string;
    longDescription?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this project.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    shortDescription: {
        type: String,
        required: [true, 'Please provide a short description for this project.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL for this project.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category.'],
        enum: ['tester', 'voir'],
    },
    linkType: {
        type: String,
        required: [true, 'Please provide a link type.'],
        enum: ['external', 'internal'],
    },
    externalLink: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
    },
    longDescription: {
        type: String,
    },
}, { timestamps: true });


const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
