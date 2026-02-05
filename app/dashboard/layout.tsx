import { logout } from '@/lib/auth';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24">
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
