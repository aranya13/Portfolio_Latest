import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Skull, Shield, Zap, Trophy, X, ChevronRight, RotateCcw, AlertTriangle, Sparkles, Flame, Lock } from 'lucide-react';
import { playRealisticHakiAudio, ArmamentHakiSurface, RealisticHakiSparkCanvas, RealisticHakiShockwave } from './RealisticArmamentHaki';

// =========================================================================
// HIGH-FIDELITY WEB AUDIO SOUND SYNTHESIZER FOR ARMAMENT HAKI
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

// 1. Deep Haki Activation / Lock Impact
export function playHakiActivate() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(140, now);
    osc1.frequency.exponentialRampToValueAtTime(32, now + 0.45);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(80, now);
    osc2.frequency.exponentialRampToValueAtTime(24, now + 0.5);

    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc1.connect(gain1);
    osc2.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.55);
    osc2.stop(now + 0.55);
  } catch (err) {
    console.warn('Audio error:', err);
  }
}

// 2. Wrong Answer Haki Shock / Buzz
export function playHakiWrong() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.setValueAtTime(150, now + 0.08);
    osc.frequency.setValueAtTime(90, now + 0.18);

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (err) {
    console.warn('Audio error:', err);
  }
}

// 3. Breakthrough / Success Chime & Shockwave
export function playHakiSuccess() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6
    gain1.gain.setValueAtTime(0.6, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.7);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(220, now);
    osc2.frequency.exponentialRampToValueAtTime(45, now + 0.35);
    gain2.gain.setValueAtTime(0.5, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.4);
  } catch (err) {
    console.warn('Audio error:', err);
  }
}

// 4. Cinematic Entrance Roar
export function playHakiCinematic() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.8);
    osc.frequency.exponentialRampToValueAtTime(30, now + 2.0);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.2);
  } catch (err) {
    console.warn('Audio error:', err);
  }
}

// =========================================================================
// TYPES
// =========================================================================

export interface HakiDomainCard {
  id: string;
  domainEffect: 'luffy' | 'zoro' | 'brook' | 'nami';
  avatar: string;
  name: string;
  desc: string;
  glowColor: string;
  borderCoated: string;
}

export type Puzzle = {
  type: 'ryuo';
  question: string;
};

export interface ArmamentHakiModeProps {
  onBackToViewer: () => void;
  onLaunchDomain: (effect: 'luffy' | 'zoro' | 'brook' | 'nami') => void;
}

export function pickPuzzleForIndex(idx: number): Puzzle {
  return {
    type: 'ryuo',
    question: 'Infuse Ryuo & Strike the Koka Barrier to shatter the Haki seal.',
  };
}

// =========================================================================
// ARMAMENT HAKI CINEMATIC ENTRY OVERLAY — REALISTIC REMASTER
// =========================================================================
export const ArmamentHakiCinematicOverlay: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    playRealisticHakiAudio('activate');
    playHakiCinematic();
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[999999] overflow-hidden pointer-events-none flex items-center justify-center"
      style={{ background: '#000' }}
    >
      <div className="absolute inset-0 opacity-60">
        <RealisticHakiSparkCanvas count={35} />
      </div>

      {/* Shockwave Rings */}
      <RealisticHakiShockwave triggerKey={1} maxRadius={700} />

      {/* Central Impact Burst */}
      <motion.div
        className="text-center relative z-10 px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.05, 1], opacity: [0, 1, 1] }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-purple-400/90 mb-3"
        >
          武装色の覇気 · Busoshoku no Haki
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="font-cinzel font-black text-5xl sm:text-7xl text-white tracking-wider mb-2"
          style={{ textShadow: '0 0 50px rgba(168,85,247,0.9), 0 0 100px rgba(139,92,246,0.6)' }}
        >
          ARMAMENT <span className="text-op-gold">HAKI</span>
        </motion.h1>

        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-4" />

        <p className="text-xs sm:text-sm font-mono text-purple-300/80 max-w-md mx-auto">
          All Navigation Paths Hardened • Strike Barriers to Break Through
        </p>
      </motion.div>
    </motion.div>
  );
};

// =========================================================================
// HAKI CRACK / SHATTER BURST ANIMATION
// =========================================================================
const HakiCrackAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    playHakiSuccess();
    const t = setTimeout(onComplete, 800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.6) 0%, rgba(168,85,247,0.3) 50%, transparent 80%)' }}
      />
      {/* 8 Golden Shatter Ray Lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2"
          style={{ transformOrigin: '0 0', rotate: `${i * 45}deg` }}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.5, delay: i * 0.02, ease: 'easeOut' }}
        >
          <div
            style={{
              width: '60vmax',
              height: '3px',
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(212,175,55,0.9) 40%, transparent 100%)',
              boxShadow: '0 0 12px rgba(212,175,55,0.9)',
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

// =========================================================================
// HIGH-IMPACT RYUO KOKA CORE BREAKER MODAL
// Replaces clunky chess/text riddles with a super satisfying, tactile,
// animated Armament Haki barrier breaker with combo strikes and instant bypass
// =========================================================================
export const HakiPuzzleModal: React.FC<{
  domainCard: HakiDomainCard;
  puzzle?: any;
  strikesLeft?: number;
  maxStrikes?: number;
  onSolved: () => void;
  onWrongAnswer?: () => void;
  onClose: () => void;
}> = ({ domainCard, onSolved, onClose }) => {
  const [power, setPower] = useState(0); // 0 to 100
  const [combo, setCombo] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [showCrack, setShowCrack] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkIdRef = useRef(0);

  // Trigger strike
  const handleStrike = useCallback(() => {
    if (power >= 100) return;

    playRealisticHakiAudio('koka_impact');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);

    // Spawn sparks
    const newSpark = { id: sparkIdRef.current++, x: (Math.random() - 0.5) * 60, y: (Math.random() - 0.5) * 60 };
    setSparks((prev) => [...prev.slice(-8), newSpark]);

    setPower((prev) => {
      const increment = 25 * combo;
      const next = Math.min(100, prev + increment);
      if (next >= 100) {
        setShowCrack(true);
      }
      return next;
    });

    setCombo((prev) => Math.min(4, prev + 1));
  }, [power, combo]);

  // Combo decay timer
  useEffect(() => {
    if (power >= 100) return;
    const interval = setInterval(() => {
      setCombo((prev) => Math.max(1, prev - 1));
      setPower((prev) => Math.max(0, prev - 2));
    }, 1200);
    return () => clearInterval(interval);
  }, [power]);

  // Spacebar trigger
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleStrike();
      } else if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleStrike, onClose]);

  // Instant Overpower Bypass
  const handleInstantBypass = () => {
    setPower(100);
    setShowCrack(true);
  };

  return (
    <>
      {showCrack && (
        <HakiCrackAnimation
          onComplete={() => {
            setShowCrack(false);
            onSolved();
          }}
        />
      )}

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 backdrop-blur-2xl bg-black/85"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 15 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
            x: isShaking ? [0, -6, 6, -4, 4, 0] : 0,
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 25 }}
          className="relative w-full max-w-md rounded-3xl border border-purple-500/50 shadow-[0_0_80px_rgba(139,92,246,0.4)] overflow-hidden font-sans select-none text-center"
          style={{
            background: 'linear-gradient(145deg, #07020d 0%, #110424 50%, #05010a 100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Metallic Rim Glint */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-900 transition-colors cursor-pointer z-20"
          >
            <X size={15} />
          </button>

          <div className="p-6 sm:p-7 relative z-10 flex flex-col items-center">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono text-[11px] uppercase tracking-wider mb-4 shadow-sm">
              <Shield size={12} className="text-purple-400 animate-pulse" />
              <span>Armament Seal · Koka Hardened</span>
            </div>

            <h2 className="font-cinzel font-bold text-2xl text-white mb-1 flex items-center justify-center gap-2">
              <span>{domainCard.avatar}</span>
              <span>{domainCard.name}</span>
            </h2>

            <p className="text-xs font-mono text-purple-300/70 mb-6 max-w-xs leading-relaxed">
              {domainCard.desc}
            </p>

            {/* THE TACTILE OBSIDIAN KOKA CORE REACTOR */}
            <div className="relative my-2 flex items-center justify-center">
              
              {/* Outer Energy Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-44 h-44 rounded-full border border-dashed border-purple-500/30 pointer-events-none"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute w-40 h-40 rounded-full border border-purple-400/20 pointer-events-none"
              />

              {/* Central Obsidian Core */}
              <motion.button
                onClick={handleStrike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="w-32 h-32 rounded-full relative flex flex-col items-center justify-center cursor-pointer shadow-2xl transition-all duration-200 overflow-hidden group"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #2a0b4a 0%, #0c0218 60%, #040008 100%)',
                  border: '2px solid rgba(168,85,247,0.7)',
                  boxShadow: `0 0 ${20 + power * 0.4}px rgba(168,85,247,${0.3 + power * 0.005}), inset 0 0 20px rgba(0,0,0,0.9)`,
                }}
                title="Click or press Spacebar to Strike Core!"
              >
                {/* Real-time Dynamic Stress Fracture SVGs */}
                {power > 0 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 100 100">
                    <path
                      d="M 50,50 L 30,30 L 20,40 M 50,50 L 70,30 L 85,25 M 50,50 L 65,75 L 80,80 M 50,50 L 35,70 L 20,80"
                      stroke="#d4af37"
                      strokeWidth={1 + power * 0.02}
                      strokeLinecap="round"
                      fill="none"
                      style={{ filter: 'drop-shadow(0 0 4px #d4af37)' }}
                    />
                  </svg>
                )}

                {/* Core Kanji / Emblem */}
                <div className="relative z-10 text-center">
                  <div className="text-3xl mb-0.5 group-hover:scale-110 transition-transform">
                    {domainCard.avatar}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-purple-200 tracking-wider">
                    {power >= 100 ? 'SHATTERED!' : `${Math.round(power)}% RYUO`}
                  </div>
                </div>

                {/* Spark Particle Bursts */}
                {sparks.map((sp) => (
                  <motion.div
                    key={sp.id}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 0, opacity: 0, x: sp.x * 2, y: sp.y * 2 }}
                    transition={{ duration: 0.4 }}
                    className="absolute w-2 h-2 rounded-full bg-yellow-300 pointer-events-none"
                    style={{ boxShadow: '0 0 8px #facc15' }}
                  />
                ))}
              </motion.button>
            </div>

            {/* COMBO STATUS */}
            <div className="h-6 flex items-center justify-center my-2">
              {combo > 1 && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-400/50 text-[10px] font-mono font-bold text-yellow-300 flex items-center gap-1 shadow-sm"
                >
                  <Flame size={11} className="text-yellow-400 animate-bounce" />
                  <span>{combo}X RYUO STRIKE OVERDRIVE!</span>
                </motion.div>
              )}
            </div>

            {/* POWER PROGRESS BAR */}
            <div className="w-full max-w-xs bg-black/60 border border-purple-500/30 rounded-full h-3 p-0.5 mb-5 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${power}%`,
                  background: 'linear-gradient(90deg, #9333ea 0%, #a855f7 50%, #eab308 100%)',
                  boxShadow: '0 0 12px rgba(234,179,8,0.8)',
                }}
                transition={{ duration: 0.15 }}
              />
            </div>

            {/* PRIMARY & SECONDARY ACTIONS */}
            <div className="w-full max-w-xs space-y-2">
              <button
                onClick={handleStrike}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer hover:scale-102 active:scale-98"
              >
                <Sparkles size={14} />
                <span>Strike Koka Barrier (Space / Click)</span>
              </button>

              <button
                onClick={handleInstantBypass}
                className="w-full py-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:text-white font-mono text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Zap size={11} className="text-yellow-400" />
                <span>Instant Overpower (Bypass Seal) →</span>
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </>
  );
};

// =========================================================================
// ARMAMENT HAKI DOMAIN SCREEN (When launched full screen)
// =========================================================================
export const hakiDomainCards: HakiDomainCard[] = [
  { id: 'luffy', domainEffect: 'luffy', avatar: '👒', name: "Luffy's Skills", desc: 'Gear 2 to Gear 5 full-stack capabilities, cryptography & live tech stack.', glowColor: 'rgba(239,68,68,0.3)', borderCoated: 'border-red-500/30 hover:border-red-400/60' },
  { id: 'zoro', domainEffect: 'zoro', avatar: '⚔️', name: "Zoro's Projects", desc: 'Santoryu three swords production deployments & architecture specs.', glowColor: 'rgba(16,185,129,0.3)', borderCoated: 'border-emerald-500/30 hover:border-emerald-400/60' },
  { id: 'brook', domainEffect: 'brook', avatar: '🎻', name: "Brook's Voyage", desc: 'ISL space telemetry research & university degree voyage logs.', glowColor: 'rgba(34,211,238,0.3)', borderCoated: 'border-cyan-500/30 hover:border-cyan-400/60' },
  { id: 'nami', domainEffect: 'nami', avatar: '⚡', name: "Nami's Snail", desc: 'Direct Den Den Mushi transponder signals & instant message dispatch.', glowColor: 'rgba(251,191,36,0.3)', borderCoated: 'border-amber-500/30 hover:border-amber-400/60' },
];

export const ArmamentHakiDomain: React.FC<ArmamentHakiModeProps> = ({ onBackToViewer, onLaunchDomain }) => {
  const [activeCard, setActiveCard] = useState<HakiDomainCard | null>(null);
  const [unlockedDomains, setUnlockedDomains] = useState<Set<string>>(new Set());

  const handleCardClick = (card: HakiDomainCard) => {
    if (unlockedDomains.has(card.id)) {
      onLaunchDomain(card.domainEffect);
      return;
    }
    playHakiActivate();
    setActiveCard(card);
  };

  const handleSolved = () => {
    if (!activeCard) return;
    const cardId = activeCard.id;
    const effect = activeCard.domainEffect;
    setUnlockedDomains((prev) => new Set([...prev, cardId]));
    setActiveCard(null);
    setTimeout(() => onLaunchDomain(effect), 300);
  };

  return (
    <>
      <AnimatePresence>
        {activeCard && (
          <HakiPuzzleModal
            domainCard={activeCard}
            onSolved={handleSolved}
            onClose={() => setActiveCard(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] font-sans overflow-y-auto pt-24 pb-28 px-4"
        style={{ background: 'transparent' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-purple-500/30">
            <button
              onClick={onBackToViewer}
              className="px-4 py-2.5 rounded-xl border border-purple-500/40 bg-[#090014]/90 text-purple-300 font-mono text-xs font-bold flex items-center gap-2 hover:bg-purple-900/60 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Deactivate Haki — Return
            </button>
            <div className="text-xs font-mono text-op-gold border border-purple-500/30 px-3 py-1.5 rounded-full bg-purple-950/40">
              {unlockedDomains.size} / {hakiDomainCards.length} Domains Unlocked
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="font-cinzel font-black text-4xl sm:text-5xl text-white mb-2">
              All Paths <span className="text-op-gold">Hardened</span>
            </h1>
            <p className="text-xs font-mono text-purple-300/70">
              Each domain is protected by Armament Haki. Strike the core to break through.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hakiDomainCards.map((card) => {
              const isUnlocked = unlockedDomains.has(card.id);
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer hover:-translate-y-1 ${
                    isUnlocked
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-[#090014]/90 border-purple-500/40 text-purple-200 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{card.avatar}</div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/40">
                      {isUnlocked ? '✅ UNLOCKED' : '🔒 SEALED'}
                    </span>
                  </div>
                  <h3 className="font-cinzel font-bold text-base text-white mb-1">{card.name}</h3>
                  <p className="text-[11px] font-mono text-purple-300/60 mb-4">{card.desc}</p>
                  <div className="text-xs font-mono font-bold text-purple-300 flex items-center gap-1">
                    {isUnlocked ? 'Enter Domain →' : 'Strike Core Barrier →'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ArmamentHakiDomain;
