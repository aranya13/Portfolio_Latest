import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Eye, Sun, Moon, ArrowRight, Anchor, ShieldCheck, Sparkles } from 'lucide-react';
import { PortfolioTheme } from '../types';

interface LandingGateProps {
  onSelectTheme: (theme: PortfolioTheme) => void;
}

export const LandingGate: React.FC<LandingGateProps> = ({ onSelectTheme }) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden bg-[#070a12]">
      
      {/* Background Dim Scrim */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#0b132b] border border-op-gold/40 text-op-gold font-mono text-xs uppercase tracking-widest mb-6"
        >
          <ShieldCheck size={13} />
          <span>Full Stack & Cryptography Software Engineer</span>
          <ShieldCheck size={13} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-tight text-op-cream mb-2 sm:mb-3 break-words"
        >
          Aranya Bahuguna
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-base font-mono text-op-gold font-medium max-w-xl mb-6 sm:mb-10 px-2"
        >
          Full Stack Software Engineer & Systems Architect • B.Tech CSE Scholar @ VIT Bhopal
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-xs font-mono uppercase tracking-widest text-op-cream/70 mb-6"
        >
          Select Your Preferred Portfolio Experience
        </motion.div>

        {/* TWO THEME SELECTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-8">
          
          {/* THEME 1: RECRUITER THEME (SUNRISE OCEAN) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => onSelectTheme('recruiter')}
            className="scrim-card rounded-2xl p-6 sm:p-8 text-left cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-op-gold group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-op-gold/20 border border-op-gold/50 flex items-center justify-center text-op-gold">
                  <Sun size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-op-gold text-op-ink">
                  Professional Mode
                </span>
              </div>

              <h2 className="font-cinzel font-bold text-2xl text-op-cream group-hover:text-op-gold transition-colors mb-2">
                Recruiter Theme
              </h2>

              <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-6">
                Clean, executive layout with professional portrait profile card, verified engineering credentials, and high-contrast technical benchmarks.
              </p>
            </div>

            <div className="pt-4 border-t border-op-gold/20 flex items-center justify-between text-xs font-cinzel font-bold text-op-gold group-hover:text-op-goldLight">
              <span>Launch Recruiter View</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* THEME 2: VIEWER THEME (NIGHT SEA & ONE PIECE ADVENTURE) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onClick={() => onSelectTheme('viewer')}
            className="scrim-card rounded-2xl p-6 sm:p-8 text-left cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 group relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-300">
                  <Moon size={24} />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-blue-500 text-white">
                  One Piece Mode
                </span>
              </div>

              <h2 className="font-cinzel font-bold text-2xl text-op-cream group-hover:text-blue-300 transition-colors mb-2">
                Viewer Theme
              </h2>

              <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-6">
                Deep midnight ocean aesthetic with 3D Wanted bounty poster, Straw Hat crew quick action dock, and anime signature move VFX overlays.
              </p>
            </div>

            <div className="pt-4 border-t border-op-gold/20 flex items-center justify-between text-xs font-cinzel font-bold text-blue-300 group-hover:text-white">
              <span>Launch Anime View</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default LandingGate;
