'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar({ session }: { session?: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Profil', href: '/' },
        { name: 'Projets', href: '/projects' },
    ];

    if (session) {
        navLinks.push({ name: 'Dashboard', href: '/dashboard' });
    }

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen
                ? 'bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                <Link
                    href="/dashboard"
                    className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
                >
                    Maxime AIT ADDA
                </Link>


                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium tracking-wide transition-colors hover:text-blue-500 dark:hover:text-blue-400 ${pathname === link.href
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-zinc-600 dark:text-zinc-400'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>


                <button
                    className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>


            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 absolute w-full left-0 top-20 shadow-xl">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium p-2 rounded-lg transition-all ${pathname === link.href
                                    ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-blue-400'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
