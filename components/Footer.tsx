import {
    FaLinkedin,
    FaGithub,
    FaInstagram,
    FaYoutube,
    FaTiktok,
    FaFacebook,
    FaTwitter
} from 'react-icons/fa';

const SOCIAL_LINKS = [
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-[#0077b5]" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub", color: "hover:text-[#333]" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-[#E4405F]" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:text-[#FF0000]" },
    { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok", color: "hover:text-[#ff0050]" },
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-[#1877F2]" },
    { icon: FaTwitter, href: "https://twitter.com", label: "X (Twitter)", color: "hover:text-[#1DA1F2]" },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 mt-20">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-wrap justify-center gap-8">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className={`text-2xl text-zinc-400 transition-all duration-300 transform hover:scale-110 ${social.color}`}
                        >
                            <social.icon />
                        </a>
                    ))}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    © {new Date().getFullYear()} Maxime AIT ADDA. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
