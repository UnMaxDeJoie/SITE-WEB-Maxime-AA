import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProjectList from '@/components/ProjectList';

export const dynamic = 'force-dynamic';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <Navbar />
            <AnimatedBackground />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Mes Projets
                    </h1>
                </div>

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="text-zinc-500 animate-pulse">Chargement des projets...</p>
                    </div>
                }>
                    <ProjectList />
                </Suspense>
            </div>

            <Footer />
        </main>
    );
}
