'use client';

import { useActionState } from 'react';

export default function ProjectForm({
    action,
    initialData = {}
}: {
    action: any;
    initialData?: any;
}) {
    return (
        <form action={action} className="space-y-6 max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Titre du projet</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={initialData.title}
                        required
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Description courte</label>
                    <textarea
                        name="shortDescription"
                        defaultValue={initialData.shortDescription}
                        required
                        rows={3}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">URL de limage</label>
                    <input
                        type="url"
                        name="imageUrl"
                        defaultValue={initialData.imageUrl}
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Catégorie</label>
                    <select
                        name="category"
                        defaultValue={initialData.category || 'tester'}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="tester">À tester</option>
                        <option value="voir">À voir</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Type de lien</label>
                    <select
                        name="linkType"
                        defaultValue={initialData.linkType || 'external'}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="external">Externe</option>
                        <option value="internal">Interne</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Lien externe / Projet</label>
                    <input
                        type="text"
                        name="externalLink"
                        defaultValue={initialData.externalLink}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://..."
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Slug (URL)</label>
                    <input
                        type="text"
                        name="slug"
                        defaultValue={initialData.slug}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="mon-super-projet"
                    />
                    <p className="text-xs text-zinc-500 mt-1">Laissez vide ou unique. Requis pour les liens internes.</p>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Description longue</label>
                    <textarea
                        name="longDescription"
                        defaultValue={initialData.longDescription}
                        rows={6}
                        className="w-full rounded-lg border-zinc-400 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    );
}
