'use client';

import dynamic from 'next/dynamic';

const AstroCosmo = dynamic(() => import('@/components/AstroCosmo'), {
    ssr: false,
    loading: () => (
        <div
            className="flex items-center justify-center rounded-2xl"
            style={{
                width: '100%',
                maxWidth: 600,
                height: 400,
                background: '#0a0a1a',
                border: '2px solid #1e3a5f',
                color: '#4af',
                fontFamily: '"Courier New", monospace',
                fontSize: 18,
                letterSpacing: '0.1em',
            }}
        >
            Chargement…
        </div>
    ),
});

export default function AstroSection() {
    return <AstroCosmo />;
}
