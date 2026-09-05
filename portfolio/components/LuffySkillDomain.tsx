import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, Code2, Database, Cpu, Terminal, Zap, ArrowLeft, Sparkles, Shuffle, Filter, Layers, CheckCircle2, Shield } from 'lucide-react';
import CryptoPlayground from './CryptoPlayground';
import { ArmamentHakiSurface, ArmamentHakiToggle, playRealisticHakiAudio } from './RealisticArmamentHaki';


interface LuffySkillDomainProps {
  onBackToMain: () => void;
  onSelectSkillFilter?: (skill: string) => void;
}

interface SkillCategory {
  id: string;
  category: string;
  gearTitle: string;
  gearTag: string;
  icon: React.ReactNode;
  skills: string[];
  desc: string;
  accentColor: string;
  glowColor: string;
}

const techLogos = [
  { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Tailwind CSS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Express.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Supabase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'Vite', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Postman', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
];

const initialGears: SkillCategory[] = [
  {
    id: 'frontend',
    category: 'Frontend & UI Dynamics',
    gearTitle: 'High-Performance Client UI',
    gearTag: 'FRONTEND • UI / UX',
    icon: <Globe size={20} className="text-op-gold" />,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas'],
    desc: 'High-speed client-side rendering with sub-frame micro-animations and zero-latency user flows.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
  {
    id: 'backend',
    category: 'Backend Architecture & APIs',
    gearTitle: 'Scalable Services & Micro-APIs',
    gearTag: 'BACKEND • REST & WEBSOCKETS',
    icon: <Server size={20} className="text-op-gold" />,
    skills: ['Node.js', 'Express.js', 'RESTful API Architecture', 'Socket.IO / Realtime', 'Supabase', 'JWT & RBAC Security'],
    desc: 'Heavyweight asynchronous backend pipelines engineered for enterprise concurrency and zero downtime.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
  {
    id: 'languages',
    category: 'Core Programming Languages',
    gearTitle: 'First-Principles Core',
    gearTag: 'LANGUAGES • COMPILED & SCRIPTED',
    icon: <Code2 size={20} className="text-op-gold" />,
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C / C++', 'SQL'],
    desc: 'Hardened first-principles programming across compiled and interpreted languages.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
  {
    id: 'databases',
    category: 'Databases & Storage',
    gearTitle: 'Relational & Document Ledgers',
    gearTag: 'DATABASES • HIGH THROUGHPUT',
    icon: <Database size={20} className="text-op-gold" />,
    skills: ['MongoDB', 'PostgreSQL', 'Mongoose ORM', 'Schema Indexing & Performance'],
    desc: 'Elastic schema design, high-throughput indexing, and resilient distributed database pipelines.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
  {
    id: 'ai-security',
    category: 'AI / ML & Cryptography',
    gearTitle: 'Machine Learning & Zero-Knowledge Security',
    gearTag: 'AI / ML • APPLIED CRYPTO',
    icon: <Cpu size={20} className="text-op-gold" />,
    skills: ['AES-256 Cryptography', 'YOLOv8 Vision AI', 'LLM Prompt Engineering', 'Web Crypto API', 'Telemetry Processing'],
    desc: 'Unshackled innovation in browser-based zero-knowledge encryption algorithms and vision AI.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
  {
    id: 'devops',
    category: 'Tools & DevOps',
    gearTitle: 'Production CI/CD Pipelines',
    gearTag: 'DEVOPS • CLOUD & TOOLING',
    icon: <Terminal size={20} className="text-op-gold" />,
    skills: ['Git & GitHub', 'Vite & Webpack', 'Postman & REST Testing', 'Linux / Bash', 'Vercel Deployment'],
    desc: 'Automated CI/CD pipelines, rapid compilation tooling, and mission-critical cloud hosting.',
    accentColor: 'border-op-gold/30 hover:border-op-gold/60',
    glowColor: 'rgba(224, 169, 59, 0.15)',
  },
];

export const LuffySkillDomain: React.FC<LuffySkillDomainProps> = ({
  onBackToMain,
  onSelectSkillFilter,
}) => {
  const [categories, setCategories] = useState<SkillCategory[]>(initialGears);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isShuffling, setIsShuffling] = useState(false);
  const [isHardened, setIsHardened] = useState(false);

  const toggleArmamentHardening = () => {
    const next = !isHardened;
    setIsHardened(next);
    playRealisticHakiAudio(next ? 'activate' : 'deactivate');
  };

  const handleSkillClick = (skill: string) => {
    setActiveSkill(activeSkill === skill ? null : skill);
    if (onSelectSkillFilter) {
      onSelectSkillFilter(skill);
    }
  };

  const handleShuffleDeck = () => {
    setIsShuffling(true);

    // Shuffle the deck array order with spring layout transition
    setCategories((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });

    setTimeout(() => {
      setIsShuffling(false);
    }, 450);
  };

  const filteredCategories = activeCategoryFilter === 'all'
    ? categories
    : categories.filter((c) => c.id === activeCategoryFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#070a12] text-op-cream font-sans relative overflow-x-hidden pt-24 pb-20 selection:bg-op-gold selection:text-op-ink"
    >
      {/* Background Image: Luffy.jfif with High-Clarity Visuality */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/Luffy.jfif"
          alt="Luffy Background"
          className="w-full h-full object-cover object-[center_top] opacity-80 brightness-95 contrast-105"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070a12]/60 via-[#070a12]/25 to-[#070a12]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_25%,#070a12_85%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-op-gold/20">
          <button
            onClick={onBackToMain}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0b132b]/90 hover:bg-op-gold hover:text-op-ink text-op-cream border border-op-gold/30 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <button
              onClick={handleShuffleDeck}
              className={`px-3.5 py-2 rounded-xl bg-[#0b132b]/90 hover:bg-op-gold hover:text-op-ink text-op-cream border border-op-gold/40 text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md backdrop-blur-md ${
                isShuffling ? 'rotate-180 scale-105' : ''
              }`}
              title="Shuffle Skill Cards"
            >
              <Shuffle size={13} className={isShuffling ? 'animate-spin' : ''} />
              <span>Shuffle Deck</span>
            </button>
          </div>
        </div>

        {/* TOP-LEFT HEADER: CLEAN "SKILLS" TITLE & INTERACTIVE CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-op-gold/15">
          <div className="text-left">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b]/90 border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3 shadow-md backdrop-blur-sm"
            >
              <Zap size={13} className="text-op-gold" />
              <span>Technical Capabilities & Stack</span>
            </motion.div>

            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-bold tracking-tight text-op-cream mb-2"
            >
              SKILLS
            </motion.h1>

            <div className="w-24 h-1 bg-gradient-to-r from-op-gold via-amber-400 to-transparent rounded-full mb-3" />

            <p className="text-xs sm:text-sm font-mono text-op-cream/80 max-w-xl leading-relaxed">
              Resilient full-stack engineering, distributed databases, zero-knowledge cryptographic algorithms, and production cloud infrastructure.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Domains' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'languages', label: 'Languages' },
              { id: 'databases', label: 'Databases' },
              { id: 'ai-security', label: 'AI & Crypto' },
              { id: 'devops', label: 'DevOps' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategoryFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer backdrop-blur-md ${
                  activeCategoryFilter === tab.id
                    ? 'bg-op-gold text-op-ink font-bold shadow-[0_0_15px_rgba(224,169,59,0.5)] border border-op-gold scale-105'
                    : 'bg-[#0b132b]/80 text-op-cream/70 border border-op-gold/20 hover:border-op-gold hover:text-op-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOGO-DRIVEN CONTINUOUS TECH STREAM / MARQUEE */}
        <div className="mb-10 overflow-hidden py-3 relative rounded-2xl bg-[#0b132b]/60 border border-op-gold/20 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {[...techLogos, ...techLogos].map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                onClick={() => handleSkillClick(tech.name)}
                className="flex items-center justify-center p-2.5 px-4 rounded-xl bg-[#070c18]/90 border border-op-gold/20 hover:border-op-gold hover:bg-[#0b132b] cursor-pointer transition-all hover:scale-115 shadow-sm group shrink-0 gap-2.5"
                title={tech.name}
              >
                <img
                  src={tech.iconUrl}
                  alt={tech.name}
                  className="w-7 h-7 object-contain group-hover:scale-110 transition-transform drop-shadow"
                  loading="lazy"
                />
                <span className="text-xs font-mono font-medium text-op-cream/80 group-hover:text-op-gold transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* DYNAMIC SHUFFLE GRID OF SKILL CARDS WITH FRAMER MOTION LAYOUT ANIMATIONS */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <AnimatePresence>
            {filteredCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
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
                <ArmamentHakiSurface
                  isHardened={isHardened}
                  glowColor="rgba(224, 169, 59, 0.25)"
                  borderRadius="1rem"
                  className="h-full"
                >
                  <div
                    className={`rounded-2xl p-6 bg-[#0b132b]/85 backdrop-blur-md border ${cat.accentColor} transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(224,169,59,0.2)] flex flex-col justify-between group relative overflow-hidden h-full`}
                  >
                    {/* Subtle Card Ambient Glow */}
                    <div
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity"
                      style={{ backgroundColor: cat.glowColor }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3 pb-3 mb-4 border-b border-op-gold/15">
                        <div className="p-2.5 rounded-xl bg-[#070c18] border border-op-gold/30 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
                          {cat.icon}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-op-gold/90 font-bold uppercase tracking-wider">
                            {cat.gearTag}
                          </div>
                          <h3 className="font-cinzel font-bold text-base text-white">
                            {cat.category}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs font-sans text-op-cream/75 leading-relaxed mb-4">
                        {cat.desc}
                      </p>

                      {/* Interactive Skill Chips */}
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => {
                          const isSelected = activeSkill === skill;
                          return (
                            <button
                              key={skill}
                              onClick={() => handleSkillClick(skill)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-op-gold text-op-ink font-bold shadow-[0_0_15px_rgba(224,169,59,0.6)] scale-105 border border-op-gold'
                                  : 'bg-[#070c18] border border-op-slate/30 text-op-cream/85 hover:border-op-gold hover:text-op-gold hover:scale-105'
                              }`}
                              title={`Click to focus on ${skill}`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-op-gold/10 flex items-center justify-between text-[10px] font-mono text-op-slate relative z-10">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-emerald-400" />
                        <span>Active Domain</span>
                      </span>
                      <span className="text-op-gold/80">Interactive Grid</span>
                    </div>
                  </div>
                </ArmamentHakiSurface>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Embedded Live In-Browser Cryptography Playground */}
        <div className="pt-6">
          <div className="text-center mb-6">
            <h2 className="font-cinzel font-bold text-2xl sm:text-3xl text-white">
              Client-Side <span className="text-op-gold">Cryptographic Engine</span>
            </h2>
            <p className="text-xs font-mono text-op-cream/70 mt-1">
              Zero-knowledge client-side AES-256 encryption running 100% in browser RAM
            </p>
          </div>
          <ArmamentHakiSurface isHardened={isHardened} glowColor="rgba(224, 169, 59, 0.3)" borderRadius="1rem">
            <CryptoPlayground theme="viewer" />
          </ArmamentHakiSurface>
        </div>

      </div>
    </motion.div>
  );
};

export default LuffySkillDomain;
