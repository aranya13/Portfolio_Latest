import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecognizedCommand } from './VoiceCommandManager';
import { Zap, Sparkles, X } from 'lucide-react';

interface VoiceCommandPopupProps {
  command: RecognizedCommand | null;
  onDismiss: () => void;
}

export const VoiceCommandPopup: React.FC<VoiceCommandPopupProps> = ({ command, onDismiss }) => {
  return (
    <AnimatePresence>
      {command && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="fixed bottom-6 right-6 z-[99999] pointer-events-auto select-none"
        >
          <div
            className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl ${
              command.isFast
                ? 'bg-[#180312]/95 border-yellow-400/80 shadow-[0_0_35px_rgba(250,204,21,0.45)]'
                : 'bg-[#0a0216]/95 border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.35)]'
            }`}
            style={{
              boxShadow: command.isFast
                ? '0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(250,204,21,0.3)'
                : '0 10px 40px rgba(0,0,0,0.8), 0 0 25px rgba(239,68,68,0.25)',
            }}
          >
            {/* Command Icon Badge */}
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                command.isFast
                  ? 'bg-yellow-950/70 border-yellow-400/80 text-yellow-300'
                  : 'bg-red-950/70 border-red-500/80 text-red-300'
              }`}
            >
              {command.icon || (command.isFast ? <Zap size={18} /> : <Sparkles size={18} />)}
            </div>

            {/* Command Information */}
            <div className="pr-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[9px] font-mono font-bold tracking-widest uppercase ${
                    command.isFast ? 'text-yellow-300' : 'text-red-400'
                  }`}
                >
                  {command.displayTitle}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="font-cinzel font-bold text-sm text-white tracking-wider">
                {command.displaySubtitle}
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={onDismiss}
              className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceCommandPopup;
