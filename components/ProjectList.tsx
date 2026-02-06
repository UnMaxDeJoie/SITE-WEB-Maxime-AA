import Project from '@/models/Project';
import dbConnect from '@/lib/mongodb';
import ProjectCard from '@/components/ProjectCard';

async function getProjects() {
    try {
        await dbConnect();
        const projects = await Project.find({})
            .select('title shortDescription imageUrl category linkType externalLink slug createdAt')
            .sort({ createdAt: -1 })
            .lean();


        return JSON.parse(JSON.stringify(projects));
    } catch (error) {
        console.error("CRITICAL ERROR FETCHING PROJECTS:", error);
        return [];
    }
}

export default async function ProjectList() {
    const projects = await getProjects();

    if (projects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-zinc-500 text-lg">Aucun projet trouvé pour le moment.</p>
                <p className="text-zinc-400 text-sm mt-2">(Erreur de connexion possible à la base de données)</p>
            </div>
        );
    }

    const voirProjects = projects.filter((p: any) => p.category === 'voir');
    const testerProjects = projects.filter((p: any) => p.category === 'tester');

    return (
        <div className="space-y-24">
            {/* Section Projets à voir */}
            {voirProjects.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-10 text-zinc-800 dark:text-zinc-100 border-l-4 border-blue-500 pl-4">
                        Projets à Voir
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {voirProjects.map((project: any) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </section>
            )}

            {/* Section Projets à tester */}
            {testerProjects.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-10 text-zinc-800 dark:text-zinc-100 border-l-4 border-purple-500 pl-4">
                        Projets à Tester
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testerProjects.map((project: any) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
