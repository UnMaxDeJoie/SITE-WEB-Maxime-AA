'use client';

import ProjectForm from '../_components/ProjectForm';
import { createProject } from '@/actions/project';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useActionState } from 'react';

export default function CreateProjectPage() {
    // using useActionState (new useFormState) for error handling if we wanted
    // passing action directly for now as simple implementation
    const [state, action] = useActionState(createProject, null);

    return (
        <div>
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-blue-500 flex items-center gap-2 mb-4 transition-colors">
                    <FaArrowLeft /> Retour au tableau de bord
                </Link>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Créer un nouveau projet</h1>
            </div>

            {state?.error && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                    {state.error}
                </div>
            )}

            <ProjectForm action={action} />
        </div>
    );
}
