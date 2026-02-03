import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    projectLink: string;
}

export default function ProjectCard({
    title,
    description,
    imageUrl,
    projectLink,
}: ProjectCardProps) {
    return (
        <Link
            href={projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
        >
            <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Icon overlay that appears on hover */}
                    <div className="absolute top-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="rounded-full bg-white p-2 text-black shadow-lg">
                            <FaExternalLinkAlt size={14} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
