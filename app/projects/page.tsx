import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export const revalidate = 60;

async function getProjects() {
    try {
        const projects = await Project.find({})
            .select('title shortDescription imageUrl category linkType externalLink slug createdAt')
            .sort({ createdAt: -1 })
            .lean();

        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("Error fetching projects in production:", error);
        return [];
    }
}

export default async function ProjectsPage() {
    const allProjects = await getProjects();

    const projectsToTest = allProjects.filter((p: any) => p.category === 'tester');
    const projectsToSee = allProjects.filter((p: any) => p.category === 'voir');

    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <AnimatedBackground />
            <div className="pt-24 pb-20 px-6 container mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-zinc-900 dark:text-white tracking-tighter">
                    Tous mes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Projets</span>
                </h1>


                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-200 flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        Projets à tester
                    </h2>

                    {projectsToTest.length > 0 ? (
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-10 -mx-6 px-6 scrollbar-hide">
                            {projectsToTest.map((project: any) => (
                                <ProjectCard
                                    key={String(project._id)}
                                    title={project.title}
                                    shortDescription={project.shortDescription || project.description}
                                    imageUrl={project.imageUrl}
                                    category={project.category}
                                    linkType={project.linkType || 'external'}
                                    externalLink={project.externalLink || project.projectLink}
                                    slug={project.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-500 italic">Aucun projet à tester pour le moment.</p>
                    )}
                </section>


                <section>
                    <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-200 flex items-center gap-3">
                        <span className="w-8 h-1 bg-purple-600 rounded-full"></span>
                        Projets à voir
                    </h2>

                    {projectsToSee.length > 0 ? (
                        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-10 -mx-6 px-6 scrollbar-hide">
                            {projectsToSee.map((project: any) => (
                                <ProjectCard
                                    key={String(project._id)}
                                    title={project.title}
                                    shortDescription={project.shortDescription || project.description}
                                    imageUrl={project.imageUrl}
                                    category={project.category}
                                    linkType={project.linkType || 'external'}
                                    externalLink={project.externalLink || project.projectLink}
                                    slug={project.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-zinc-500 italic">Aucun projet à voir pour le moment.</p>
                    )}
                </section>
            </div>

            <Footer />
        </main>
    );
}
