import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Briefcase, GraduationCap, CheckCircle2, ArrowLeft, Sparkles, Terminal, Award, Compass, Shuffle, Rocket, Globe, ShieldCheck, Layers, Cpu } from 'lucide-react';
import { Experience } from '../types';

interface BrookExperienceDomainProps {
  onBackToMain: () => void;
}

interface ExperienceCardItem {
  id: string;
  category: 'space' | 'fullstack' | 'academic';
  categoryTag: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  icon: React.ReactNode;
  summary: string;
  highlights: string[];
  skills: string[];
  accentColor: string;
}

const experienceLogos = [
  { name: 'Indian Space Lab', icon: '🚀', tag: 'ISL • Space Telemetry' },
  { name: 'VIT Bhopal University', icon: '🎓', tag: 'B.Tech CSE \'26' },
  { name: 'SOS Emergency Dispatch', icon: '🛡️', tag: 'AES-256 + YOLOv8' },
  { name: 'Enterprise Inventory', icon: '📦', tag: 'RBAC Sync Hub' },
  { name: 'HPCL Fuel Analytics', icon: '⛽', tag: 'Industrial Telemetry' },
  { name: 'Novel AI Studio', icon: '🧠', tag: 'LLM Prompt Chaining' },
  { name: 'Python Flight Dynamics', icon: '🐍', tag: 'UAV Trajectory Math' },
  { name: 'Client-Side Crypto', icon: '🔒', tag: 'Zero-Knowledge Security' },
];

const initialExperiences: ExperienceCardItem[] = [
  {
    id: 'isl-intern',
    category: 'space',
    categoryTag: 'SPACE TECH • UAV TELEMETRY',
    role: 'Learning Intern — Flight Dynamics',
    organization: 'Indian Space Lab (ISL)',
    period: 'Dec 2023 – Jan 2024',
    location: 'India',
    icon: <Rocket size={20} className="text-cyan-400" />,
    summary: 'Engineered computational flight dynamics and real-time telemetry processing modules for unmanned aerial vehicles (UAVs).',
    highlights: [
      'Developed Python mathematical simulation scripts for trajectory optimization and flight stability.',
      'Collaborated on real-time sensor data aggregation pipelines using modular computational architectures.',
    ],
    skills: ['Python', 'Simulation & Math', 'Telemetry Streams', 'Data Analytics'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'lead-architect',
    category: 'fullstack',
    categoryTag: 'FULL STACK • SYSTEMS ARCHITECT',
    role: 'Lead Full Stack Engineer',
    organization: 'Open-Source & Academic Initiatives',
    period: '2022 – Present',
    location: 'VIT Bhopal University',
    icon: <Briefcase size={20} className="text-cyan-400" />,
    summary: 'Architected and deployed production web applications, zero-knowledge client-side encryption suites, and real-time dashboard systems.',
    highlights: [
      'Engineered SOS-Service emergency dispatch with client-side AES-256 encryption and YOLOv8 fire hazard severity visual detection.',
      'Designed end-to-end RBAC Inventory Management hub synchronizing multi-location stock in real time.',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'AES-256', 'Supabase'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'academic-degree',
    category: 'academic',
    categoryTag: 'ACADEMIC • B.TECH CSE',
    role: 'B.Tech Computer Science Scholar',
    organization: 'VIT Bhopal University',
    period: '2021 – 2025/2026',
    location: 'Bhopal, India',
    icon: <GraduationCap size={20} className="text-cyan-400" />,
    summary: 'Final-year Computer Science & Engineering Scholar with specialization in Full Stack Architecture, Data Structures, and Cryptography.',
    highlights: [
      'Core coursework in Distributed Systems, Data Structures & Algorithms, and Cryptography.',
      'Demonstrated track record of delivering end-to-end full-stack systems from first-principles thinking.',
    ],
    skills: ['Data Structures', 'Algorithms', 'Distributed Systems', 'Cryptography', 'Networks'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'hpcl-telemetry',
    category: 'fullstack',
    categoryTag: 'ENTERPRISE • INDUSTRIAL TELEMETRY',
    role: 'Industrial Dashboard Engineer',
    organization: 'HPCL Fuel Analytics Initiative',
    period: '2024',
    location: 'Industrial Energy Hub',
    icon: <Cpu size={20} className="text-cyan-400" />,
    summary: 'Engineered high-concurrency industrial analytics dashboard for Hindustan Petroleum Corporation Limited (HPCL) dispensing telemetry.',
    highlights: [
      'Aggregated multi-station dispensing tank telemetry into unified live monitoring portal.',
      'Optimized real-time status query performance and alert notification triggers.',
    ],
    skills: ['React', 'Node.js', 'Telemetry Monitoring', 'Data Aggregation'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'crypto-systems',
    category: 'space',
    categoryTag: 'SECURITY • CLIENT-SIDE CRYPTO',
    role: 'Cryptography Systems Engineer',
    organization: 'AES In-Browser Pixel Array Project',
    period: '2023 – 2024',
    location: 'Research Suite',
    icon: <ShieldCheck size={20} className="text-cyan-400" />,
    summary: 'Created high-performance cryptographic web utility implementing AES-256 algorithms to scramble and decrypt high-resolution raw image matrices.',
    highlights: [
      'Direct Canvas ArrayBuffer byte manipulation for rapid in-memory encryption.',
      'Zero server roundtrips — all cryptographic operations executed locally in client RAM.',
    ],
    skills: ['AES-256 CBC', 'HTML5 Canvas', 'Web Crypto API', 'Memory Optimization'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
  {
    id: 'novel-ai',
    category: 'academic',
    categoryTag: 'AI & ML • PROMPT ENGINEERING',
    role: 'AI Systems & Branching Lead',
    organization: 'Novel AI Studio Initiative',
    period: '2024',
    location: 'AI Research Project',
    icon: <Layers size={20} className="text-cyan-400" />,
    summary: 'Engineered AI authoring platform combining prompt-chained LLMs with custom user story arcs, dynamic character profiling, and JWT document persistence.',
    highlights: [
      'Structured prompt chaining with branching interactive story graph nodes.',
      'Dynamic character profile memory injected into structured LLM prompt context.',
    ],
    skills: ['React', 'Node.js', 'LLM Prompt Chaining', 'JWT Security'],
    accentColor: 'border-cyan-400/30 hover:border-cyan-400/60',
  },
];

export const BrookExperienceDomain: React.FC<BrookExperienceDomainProps> = ({
  onBackToMain,
}) => {
  const [experiencesList, setExperiencesList] = useState<ExperienceCardItem[]>(initialExperiences);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeSkillChip, setActiveSkillChip] = useState<string | null>(null);

  const handleShuffleDeck = () => {
    setIsShuffling(true);
    setExperiencesList((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setTimeout(() => setIsShuffling(false), 450);
  };

  const handleSkillChipClick = (skill: string) => {
    setActiveSkillChip(activeSkillChip === skill ? null : skill);
  };

  const filteredExperiences = experiencesList.filter((item) => {
    const matchesCategory = activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
    const matchesChip = !activeSkillChip || item.skills.includes(activeSkillChip);
    return matchesCategory && matchesChip;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#020814] text-op-cream font-sans relative overflow-x-hidden pt-24 pb-20 selection:bg-cyan-400 selection:text-black"
    >
      {/* Background Image: Brook.jpg Full-Bleed Wallpaper */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/Brook.jpg"
          alt="Brook Background"
          className="w-full h-full object-cover object-[center_top] opacity-65 brightness-95 contrast-105"
          style={{ transform: 'translateZ(0)' }}
        />
        {/* Cinematic atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020814]/70 via-[#020814]/35 to-[#020814]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,#020814_85%)]" />
        
        {/* Volumetric Soul King Blue Ambient Glow Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-cyan-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[400px] bg-blue-500/12 rounded-full blur-[130px]" />
        
        {/* Subtle Musical Score Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-cyan-400/30">
          <button
            onClick={onBackToMain}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#061226]/90 hover:bg-cyan-950/90 text-cyan-300 hover:text-cyan-200 border border-cyan-400/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <button
              onClick={handleShuffleDeck}
              className={`px-3.5 py-2 rounded-xl bg-[#061226]/90 hover:bg-cyan-950 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md backdrop-blur-md ${
                isShuffling ? 'rotate-180 scale-105' : ''
              }`}
              title="Shuffle Voyage Cards"
            >
              <Shuffle size={13} className={isShuffling ? 'animate-spin' : ''} />
              <span>Shuffle Voyage Logs</span>
            </button>
            <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300/80 border border-cyan-400/30 px-3 py-1 rounded-full bg-cyan-950/60 shrink-0">
              ソウルキング • 航海録
            </span>
          </div>
        </div>

        {/* TOP-LEFT HEADER: CLEAN "EXPERIENCE" TITLE & INTERACTIVE CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-cyan-400/20">
          <div className="text-left">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061226]/90 border border-cyan-400/40 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-md backdrop-blur-sm"
            >
              <Compass size={13} className="text-cyan-400" />
              <span>Professional Track Record & Research</span>
            </motion.div>

            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-bold tracking-tight text-white mb-2"
              style={{
                textShadow: '0 0 35px rgba(34,211,238,0.5)',
              }}
            >
              EXPERIENCE
            </motion.h1>

            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent rounded-full mb-3" />

            <p className="text-xs sm:text-sm font-mono text-cyan-200/80 max-w-xl leading-relaxed">
              Flight dynamics & UAV telemetry research at Indian Space Lab (ISL), academic pedigree at VIT Bhopal University, and production systems architecture.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Voyages' },
              { id: 'space', label: 'Space & UAV' },
              { id: 'fullstack', label: 'Full Stack' },
              { id: 'academic', label: 'Academia & AI' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategoryFilter(tab.id);
                  setActiveSkillChip(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer backdrop-blur-md ${
                  activeCategoryFilter === tab.id
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-cyan-300 scale-105'
                    : 'bg-[#061226]/80 text-cyan-200/70 border border-cyan-400/25 hover:border-cyan-400 hover:text-cyan-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOGO / MILESTONE CONTINUOUS MARQUEE */}
        <div className="mb-10 overflow-hidden py-3 relative rounded-2xl bg-[#061226]/60 border border-cyan-400/25 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {[...experienceLogos, ...experienceLogos].map((exp, idx) => (
              <div
                key={`${exp.name}-${idx}`}
                className="flex items-center justify-center p-2.5 px-4 rounded-xl bg-[#030914]/90 border border-cyan-400/20 hover:border-cyan-400 hover:bg-[#061226] cursor-pointer transition-all hover:scale-110 shadow-sm group shrink-0 gap-2.5"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{exp.icon}</span>
                <span className="text-xs font-mono font-medium text-cyan-200/85 group-hover:text-cyan-300 transition-colors">
                  {exp.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-400/30 text-cyan-400">
                  {exp.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-COLUMN DYNAMIC GRID OF EXPERIENCE CARDS */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <AnimatePresence>
            {filteredExperiences.map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  layout: { type: 'spring', damping: 25, stiffness: 200 },
                  opacity: { duration: 0.3 },
                  duration: 0.4,
                  delay: (idx % 3) * 0.05,
                }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.2 },
                }}
              >
                <div
                  className={`rounded-2xl p-6 bg-[#061226]/85 backdrop-blur-md border ${card.accentColor} transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] flex flex-col justify-between group relative overflow-hidden h-full`}
                >
                  <div>
                    {/* Header with Icon, Role, and Category Tag */}
                    <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-cyan-400/20">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#030914] border border-cyan-400/30 group-hover:border-cyan-400 group-hover:scale-110 transition-all shadow-inner">
                          {card.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-cyan-400 block font-bold">
                            {card.categoryTag}
                          </span>
                          <h3 className="font-cinzel font-bold text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                            {card.role}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Organization & Period Subheading */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-cyan-300/90 mb-3 bg-[#030914]/80 p-2 rounded-lg border border-cyan-400/20">
                      <span className="font-bold">{card.organization}</span>
                      <span className="text-[10px] text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-400/40 shrink-0">
                        {card.period}
                      </span>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-4">
                      {card.summary}
                    </p>

                    {/* Key Highlights Bullet points */}
                    <div className="space-y-2 mb-5">
                      {card.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-op-cream/80">
                          <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills / Tech Chips */}
                  <div className="pt-3 border-t border-cyan-400/20">
                    <div className="flex flex-wrap gap-1.5">
                      {card.skills.map((s) => {
                        const isChipActive = activeSkillChip === s;
                        return (
                          <button
                            key={s}
                            onClick={() => handleSkillChipClick(s)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                              isChipActive
                                ? 'bg-cyan-400 text-black font-bold border border-cyan-300 shadow-md scale-105'
                                : 'bg-[#030914] border border-cyan-400/25 text-cyan-200/80 hover:border-cyan-400 hover:text-cyan-300'
                            }`}
                            title={`Filter by ${s}`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM FEATURE MODULE: LIVE TELEMETRY & FLIGHT TRAJECTORY SIMULATION CONSOLE */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#061226]/85 border border-cyan-400/35 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-cyan-400/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-400/50 text-cyan-300">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-lg text-white flex items-center gap-2">
                  <span>ISL UAV Telemetry & Systems Engine</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-xs font-mono text-cyan-300/70">
                  Real-time mathematical trajectory validation and sensor stream aggregation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#030914] px-3.5 py-1.5 rounded-xl border border-cyan-400/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Telemetry Feed: LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-cyan-200/90">
            <div className="p-4 rounded-xl bg-[#030914] border border-cyan-400/20">
              <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">Telemetry Stream Frequency</div>
              <div className="text-xl font-bold text-white mb-1">50 Hz Real-Time</div>
              <div className="text-[11px] text-op-cream/70">Zero-loss sub-frame sensor aggregation buffer</div>
            </div>

            <div className="p-4 rounded-xl bg-[#030914] border border-cyan-400/20">
              <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">Trajectory Optimization</div>
              <div className="text-xl font-bold text-white mb-1">Runge-Kutta 4th Order</div>
              <div className="text-[11px] text-op-cream/70">Numerical stability & aerodynamic drag integration</div>
            </div>

            <div className="p-4 rounded-xl bg-[#030914] border border-cyan-400/20">
              <div className="text-[10px] text-cyan-400 uppercase tracking-wider mb-1">Production Security Grade</div>
              <div className="text-xl font-bold text-white mb-1">AES-256 GCM</div>
              <div className="text-[11px] text-op-cream/70">Zero-knowledge client payload scrambler</div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default BrookExperienceDomain;
