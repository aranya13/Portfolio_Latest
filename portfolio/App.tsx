import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LandingGate from './components/LandingGate';

// Lazy-loaded Viewer & Studio Components
const GrandLineTerminal = lazy(() => import('./components/GrandLineTerminal'));
const ZoroProjectDomain = lazy(() => import('./components/ZoroProjectDomain'));
const LuffySkillDomain = lazy(() => import('./components/LuffySkillDomain'));
const BrookExperienceDomain = lazy(() => import('./components/BrookExperienceDomain'));
const NamiContactDomain = lazy(() => import('./components/NamiContactDomain'));
const AdminStudio = lazy(() => import('./components/AdminStudio'));
const ObservationHakiVision = lazy(() => import('./components/ObservationHakiVision'));

import {
  HakiPuzzleModal,
  hakiDomainCards,
  pickPuzzleForIndex,
  playHakiActivate,
} from './components/ArmamentHakiMode';

import VoiceCommandPopup from './components/VoiceCommandPopup';
import VoiceControlIndicator from './components/VoiceControlIndicator';
import { useVoiceCommands } from './components/useVoiceCommands';
import { RecognizedCommand, playConquerorHakiAudio } from './components/VoiceCommandManager';
import { CustomCursor, PhotographicBackground } from './components/LayoutEffects';
import { AnimeEffectType } from './components/OnePieceNavEffects';

import { PortfolioTheme } from './types';
import { motion, AnimatePresence } from 'framer-motion';

// ── Smooth section scroll ───────────────────────────────────────────────────
function smoothScrollTo(targetY: number, duration = 500) {
  const start = window.scrollY;
  const diff = targetY - start;
  const startTime = performance.now();
  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(now: number) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + diff * easeInOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  smoothScrollTo(top);
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};
const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut',
};

export function App() {
  const [viewState, setViewState] = useState<'gate' | 'portfolio' | 'admin'>('gate');
  const [theme, setTheme] = useState<PortfolioTheme>('recruiter');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  // Character Domain Flow States in Viewer Mode: 'idle' | 'domain'
  const [activeViewerDomain, setActiveViewerDomain] = useState<'luffy' | 'zoro' | 'brook' | 'nami' | null>(null);

  // Armament Haki flow: 'idle' | 'domain'
  const [isArmamentHakiActive, setIsArmamentHakiActive] = useState<boolean>(false);
  const [hakiUnlocked, setHakiUnlocked] = useState<Set<string>>(new Set());
  const [hakiActivePuzzle, setHakiActivePuzzle] = useState<{
    card: (typeof hakiDomainCards)[0];
    puzzle: ReturnType<typeof pickPuzzleForIndex>;
    strikesLeft: number;
    failed: boolean;
  } | null>(null);

  // Conqueror's Haki State (Viewer Mode Only)
  const [isConquerorHakiAtmosphere, setIsConquerorHakiAtmosphere] = useState(false);

  // Observation Haki toggle state (to pass down to ObservationHakiVision)
  const [observationHakiRequested, setObservationHakiRequested] = useState(false);

  // Continuous Smooth Auto-Scrolling Engine
  const scrollAnimRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef<number>(0);

  const stopAutoScroll = useCallback(() => {
    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
      scrollAnimRef.current = null;
    }
    scrollSpeedRef.current = 0;
  }, []);

  const startAutoScroll = useCallback((speed: number) => {
    stopAutoScroll();
    scrollSpeedRef.current = speed;

    const scrollLoop = () => {
      if (Math.abs(scrollSpeedRef.current) > 0) {
        window.scrollBy({ top: scrollSpeedRef.current, behavior: 'auto' });
        scrollAnimRef.current = requestAnimationFrame(scrollLoop);
      }
    };
    scrollAnimRef.current = requestAnimationFrame(scrollLoop);
  }, [stopAutoScroll]);

  useEffect(() => {
    const handleUserInterrupt = () => {
      if (scrollSpeedRef.current !== 0) {
        stopAutoScroll();
      }
    };
    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  const resetAllViewerDomains = useCallback(() => {
    setActiveViewerDomain(null);
    setIsArmamentHakiActive(false);
    setHakiUnlocked(new Set());
    setHakiActivePuzzle(null);
  }, []);

  const handleVoiceCommand = useCallback((command: RecognizedCommand) => {
    if (theme !== 'viewer') return;

    switch (command.action) {
      case 'ACTIVATE_HAKI':
        playConquerorHakiAudio();
        setIsConquerorHakiAtmosphere(true);
        break;

      case 'NAV_FAST_SKILLS':
      case 'NAV_SKILLS':
        stopAutoScroll();
        setActiveViewerDomain('luffy');
        break;

      case 'NAV_FAST_PROJECTS':
      case 'NAV_PROJECTS':
        stopAutoScroll();
        setActiveViewerDomain('zoro');
        break;

      case 'NAV_FAST_EXPERIENCE':
      case 'NAV_EXPERIENCE':
        stopAutoScroll();
        setActiveViewerDomain('brook');
        break;

      case 'NAV_FAST_CONTACT':
      case 'NAV_CONTACT':
        stopAutoScroll();
        setActiveViewerDomain('nami');
        break;

      case 'NAV_ABOUT':
        stopAutoScroll();
        resetAllViewerDomains();
        scrollToSection('about');
        break;

      case 'NAV_HOME':
        stopAutoScroll();
        resetAllViewerDomains();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsConquerorHakiAtmosphere(false);
        break;

      case 'SCROLL_DOWN':
        startAutoScroll(2.5);
        break;

      case 'SCROLL_UP':
        startAutoScroll(-2.5);
        break;

      case 'STOP_SCROLL':
        stopAutoScroll();
        break;

      case 'CLICK_ELEMENT':
        break;
    }
  }, [theme, startAutoScroll, stopAutoScroll, resetAllViewerDomains]);

  const {
    permissionState: voicePermissionState,
    isListening: isVoiceListening,
    activePopup: voicePopup,
    errorMessage: voiceError,
    transcriptLive,
    startVoiceControl,
    stopVoiceControl,
    dismissPopup,
    dismissError,
  } = useVoiceCommands({
    onCommandRecognized: handleVoiceCommand,
    isHakiActive: isConquerorHakiAtmosphere,
  });

  useEffect(() => {
    if (theme === 'recruiter') {
      setIsConquerorHakiAtmosphere(false);
      stopVoiceControl();
    }
  }, [theme, stopVoiceControl]);

  const isAnyDomainActive = theme === 'viewer' && activeViewerDomain !== null;

  useEffect(() => {
    if (viewState !== 'portfolio' || isAnyDomainActive) return;

    const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
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

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [viewState, isAnyDomainActive]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'k' || e.key === 'K' || e.key === '/') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setTheme((prev) => {
          const next = prev === 'recruiter' ? 'viewer' : 'recruiter';
          if (next === 'recruiter') resetAllViewerDomains();
          return next;
        });
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        resetAllViewerDomains();
      } else if (e.key === '1') {
        resetAllViewerDomains();
        scrollToSection('about');
      } else if (e.key === '2') {
        resetAllViewerDomains();
        if (theme === 'viewer') {
          setActiveViewerDomain('luffy');
        } else {
          scrollToSection('skills');
        }
      } else if (e.key === '3') {
        resetAllViewerDomains();
        if (theme === 'viewer') {
          setActiveViewerDomain('zoro');
        } else {
          scrollToSection('projects');
        }
      } else if (e.key === '4') {
        resetAllViewerDomains();
        if (theme === 'viewer') {
          setActiveViewerDomain('brook');
        } else {
          scrollToSection('experience');
        }
      } else if (e.key === '5') {
        resetAllViewerDomains();
        if (theme === 'viewer') {
          setActiveViewerDomain('nami');
        } else {
          scrollToSection('contact');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, isAnyDomainActive, resetAllViewerDomains]);

  const handleSelectThemeFromGate = (selectedTheme: PortfolioTheme) => {
    setTheme(selectedTheme);
    setViewState('portfolio');
    resetAllViewerDomains();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleTheme = (newTheme: PortfolioTheme) => {
    setTheme(newTheme);
    if (newTheme === 'recruiter') {
      resetAllViewerDomains();
    }
  };

  const handleTriggerAnimeEffect = useCallback((effect: AnimeEffectType) => {
    if (effect && theme === 'viewer') {
      resetAllViewerDomains();
      setActiveViewerDomain(effect);
    } else if (effect) {
      scrollToSection(
        effect === 'luffy'
          ? 'skills'
          : effect === 'zoro'
          ? 'projects'
          : effect === 'brook'
          ? 'experience'
          : 'contact'
      );
    }
  }, [theme, resetAllViewerDomains]);

  const handleSelectSkillFilter = (skill: string) => {
    setActiveSkillFilter((prev) => (prev === skill ? null : skill));
    if (theme === 'viewer') {
      setActiveViewerDomain('zoro');
    } else {
      scrollToSection('projects');
    }
  };

  return (
    <div className="min-h-screen relative bg-[#070a12] text-op-cream font-sans overflow-x-hidden selection:bg-op-gold selection:text-op-ink">
      <CustomCursor />
      <PhotographicBackground theme={theme} />

      {/* Voice Control Status & Indicator Pill (Viewer Only) */}
      {theme === 'viewer' && (
        <VoiceControlIndicator
          permissionState={voicePermissionState}
          isListening={isVoiceListening}
          isHakiActive={isConquerorHakiAtmosphere}
          transcriptLive={transcriptLive}
          errorMessage={voiceError}
          onStartListening={startVoiceControl}
          onStopListening={stopVoiceControl}
          onDismissError={dismissError}
        />
      )}

      {/* Voice Command Confirmation Toast Popup */}
      <VoiceCommandPopup command={voicePopup} onDismiss={dismissPopup} />

      {/* Armament Haki Ryuo Core Breaker Modal */}
      {isArmamentHakiActive && hakiActivePuzzle && (
        <HakiPuzzleModal
          domainCard={hakiActivePuzzle.card}
          onSolved={() => {
            const cardId = hakiActivePuzzle.card.id;
            const effect = hakiActivePuzzle.card.domainEffect;
            setHakiUnlocked((prev) => new Set([...prev, cardId]));
            setHakiActivePuzzle(null);
            setIsArmamentHakiActive(false);
            handleTriggerAnimeEffect(effect);
          }}
          onClose={() => setHakiActivePuzzle(null)}
        />
      )}

      {/* Grand Line Developer CLI Terminal */}
      <Suspense fallback={null}>
        <GrandLineTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          onTriggerAnimeEffect={handleTriggerAnimeEffect}
          onToggleTheme={handleToggleTheme}
          onOpenAdminStudio={() => setViewState('admin')}
          currentTheme={theme}
        />
      </Suspense>

      {/* Observation Haki Vision Hand Gesture Controller — VIEWER ONLY */}
      {viewState === 'portfolio' && theme === 'viewer' && (
        <Suspense fallback={null}>
          <ObservationHakiVision
            externalToggle={observationHakiRequested}
            onTriggerAction={(action) => {
              if (isAnyDomainActive) {
                resetAllViewerDomains();
                return;
              }
              if (isTerminalOpen) {
                setIsTerminalOpen(false);
                return;
              }
              const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
              const currentIndex = Math.max(0, sections.indexOf(activeSection));
              if (action === 'next') {
                const nextIndex = Math.min(sections.length - 1, currentIndex + 1);
                scrollToSection(sections[nextIndex]);
              } else if (action === 'prev') {
                if (currentIndex === 0) {
                  smoothScrollTo(0);
                } else {
                  scrollToSection(sections[Math.max(0, currentIndex - 1)]);
                }
              }
            }}
          />
        </Suspense>
      )}

      <AnimatePresence mode="wait">
        {viewState === 'gate' ? (
          <motion.div
            key="landing-gate-screen"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <LandingGate onSelectTheme={handleSelectThemeFromGate} />
          </motion.div>
        ) : viewState === 'admin' ? (
          <motion.div
            key="admin-studio-screen"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#070a12]" />}>
              <AdminStudio onBackToPortfolio={() => setViewState('portfolio')} />
            </Suspense>
          </motion.div>
        ) : theme === 'viewer' && activeViewerDomain === 'luffy' ? (
          <motion.div
            key="luffy-skills-domain"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#070a12]" />}>
              <LuffySkillDomain
                onBackToMain={resetAllViewerDomains}
                onSelectSkillFilter={handleSelectSkillFilter}
              />
            </Suspense>
          </motion.div>
        ) : theme === 'viewer' && activeViewerDomain === 'zoro' ? (
          <motion.div
            key="zoro-projects-domain"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#070a12]" />}>
              <ZoroProjectDomain
                onBackToMain={resetAllViewerDomains}
              />
            </Suspense>
          </motion.div>
        ) : theme === 'viewer' && activeViewerDomain === 'brook' ? (
          <motion.div
            key="brook-experience-domain"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#070a12]" />}>
              <BrookExperienceDomain
                onBackToMain={resetAllViewerDomains}
              />
            </Suspense>
          </motion.div>
        ) : theme === 'viewer' && activeViewerDomain === 'nami' ? (
          <motion.div
            key="nami-contact-domain"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-20"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#070a12]" />}>
              <NamiContactDomain onBackToMain={resetAllViewerDomains} />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="portfolio-content-screen"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="relative z-10"
            style={{
              filter: isConquerorHakiAtmosphere
                ? 'brightness(0.78) contrast(1.1) saturate(1.1)'
                : 'none',
              transition: 'filter 0.5s ease',
            }}
          >
            <Navbar
              theme={theme}
              onToggleTheme={handleToggleTheme}
              onTriggerAnimeEffect={handleTriggerAnimeEffect}
              onOpenTerminal={() => setIsTerminalOpen(true)}
            />

            <main>
              <Hero
                theme={theme}
                onTriggerAnimeEffect={handleTriggerAnimeEffect}
                onOpenTerminal={() => setIsTerminalOpen(true)}
                onToggleVoiceControl={isVoiceListening ? stopVoiceControl : startVoiceControl}
                isVoiceListening={isVoiceListening}
                isHakiActive={isConquerorHakiAtmosphere}
                onToggleObservationHaki={() => {
                  // ObservationHakiVision mounts for viewer mode; we signal via a state
                  setObservationHakiRequested((prev) => !prev);
                }}
                isObservationHakiActive={observationHakiRequested}
              />

              <About theme={theme} />

              {theme === 'recruiter' && (
                <>
                  <Skills
                    theme={theme}
                    onSelectSkillFilter={handleSelectSkillFilter}
                  />

                  <Projects
                    theme={theme}
                    activeSkillFilter={activeSkillFilter}
                    onClearSkillFilter={() => setActiveSkillFilter(null)}
                  />

                  <Contact theme={theme} />
                </>
              )}
            </main>

            <footer className="py-8 pb-24 border-t border-op-gold/20 bg-[#050914]/95 text-center text-xs font-mono text-op-cream/70 relative z-20">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-op-gold font-pirate text-lg">👒</span>
                  <span>Aranya Bahuguna • Full Stack Software Engineer</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-op-gold/80">
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#0b132b] border border-op-gold/30 text-op-gold">K</kbd> for CLI</span>
                  <span>•</span>
                  <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#0b132b] border border-op-gold/30 text-op-gold">T</kbd> for Theme</span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;