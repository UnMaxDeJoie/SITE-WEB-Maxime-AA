'use server';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

// Middleware should protect routes, but good to check session here too for mutations
async function checkAuth() {
    const session = await getSession();
    if (!session) {
        throw new Error('Non autorisé');
    }
}

export async function createProject(prevState: any, formData: FormData) {
    await checkAuth();

    try {
        const projectData = {
            title: formData.get('title'),
            shortDescription: formData.get('shortDescription'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            linkType: formData.get('linkType'),
            externalLink: formData.get('externalLink'),
            slug: formData.get('slug'),
            longDescription: formData.get('longDescription'),
        };

        await dbConnect();
        await Project.create(projectData);
    } catch (error: any) {
        return { error: 'Erreur lors de la création: ' + error.message };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/dashboard');
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    await checkAuth();

    try {
        const projectData = {
            title: formData.get('title'),
            shortDescription: formData.get('shortDescription'),
            imageUrl: formData.get('imageUrl'),
            category: formData.get('category'),
            linkType: formData.get('linkType'),
            externalLink: formData.get('externalLink'),
            slug: formData.get('slug'),
            longDescription: formData.get('longDescription'),
        };

        await dbConnect();
        await Project.findByIdAndUpdate(id, projectData);
    } catch (error: any) {
        return { error: 'Erreur lors de la modification: ' + error.message };
    }

    revalidatePath('/dashboard');
    revalidatePath('/projects');
    redirect('/dashboard');
}

export async function deleteProject(id: string) {
    await checkAuth();

    try {
        await dbConnect();
        await Project.findByIdAndDelete(id);
        revalidatePath('/dashboard');
        revalidatePath('/projects');
    } catch (error: any) {
        console.error('Failed to delete project:', error);
        // Ideally we'd return an error state, but for a simple delete button action we might just log
    }
}
