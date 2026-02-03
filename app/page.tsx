import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 pb-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* Column 1: Photo (Left on Desktop, Top on Mobile) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start order-1">
              <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
                {/* Aesthetic Image Container with subtle border/shadow */}
                <div className="absolute inset-0 rounded-3xl rotate-3 bg-zinc-100 dark:bg-zinc-800 -z-10 transition-transform duration-500 hover:rotate-6"></div>
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80"
                    alt="Maxime AIT ADDA"
                    className="h-full w-full object-cover"
                  />
                  {/* Note: Replace src with "/images/maxime.jpg" when you have the file */}
                </div>
              </div>
            </div>

            {/* Column 2: Text (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 order-2">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
                Product & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-white">
                  Growth Manager
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-zinc-500 dark:text-zinc-400 tracking-widest uppercase">
                Maxime AIT ADDA
              </h2>
              <div className="pt-8">
                <button className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold tracking-wide hover:opacity-90 transition-opacity">
                  Contact Me
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
