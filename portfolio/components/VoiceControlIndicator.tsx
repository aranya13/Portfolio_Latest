import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, AlertCircle, X, Crown, Volume2 } from 'lucide-react';
import { VoicePermissionState } from './VoiceCommandManager';

interface VoiceControlIndicatorProps {
  permissionState: VoicePermissionState;
  isListening: boolean;
  isHakiActive: boolean;
  transcriptLive?: string;
  errorMessage: string | null;
  onStartListening: () => void;
  onStopListening: () => void;
  onDismissError: () => void;
}

export const VoiceControlIndicator: React.FC<VoiceControlIndicatorProps> = ({
  permissionState,
  isListening,
  isHakiActive,
  transcriptLive,
  errorMessage,
  onStartListening,
  onStopListening,
  onDismissError,
}) => {
  return (
    <>
      {/* ── ERROR / PERMISSION DENIED TOAST ── */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-4 max-w-md mx-auto z-[99998] pointer-events-auto"
          >
            <div className="p-3.5 rounded-2xl bg-[#14020a]/95 border border-red-500/50 shadow-[0_8px_32px_rgba(0,0,0,0.8)] text-xs font-mono text-red-200 flex items-start justify-between gap-3 backdrop-blur-xl">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-red-300 uppercase tracking-wider mb-0.5">
                    Voice Control Notice
                  </div>
                  <div className="text-red-200/80 leading-relaxed">{errorMessage}</div>
                </div>
              </div>
              <button
                onClick={onDismissError}
                className="p-1 rounded-lg text-red-400/60 hover:text-red-200 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SUBTLE LISTENING STATUS PILL (Top-Center or Floating) ── */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 25 }}
            className="fixed top-16 sm:top-20 inset-x-0 mx-auto w-fit z-[99995] pointer-events-auto select-none"
          >
            <div
              className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border shadow-xl backdrop-blur-xl transition-all ${
                isHakiActive
                  ? 'bg-[#12001e]/90 border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.3)] text-red-200'
                  : 'bg-[#080b18]/90 border-op-gold/40 shadow-[0_0_20px_rgba(224,169,59,0.25)] text-op-cream'
              }`}
            >
              {/* Mic / Crown Icon */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  isHakiActive ? 'bg-red-950/80 text-red-400' : 'bg-op-gold/20 text-op-gold'
                }`}
              >
                {isHakiActive ? <Crown size={12} /> : <Mic size={12} className="animate-pulse" />}
              </div>

              {/* Status Text & Dynamic Audio Waveform */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
                  {isHakiActive ? 'CONQUEROR VOICE CONTROL' : 'LISTENING: SAY "RESUME" / "RETURN"'}
                </span>

                {/* Animated 3-Bar Audio Waves */}
                <div className="flex items-center gap-0.5 h-3">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['4px', '12px', '4px'] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
                      className={`w-1 rounded-full ${isHakiActive ? 'bg-red-500' : 'bg-op-gold'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Live transcript preview if user is currently speaking */}
              {transcriptLive && (
                <span className="hidden sm:inline-block text-[10px] font-mono text-white/70 max-w-[140px] truncate border-l border-white/20 pl-2">
                  "{transcriptLive}"
                </span>
              )}

              {/* Stop Listening Button */}
              <button
                onClick={onStopListening}
                className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer ml-1"
                title="Deactivate Voice Control"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceControlIndicator;
