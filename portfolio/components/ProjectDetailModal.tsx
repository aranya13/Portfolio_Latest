import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ShieldCheck, CheckCircle2, Cpu, Database, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99992] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative z-10 w-full max-w-3xl bg-[#090e1f] border-2 border-op-gold/50 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0d142b] border-b border-op-gold/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-op-gold text-op-ink font-mono text-xs font-bold uppercase">
                {project.category}
              </span>
              <div>
                <h2 className="font-cinzel font-bold text-xl sm:text-2xl text-op-cream">
                  {project.title}
                </h2>
                <div className="text-xs font-mono text-op-gold">
                  Role: <span className="text-op-cream/90">{project.myRole}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-op-gold/20 text-op-cream/80 hover:text-op-gold transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-5 py-2.5 bg-[#0b1227] border-b border-op-gold/20 flex gap-2 overflow-x-auto font-mono text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-op-gold text-op-ink font-bold'
                  : 'text-op-cream/70 hover:text-op-cream'
              }`}
            >
              Overview & Impact
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-op-gold text-op-ink font-bold'
                  : 'text-op-cream/70 hover:text-op-cream'
              }`}
            >
              Architecture & Security
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'features'
                  ? 'bg-op-gold text-op-ink font-bold'
                  : 'text-op-cream/70 hover:text-op-cream'
              }`}
            >
              Key Engineering Features
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
            {/* Project Image Banner */}
            <div className="relative aspect-[16/8] rounded-xl overflow-hidden border border-op-gold/30 bg-[#060a14] shadow-inner">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090e1f] via-transparent to-transparent opacity-60" />
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-op-gold tracking-wider mb-1">
                    System Problem Statement
                  </h4>
                  <p className="text-sm text-op-cream/90 font-sans leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-op-gold tracking-wider mb-1">
                    Technical Solution Summary
                  </h4>
                  <p className="text-sm text-op-cream/85 font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {project.metrics && (
                  <div className="p-3.5 rounded-xl bg-[#0e1733] border border-emerald-500/40 flex items-center gap-3">
                    <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                        Production Benchmark / Impact
                      </div>
                      <div className="text-xs font-mono text-op-cream">{project.metrics}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-[#060a14] border border-op-gold/30 space-y-2">
                  <div className="text-op-gold font-bold text-sm">🛠️ System Architecture Stack:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-2.5 rounded bg-[#0b132b] border border-op-slate/30">
                      <div className="text-op-gold font-bold mb-1 flex items-center gap-1.5">
                        <Layers size={13} /> Layer 1: Presentation
                      </div>
                      <div className="text-op-cream/80 text-[11px]">
                        React, Tailwind CSS, Responsive UI State, Web Workers
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#0b132b] border border-op-slate/30">
                      <div className="text-op-gold font-bold mb-1 flex items-center gap-1.5">
                        <Cpu size={13} /> Layer 2: Compute & Security
                      </div>
                      <div className="text-op-cream/80 text-[11px]">
                        Node.js / Express, Web Crypto API AES-256, YOLOv8 Vision
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#0b132b] border border-op-slate/30">
                      <div className="text-op-gold font-bold mb-1 flex items-center gap-1.5">
                        <Database size={13} /> Layer 3: Persistence
                      </div>
                      <div className="text-op-cream/80 text-[11px]">
                        MongoDB / Supabase Realtime, Schema Validation & Indexing
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#0b132b] border border-op-slate/30">
                      <div className="text-op-gold font-bold mb-1 flex items-center gap-1.5">
                        <ShieldCheck size={13} /> Layer 4: RBAC & Auth
                      </div>
                      <div className="text-op-cream/80 text-[11px]">
                        Role-Based Access Control, JWT Bearer tokens, Zero-Knowledge
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-op-gold tracking-wider">
                  Engineered Feature Specifications:
                </h4>
                {project.keyFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#0b132b] border border-op-gold/25 flex items-start gap-2.5"
                  >
                    <CheckCircle2 size={16} className="text-op-gold shrink-0 mt-0.5" />
                    <span className="text-xs font-sans text-op-cream/90">{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div>
              <div className="text-[11px] font-mono text-op-gold uppercase mb-2">Technologies Used:</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#0b132b] border border-op-gold/30 text-op-gold text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-3.5 sm:p-4 bg-[#0d142b] border-t border-op-gold/30 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#0b132b] border border-op-slate/40 text-op-cream/80 hover:text-op-gold text-xs font-mono cursor-pointer text-center"
            >
              Close Window
            </button>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all text-center"
            >
              <Github size={14} />
              <span>Open GitHub Repository</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
