export default function AnimatedBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-blob opacity-70" />

            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70" />
        </div>
    );
}
