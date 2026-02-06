import React from 'react';
import Image from 'next/image';

const BRANDS = [
    { name: 'Azureva', logo: '/images/azureva logo.png' },
    { name: 'Habitat', logo: '/images/habitat logo.png' },
    { name: 'Au Bureau', logo: '/images/au bureau logo.png' },
    { name: 'Hetic', logo: '/images/hetic logo.png' },
    { name: 'Posse studio', logo: '/images/Posse studio logo.png' },
    { name: 'Inshallah', logo: '/images/insh logo jaune sans fond.png' },
    { name: 'Dygest', logo: '/images/dygest logo bleu sans fond.png' },
];

export default function BrandSlider() {
    return (
        <section className="py-10 bg-white dark:bg-black overflow-hidden">
            <div className="container mx-auto px-4 mb-6">
                <h3 className="text-center text-sm font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest">
                    Ils m'ont fait confiance
                </h3>
            </div>

            <div className="relative flex w-full overflow-hidden mask-linear-fade">
                {/* Gradient Masks for smooth fade effect at edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>

                <div className="flex animate-scroll whitespace-nowrap py-4">
                    {/* First set of brands */}
                    <div className="flex items-center space-x-12 md:space-x-24 mx-6 md:mx-12">
                        {BRANDS.map((brand, index) => (
                            <div
                                key={`brand-1-${index}`}
                                className="flex items-center justify-center p-2"
                            >
                                <div className="relative h-12 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Second set of brands (duplicate for seamless loop) */}
                    <div className="flex items-center space-x-12 md:space-x-24 mx-6 md:mx-12">
                        {BRANDS.map((brand, index) => (
                            <div
                                key={`brand-2-${index}`}
                                className="flex items-center justify-center p-2"
                            >
                                <div className="relative h-12 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Third set of brands (extra safety for wide screens) */}
                    <div className="flex items-center space-x-12 md:space-x-24 mx-6 md:mx-12">
                        {BRANDS.map((brand, index) => (
                            <div
                                key={`brand-3-${index}`}
                                className="flex items-center justify-center p-2"
                            >
                                <div className="relative h-12 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
