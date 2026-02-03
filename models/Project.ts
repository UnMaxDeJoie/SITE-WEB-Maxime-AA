import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    imageUrl: string;
    projectLink: string;
}

const ProjectSchema: Schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title for this project.'],
        maxlength: [60, 'Title cannot be more than 60 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this project.'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide an image URL for this project.'],
    },
    projectLink: {
        type: String,
        required: [true, 'Please provide a link for this project.'],
    },
}, { timestamps: true });

// Check if the model is already compiled in the Mongoose instance
// to prevent OverwriteModelError during hot reloading in development.
const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
