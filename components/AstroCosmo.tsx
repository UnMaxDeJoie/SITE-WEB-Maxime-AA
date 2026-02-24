'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 600;
const H = 400;
const GROUND_Y = H - 60;         // top of the ground line
const ASTRO_X = 80;
const ASTRO_W = 44;
const ASTRO_H = 44;
const GRAVITY = 0.6;
const JUMP_VY = -13;
const OBSTACLE_SPEED_INIT = 4;
const OBSTACLE_SPEED_MAX = 10;
const SPEED_INCREASE = 0.0005;   // per frame

// Star layers: [count, speed_multiplier, radius]
const STAR_LAYERS: [number, number, number][] = [
    [60, 0.3, 1],
    [40, 0.6, 1.5],
    [20, 1.0, 2],
];

type GameState = 'idle' | 'playing' | 'gameover';

interface Star { x: number; y: number; r: number; speed: number }
interface Obstacle {
    x: number;
    y: number;
    w: number;
    h: number;
    type: 'meteor' | 'rocket';
    emoji: string;
}

function createStars(): Star[] {
    const stars: Star[] = [];
    STAR_LAYERS.forEach(([count, spd, r]) => {
        for (let i = 0; i < count; i++) {
            stars.push({ x: Math.random() * W, y: Math.random() * H, r, speed: spd });
        }
    });
    return stars;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AstroCosmo() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Game state lives in refs so raf callback always sees latest values
    const stateRef = useRef<GameState>('idle');
    const [displayState, setDisplayState] = useState<GameState>('idle');
    const [displayScore, setDisplayScore] = useState(0);

    const rafRef = useRef<number>(0);
    const scoreRef = useRef(0);
    const speedRef = useRef(OBSTACLE_SPEED_INIT);

    // Astronaut physics
    const astroY = useRef(GROUND_Y - ASTRO_H);
    const astroVY = useRef(0);
    const onGround = useRef(true);

    // Obstacles
    const obstacles = useRef<Obstacle[]>([]);
    const nextObstacleIn = useRef(80); // frames until next obstacle

    // Stars
    const stars = useRef<Star[]>(createStars());

    // Audio
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Emoji images (drawn via fillText – no external assets)
    // We'll draw via canvas fillText with a large font

    // ─── Jump ──────────────────────────────────────────────────────────────────
    const jump = useCallback(() => {
        if (stateRef.current === 'playing' && onGround.current) {
            astroVY.current = JUMP_VY;
            onGround.current = false;
        }
    }, []);

    // ─── Start Game ────────────────────────────────────────────────────────────
    const startGame = useCallback(() => {
        // Reset state
        scoreRef.current = 0;
        speedRef.current = OBSTACLE_SPEED_INIT;
        astroY.current = GROUND_Y - ASTRO_H;
        astroVY.current = 0;
        onGround.current = true;
        obstacles.current = [];
        nextObstacleIn.current = 80;
        stars.current = createStars();
        setDisplayScore(0);

        // Audio
        if (!audioRef.current) {
            audioRef.current = new Audio('/musiques/Game space musique.m4a');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => { });

        stateRef.current = 'playing';
        setDisplayState('playing');
    }, []);

    // ─── Stop Audio ────────────────────────────────────────────────────────────
    const stopAudio = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    const goToMenu = useCallback(() => {
        stopAudio();
        stateRef.current = 'idle';
        setDisplayState('idle');
    }, [stopAudio]);

    const restart = useCallback(() => {
        stopAudio();
        startGame();
    }, [stopAudio, startGame]);

    // ─── Spawn obstacle ────────────────────────────────────────────────────────
    function spawnObstacle() {
        const isRocket = Math.random() < 0.4;
        if (isRocket) {
            // Rocket: airborne at ~150px from ground
            const h = 36;
            const w = 36;
            obstacles.current.push({
                x: W + 10,
                y: GROUND_Y - ASTRO_H - h - 60 - Math.random() * 30,
                w, h,
                type: 'rocket',
                emoji: '🚀',
            });
        } else {
            // Meteor: on the ground
            const size = 32 + Math.random() * 12;
            obstacles.current.push({
                x: W + 10,
                y: GROUND_Y - size,
                w: size, h: size,
                type: 'meteor',
                emoji: '☄️',
            });
        }
    }

    // ─── Game Loop ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function drawEmoji(emoji: string, x: number, y: number, size: number) {
            ctx!.font = `${size}px serif`;
            ctx!.textBaseline = 'top';
            ctx!.fillText(emoji, x, y);
        }

        function drawScene() {
            if (!ctx) return;
            const state = stateRef.current;

            // ── Background ──
            ctx.fillStyle = '#0a0a1a';
            ctx.fillRect(0, 0, W, H);

            // ── Stars parallax ──
            ctx.fillStyle = '#ffffff';
            for (const star of stars.current) {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── Ground ──
            const grad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
            grad.addColorStop(0, '#1a2a4a');
            grad.addColorStop(1, '#0a0a1a');
            ctx.fillStyle = grad;
            ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);

            // Ground line glow
            ctx.strokeStyle = '#4af';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#4af';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(W, GROUND_Y);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // ── Astronaut ──
            drawEmoji('👨‍🚀', ASTRO_X, astroY.current, ASTRO_W);

            // ── Obstacles ──
            for (const obs of obstacles.current) {
                drawEmoji(obs.emoji, obs.x, obs.y, obs.w);
            }

            // ── Score (during play) ──
            if (state === 'playing') {
                ctx.font = 'bold 20px "Courier New", monospace';
                ctx.fillStyle = '#4af';
                ctx.textBaseline = 'top';
                ctx.shadowColor = '#4af';
                ctx.shadowBlur = 6;
                ctx.fillText(`SCORE: ${scoreRef.current}`, W - 160, 16);
                ctx.shadowBlur = 0;
            }
        }

        function drawIdleScreen() {
            if (!ctx) return;
            drawScene();

            // Title background
            const titleBg = ctx.createLinearGradient(0, 0, W, 0);
            titleBg.addColorStop(0, 'rgba(0,30,60,0)');
            titleBg.addColorStop(0.5, 'rgba(0,30,60,0.6)');
            titleBg.addColorStop(1, 'rgba(0,30,60,0)');
            ctx.fillStyle = titleBg;
            ctx.fillRect(0, 60, W, 120);

            // ASTRO COSMO title
            ctx.font = 'bold 56px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#0ff';
            ctx.shadowBlur = 20;
            ctx.fillStyle = '#0ff';
            ctx.fillText('ASTRO', W / 2, 100);
            ctx.fillStyle = '#4af';
            ctx.shadowColor = '#4af';
            ctx.fillText('COSMO', W / 2, 155);
            ctx.shadowBlur = 0;

            // Subtitle
            ctx.font = '14px "Courier New", monospace';
            ctx.fillStyle = '#8af';
            ctx.fillText('ESPACE • INFINI • DANGER', W / 2, 195);

            // Pulsing space bar hint
            const pulse = 0.6 + 0.4 * Math.sin(Date.now() / 400);
            ctx.font = `bold 16px "Courier New", monospace`;
            ctx.fillStyle = `rgba(100,200,255,${pulse})`;
            ctx.fillText('▼ Cliquer sur JOUER pour commencer ▼', W / 2, 350);

            ctx.textAlign = 'left';
        }

        function drawGameOverScreen() {
            if (!ctx) return;
            drawScene();

            // Overlay
            ctx.fillStyle = 'rgba(0,0,20,0.75)';
            ctx.fillRect(0, 0, W, H);

            // GAME OVER
            ctx.font = 'bold 64px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = '#f44';
            ctx.shadowBlur = 25;
            ctx.fillStyle = '#f55';
            ctx.fillText('GAME OVER', W / 2, 130);
            ctx.shadowBlur = 0;

            // Score
            ctx.font = 'bold 24px "Courier New", monospace';
            ctx.fillStyle = '#4af';
            ctx.shadowColor = '#4af';
            ctx.shadowBlur = 8;
            ctx.fillText(`SCORE : ${scoreRef.current}`, W / 2, 195);
            ctx.shadowBlur = 0;

            ctx.textAlign = 'left';
        }

        // Idle animation loop (stars move even on idle/gameover screens)
        let idleRaf: number;
        function idleLoop() {
            // Move stars slowly
            for (const star of stars.current) {
                star.x -= star.speed * 0.5;
                if (star.x < 0) star.x = W;
            }
            if (stateRef.current === 'idle') {
                drawIdleScreen();
                idleRaf = requestAnimationFrame(idleLoop);
            } else if (stateRef.current === 'gameover') {
                drawGameOverScreen();
                idleRaf = requestAnimationFrame(idleLoop);
            }
        }

        // Game loop
        function gameLoop() {
            if (stateRef.current !== 'playing') return;

            // ── Move stars ──
            for (const star of stars.current) {
                star.x -= star.speed * speedRef.current * 0.3;
                if (star.x < 0) star.x = W;
            }

            // ── Score & speed ──
            scoreRef.current += 1;
            speedRef.current = Math.min(
                OBSTACLE_SPEED_MAX,
                OBSTACLE_SPEED_INIT + scoreRef.current * SPEED_INCREASE
            );

            // Sync display score every 5 frames for perf
            if (scoreRef.current % 5 === 0) {
                setDisplayScore(scoreRef.current);
            }

            // ── Astronaut physics ──
            astroVY.current += GRAVITY;
            astroY.current += astroVY.current;
            if (astroY.current >= GROUND_Y - ASTRO_H) {
                astroY.current = GROUND_Y - ASTRO_H;
                astroVY.current = 0;
                onGround.current = true;
            }

            // ── Spawn obstacles ──
            nextObstacleIn.current -= 1;
            if (nextObstacleIn.current <= 0) {
                spawnObstacle();
                nextObstacleIn.current = 60 + Math.floor(Math.random() * 60);
            }

            // ── Move obstacles ──
            obstacles.current = obstacles.current.filter(o => o.x + o.w > 0);
            for (const obs of obstacles.current) {
                obs.x -= speedRef.current;
            }

            // ── Collision detection (AABB with tolerance) ──
            const margin = 10;
            const ax = ASTRO_X + margin;
            const ay = astroY.current + margin;
            const aw = ASTRO_W - margin * 2;
            const ah = ASTRO_H - margin * 2;

            for (const obs of obstacles.current) {
                const ox = obs.x + margin;
                const oy = obs.y + margin;
                const ow = obs.w - margin * 2;
                const oh = obs.h - margin * 2;

                if (ax < ox + ow && ax + aw > ox && ay < oy + oh && ay + ah > oy) {
                    // Collision!
                    stopAudio();
                    stateRef.current = 'gameover';
                    setDisplayState('gameover');
                    setDisplayScore(scoreRef.current);
                    drawGameOverScreen();
                    idleRaf = requestAnimationFrame(idleLoop);
                    return;
                }
            }

            // ── Draw ──
            drawScene();

            rafRef.current = requestAnimationFrame(gameLoop);
        }

        // Start the right loop based on current state
        if (stateRef.current === 'playing') {
            rafRef.current = requestAnimationFrame(gameLoop);
        } else {
            idleRaf = requestAnimationFrame(idleLoop);
        }

        return () => {
            cancelAnimationFrame(rafRef.current);
            cancelAnimationFrame(idleRaf);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayState, stopAudio]);

    // ─── Keyboard / pointer controls ──────────────────────────────────────────
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [jump]);

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div className="flex flex-col items-center gap-6">
            {/* Game canvas */}
            <div
                className="relative"
                style={{
                    width: '100%',
                    maxWidth: W,
                    aspectRatio: `${W}/${H}`,
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={W}
                    height={H}
                    onClick={displayState === 'playing' ? jump : undefined}
                    className="w-full h-full rounded-2xl border-2"
                    style={{
                        borderColor: '#1e3a5f',
                        boxShadow: '0 0 30px rgba(0,150,255,0.25), 0 0 60px rgba(0,80,200,0.1)',
                        cursor: displayState === 'playing' ? 'pointer' : 'default',
                    }}
                />

                {/* ── Idle overlay: Play button ── */}
                {displayState === 'idle' && (
                    <div className="absolute inset-0 flex items-end justify-center pb-14 pointer-events-none">
                        <button
                            className="pointer-events-auto px-10 py-3 rounded-full font-bold text-lg tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={startGame}
                            style={{
                                background: 'linear-gradient(135deg, #0af, #06f)',
                                color: '#fff',
                                boxShadow: '0 0 20px rgba(0,150,255,0.6)',
                                fontFamily: '"Courier New", monospace',
                                letterSpacing: '0.2em',
                            }}
                        >
                            ▶ Jouer
                        </button>
                    </div>
                )}

                {/* ── Game Over overlay: buttons ── */}
                {displayState === 'gameover' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 gap-3 pointer-events-none">
                        <button
                            className="pointer-events-auto px-8 py-3 rounded-full font-bold text-base tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={restart}
                            style={{
                                background: 'linear-gradient(135deg, #0af, #06f)',
                                color: '#fff',
                                boxShadow: '0 0 16px rgba(0,150,255,0.5)',
                                fontFamily: '"Courier New", monospace',
                                letterSpacing: '0.15em',
                            }}
                        >
                            ↺ Recommencer
                        </button>
                        <button
                            className="pointer-events-auto px-8 py-2.5 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={goToMenu}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(100,200,255,0.3)',
                                color: '#8af',
                                fontFamily: '"Courier New", monospace',
                                letterSpacing: '0.15em',
                            }}
                        >
                            ← Retour au Menu
                        </button>
                    </div>
                )}
            </div>

            {/* Controls hint */}
            {displayState === 'playing' && (
                <p
                    className="text-sm"
                    style={{ color: '#4a8fc0', fontFamily: '"Courier New", monospace' }}
                >
                    [ESPACE] ou [CLIC] → Sauter
                </p>
            )}
        </div>
    );
}
