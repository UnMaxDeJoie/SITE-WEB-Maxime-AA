'use server';

import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

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
            title: formData.get('title') as string,
            shortDescription: formData.get('shortDescription') as string,
            imageUrl: formData.get('imageUrl') as string,
            category: formData.get('category') as string,
            linkType: formData.get('linkType') as string,
            externalLink: formData.get('externalLink') as string,
            slug: formData.get('slug') as string,
            longDescription: formData.get('longDescription') as string,
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
            title: formData.get('title') as string,
            shortDescription: formData.get('shortDescription') as string,
            imageUrl: formData.get('imageUrl') as string,
            category: formData.get('category') as string,
            linkType: formData.get('linkType') as string,
            externalLink: formData.get('externalLink') as string,
            slug: formData.get('slug') as string,
            longDescription: formData.get('longDescription') as string,
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
    }
}
