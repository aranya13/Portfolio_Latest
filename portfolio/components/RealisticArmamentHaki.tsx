import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Zap, Flame } from 'lucide-react';

// =========================================================================
// 1. CINEMATIC LIVE-ACTION WEB AUDIO SYNTHESIZER
// Generates deep physical sub-bass (30-90Hz), acoustic impact rumble,
// and high-frequency metallic quench harmonics without external assets.
// =========================================================================
let audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

export function playRealisticHakiAudio(type: 'activate' | 'koka_impact' | 'pulse' | 'deactivate') {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    if (type === 'activate' || type === 'koka_impact') {
      // 1. Deep Sub-Bass Gravity Sweep (30-80 Hz) - Gives physical weight
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, now);
      subOsc.frequency.exponentialRampToValueAtTime(32, now + 0.55);

      subGain.gain.setValueAtTime(0.8, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 0.65);

      // 2. Metallic Quench & Friction Layer (Low-pass filtered noise/sawtooth)
      const sawOsc = ctx.createOscillator();
      const sawFilter = ctx.createBiquadFilter();
      const sawGain = ctx.createGain();

      sawOsc.type = 'sawtooth';
      sawOsc.frequency.setValueAtTime(160, now);
      sawOsc.frequency.exponentialRampToValueAtTime(45, now + 0.4);

      sawFilter.type = 'lowpass';
      sawFilter.frequency.setValueAtTime(800, now);
      sawFilter.frequency.exponentialRampToValueAtTime(120, now + 0.45);
      sawFilter.Q.value = 4.5; // Resonant metallic peak

      sawGain.gain.setValueAtTime(0.45, now);
      sawGain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

      sawOsc.connect(sawFilter);
      sawFilter.connect(sawGain);
      sawGain.connect(ctx.destination);
      sawOsc.start(now);
      sawOsc.stop(now + 0.48);

      // 3. Subtle High-Frequency Metallic Glint (Tempered Steel Bell)
      const chimeOsc = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(880, now); // A5
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, now + 0.15); // A6
      chimeGain.gain.setValueAtTime(0.12, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc.start(now);
      chimeOsc.stop(now + 0.35);

    } else if (type === 'pulse') {
      // Harmonic resonance pulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.35);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

    } else if (type === 'deactivate') {
      // Soft air release / dissolution
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch (err) {
    console.warn('Realistic Haki Audio synthesis error:', err);
  }
}

// =========================================================================
// 2. REALISTIC 60 FPS CANVAS MICRO-SPARK & EMBER PARTICLE EMITTER
// Renders physical sparks that ignite on hardening and quickly dissipate.
// =========================================================================
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

export const RealisticHakiSparkCanvas: React.FC<{
  active: boolean;
  intensity?: number;
  className?: string;
}> = ({ active, intensity = 28, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const rect = canvas.getBoundingClientRect();
    const width = (canvas.width = rect.width * (window.devicePixelRatio || 1));
    const height = (canvas.height = rect.height * (window.devicePixelRatio || 1));
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const particles: Particle[] = [];
    const colors = [
      'rgba(255, 255, 255, 0.95)', // White hot core
      'rgba(240, 200, 255, 0.9)',  // Violet heat
      'rgba(180, 110, 255, 0.85)', // Deep purple energy
      'rgba(255, 170, 70, 0.8)',   // Golden impact spark
    ];

    // Initialize bursting particles
    for (let i = 0; i < intensity; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.2 + Math.random() * 3.8;
      particles.push({
        x: rect.width / 2 + (Math.random() - 0.5) * (rect.width * 0.7),
        y: rect.height / 2 + (Math.random() - 0.5) * (rect.height * 0.7),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: 0.8 + Math.random() * 1.8,
        alpha: 1.0,
        life: 0,
        maxLife: 20 + Math.random() * 35,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      frame++;

      let aliveCount = 0;
      for (const p of particles) {
        if (p.life < p.maxLife) {
          aliveCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.04; // Gentle gravity
          p.life++;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - (p.life / p.maxLife) * 0.4), 0, Math.PI * 2);
          ctx.fill();

          // Spark trail
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
          ctx.stroke();

          ctx.restore();
        }
      }

      if (aliveCount > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [active, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-30 ${className}`}
    />
  );
};

// =========================================================================
// 3. REALISTIC PHYSICAL SHOCKWAVE / REFRACTION RIPPLE
// Emits a fast, refractive radial pulse when Armament Haki hardens.
// =========================================================================
export const RealisticHakiShockwave: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">
      {/* Primary fast shockwave */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          border: '2px solid rgba(220, 190, 255, 0.75)',
          boxShadow: '0 0 25px rgba(138, 43, 226, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.4)',
        }}
        initial={{ width: '0px', height: '0px', opacity: 0.9, scale: 0.2 }}
        animate={{
          width: ['0px', '280%'],
          height: ['0px', '280%'],
          opacity: [0.95, 0.5, 0],
          scale: [0.2, 1.2],
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Secondary obsidian density wave */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          border: '1px solid rgba(80, 20, 130, 0.4)',
          background: 'radial-gradient(circle, rgba(15, 5, 25, 0.4) 0%, transparent 75%)',
        }}
        initial={{ width: '0px', height: '0px', opacity: 0.8 }}
        animate={{
          width: ['0px', '220%'],
          height: ['0px', '220%'],
          opacity: [0.8, 0],
        }}
        transition={{ duration: 0.48, delay: 0.06, ease: 'easeOut' }}
      />
    </div>
  );
};

// =========================================================================
// 4. REALISTIC ARMAMENT HAKI SURFACE WRAPPER (`<ArmamentHakiSurface />`)
// Wraps any component (card, portrait, weapon, button) and applies:
// - Physical obsidian / charcoal hardened metallic coating
// - Anisotropic specular chrome reflection sheen that sweeps across
// - Deep dark-purple/indigo heat undertones
// - Environmental ambient occlusion & shadow depth
// =========================================================================
interface ArmamentHakiSurfaceProps {
  isHardened: boolean;
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  glowColor?: string;
  onActivateComplete?: () => void;
  showSparks?: boolean;
}

export const ArmamentHakiSurface: React.FC<ArmamentHakiSurfaceProps> = ({
  isHardened,
  children,
  className = '',
  borderRadius = '1rem',
  glowColor = 'rgba(100, 30, 170, 0.35)',
  onActivateComplete,
  showSparks = true,
}) => {
  const [justActivated, setJustActivated] = useState(false);

  useEffect(() => {
    if (isHardened) {
      setJustActivated(true);
      playRealisticHakiAudio('koka_impact');
      const timer = setTimeout(() => {
        setJustActivated(false);
        onActivateComplete?.();
      }, 700);
      return () => clearTimeout(timer);
    } else {
      setJustActivated(false);
    }
  }, [isHardened]);

  return (
    <div
      className={`relative transition-all duration-500 ${className}`}
      style={{
        borderRadius,
        transform: 'translateZ(0)',
      }}
    >
      {/* 1. Underlying Content (the base element) */}
      <div
        className="relative z-0 transition-all duration-500"
        style={{
          borderRadius,
          filter: isHardened
            ? 'contrast(1.18) saturate(0.75) brightness(0.78)'
            : 'none',
        }}
      >
        {children}
      </div>

      {/* 2. REALISTIC OBSIDIAN-METALLIC HARDENING COATING */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
        style={{ borderRadius }}
        initial={false}
        animate={{
          opacity: isHardened ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Layer A: Obsidian Charcoal Hardening Composite Base */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(8, 9, 14, 0.72) 0%, rgba(14, 15, 24, 0.6) 35%, rgba(6, 7, 10, 0.82) 70%, rgba(20, 10, 30, 0.65) 100%)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Layer B: Dark Purple/Indigo Energy Undertone (Restrained, Not Neon) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 80% at 50% 60%, rgba(70, 15, 110, 0.3) 0%, rgba(30, 8, 55, 0.18) 55%, transparent 85%)',
            mixBlendMode: 'color-dodge',
          }}
        />

        {/* Layer C: Physically Modeled Anisotropic Specular Chrome Glint */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, transparent 20%, rgba(185, 205, 240, 0.15) 38%, rgba(255, 255, 255, 0.55) 48%, rgba(200, 220, 255, 0.35) 54%, transparent 70%)',
            mixBlendMode: 'overlay',
            filter: 'blur(1.5px)',
          }}
          initial={{ x: '-120%' }}
          animate={{
            x: isHardened ? (justActivated ? ['-120%', '130%'] : ['130%', '130%']) : '-120%',
          }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Layer D: Hardened Steel Rim-Light Border Highlighting */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            boxShadow: isHardened
              ? `inset 0 0 0 1.5px rgba(180, 195, 225, 0.45), inset 0 0 16px rgba(85, 20, 140, 0.35), 0 0 28px ${glowColor}`
              : 'none',
            transition: 'box-shadow 0.45s ease',
          }}
        />
      </motion.div>

      {/* 3. Physical Shockwave Ripple upon Activation */}
      <AnimatePresence>
        {justActivated && <RealisticHakiShockwave active={justActivated} />}
      </AnimatePresence>

      {/* 4. Realistic Canvas Micro-Spark Burst */}
      {showSparks && (
        <RealisticHakiSparkCanvas active={justActivated} intensity={24} />
      )}
    </div>
  );
};

// =========================================================================
// 5. INTERACTIVE ARMAMENT HAKI HARDENING TOGGLE BADGE
// A tactile, cinema-styled toggle button with instant sound & visual feedback.
// =========================================================================
interface ArmamentHakiToggleProps {
  isHardened: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const ArmamentHakiToggle: React.FC<ArmamentHakiToggleProps> = ({
  isHardened,
  onToggle,
  size = 'md',
  label = 'Busoshoku Koka',
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const isSmall = size === 'sm';

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center gap-2 rounded-full cursor-pointer select-none transition-all duration-300 ${
        isSmall ? 'px-2.5 py-1 text-[10px]' : 'px-3.5 py-1.5 text-xs'
      } ${className}`}
      style={{
        background: isHardened
          ? 'linear-gradient(135deg, #090610 0%, #160a25 50%, #080310 100%)'
          : 'linear-gradient(135deg, rgba(11, 19, 43, 0.9) 0%, rgba(7, 12, 24, 0.95) 100%)',
        border: isHardened
          ? '1px solid rgba(168, 85, 247, 0.7)'
          : '1px solid rgba(224, 169, 59, 0.35)',
        boxShadow: isHardened
          ? '0 0 20px rgba(147, 51, 234, 0.4), inset 0 0 10px rgba(168, 85, 247, 0.2)'
          : '0 4px 14px rgba(0, 0, 0, 0.5)',
      }}
      title={isHardened ? 'Release Armament Haki' : 'Infuse Armament Haki (Busoshoku Koka)'}
    >
      {/* Icon with metallic/energy indicator */}
      <div
        className={`rounded-full flex items-center justify-center transition-all ${
          isSmall ? 'w-4 h-4 text-[9px]' : 'w-5 h-5 text-[11px]'
        }`}
        style={{
          background: isHardened
            ? 'linear-gradient(135deg, #2a0845 0%, #0f031c 100%)'
            : 'rgba(224, 169, 59, 0.15)',
          border: isHardened
            ? '1px solid rgba(216, 180, 254, 0.6)'
            : '1px solid rgba(224, 169, 59, 0.3)',
        }}
      >
        <motion.span
          animate={isHardened ? { rotate: [0, -5, 5, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {isHardened ? '🖤' : '🛡️'}
        </motion.span>
      </div>

      {/* Label Text */}
      <div className="flex flex-col text-left">
        <span
          className="font-mono font-bold tracking-wider leading-tight"
          style={{
            color: isHardened ? '#e9d5ff' : '#f5ebd2',
            textShadow: isHardened ? '0 0 8px rgba(168, 85, 247, 0.7)' : 'none',
          }}
        >
          {label}
        </span>
        <span
          className="text-[8px] font-mono uppercase tracking-widest leading-none"
          style={{ color: isHardened ? '#c084fc' : '#e0a93b' }}
        >
          {isHardened ? '● HARDENED' : '○ INFUSE HAKI'}
        </span>
      </div>

      {/* Pulsing Status Dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full transition-all ${
          isHardened ? 'bg-purple-400 shadow-[0_0_8px_#a855f7] animate-pulse' : 'bg-op-gold/60'
        }`}
      />
    </motion.button>
  );
};
