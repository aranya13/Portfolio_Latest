import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, CheckCircle2, UserCheck, Rocket, Terminal, Database } from 'lucide-react';
import { Experience, PortfolioTheme } from '../types';

interface AboutProps {
  theme?: PortfolioTheme;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: 'Learning Intern — Space Technology & UAV Telemetry',
    organization: 'Indian Space Lab (ISL)',
    period: 'Dec 2023 – Jan 2024',
    location: 'India',
    summary: 'Engineered computational flight dynamics and real-time telemetry processing modules for unmanned aerial vehicles (UAVs).',
    highlights: [
      'Developed Python mathematical simulation scripts for trajectory optimization and flight stability analysis.',
      'Collaborated on real-time sensor data aggregation pipelines using modular computational architectures.',
    ],
    skills: ['Python', 'Simulation & Algorithms', 'Telemetry Processing', 'Data Analytics'],
  },
  {
    id: 2,
    role: 'Full Stack Engineer & Lead Project Architect',
    organization: 'Academic & Open-Source Engineering Initiatives',
    period: '2022 – Present',
    location: 'VIT Bhopal University',
    summary: 'Architected and deployed production web applications, zero-knowledge client-side encryption suites, and real-time dashboard systems.',
    highlights: [
      'Engineered SOS-Service emergency dispatch with client-side AES-256 encryption and YOLOv8 fire hazard severity visual detection.',
      'Designed end-to-end RBAC Inventory Management hub synchronizing multi-location stock in real time.',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AES-256', 'Supabase'],
  },
  {
    id: 3,
    role: 'Computer Science Scholar & Systems Researcher',
    organization: 'VIT Bhopal University',
    period: '2021 – 2025/2026',
    location: 'Bhopal, India',
    summary: 'Specializing in Full Stack Architecture, Data Structures, Zero-Knowledge Cryptography, and Distributed Systems.',
    highlights: [
      'Engineered browser-based AES-256 cryptographic image pixel array scrambling utilities.',
      'Demonstrated first-principles thinking in computational algorithm design and production deployment.',
    ],
    skills: ['Data Structures', 'Algorithms', 'Distributed Systems', 'Cryptography', 'Networks'],
  },
];

// About bio cards
const bioCards = [
  {
    icon: <GraduationCap size={18} className="text-op-gold" />,
    title: 'Academic Background',
    content: 'Final-year B.Tech Computer Science & Engineering Scholar at VIT Bhopal University (2021–2025/2026). Specialization in Full Stack Architecture, Data Structures & Cryptography.',
    tag: 'VIT Bhopal · CSE \'26',
  },
  {
    icon: <Rocket size={18} className="text-op-gold" />,
    title: 'Engineering Focus',
    content: 'Building resilient, scalable web architectures and secure client-side cryptographic systems. Engineering philosophy rooted in first-principles thinking.',
    tag: 'AES-256 · React · Node.js',
  },
  {
    icon: <Terminal size={18} className="text-op-gold" />,
    title: 'Space Lab Research',
    content: 'Research internship at Indian Space Lab (ISL) engineering computational telemetry pipelines and trajectory simulation algorithms for UAV systems.',
    tag: 'ISL · UAV Telemetry',
  },
];

export const About: React.FC<AboutProps> = ({ theme }) => {
  const isRecruiter = theme === 'recruiter';

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Viewer mode Brook artwork background */}
      {!isRecruiter && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/Brook.jpg"
            alt="Brook Experience Background"
            className="w-full h-full object-cover object-[center_top] opacity-25 mix-blend-screen scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c18]/90 via-[#070c18]/70 to-[#070c18]/95" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ─── ABOUT SECTION ─────────────────────────────────────── */}
        {/* Section Header — same style as Skills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b] border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3">
              {isRecruiter ? <UserCheck size={13} /> : <span>🏴‍☠️</span>}
              <span>{isRecruiter ? 'Professional Background & Track Record' : "Captain's Log & Voyage Chronicle"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-op-cream flex items-center gap-3">
              <span>ABOUT</span>
              {!isRecruiter && (
                <span className="text-sm font-pirate text-cyan-300 bg-cyan-950/60 px-3 py-0.5 rounded-full border border-cyan-400/40 hidden sm:inline-block">
                  航海士・キャプテンのログ
                </span>
              )}
            </h2>
            <div className="w-20 h-0.5 bg-op-gold mt-3" />
          </div>

          <div className="text-xs font-mono text-op-cream/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Full Stack Engineer · Systems Architect</span>
          </div>
        </div>

        {/* Bio grid — 3 columns like Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {bioCards.map((card) => (
            <div
              key={card.title}
              className="scrim-card rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-200 hover:border-op-gold/50"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-op-gold/20">
                  <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                    {card.icon}
                  </div>
                  <h3 className="font-cinzel font-bold text-base text-op-cream">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-op-cream/80 font-sans leading-relaxed">
                  {card.content}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-op-gold/15">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#0b132b] border border-op-gold/25 text-op-gold">
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── EXPERIENCE SECTION ───────────────────────────────── */}
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4" id="experience">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b] border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3">
              {isRecruiter ? <Briefcase size={13} /> : <span>🎻</span>}
              <span>{isRecruiter ? 'Work Experience & Research' : "Brook's Soul King Voyage Log"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-op-cream flex items-center gap-3">
              <span>EXPERIENCE</span>
              {!isRecruiter && (
                <span className="text-sm font-pirate text-cyan-300 bg-cyan-950/60 px-3 py-0.5 rounded-full border border-cyan-400/40 hidden sm:inline-block">
                  ソウルキング・ビンクスの酒
                </span>
              )}
            </h2>
            <div className="w-20 h-0.5 bg-op-gold mt-3" />
          </div>

          <div className="text-xs font-mono text-op-cream/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{experiences.length} Professional Engagements</span>
          </div>
        </div>

        {/* Experience Grid — same 3-column grid structure as Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="scrim-card rounded-2xl p-6 shadow-md flex flex-col justify-between transition-all duration-200 hover:border-op-gold/50"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-op-gold/20">
                  <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                    <Briefcase size={18} className="text-op-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cinzel font-bold text-sm text-op-cream leading-snug">
                      {exp.role}
                    </h3>
                    <div className="text-[10px] font-mono text-op-gold mt-0.5">
                      {exp.organization} · <span className="text-op-cream/60">{exp.location}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-op-gold px-2.5 py-1 rounded-lg bg-[#0b132b] border border-op-gold/30 shrink-0 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-op-cream/80 font-sans leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-4">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-op-cream/80">
                      <CheckCircle2 size={13} className="text-op-gold shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-op-gold/15">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#0b132b] border border-op-gold/20 text-op-gold text-[10px] font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;