import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Mail, Check, Award, Terminal, MapPin, Sparkles, X, ShieldCheck, Flame, Compass, Github, Linkedin, ExternalLink, Briefcase, Cpu, CheckCircle, Crown, Mic } from 'lucide-react';
import aranyaImage from '../src/assets/aranya.png';
import { PortfolioTheme } from '../types';
import { AnimeEffectType } from './OnePieceNavEffects';

interface HeroProps {
  theme: PortfolioTheme;
  onTriggerAnimeEffect?: (effect: AnimeEffectType) => void;
  onOpenTerminal?: () => void;
  onToggleVoiceControl?: () => void;
  isVoiceListening?: boolean;
  isHakiActive?: boolean;
  onToggleObservationHaki?: () => void;
  isObservationHakiActive?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  theme,
  onTriggerAnimeEffect,
  onOpenTerminal,
  onToggleVoiceControl,
  isVoiceListening = false,
  isHakiActive = false,
  onToggleObservationHaki,
  isObservationHakiActive = false,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showBountyBreakdown, setShowBountyBreakdown] = useState(false);

  // 3D Perspective Tilt for Viewer Wanted Bounty Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bahugunaaranya@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleBountyCardClick = () => {
    setShowBountyBreakdown(true);
  };

  const isRecruiter = theme === 'recruiter';

  return (
    <section id="home" className="relative min-h-[85vh] flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Availability Badge & Interactive Terminal Trigger */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full border border-op-gold/30 bg-[#0b132b]/85 text-op-gold font-mono text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-op-cream font-medium">Available for Full-Time Roles</span>
            <span className="text-op-gold/60">•</span>
            <span className="text-op-gold">2026 Batch</span>
          </div>

          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-op-gold/40 bg-[#0b132b]/90 text-op-gold hover:bg-op-gold hover:text-op-ink font-mono text-[10px] sm:text-xs font-semibold tracking-wider transition-all cursor-pointer shadow-sm"
              title="Open Developer CLI Console [K]"
            >
              <Terminal size={11} />
              <span>Dev Console [K]</span>
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Highlights, Pitch, and CTAs */}
          <div className="lg:col-span-7 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-tight text-op-cream leading-[1.15] mb-2 sm:mb-3 break-words">
                Aranya Bahuguna
              </h1>

              <div className="font-mono text-op-gold text-xs sm:text-base font-semibold mb-3 sm:mb-4 tracking-wider uppercase">
                Full Stack Software Engineer & Systems Architect
              </div>

              {/* Recruiter Mode: High-Impact Professional Highlights Bar */}
              {isRecruiter ? (
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#0b132b]/90 border border-op-gold/30 text-xs font-mono text-op-cream mb-5 sm:mb-6 max-w-xl shadow-md flex items-center gap-2.5 text-left">
                  <span className="p-1 rounded-lg bg-op-gold/20 text-op-gold shrink-0">
                    <ShieldCheck size={18} />
                  </span>
                  <div className="leading-snug">
                    <span className="text-op-gold font-bold">Zero-Knowledge Cryptography (AES-256)</span>
                    <span className="text-op-cream/60 mx-1.5">•</span>
                    <span>UAV Telemetry Pipeline & Full Stack Web Systems</span>
                  </div>
                </div>
              ) : (
                /* Viewer Mode: Pirate Bounty Stat Line */
                <div
                  onClick={handleBountyCardClick}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#0b132b]/90 border border-op-gold/40 text-xs font-mono text-op-cream mb-5 sm:mb-6 max-w-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-2 cursor-pointer hover:border-op-gold transition-all group text-left"
                  title="Click to inspect Bounty Breakdown"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-op-crimson font-pirate text-xl sm:text-2xl font-bold shrink-0">₿ 3,000,000,000</span>
                    <span className="text-op-gold/60">—</span>
                    <span className="text-[11px] sm:text-xs">Full Stack & Cryptography Engineer • ISL Intern</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-op-gold text-op-ink text-[10px] font-bold uppercase shrink-0 group-hover:scale-105 transition-transform self-end sm:self-auto">
                    Audit Specs →
                  </span>
                </div>
              )}

              {/* 1-Line Pitch */}
              <p className="text-xs sm:text-base text-op-cream/85 font-sans leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
                Computer Science Scholar at VIT Bhopal and former Indian Space Lab (ISL) Research Intern. Specialized in engineering high-performance web platforms, zero-knowledge browser cryptography (AES-256), and real-time telemetry processing pipelines.
              </p>

              {/* Credential Chips */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-6 sm:mb-8 text-[11px] sm:text-xs font-mono text-op-cream/90">
                <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0b132b]/90 border border-op-gold/25 shadow-sm">
                  <Award size={13} className="text-op-gold shrink-0" /> B.Tech CSE @ VIT Bhopal ('26)
                </span>
                <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0b132b]/90 border border-op-gold/25 shadow-sm">
                  <Terminal size={13} className="text-op-gold shrink-0" /> Former ISL Space Lab Intern
                </span>
                <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0b132b]/90 border border-op-gold/25 shadow-sm">
                  <MapPin size={13} className="text-op-gold shrink-0" /> Dehradun / Bhopal
                </span>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3.5 justify-center md:justify-start items-stretch sm:items-center">
                {/* 1. Explore Projects */}
                <a
                  href="#projects"
                  onClick={(e) => {
                    if (!isRecruiter && onTriggerAnimeEffect) {
                      e.preventDefault();
                      onTriggerAnimeEffect('zoro');
                    }
                  }}
                  className="px-5 py-3 rounded-xl sm:rounded-full bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:scale-105 cursor-pointer"
                  title="View Featured Projects"
                >
                  {!isRecruiter && <span>⚔️</span>}
                  <span>Explore Projects</span>
                  <ArrowRight size={14} />
                </a>

                {/* 2. Download Resume */}
                <a
                  href="/Aranya_Bahuguna_Resume.pdf?v=latest"
                  download="Aranya_Bahuguna_Resume.pdf"
                  className="px-5 py-3 rounded-xl sm:rounded-full bg-[#0b132b] border border-op-gold/50 text-op-gold font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-[#131e36] transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Download size={14} />
                  <span>Resume (PDF)</span>
                </a>

                {/* 3. VIEWER MODE ONLY: CONQUEROR HAKI Voice Activation Button */}
                {!isRecruiter && (
                  <button
                    onClick={onToggleVoiceControl}
                    className={`px-5 py-3 rounded-xl sm:rounded-full font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer select-none ${
                      isHakiActive
                        ? 'bg-red-950/90 border border-red-500 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.5)]'
                        : isVoiceListening
                        ? 'bg-[#1e0210] border border-red-400 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.45)] animate-pulse'
                        : 'bg-[#12010c]/90 border border-red-500/50 text-red-200/95 hover:bg-[#220216] hover:border-red-400 hover:text-white hover:scale-105'
                    }`}
                    title={
                      isHakiActive
                        ? 'Conqueror Haki Active — Speak commands like "SKILLS", "PROJECTS", "FAST", or "HOME"'
                        : isVoiceListening
                        ? 'Listening active — Say "RESUME" to unleash Conqueror Haki!'
                        : 'Click to enable Voice-Controlled Conqueror Haki (Haoshoku)'
                    }
                  >
                    <Crown
                      size={14}
                      className={
                        isHakiActive
                          ? 'text-red-400'
                          : isVoiceListening
                          ? 'text-yellow-400 animate-bounce'
                          : 'text-red-400'
                      }
                    />
                    <span>
                      {isHakiActive
                        ? 'CONQUEROR ACTIVE'
                        : isVoiceListening
                        ? 'LISTENING (SAY "RESUME")'
                        : 'CONQUEROR HAKI'}
                    </span>
                    {isVoiceListening && !isHakiActive && (
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    )}
                  </button>
                )}

                {/* 3b. VIEWER MODE ONLY: OBSERVATION HAKI Hand Gesture Button */}
                {!isRecruiter && (
                  <button
                    onClick={onToggleObservationHaki}
                    className={`px-5 py-3 rounded-xl sm:rounded-full font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer select-none ${
                      isObservationHakiActive
                        ? 'bg-indigo-950/90 border border-indigo-400 text-indigo-200 shadow-[0_0_25px_rgba(99,102,241,0.55)]'
                        : 'bg-[#080415]/90 border border-indigo-500/50 text-indigo-200/90 hover:bg-[#100825] hover:border-indigo-400 hover:text-white hover:scale-105'
                    }`}
                    title="Toggle Observation Haki — Hand Gesture Vision Navigation"
                  >
                    <span className={`text-sm leading-none ${isObservationHakiActive ? 'animate-pulse' : ''}`}>
                      👁️
                    </span>
                    <span>
                      {isObservationHakiActive ? 'KEN ACTIVE' : 'OBSERVATION HAKI'}
                    </span>
                    {isObservationHakiActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    )}
                  </button>
                )}

                {/* 4. Contact / Den Den Snail */}
                <button
                  onClick={(e) => {
                    if (!isRecruiter && onTriggerAnimeEffect) {
                      onTriggerAnimeEffect('nami');
                    } else {
                      handleCopyEmail();
                    }
                  }}
                  className="px-4 py-3 rounded-xl sm:rounded-full bg-[#0b132b]/80 border border-op-slate/40 text-op-cream/80 hover:text-op-gold hover:border-op-gold/40 transition-all flex items-center justify-center gap-2 text-xs font-mono cursor-pointer"
                  title={isRecruiter ? 'Copy Direct Email Address' : 'Open Nami Transponder'}
                >
                  {isRecruiter ? (
                    copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Mail size={14} />
                  ) : (
                    <span>⚡</span>
                  )}
                  <span>{copiedEmail ? 'Email Copied!' : isRecruiter ? 'bahugunaaranya@gmail.com' : 'Contact Snail'}</span>
                </button>
              </div>

            </motion.div>
          </div>

          {/* Right Column: PROFESSIONAL PROFILE CARD (Recruiter) OR WANTED POSTER (Viewer) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {isRecruiter ? (
              /* ========================================================================= */
              /* RECRUITER THEME: SLEEK, EXECUTIVE, ULTRA-PROFESSIONAL ENGINEER PROFILE */
              /* ========================================================================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-[290px] xs:max-w-xs sm:max-w-sm"
              >
                <div className="scrim-card rounded-2xl p-5 sm:p-6 border border-op-gold/35 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                  {/* Status */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-op-gold/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-bold text-emerald-400">
                        Verified Candidate
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono text-op-gold bg-[#070c18] px-2 py-0.5 rounded-full border border-op-gold/30">
                      B.Tech CSE '26
                    </span>
                  </div>

                  {/* High-Resolution Portrait */}
                  <div className="relative aspect-[4/4] rounded-xl overflow-hidden mb-3.5 bg-[#070c18] border border-op-gold/30 shadow-inner group">
                    <img
                      src={aranyaImage}
                      alt="Aranya Bahuguna - Full Stack Software Engineer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-transparent opacity-30" />
                  </div>

                  {/* Name & Title */}
                  <div className="text-center md:text-left mb-3">
                    <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-op-cream leading-tight">
                      Aranya Bahuguna
                    </h2>
                    <div className="text-[11px] sm:text-xs font-mono text-op-gold font-medium mt-0.5">
                      Full Stack & Systems Engineer
                    </div>
                  </div>

                  {/* Key Credentials */}
                  <div className="space-y-1.5 mb-4 text-[10px] sm:text-[11px] font-mono">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#070c18]/80 border border-op-slate/20 flex items-center justify-between">
                      <span className="text-op-slate">University:</span>
                      <span className="text-op-cream font-semibold">VIT Bhopal</span>
                    </div>
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#070c18]/80 border border-op-slate/20 flex items-center justify-between">
                      <span className="text-op-slate">Research:</span>
                      <span className="text-op-cream font-semibold">Indian Space Lab (ISL)</span>
                    </div>
                    <div className="p-1.5 sm:p-2 rounded-lg bg-[#070c18]/80 border border-op-slate/20 flex items-center justify-between">
                      <span className="text-op-slate">Expertise:</span>
                      <span className="text-op-gold font-semibold">AES-256 • React • Node</span>
                    </div>
                  </div>

                  {/* Quick Profile Links */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-op-gold/20">
                    <a
                      href="https://github.com/aranya13"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-lg bg-[#070c18] hover:bg-op-gold hover:text-op-ink text-op-cream border border-op-gold/30 text-xs font-mono flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/aranya-bahuguna-485aa4251/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-lg bg-[#070c18] hover:bg-op-gold hover:text-op-ink text-op-cream border border-op-gold/30 text-xs font-mono flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Linkedin size={13} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* VIEWER THEME: 3D INTERACTIVE WANTED BOUNTY POSTER */
              /* ========================================================================= */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleBountyCardClick}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative perspective-1000 w-full max-w-[280px] xs:max-w-xs group cursor-pointer"
                title="Click to inspect Bounty dossier & stats"
              >
                {/* WANTED POSTER CARD */}
                <div
                  className="relative rounded-xl p-3.5 sm:p-4 bounty-card text-center border-[3px] sm:border-[4px] border-[#3d2e1e] group-hover:shadow-[0_20px_50px_rgba(224,169,59,0.4)] transition-shadow duration-300"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {/* Poster Header */}
                  <div className="font-pirate text-3xl sm:text-5xl text-[#3d2e1e] tracking-widest uppercase leading-none mb-1 select-none">
                    WANTED
                  </div>

                  {/* Photo Frame */}
                  <div className="relative rounded-md overflow-hidden border-2 border-[#5c492c] bg-[#0b132b] shadow-inner aspect-[4/4.2] mb-2">
                    <img
                      src={aranyaImage}
                      alt="Aranya Bahuguna"
                      className="w-full h-full object-cover filter contrast-[1.08] sepia-[0.12] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-1 right-1.5 text-white/20 font-cinzel text-xl font-black select-none pointer-events-none">
                      MARINE
                    </div>
                  </div>

                  {/* Name */}
                  <div className="font-pirate text-xl sm:text-2xl text-[#1c1917] tracking-widest uppercase leading-tight">
                    ARANYA BAHUGUNA
                  </div>

                  <div className="text-[8px] sm:text-[9px] font-mono text-[#5c492c] uppercase tracking-wider font-bold mb-1">
                    FULL STACK ARCHITECT • SCHOLAR
                  </div>

                  {/* Bounty Reward */}
                  <div className="pt-1 border-t border-[#8a7447]/40 flex items-center justify-center gap-1 font-pirate text-lg sm:text-xl text-op-crimson tracking-wider">
                    <span className="font-sans font-black text-xs sm:text-sm">฿</span>
                    <span>3,000,000,000 -</span>
                  </div>

                  <div className="text-[6px] sm:text-[7px] font-mono text-[#7a6030] tracking-widest uppercase mt-0.5">
                    DEAD OR ALIVE • WORLD GOVT
                  </div>

                  {/* Verified Red Stamp */}
                  <div className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-op-crimson border border-[#520b12] flex items-center justify-center shadow-sm rotate-12 pointer-events-none">
                    <span className="text-[6px] sm:text-[7px] font-mono text-white font-bold tracking-tighter">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>

      {/* Interactive Bounty Dossier Modal for Viewer Theme */}
      {!isRecruiter && (
        <AnimatePresence>
          {showBountyBreakdown && (
            <div className="fixed inset-0 z-[99993] flex items-center justify-center p-3 sm:p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowBountyBreakdown(false)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative z-10 w-full max-w-lg bg-[#070c18] border-2 border-op-gold/60 rounded-2xl p-4 sm:p-6 shadow-[0_0_60px_rgba(224,169,59,0.3)] font-mono"
              >
                <div className="flex items-center justify-between pb-3 border-b border-op-gold/30 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">☠️</span>
                    <div>
                      <h3 className="font-cinzel font-bold text-base sm:text-lg text-op-cream">
                        Marine Headquarters Dossier
                      </h3>
                      <div className="text-[9px] sm:text-[10px] text-op-gold uppercase">File Ref #097-BHP-ISL</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowBountyBreakdown(false)}
                    className="p-1 rounded-lg hover:bg-op-gold/20 text-op-cream/80 hover:text-op-gold transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-2.5 text-xs mb-5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#0b132b] border border-op-gold/25 flex justify-between items-center">
                    <span className="text-op-cream/80 text-[11px] sm:text-xs">Total Bounty Issued:</span>
                    <span className="font-pirate text-lg sm:text-xl text-op-crimson font-bold">฿ 3,000,000,000</span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-[10px] sm:text-[11px]">
                    <div className="flex justify-between p-2 rounded bg-[#0b132b]/60 border border-op-slate/20">
                      <span className="text-op-gold">Client-Side Cryptography (AES-256):</span>
                      <span className="text-op-cream font-bold">฿ 900,000,000</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#0b132b]/60 border border-op-slate/20">
                      <span className="text-op-gold">ISL Space Telemetry Pipelines:</span>
                      <span className="text-op-cream font-bold">฿ 800,000,000</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#0b132b]/60 border border-op-slate/20">
                      <span className="text-op-gold">Full Stack Production Platforms (MERN):</span>
                      <span className="text-op-cream font-bold">฿ 800,000,000</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-[#0b132b]/60 border border-op-slate/20">
                      <span className="text-op-gold">AI Vision & LLM Chaining (YOLOv8):</span>
                      <span className="text-op-cream font-bold">฿ 500,000,000</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="#contact"
                    onClick={() => setShowBountyBreakdown(false)}
                    className="flex-1 py-2.5 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Flame size={14} />
                    <span>Recruit Aranya to Crew</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};

export default Hero;
