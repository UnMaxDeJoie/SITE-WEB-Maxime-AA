import ProjectForm from '../../_components/ProjectForm';
import { updateProject } from '@/actions/project';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProject(id: string) {
    try {
        await dbConnect();
        const project = await Project.findById(id).lean();
        if (!project) return null;
        return {
            ...project,
            _id: project._id.toString(),
            createdAt: project.createdAt?.toString(),
            updatedAt: project.updatedAt?.toString(),
        };
    } catch (e) {
        return null;
    }
}

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    const updateAction = updateProject.bind(null, id);

    return (
        <div>
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-blue-500 flex items-center gap-2 mb-4 transition-colors">
                    <FaArrowLeft /> Retour au tableau de bord
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Modifier le projet</h1>
            </div>

        <// @ts - ignore - Server Action binding typing issue
    ProjectForm
    action = { updateAction }
    initialData = { project }
        />
        </div >
    );
}
