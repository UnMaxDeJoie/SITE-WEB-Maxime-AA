import Footer from '@/components/Footer';
import Image from 'next/image';
import AnimatedBackground from '@/components/AnimatedBackground';
import ContactMenu from '@/components/ContactMenu';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">


      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">


            <div className="w-full md:w-1/2 flex justify-center md:justify-start order-1">
              <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">

                <div className="absolute inset-0 rounded-3xl rotate-3 bg-zinc-100 dark:bg-zinc-800 -z-10 transition-transform duration-500 hover:rotate-6"></div>
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src="/images/maxime-aa-pro.png"
                    alt="Maxime AIT ADDA"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  />

                </div>
              </div>
            </div>


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
              <div className="pt-8 w-full md:w-auto flex justify-center md:justify-start">
                <ContactMenu />
              </div>
            </div>

          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}
