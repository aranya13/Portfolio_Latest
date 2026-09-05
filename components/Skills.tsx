import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Code2, Database, Cpu, Terminal, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { PortfolioTheme } from '../types';
import CryptoPlayground from './CryptoPlayground';

interface SkillsProps {
  theme?: PortfolioTheme;
  onSelectSkillFilter?: (skill: string) => void;
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Frontend & UI',
    icon: <Globe size={18} className="text-op-gold" />,
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'HTML5 Canvas'],
  },
  {
    category: 'Backend & APIs',
    icon: <Server size={18} className="text-op-gold" />,
    skills: ['Node.js', 'Express.js', 'RESTful API Architecture', 'Socket.IO / Realtime', 'Supabase', 'JWT & RBAC Security'],
  },
  {
    category: 'Programming Languages',
    icon: <Code2 size={18} className="text-op-gold" />,
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C / C++', 'SQL'],
  },
  {
    category: 'Databases & Storage',
    icon: <Database size={18} className="text-op-gold" />,
    skills: ['MongoDB', 'PostgreSQL', 'Mongoose ORM', 'Schema Indexing & Performance'],
  },
  {
    category: 'AI / ML & Cryptography',
    icon: <Cpu size={18} className="text-op-gold" />,
    skills: ['AES-256 Cryptography', 'YOLOv8 Vision AI', 'LLM Prompt Engineering', 'Web Crypto API', 'Telemetry Processing'],
  },
  {
    category: 'Tools & DevOps',
    icon: <Terminal size={18} className="text-op-gold" />,
    skills: ['Git & GitHub', 'Vite & Webpack', 'Postman & REST Testing', 'Linux / Bash', 'Vercel Deployment'],
  },
];

export const Skills: React.FC<SkillsProps> = ({ theme, onSelectSkillFilter }) => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showCryptoDemo, setShowCryptoDemo] = useState<boolean>(true);

  const handleSkillClick = (skill: string) => {
    setActiveSkill(activeSkill === skill ? null : skill);
    if (onSelectSkillFilter) {
      onSelectSkillFilter(skill);
    }
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Viewer mode Luffy artwork background */}
      {theme === 'viewer' && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/Luffy.jfif"
            alt="Luffy Skills Background"
            className="w-full h-full object-cover object-[center_top] opacity-25 mix-blend-screen scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c18]/90 via-[#070c18]/70 to-[#070c18]/95" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b] border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3">
              <Zap size={13} />
              <span>Technical Capabilities & Stack</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-op-cream flex items-center gap-3">
              <span>SKILLS</span>
            </h2>
            <div className="w-20 h-0.5 bg-op-gold mt-3" />
          </div>

          <div className="text-xs font-mono text-op-cream/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Skill Chips (Click to filter projects)</span>
          </div>
        </div>

        {/* Clean Scannable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.category}
              className="scrim-card rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-200 hover:border-op-gold/50"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-op-gold/20">
                  <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                    {cat.icon}
                  </div>
                  <h3 className="font-cinzel font-bold text-base text-op-cream">
                    {cat.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isSelected = activeSkill === skill;
                    return (
                      <button
                        key={skill}
                        onClick={() => handleSkillClick(skill)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-op-gold text-op-ink font-bold shadow-md scale-105 border border-op-gold'
                            : 'bg-[#0b132b] border border-op-slate/30 text-op-cream/85 hover:border-op-gold hover:text-op-gold'
                        }`}
                        title={`Click to filter projects with ${skill}`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Cryptography Demo Engine */}
        {showCryptoDemo && (
          <CryptoPlayground theme={theme} />
        )}

      </div>
    </section>
  );
};

export default Skills;
