import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playConquerorHakiAudio } from './VoiceCommandManager';

interface ConquerorHakiCinematicOverlayProps {
  onComplete: () => void;
}

// ── Realistic Canvas-based Haoshoku Atmospheric Spark & Dust Engine ─────────
const HaoshokuAtmosphericCanvas: React.FC<{ count?: number }> = ({ count = 38 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Muted, cinematic ember color palette (desaturated crimson, warm gold, bone white)
    const emberColors = [
      'rgba(224, 169, 59, ',   // Antique imperial gold
      'rgba(190, 18, 60, ',    // Desaturated deep crimson
      'rgba(254, 243, 199, ',  // Warm bone white
      'rgba(147, 51, 234, ',   // Muted deep violet shadow
    ];

    const particles = Array.from({ length: count }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * 220,
      y: height * 0.5 + (Math.random() - 0.5) * 160,
      vx: (Math.random() - 0.5) * (width * 0.012),
      vy: (Math.random() - 0.5) * (height * 0.012) - Math.random() * 1.6,
      size: Math.random() * 2.4 + 0.8,
      alpha: Math.random() * 0.7 + 0.2,
      color: emberColors[Math.floor(Math.random() * emberColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.007;

        if (p.alpha <= 0) {
          p.x = width * 0.5 + (Math.random() - 0.5) * 260;
          p.y = height * 0.5 + (Math.random() - 0.5) * 180;
          p.vx = (Math.random() - 0.5) * (width * 0.01);
          p.vy = (Math.random() - 0.5) * (height * 0.01) - Math.random() * 1.2;
          p.alpha = Math.random() * 0.75 + 0.2;
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};

export const ConquerorHakiCinematicOverlay: React.FC<ConquerorHakiCinematicOverlayProps> = ({ onComplete }) => {
  const [showImpactFrame, setShowImpactFrame] = useState(true);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    playConquerorHakiAudio();

    // 90ms High-Contrast Impact Frame flash
    const impactTimer = setTimeout(() => {
      setShowImpactFrame(false);
    }, 90);

    const timer = setTimeout(onComplete, prefersReducedMotion ? 2400 : 3400);

    return () => {
      clearTimeout(impactTimer);
      clearTimeout(timer);
    };
  }, [onComplete, prefersReducedMotion]);

  // Procedural Haoshoku Lightning Paths radiating from Center Viewport
  const HAOSHOKU_VEINS = [
    { path: 'M 720,400 Q 640,320 540,360 T 360,240 T 180,140 T 0,80', w: 3.8, delay: 0.18 },
    { path: 'M 720,400 Q 800,300 900,340 T 1100,210 T 1300,120 T 1440,60', w: 3.4, delay: 0.22 },
    { path: 'M 720,400 Q 620,480 500,520 T 320,620 T 140,700 T 0,780', w: 3.2, delay: 0.25 },
    { path: 'M 720,400 Q 840,490 960,560 T 1160,660 T 1340,730 T 1440,790', w: 3.6, delay: 0.28 },
    { path: 'M 720,400 Q 720,240 700,180 T 730,80 T 710,0', w: 3.0, delay: 0.31 },
    { path: 'M 720,400 Q 720,560 740,640 T 710,720 T 730,800', w: 3.0, delay: 0.34 },
    { path: 'M 720,400 Q 560,390 420,410 T 260,390 T 100,420 T 0,400', w: 2.6, delay: 0.36 },
    { path: 'M 720,400 Q 880,410 1020,390 T 1180,410 T 1340,380 T 1440,400', w: 2.6, delay: 0.39 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[999999] overflow-hidden flex items-center justify-center font-sans select-none pointer-events-none"
      style={{ background: '#050308' }}
    >
      {/* ── 90ms High-Contrast Inverted Impact Frame ── */}
      <AnimatePresence>
        {showImpactFrame && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.09 }}
            className="absolute inset-0 z-50 bg-[#fbf9f4] mix-blend-difference"
          />
        )}
      </AnimatePresence>

      {/* ── Subtle Film-Grain & Vignette Texture Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay z-30"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)`,
        }}
      />

      {/* ── PHASE 1: Atmospheric Deep Moody Vignette ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.92, 0.85, 0.75] }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 50%, rgba(38, 6, 24, 0.85) 0%, rgba(10, 2, 8, 0.96) 60%, #030104 100%)',
        }}
      />

      {/* ── PHASE 2: Animated Canvas Particle & Ash Engine ── */}
      <HaoshokuAtmosphericCanvas count={40} />

      {/* ── PHASE 3: Weighted Expanding Haoshoku Energy Shockwave Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 0.12, 0.24].map((d, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full"
            style={{
              border: `${2 - idx * 0.4}px solid rgba(190, 18, 60, ${0.75 - idx * 0.15})`,
              boxShadow:
                '0 0 35px rgba(147, 51, 234, 0.45), inset 0 0 20px rgba(190, 18, 60, 0.35)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{
              width: ['0px', '200vmax'],
              height: ['0px', '200vmax'],
              opacity: [0.9, 0],
            }}
            transition={{
              duration: 1.3,
              delay: 0.18 + d,
              ease: [0.16, 1, 0.3, 1], // Controlled expo-out
            }}
          />
        ))}

        {/* Central Luminous Impact Core */}
        <motion.div
          className="absolute rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(224,169,59,0.7) 30%, rgba(159,18,57,0.4) 65%, transparent 100%)',
            boxShadow:
              '0 0 80px 20px rgba(159,18,57,0.6), 0 0 120px 40px rgba(147,51,234,0.3)',
          }}
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: ['0px', '260px', '60px', '0px'],
            height: ['0px', '260px', '60px', '0px'],
            opacity: [0, 0.95, 0.7, 0],
          }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── PHASE 4: SVG Haoshoku Crimson / Gold Lightning Veins ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="hakiSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {HAOSHOKU_VEINS.map((v, i) => (
          <g key={`vein-${i}`}>
            {/* Outer Deep Muted Violet/Crimson Aura Bloom */}
            <motion.path
              d={v.path}
              fill="none"
              stroke="rgba(147, 51, 234, 0.4)"
              strokeWidth={v.w * 3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'url(#hakiSoftGlow)' }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 0.85, 0.5, 0] }}
              transition={{ duration: 0.65, delay: v.delay, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Mid-Channel Desaturated Crimson */}
            <motion.path
              d={v.path}
              fill="none"
              stroke="rgba(190, 18, 60, 0.85)"
              strokeWidth={v.w * 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 0.95, 0.7, 0] }}
              transition={{ duration: 0.55, delay: v.delay + 0.02, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Warm Incandescent Core Channel */}
            <motion.path
              d={v.path}
              fill="none"
              stroke="rgba(254, 243, 199, 0.95)"
              strokeWidth={v.w * 0.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 1, 0.7, 0] }}
              transition={{ duration: 0.5, delay: v.delay + 0.03, ease: [0.16, 1, 0.3, 1] }}
            />
          </g>
        ))}
      </svg>

      {/* ── PHASE 5: Center Typography & Cinematic Subtext ── */}
      <motion.div
        className="text-center relative z-20 px-4 flex flex-col items-center justify-center"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{
          scale: [0.88, 1.04, 1],
          opacity: [0, 1, 1],
        }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Crown Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0.9], scale: [0.5, 1.15, 1] }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl mb-4"
          style={{ filter: 'drop-shadow(0 0 20px rgba(224,169,59,0.8))' }}
        >
          👑
        </motion.div>

        {/* Japanese Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -12, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.5em' }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs font-mono tracking-[0.5em] uppercase text-rose-300/90 font-bold mb-4 flex items-center justify-center gap-3"
          style={{ textShadow: '0 0 18px rgba(190,18,60,0.8)' }}
        >
          <span className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent to-rose-500/60" />
          <span>覇王色の覇気 · Haoshoku no Haki</span>
          <span className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent to-rose-500/60" />
        </motion.div>

        {/* Main Title: CONQUEROR'S HAKI */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-widest leading-none mb-2"
          style={{
            textShadow:
              '0 0 40px rgba(190,18,60,0.9), 0 0 80px rgba(147,51,234,0.5), 0 0 140px rgba(224,169,59,0.3), 5px 5px 0 rgba(0,0,0,0.98)',
          }}
        >
          CONQUEROR'S
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-widest leading-none mb-5"
          style={{
            color: '#e0a93b',
            textShadow: '0 0 50px rgba(224,169,59,1), 0 0 100px rgba(224,169,59,0.5), 5px 5px 0 rgba(0,0,0,0.98)',
          }}
        >
          HAKI
        </motion.div>

        {/* Decorative divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-64 sm:w-96 h-px bg-gradient-to-r from-transparent via-rose-500/80 to-transparent mx-auto mb-5"
          style={{ boxShadow: '0 0 15px rgba(224,169,59,0.6)' }}
        />

        {/* Cinematic descriptor — no voice instructions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2"
        >
          <div className="font-mono text-[11px] sm:text-xs tracking-[0.35em] uppercase text-op-gold/90 font-bold"
            style={{ textShadow: '0 0 10px rgba(224,169,59,0.5)' }}>
            The King's Will Subdues All
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-op-cream/50 tracking-widest">
            一人の言葉が万物を制す
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ConquerorHakiCinematicOverlay;
