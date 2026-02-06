import Link from 'next/link';
import Image from 'next/image';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

interface ProjectCardProps {
    title: string;
    shortDescription: string;
    imageUrl: string;
    category: 'tester' | 'voir';
    linkType: 'external' | 'internal';
    externalLink?: string;
    slug?: string;
}

export default function ProjectCard({
    title,
    shortDescription,
    imageUrl,
    linkType,
    externalLink,
    slug,
}: ProjectCardProps) {
    const href = linkType === 'internal' && slug ? `/projects/${slug}` : (externalLink || '#');
    const target = linkType === 'external' ? '_blank' : '_self';

    return (
        <Link
            href={href}
            target={target}
            rel={linkType === 'external' ? "noopener noreferrer" : undefined}
            className="group block h-full w-[260px] md:w-[320px] flex-none snap-center"
        >
            <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1">

                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


                    <div className="absolute top-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="rounded-full bg-white p-2 text-black shadow-lg">
                            {linkType === 'external' ? <FaExternalLinkAlt size={14} /> : <FaArrowRight size={14} />}
                        </div>
                    </div>
                </div>


                <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {shortDescription}
                    </p>
                </div>
            </div>
        </Link>
    );
}
