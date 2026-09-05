import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Sparkles, Send, Shield, Compass, Swords, Skull, ExternalLink } from 'lucide-react';

import { AnimeEffectType } from './OnePieceNavEffects';
import { PortfolioTheme } from '../types';

interface GrandLineTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerAnimeEffect: (effect: AnimeEffectType) => void;
  onToggleTheme: (theme: PortfolioTheme) => void;
  onOpenAdminStudio?: () => void;
  currentTheme: PortfolioTheme;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  type: 'info' | 'success' | 'warn' | 'special';
}

export const GrandLineTerminal: React.FC<GrandLineTerminalProps> = ({
  isOpen,
  onClose,
  onTriggerAnimeEffect,
  onToggleTheme,
  onOpenAdminStudio,
  currentTheme,
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'welcome',
      output: (
        <div>
          <div className="text-op-gold font-bold mb-1">☠️ ONE PIECE GRAND LINE DEVELOPER TERMINAL v2.6</div>
          <div className="text-xs text-op-cream/80 leading-relaxed">
            Welcome, Voyager! Type <span className="text-op-gold font-bold">help</span> to view available commands, or type <span className="text-op-gold font-bold">linkedin</span>, <span className="text-op-gold font-bold">github</span>, <span className="text-op-gold font-bold">resume</span> to launch links.
          </div>
        </div>
      ),
      type: 'info',
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const logId = Date.now().toString();
    let responseNode: React.ReactNode = null;
    let logType: CommandLog['type'] = 'info';

    // Secret verification via base64 encoded token
    if (btoa(trimmed) === 'YXJhbnlhMTM3' && onOpenAdminStudio) {
      onClose();
      onOpenAdminStudio();
      return;
    }

    switch (trimmed) {
      case 'help':
        responseNode = (
          <div className="space-y-1 text-xs">
            <div className="text-op-gold font-bold mb-1.5">📜 AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
              <div><span className="text-op-gold font-bold">linkedin</span> - Launch Aranya's LinkedIn profile ↗</div>
              <div><span className="text-op-gold font-bold">github</span> - Launch Aranya's GitHub portfolio ↗</div>
              <div><span className="text-op-gold font-bold">resume</span> - Download/View Aranya's Resume PDF ↗</div>
              <div><span className="text-op-gold font-bold">skills</span> - Inspect technical capabilities</div>
              <div><span className="text-op-gold font-bold">projects</span> - View all production deployments</div>
              <div><span className="text-op-gold font-bold">bounty</span> - Check ₿3,000,000,000 bounty stats</div>
              <div><span className="text-op-gold font-bold">contact</span> - Open Den Den Mushi transponder</div>
              <div><span className="text-op-gold font-bold">luffy</span> - Trigger Gomu Gomu Skill Pull</div>
              <div><span className="text-op-gold font-bold">zoro</span> - Trigger Santoryu Slash Attack</div>
              <div><span className="text-op-gold font-bold">brook</span> - Play Binks' Sake Soul Melody</div>
              <div><span className="text-op-gold font-bold">nami</span> - Fire Clima-Tact Thunderbolt</div>
              <div><span className="text-op-gold font-bold">theme</span> - Toggle visual theme atmosphere</div>
              <div><span className="text-op-gold font-bold">clear</span> - Flush terminal screen buffer</div>
            </div>
          </div>
        );
        break;

      case 'linkedin':
        window.open('https://www.linkedin.com/in/aranya-bahuguna-40a7b4251/', '_blank');
        responseNode = (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ExternalLink size={13} />
            <span>Opened Aranya Bahuguna's LinkedIn Profile in a new browser tab!</span>
          </div>
        );
        logType = 'success';
        break;

      case 'github':
        window.open('https://github.com/aranya13', '_blank');
        responseNode = (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ExternalLink size={13} />
            <span>Opened Aranya's GitHub Profile (github.com/aranya13) in a new browser tab!</span>
          </div>
        );
        logType = 'success';
        break;

      case 'resume':
      case 'cv':
        window.open('/Aranya_Bahuguna_Resume.pdf?v=latest', '_blank');
        responseNode = (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ExternalLink size={13} />
            <span>Opened Aranya's Resume PDF in a new tab!</span>
          </div>
        );
        logType = 'success';
        break;

      case 'mail':
      case 'email':
        window.location.href = 'mailto:bahugunaaranya@gmail.com';
        responseNode = (
          <div className="text-xs font-mono text-emerald-400">
            ✉️ Opened email client for: bahugunaaranya@gmail.com
          </div>
        );
        logType = 'success';
        break;

      case 'skills':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-op-gold font-bold">⚡ TECHNICAL MASTERY:</div>
            <div className="text-op-cream/90 font-mono">
              • Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Framer Motion<br />
              • Backend: Node.js, Express, REST APIs, Socket.IO, Supabase, JWT RBAC<br />
              • Systems & AI: AES-256 Cryptography, YOLOv8 Vision, Python, Telemetry<br />
              • Databases: MongoDB, PostgreSQL, Mongoose Schema Optimization
            </div>
          </div>
        );
        logType = 'success';
        if (onTriggerAnimeEffect) onTriggerAnimeEffect('luffy');
        break;

      case 'projects':
        responseNode = (
          <div className="text-xs space-y-1">
            <div className="text-op-gold font-bold">⚔️ PRODUCTION DEPLOYMENTS:</div>
            <div className="text-op-cream/90 font-mono">
              1. SOS-Service Platform (AES-256 + YOLOv8 + Supabase)<br />
              2. Enterprise Inventory Hub (MERN Stack + RBAC)<br />
              3. AES Image Encryptor (Zero-Knowledge In-Browser Crypto)<br />
              4. Novel AI Studio (LLM Story Engine)<br />
              5. HPCL Telemetry Portal (Industrial Monitoring)<br />
              6. ISL Match Analytics (Real-Time Leaderboard)
            </div>
          </div>
        );
        logType = 'success';
        if (onTriggerAnimeEffect) onTriggerAnimeEffect('zoro');
        break;

      case 'bounty':
        responseNode = (
          <div className="text-xs space-y-1 font-mono">
            <div className="text-op-crimson font-bold text-sm">☠️ WORLD GOVERNMENT BOUNTY AUDIT:</div>
            <div className="text-op-cream">Target: Aranya Bahuguna</div>
            <div className="text-op-gold">Bounty: ₿ 3,000,000,000 (Dead or Alive)</div>
            <div className="text-op-slate text-[11px]">Specialization: Cryptographic Defense & Scalable Full-Stack Architectures</div>
          </div>
        );
        logType = 'special';
        break;

      case 'contact':
        responseNode = (
          <div className="text-xs space-y-1 font-mono">
            <div className="text-op-gold font-bold">🐚 DEN DEN MUSHI TRANSPONDER:</div>
            <div className="text-op-cream">Email: bahugunaaranya@gmail.com</div>
            <div className="text-op-cream">Phone / WhatsApp: +91 82181 54757</div>
            <div className="text-op-cream">GitHub: github.com/aranya13</div>
          </div>
        );
        logType = 'success';
        if (onTriggerAnimeEffect) onTriggerAnimeEffect('nami');
        break;

      case 'experience':
        responseNode = <div className="text-xs font-mono text-cyan-400">🎻 Launching Brook Soul King Experience domain...</div>;
        logType = 'special';
        if (onTriggerAnimeEffect) onTriggerAnimeEffect('brook');
        break;

      case 'luffy':
        responseNode = <div className="text-xs font-mono text-red-400">👒 Gomu Gomu no Mi signature move activated!</div>;
        logType = 'special';
        onTriggerAnimeEffect('luffy');
        break;

      case 'zoro':
        responseNode = <div className="text-xs font-mono text-emerald-400">⚔️ Santoryu Rengoku Onigiri slash executed!</div>;
        logType = 'special';
        onTriggerAnimeEffect('zoro');
        break;

      case 'brook':
        responseNode = <div className="text-xs font-mono text-cyan-400">🎻 Yo-ho-ho-ho! Playing Binks' Sake soul melody!</div>;
        logType = 'special';
        onTriggerAnimeEffect('brook');
        break;

      case 'nami':
        responseNode = <div className="text-xs font-mono text-amber-400">⚡ Thunderbolt Tempo struck the transponder!</div>;
        logType = 'special';
        onTriggerAnimeEffect('nami');
        break;

      case 'theme':
        const nextTheme = currentTheme === 'recruiter' ? 'viewer' : 'recruiter';
        onToggleTheme(nextTheme);
        responseNode = (
          <div className="text-xs font-mono text-op-gold">
            🌗 Visual atmosphere switched to: <strong className="uppercase">{nextTheme}</strong>
          </div>
        );
        logType = 'success';
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'easteregg':
      case 'onepiece':
        responseNode = (
          <div className="text-xs font-mono text-op-gold leading-relaxed">
            🍖 "If you don't take risks, you can't create a future!" — Monkey D. Luffy<br />
            Aranya Bahuguna is ready to join your engineering crew and navigate any tech stack!
          </div>
        );
        logType = 'special';
        break;

      default:
        responseNode = (
          <div className="text-xs font-mono text-red-400">
            Command not recognized: "{cmdStr}". Type <span className="text-op-gold font-bold">help</span>, <span className="text-op-gold font-bold">linkedin</span>, or <span className="text-op-gold font-bold">github</span>.
          </div>
        );
        logType = 'warn';
    }

    setHistory((prev) => [
      ...prev,
      {
        id: logId,
        command: cmdStr,
        output: responseNode,
        type: logType,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRunCommand(input);
    }
  };

  const quickCommands = ['help', 'linkedin', 'github', 'skills', 'projects', 'resume', 'bounty', 'theme'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99995] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Terminal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-2xl bg-[#060a14] border-2 border-op-gold/50 rounded-2xl shadow-[0_0_50px_rgba(224,169,59,0.3)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Terminal Titlebar */}
            <div className="px-4 py-3 bg-[#0a1024] border-b border-op-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-1.5 ml-3 font-mono text-xs text-op-gold font-bold">
                  <TerminalIcon size={14} />
                  <span>grand-line-den-den-cli ~ v2.6</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-op-cream/50 hidden sm:inline">
                  Press ESC to close
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-op-gold/20 text-op-cream/80 hover:text-op-gold transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="px-3 sm:px-4 py-2 bg-[#080d1c] border-b border-op-gold/20 flex items-center gap-1.5 text-[11px] font-mono overflow-x-auto">
              <span className="text-op-gold/70 mr-1 shrink-0">Quick:</span>
              {quickCommands.map((q) => (
                <button
                  key={q}
                  onClick={() => handleRunCommand(q)}
                  className="px-2 py-0.5 rounded bg-[#0b132b] hover:bg-op-gold hover:text-op-ink border border-op-gold/30 text-op-gold transition-colors cursor-pointer shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Terminal Screen Body */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 font-mono text-xs space-y-3 selection:bg-op-gold selection:text-op-ink">
              {history.map((h) => (
                <div key={h.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-op-gold/80">
                    <span className="text-emerald-400">pirate@grand-line:~$</span>
                    <span className="text-op-cream font-bold">{h.command}</span>
                  </div>
                  <div className="pl-4 py-1 border-l-2 border-op-gold/30 bg-[#090e1f]/50 rounded-r-lg p-2">
                    {h.output}
                  </div>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            {/* Command Input Bar */}
            <div className="p-3 bg-[#0a1024] border-t border-op-gold/30 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs font-bold pl-2">
                pirate@grand-line:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command ('help', 'linkedin', 'github', 'skills')..."
                className="flex-1 bg-transparent text-op-cream font-mono text-xs outline-none placeholder:text-op-cream/40"
              />
              <button
                onClick={() => handleRunCommand(input)}
                className="px-3 py-1.5 rounded-lg bg-op-gold hover:bg-op-goldLight text-op-ink font-mono font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <Send size={12} />
                <span>Run</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GrandLineTerminal;
