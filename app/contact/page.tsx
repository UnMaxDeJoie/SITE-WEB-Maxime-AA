'use client';

import { useActionState } from 'react';
import { sendEmail } from '@/actions/contact';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const initialState = {
    message: '',
    success: false,
};

export default function ContactPage() {
    const [state, action, isPending] = useActionState(sendEmail, initialState);

    return (
        <main className="min-h-screen bg-white dark:bg-black selection:bg-zinc-200 dark:selection:bg-zinc-800">
            <Navbar />
            <AnimatedBackground />

            <div className="pt-32 pb-20 px-6 container mx-auto flex items-center justify-center min-h-[80vh]">
                <div className="w-full max-w-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-white">
                        Me contacter
                    </h1>

                    {state?.success ? (
                        <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-900">
                            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">Message envoyé !</h3>
                            <p className="text-zinc-600 dark:text-zinc-300">
                                Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                            </p>
                        </div>
                    ) : (
                        <form action={action} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                                    Votre adresse Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="exemple@email.com"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                                    Objet
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    placeholder="Sujet de votre message"
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder="Votre message..."
                                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            {state?.message && !state.success && (
                                <p className="text-red-500 text-sm text-center">{state.message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className={`w-full py-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] ${isPending
                                    ? 'bg-zinc-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
                                    }`}
                            >
                                {isPending ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
