import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Link from 'next/link';
import Image from 'next/image';
import { deleteProject } from '@/actions/project';
import { logout } from '@/lib/auth';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt, FaSignOutAlt } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return projects.map(p => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toString(),
        updatedAt: p.updatedAt?.toString(),
    }));
}

export default async function DashboardPage() {
    const allProjects = await getProjects();
    const projectsToTest = allProjects.filter((p: any) => p.category === 'tester');
    const projectsToSee = allProjects.filter((p: any) => p.category === 'voir');

    return (
        <div>
            <div className="flex items-center justify-between mb-12">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Tableau de bord</h1>
                <div className="flex gap-4">
                    <form action={async () => {
                        'use server';
                        await logout();
                    }}>
                        <button className="flex items-center gap-2 px-6 py-3 border border-red-200 dark:border-red-900 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-colors">
                            <FaSignOutAlt /> Déconnexion
                        </button>
                    </form>
                    <Link
                        href="/dashboard/create"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <FaPlus /> Nouveau Projet
                    </Link>
                </div>
            </div>

            <div className="space-y-16">
                <section>
                    <h2 className="text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-200 flex items-center gap-3">
                        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                        Projets à tester ({projectsToTest.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsToTest.map((project: any) => (
                            <DashboardCard key={project._id} project={project} />
                        ))}
                        {projectsToTest.length === 0 && (
                            <p className="text-zinc-500 italic col-span-full">Aucun projet à tester.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-6 text-zinc-800 dark:text-zinc-200 flex items-center gap-3">
                        <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                        Projets à voir ({projectsToSee.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsToSee.map((project: any) => (
                            <DashboardCard key={project._id} project={project} />
                        ))}
                        {projectsToSee.length === 0 && (
                            <p className="text-zinc-500 italic col-span-full">Aucun projet à voir.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

function DashboardCard({ project }: { project: any }) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-5">
                <h3 className="font-bold text-lg mb-2 truncate text-zinc-900 dark:text-white">{project.title}</h3>
                <p className="text-zinc-500 text-sm line-clamp-2 mb-4 h-10">{project.shortDescription}</p>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                    <a
                        href={project.externalLink || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-blue-500 transition-colors"
                        title="Voir le lien"
                    >
                        <FaExternalLinkAlt />
                    </a>
                    <div className="flex gap-2">
                        <Link
                            href={`/dashboard/edit/${project._id}`}
                            className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            title="Modifier"
                        >
                            <FaEdit />
                        </Link>
                        <form action={deleteProject.bind(null, project._id)}>
                            <button
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Supprimer"
                                type="submit"
                            >
                                <FaTrash />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
