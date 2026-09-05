import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sun, Moon, Terminal, Menu, X, Shield, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { PortfolioTheme } from '../types';
import { AnimeEffectType } from './OnePieceNavEffects';
import {
  playRealisticHakiAudio,
  RealisticHakiSparkCanvas,
  RealisticHakiShockwave,
} from './RealisticArmamentHaki';
import {
  HakiPuzzleModal,
  pickPuzzleForIndex,
  HakiDomainCard,
  Puzzle,
  playHakiActivate,
  playHakiSuccess,
} from './ArmamentHakiMode';

interface NavbarProps {
  theme: PortfolioTheme;
  onToggleTheme: (newTheme: PortfolioTheme) => void;
  onTriggerAnimeEffect?: (effect: AnimeEffectType) => void;
  onOpenTerminal?: () => void;
}

const navLinks = [
  { id: 'skills', label: 'Skills', icon: '👒', effect: 'luffy' as const },
  { id: 'projects', label: 'Projects', icon: '⚔️', effect: 'zoro' as const },
  { id: 'experience', label: 'Experience', icon: '🎻', effect: 'brook' as const },
  { id: 'contact', label: 'Contact', icon: '⚡', effect: 'nami' as const },
];

const navDomainCards: Record<string, HakiDomainCard> = {
  about: {
    id: 'about',
    domainEffect: null as any,
    avatar: '🏴‍☠️',
    name: 'About & Voyage',
    desc: 'Scholar biography, Indian Space Lab research, and engineering background.',
    glowColor: 'rgba(224, 169, 59, 0.4)',
    borderCoated: 'border-amber-500/40',
  },
  skills: {
    id: 'skills',
    domainEffect: 'luffy',
    avatar: '👒',
    name: "Luffy's Skills",
    desc: 'Gear 2 to Gear 5 full-stack capabilities, cryptography & live tech stack.',
    glowColor: 'rgba(239,68,68,0.4)',
    borderCoated: 'border-red-500/40',
  },
  projects: {
    id: 'projects',
    domainEffect: 'zoro',
    avatar: '⚔️',
    name: "Zoro's Projects",
    desc: 'Santoryu three swords production architectures, security systems, and AI inference.',
    glowColor: 'rgba(16,185,129,0.4)',
    borderCoated: 'border-emerald-500/40',
  },
  experience: {
    id: 'experience',
    domainEffect: 'brook',
    avatar: '🎻',
    name: "Brook's Voyage",
    desc: 'Indian Space Lab telemetry logs, degree journey, and research credentials.',
    glowColor: 'rgba(34,211,238,0.4)',
    borderCoated: 'border-cyan-400/40',
  },
  contact: {
    id: 'contact',
    domainEffect: 'nami',
    avatar: '⚡',
    name: "Nami's Snail",
    desc: 'Direct Den Den Mushi transponder signals & instant message dispatch.',
    glowColor: 'rgba(251,191,36,0.4)',
    borderCoated: 'border-amber-400/40',
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onTriggerAnimeEffect,
  onOpenTerminal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Armament Haki Hardening State (Viewer mode only)
  const [isHakiHardened, setIsHakiHardened] = useState(false);
  const [hakiUnlocked, setHakiUnlocked] = useState<Set<string>>(new Set());
  const [hakiStrikes, setHakiStrikes] = useState<Record<string, number>>({});
  const [activePuzzle, setActivePuzzle] = useState<{
    card: HakiDomainCard;
    puzzle: Puzzle;
    strikesLeft: number;
    link: (typeof navLinks)[0];
  } | null>(null);
  const [shockwaveKey, setShockwaveKey] = useState<number>(0);

  // Auto reset Haki if user switches to Recruiter Mode
  useEffect(() => {
    if (theme === 'recruiter') {
      setIsHakiHardened(false);
      setHakiUnlocked(new Set());
      setActivePuzzle(null);
    }
  }, [theme]);

  useEffect(() => {
    // High-performance IntersectionObserver for 120fps active section tracking without layout reflows
    const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact'];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    });

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Armament Haki Toggle Handler
  const handleToggleArmamentHaki = () => {
    if (theme !== 'viewer') return;
    const nextState = !isHakiHardened;
    setIsHakiHardened(nextState);
    if (nextState) {
      playRealisticHakiAudio('activate');
      setShockwaveKey((prev) => prev + 1);
    } else {
      playRealisticHakiAudio('deactivate');
      setActivePuzzle(null);
    }
  };

  // Nav Item Click Handler
  const handleNavClick = (link: (typeof navLinks)[0], idx: number) => {
    setMobileMenuOpen(false);

    // If Armament Haki is active in Viewer mode, verify seal state
    if (theme === 'viewer' && isHakiHardened) {
      if (hakiUnlocked.has(link.id)) {
        // Already unlocked — launch directly
        if (link.effect && onTriggerAnimeEffect) {
          onTriggerAnimeEffect(link.effect);
        } else {
          const el = document.getElementById(link.id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Sealed by Haki — open mini-game challenge modal
        playHakiActivate();
        const domainCard = navDomainCards[link.id] || {
          id: link.id,
          domainEffect: link.effect,
          avatar: link.icon,
          name: link.label,
          desc: 'Sealed with Armament Haki coating. Break the seal to enter.',
          glowColor: 'rgba(139,92,246,0.4)',
          borderCoated: 'border-purple-500/40',
        };
        const currentStrikes = hakiStrikes[link.id] ?? 0;
        setActivePuzzle({
          card: domainCard,
          puzzle: pickPuzzleForIndex(idx),
          strikesLeft: Math.max(1, 3 - currentStrikes),
          link,
        });
      }
      return;
    }

    // Standard navigation
    if (theme === 'viewer' && link.effect && onTriggerAnimeEffect) {
      onTriggerAnimeEffect(link.effect);
    } else {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Puzzle Solved Handler
  const handlePuzzleSolved = () => {
    if (!activePuzzle) return;
    const link = activePuzzle.link;
    playHakiSuccess();
    setHakiUnlocked((prev) => new Set([...prev, link.id]));
    setActivePuzzle(null);

    // Launch domain after crack animation
    setTimeout(() => {
      if (link.effect && onTriggerAnimeEffect) {
        onTriggerAnimeEffect(link.effect);
      } else {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  // Puzzle Wrong Answer Handler
  const handlePuzzleWrong = () => {
    if (!activePuzzle) return;
    const linkId = activePuzzle.link.id;
    const newStrikes = (hakiStrikes[linkId] ?? 0) + 1;
    if (newStrikes >= 3) {
      setHakiStrikes((prev) => ({ ...prev, [linkId]: 0 }));
      setActivePuzzle(null);
    } else {
      setHakiStrikes((prev) => ({ ...prev, [linkId]: newStrikes }));
      setActivePuzzle((prev) => (prev ? { ...prev, strikesLeft: 3 - newStrikes } : null));
    }
  };

  const isViewerMode = theme === 'viewer';

  return (
    <>
      {/* Interactive Haki Ryuo Core Breaker Mini-Game Modal */}
      <AnimatePresence>
        {activePuzzle && (
          <HakiPuzzleModal
            domainCard={activePuzzle.card}
            onSolved={handlePuzzleSolved}
            onClose={() => setActivePuzzle(null)}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 overflow-hidden ${
          isViewerMode && isHakiHardened
            ? 'py-2.5 sm:py-3.5 border-b shadow-[0_12px_40px_rgba(0,0,0,0.95)]'
            : scrolled
            ? 'bg-[#070c18]/95 backdrop-blur-md border-b border-op-gold/30 py-2 shadow-2xl'
            : 'bg-[#070c18]/40 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border-b border-op-gold/10 sm:border-transparent py-2.5 sm:py-4'
        }`}
        style={
          isViewerMode && isHakiHardened
            ? {
                background: 'linear-gradient(135deg, rgba(6,3,12,0.98) 0%, rgba(14,2,26,0.99) 50%, rgba(4,1,8,0.98) 100%)',
                borderColor: 'rgba(139,92,246,0.55)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.95), 0 0 35px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
              }
            : { transform: 'translateZ(0)' }
        }
      >
        {/* Armament Haki Metallic Specular Anisotropic Sheen Top Highlight */}
        {isViewerMode && isHakiHardened && (
          <>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
              className="absolute top-0 left-0 w-1/2 h-[2px] pointer-events-none z-30"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(192,132,252,0.9) 40%, rgba(255,255,255,1) 50%, rgba(192,132,252,0.9) 60%, transparent 100%)',
                filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.9))',
              }}
            />
            {/* Embedded Micro-Spark Canvas in Navbar Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
              <RealisticHakiSparkCanvas active={isViewerMode && isHakiHardened} intensity={18} />
            </div>
            {/* Refractive Shockwave on Activation */}
            <RealisticHakiShockwave active={isViewerMode && isHakiHardened} />
          </>
        )}

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">
          
          {/* Left: Brand Identity & Straw Hat Mark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-sm transition-all duration-300 ${
                isViewerMode && isHakiHardened
                  ? 'bg-[#100320] border border-purple-400/80 text-purple-300 shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                  : 'bg-[#0b132b] border border-op-gold/40 text-op-gold group-hover:border-op-gold'
              }`}
            >
              <span className="font-pirate text-base sm:text-lg">
                {isViewerMode && isHakiHardened ? '🖤' : '👒'}
              </span>
            </div>
            <div>
              <div
                className={`font-cinzel font-bold text-xs sm:text-sm tracking-wider transition-colors ${
                  isViewerMode && isHakiHardened
                    ? 'text-purple-100 group-hover:text-purple-300'
                    : 'text-op-cream group-hover:text-op-gold'
                }`}
              >
                Aranya Bahuguna
              </div>
              <div
                className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-semibold ${
                  isViewerMode && isHakiHardened
                    ? 'text-purple-400/90'
                    : 'text-op-gold/80'
                }`}
              >
                {isViewerMode && isHakiHardened ? 'Busoshoku Haki Active' : 'Full Stack & Systems'}
              </div>
            </div>
          </a>

          {/* Center: Desktop Navigation Bar with Armament Haki Hardening */}
          <nav
            className={`hidden lg:flex items-center gap-1.5 rounded-full px-3 py-1 backdrop-blur-md transition-all duration-300 ${
              isViewerMode && isHakiHardened
                ? 'bg-[#0a0216]/95 border border-purple-500/50 shadow-[0_0_25px_rgba(139,92,246,0.3)]'
                : 'bg-[#0b132b]/85 border border-op-gold/25'
            }`}
          >
            {/* VIEWER MODE ONLY: Armament Haki Hardening Button directly BEFORE "About" */}
            {isViewerMode && (
              <motion.button
                onClick={handleToggleArmamentHaki}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-300 mr-1 select-none ${
                  isHakiHardened
                    ? 'bg-purple-900/60 border border-purple-400 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                    : 'bg-[#18042c]/90 border border-purple-500/40 text-purple-300/90 hover:border-purple-400 hover:text-white hover:bg-purple-950 shadow-sm'
                }`}
                title={
                  isHakiHardened
                    ? 'Armament Haki (Busoshoku) Hardened — Click to de-harden'
                    : 'Infuse Armament Haki (Hardens Navbar & Adds Puzzle Challenge)'
                }
              >
                <motion.span
                  animate={isHakiHardened ? { rotate: [0, -12, 12, -6, 6, 0] } : {}}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2 }}
                  className="text-sm leading-none"
                  style={isHakiHardened ? { filter: 'drop-shadow(0 0 6px rgba(168,85,247,1))' } : {}}
                >
                  🖤
                </motion.span>
                <span>{isHakiHardened ? 'Haki Hardened' : 'Armament Haki'}</span>
                {isHakiHardened ? (
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-purple-400"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                ) : (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                    KOKA
                  </span>
                )}
              </motion.button>
            )}

            {/* Standard / Hardened Navigation Links */}
            {navLinks.map((link, idx) => {
              const isUnlocked = hakiUnlocked.has(link.id);
              const isSealed = isViewerMode && isHakiHardened && !isUnlocked;
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link, idx)}
                  className={`relative px-3 py-1 text-xs font-cinzel font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 rounded-full ${
                    isViewerMode && isHakiHardened
                      ? isSealed
                        ? 'text-purple-300/80 hover:text-purple-100 hover:bg-purple-900/30'
                        : isUnlocked
                        ? 'text-emerald-300 font-bold bg-emerald-950/40 border border-emerald-500/30'
                        : 'text-purple-200'
                      : isActive
                      ? 'text-op-gold font-bold'
                      : 'text-op-cream/70 hover:text-op-cream'
                  }`}
                  title={
                    isSealed
                      ? `${link.label} is Hardened with Armament Haki! Click to solve puzzle & break seal.`
                      : isUnlocked && isViewerMode && isHakiHardened
                      ? `${link.label} Haki Seal Broken! Click to enter domain.`
                      : link.label
                  }
                >
                  {isViewerMode && (
                    <span className="text-xs" style={isSealed ? { filter: 'grayscale(0.7)' } : {}}>
                      {link.icon}
                    </span>
                  )}
                  <span>{link.label}</span>

                  {/* Armament Haki Seal Indicators */}
                  {isViewerMode && isHakiHardened && (
                    isSealed ? (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-500/50 text-purple-300 flex items-center gap-0.5">
                        <Lock size={9} />
                        <span>SEAL</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/60 border border-emerald-400/50 text-emerald-300 flex items-center gap-0.5">
                        <CheckCircle size={9} />
                        <span>OPEN</span>
                      </span>
                    ) : null
                  )}

                  {/* Active Underline in standard mode */}
                  {(!isViewerMode || !isHakiHardened) && isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-op-gold rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Switcher, Dev Terminal, Resume & Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Developer CLI Terminal Button */}
            {onOpenTerminal && (
              <button
                onClick={onOpenTerminal}
                className={`p-1.5 rounded-lg sm:rounded-full border transition-all cursor-pointer shadow-sm ${
                  isViewerMode && isHakiHardened
                    ? 'bg-[#120326] border-purple-400/60 text-purple-300 hover:bg-purple-900 hover:text-white'
                    : 'bg-[#0b132b] border-op-gold/40 text-op-gold hover:bg-op-gold hover:text-op-ink'
                }`}
                title="Open Grand Line Developer CLI [K]"
              >
                <Terminal size={14} />
              </button>
            )}

            {/* Recruiter / Viewer Theme Toggle Pill */}
            <div
              className={`flex items-center p-0.5 rounded-full border shadow-sm transition-colors ${
                isViewerMode && isHakiHardened
                  ? 'bg-[#0f0322] border-purple-500/40'
                  : 'bg-[#0b132b] border-op-gold/40'
              }`}
            >
              <button
                onClick={() => onToggleTheme('recruiter')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  theme === 'recruiter'
                    ? 'bg-op-gold text-op-ink shadow-sm'
                    : 'text-op-cream/60 hover:text-op-cream'
                }`}
                title="Switch to Recruiter Theme (100% Professional & Standard)"
              >
                <Sun size={11} />
                <span className="hidden xs:inline">Recruiter</span>
              </button>

              <button
                onClick={() => onToggleTheme('viewer')}
                className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  theme === 'viewer'
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-op-cream/60 hover:text-op-cream'
                }`}
                title="Switch to One Piece Viewer Theme"
              >
                <Moon size={11} />
                <span className="hidden xs:inline">Anime</span>
              </button>
            </div>

            {/* Download Resume Button (Desktop) */}
            <a
              href="/Aranya_Bahuguna_Resume.pdf?v=latest"
              download="Aranya_Bahuguna_Resume.pdf"
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm transition-all ${
                isViewerMode && isHakiHardened
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-op-gold hover:bg-op-goldLight text-op-ink'
              }`}
              title="Download PDF Resume"
            >
              <Download size={12} />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-lg border transition-colors ${
                isViewerMode && isHakiHardened
                  ? 'bg-[#120326] border-purple-400/50 text-purple-200'
                  : 'bg-[#0b132b] border-op-gold/30 text-op-cream hover:text-op-gold'
              }`}
              title="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`lg:hidden border-b px-4 py-3 shadow-2xl backdrop-blur-xl ${
                isViewerMode && isHakiHardened
                  ? 'bg-[#080214]/98 border-purple-500/40 text-purple-200'
                  : 'bg-[#070c18]/98 border-op-gold/30'
              }`}
            >
              <div className="flex flex-col gap-1.5 font-mono text-xs">
                
                {/* Mobile Armament Haki Button (Viewer mode only) BEFORE "About" */}
                {isViewerMode && (
                  <button
                    onClick={() => {
                      handleToggleArmamentHaki();
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left mb-1 cursor-pointer ${
                      isHakiHardened
                        ? 'bg-purple-900/60 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                        : 'bg-[#18042c] border-purple-500/40 text-purple-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🖤</span>
                      <span className="font-cinzel font-bold">
                        {isHakiHardened ? 'Armament Haki (Active)' : 'Armament Haki Hardening'}
                      </span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">
                      {isHakiHardened ? 'DEACTIVATE' : 'ACTIVATE'}
                    </span>
                  </button>
                )}

                {/* Mobile Navigation Links */}
                {navLinks.map((link, idx) => {
                  const isUnlocked = hakiUnlocked.has(link.id);
                  const isSealed = isViewerMode && isHakiHardened && !isUnlocked;

                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link, idx)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isViewerMode && isHakiHardened
                          ? isSealed
                            ? 'bg-[#110222] border-purple-500/40 text-purple-200/80 hover:border-purple-400'
                            : 'bg-emerald-950/40 border-emerald-400/40 text-emerald-200 font-bold'
                          : 'bg-[#0b132b]/80 border-op-gold/20 text-op-cream hover:text-op-gold hover:border-op-gold'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{link.icon}</span>
                        <span className="font-cinzel font-bold">{link.label}</span>
                      </span>
                      <span className="text-[10px] font-mono">
                        {isViewerMode && isHakiHardened ? (
                          isSealed ? (
                            <span className="text-purple-300 flex items-center gap-1">
                              <Lock size={10} /> Sealed Challenge →
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle size={10} /> Open Domain →
                            </span>
                          )
                        ) : isViewerMode && link.effect ? (
                          'Launch Domain →'
                        ) : (
                          'Navigate →'
                        )}
                      </span>
                    </button>
                  );
                })}

                <a
                  href="/Aranya_Bahuguna_Resume.pdf?v=latest"
                  download="Aranya_Bahuguna_Resume.pdf"
                  className={`mt-1 p-2.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center shadow-md ${
                    isViewerMode && isHakiHardened
                      ? 'bg-purple-600 text-white'
                      : 'bg-op-gold text-op-ink'
                  }`}
                >
                  <Download size={13} />
                  <span>Download Resume (PDF)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;