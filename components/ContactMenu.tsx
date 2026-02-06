'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

export default function ContactMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.button
                        key="contact-btn"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsOpen(true)}
                        className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold tracking-wide hover:opacity-90 transition-opacity"
                    >
                        Me contacter
                    </motion.button>
                ) : (
                    <div className="flex gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: 0.1 }}
                        >
                            <a
                                href="https://www.linkedin.com/in/maximeaitadda/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-black text-white shadow-lg hover:scale-110 transition-transform"
                                title="LinkedIn"
                            >
                                <FaLinkedinIn size={24} />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Link
                                href="/contact"
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-zinc-500 to-zinc-800 text-white shadow-lg hover:scale-110 transition-transform"
                                title="Formulaire de contact"
                            >
                                <FaEnvelope size={24} />
                            </Link>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-8 text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white"
                        >
                            Fermer
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
