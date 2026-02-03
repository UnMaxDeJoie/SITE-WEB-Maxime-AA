'use client';

import { useEffect, useState } from 'react';
import ProjectCard from '@/components/ProjectCard';

interface Project {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectLink: string;
}

export default function ProjectsSection() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (data.success) {
                    setProjects(data.data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return (
        <section className="py-20 min-h-screen container mx-auto px-6">
            <div className="mb-16">
                <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Mes Réalisations</h2>
                <div className="h-1 w-20 bg-zinc-900 dark:bg-zinc-100 rounded-full"></div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-2xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            title={project.title}
                            description={project.description}
                            imageUrl={project.imageUrl}
                            projectLink={project.projectLink}
                        />
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-xl text-zinc-500">Aucun projet pour le moment.</p>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
