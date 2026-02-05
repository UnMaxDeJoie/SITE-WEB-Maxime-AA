import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const revalidate = 60; // Revalidate every minute
// export const dynamic = 'force-dynamic';

async function getProject(slug: string) {
    await dbConnect();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return null;

    return {
        ...project,
        _id: project._id.toString(),
        createdAt: project.createdAt?.toString(),
        updatedAt: project.updatedAt?.toString(),
    };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project: any = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">


            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />


                <div className="absolute top-24 left-6 md:left-12 z-10">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full"
                    >
                        <FaArrowLeft /> Retour aux projets
                    </Link>
                </div>


                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <div className="container mx-auto">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 rounded-full">
                            {project.category}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-4">
                            {project.title}
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-2xl">
                            {project.shortDescription}
                        </p>
                    </div>
                </div>
            </div>


            <section className="py-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert prose-zinc mx-auto">

                        {project.longDescription ? (
                            project.longDescription.split('\n').map((paragraph: string, index: number) => (
                                <p key={index} className="mb-6 text-zinc-700 dark:text-zinc-300 leading-loose">
                                    {paragraph}
                                </p>
                            ))
                        ) : (
                            <p className="text-zinc-500 italic">Aucune description détaillée disponible pour ce projet.</p>
                        )}
                    </div>


                    {project.externalLink && (
                        <div className="mt-16 text-center">
                            <a
                                href={project.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
                            >
                                Voir le projet en live
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
