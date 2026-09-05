import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, Anchor, CheckCircle2, Eye, Shield, Sparkles } from 'lucide-react';
import { Project, PortfolioTheme } from '../types';
import ProjectDetailModal from './ProjectDetailModal';

interface ProjectsProps {
  theme?: PortfolioTheme;
  activeSkillFilter?: string | null;
  onClearSkillFilter?: () => void;
}

import sosImage from '../src/assets/SOS.jpeg';
import inventoryImage from '../src/assets/Inventory.png';
import aesImage from '../src/assets/AES.png';
import novelImage from '../src/assets/Novel.png';
import hpclImage from '../src/assets/hpcl.png';
import islImage from '../src/assets/ISL.png';

const projectsData: Project[] = [
  {
    id: 1,
    title: 'SOS-Service Platform',
    category: 'Security & Systems',
    tagline: 'Emergency Response & Cryptographic Dispatch System',
    problemSolved: 'Eliminates response latency and security vulnerabilities in critical incident triage.',
    myRole: 'Lead Full Stack & Security Engineer',
    description: 'Cross-platform safety application engineered with real-time incident reporting, client-side AES-256 cryptographic payload scrambling, and YOLOv8 fire hazard severity visual detection.',
    metrics: 'Sub-second incident triage • Zero-knowledge payload privacy',
    keyFeatures: [
      'Client-side AES-256 encryption ensuring zero server-side plaintext leakage',
      'YOLOv8 vision deep learning model for real-time fire hazard severity classification',
      'Supabase realtime event listeners for instant dispatcher routing',
    ],
    tags: ['Flutter', 'React', 'YOLOv8 AI', 'AES-256', 'Supabase'],
    image: sosImage,
    link: 'https://github.com/aranya13/SOS-Website',
  },
  {
    id: 2,
    title: 'Enterprise Inventory Suite',
    category: 'Full Stack',
    tagline: 'Multi-Tier RBAC Stock Synchronization Hub',
    problemSolved: 'Prevents stockouts and unauthorized inventory modifications across multi-location warehouses.',
    myRole: 'Backend & Database Architect',
    description: 'Robust MERN stack inventory hub featuring granular Role-Based Access Control, audit logging, low-stock proactive alerts, and real-time inventory ledger updates across distributed warehouses.',
    metrics: 'Multi-store real-time sync • Strict RBAC authorization',
    keyFeatures: [
      'Role-Based Access Control (RBAC) with granular admin/operator permissions',
      'Real-time automated low-stock threshold triggers and audit logging',
      'Optimized aggregation pipelines for instant inventory status queries',
    ],
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'RBAC Security'],
    image: inventoryImage,
    link: 'https://github.com/aranya13/Inventory_Management_grp97',
  },
  {
    id: 3,
    title: 'AES Image Encryptor',
    category: 'Security & Systems',
    tagline: 'Client-Side Pixel Array Cryptography Tool',
    problemSolved: 'Enables confidential image transfer without exposing visual data to untrusted cloud servers.',
    myRole: 'Cryptography & Frontend Developer',
    description: 'High-performance cryptographic web utility implementing optimized AES-256 algorithms to scramble and decrypt high-resolution raw image matrices directly in the browser without server leakage.',
    metrics: 'AES-256 CBC • 100% In-Browser Execution',
    keyFeatures: [
      'Direct Canvas ArrayBuffer byte manipulation for rapid encryption',
      'Zero server roundtrips — all cryptographic operations executed locally in client RAM',
      'Cryptographically secure pseudo-random IV generation per encryption run',
    ],
    tags: ['JavaScript', 'HTML5 Canvas', 'AES-256', 'Web Crypto API'],
    image: aesImage,
    link: 'https://github.com/aranya13/AES-encryption--Project',
  },
  {
    id: 4,
    title: 'Novel AI Studio',
    category: 'AI & ML',
    tagline: 'Autonomous Creative Writing & Story Generation Engine',
    problemSolved: 'Resolves creative writer block through structured AI prompt chaining and branching story graphs.',
    myRole: 'Full Stack & Prompt Engineer',
    description: 'AI authoring platform combining prompt-chained LLMs with custom user story arcs, branching narrative trees, dynamic character profiling, and JWT secured document persistence.',
    metrics: 'Multi-branch story persistence • JWT authentication',
    keyFeatures: [
      'Dynamic character profile memory injected into structured LLM prompt context',
      'Interactive branching narrative nodes allowing writers to explore alternate endings',
      'Secure document persistence with JWT user authentication',
    ],
    tags: ['React', 'Node.js', 'AI/ML API', 'Express', 'JWT'],
    image: novelImage,
    link: 'https://github.com/aranya13/NovelCraftAI',
  },
  {
    id: 5,
    title: 'HPCL Fuel Analytics Dashboard',
    category: 'Full Stack',
    tagline: 'Industrial Energy Distribution & Telemetry Hub',
    problemSolved: 'Aggregates multi-station fuel dispensing telemetry into a unified live monitoring portal.',
    myRole: 'Full Stack Developer',
    description: 'Enterprise dashboard engineered for Hindustan Petroleum Corporation Limited (HPCL) providing real-time telemetry monitoring, dispensing tank metrics, and automated alert logs.',
    metrics: 'Real-time telemetry ingestion • Station-wide analytics',
    keyFeatures: [
      'Live fuel dispensing tank level graphs and predictive restock indicators',
      'Time-series anomaly detection logging unusual dispensing fluctuations',
      'Responsive data tables with instant multi-parameter filtering',
    ],
    tags: ['MERN Stack', 'Data Analytics', 'Chart.js', 'REST API'],
    image: hpclImage,
    link: 'https://github.com/aranya13/hpcl',
  },
  {
    id: 6,
    title: 'ISL Tournament Platform',
    category: 'Full Stack',
    tagline: 'Sports Analytics & Live Score Engine',
    problemSolved: 'Delivers concurrent live match score feeds and granular player statistics with high responsiveness.',
    myRole: 'Full Stack Engineer',
    description: 'Full-featured tournament management portal for the Indian Super League with live match updates, granular athlete stats, head-to-head records, and dynamic standings generation.',
    metrics: 'Sub-second live match triage • Scalable relational schema',
    keyFeatures: [
      'Sub-second live match event broadcasting and dynamic leaderboard computation',
      'Granular head-to-head player historical performance visualization',
      'Modular REST endpoints for rapid tournament fixtures querying',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Real-Time'],
    image: islImage,
    link: 'https://github.com/aranya13/ISL-',
  },
];

export const Projects: React.FC<ProjectsProps> = ({ theme, activeSkillFilter, onClearSkillFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);

  const categories = ['All', 'Full Stack', 'Security & Systems', 'AI & ML'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Check Category filter
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;

      // Check Skill filter if provided
      let matchesSkill = true;
      if (activeSkillFilter) {
        const lower = activeSkillFilter.toLowerCase();
        matchesSkill =
          project.tags.some((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase())) ||
          project.description.toLowerCase().includes(lower) ||
          project.keyFeatures.some((f) => f.toLowerCase().includes(lower));
      }

      return matchesCategory && matchesSkill;
    });
  }, [selectedCategory, activeSkillFilter]);

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Viewer mode Zoro artwork background */}
      {theme === 'viewer' && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/zoro.jfif"
            alt="Zoro Projects Background"
            className="w-full h-full object-cover object-[center_top] opacity-25 mix-blend-screen scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c18]/90 via-[#070c18]/70 to-[#070c18]/95" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Category Tabs — same style as Skills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b] border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3">
              {theme === 'viewer' ? <span>⚔️</span> : <Anchor size={13} />}
              <span>{theme === 'viewer' ? "Zoro's Santoryu Project Domain" : "Production Deployments"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-op-cream flex items-center gap-3">
              <span>PROJECTS</span>
              {theme === 'viewer' && (
                <span className="text-sm font-pirate text-emerald-400 bg-emerald-950/60 px-3 py-0.5 rounded-full border border-emerald-500/40 hidden sm:inline-block">
                  三刀流・煉獄
                </span>
              )}
            </h2>
            <div className="w-20 h-0.5 bg-op-gold mt-3" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {activeSkillFilter && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-op-gold text-op-ink font-mono text-xs font-bold">
                <span>Filter: {activeSkillFilter}</span>
                {onClearSkillFilter && (
                  <button
                    onClick={onClearSkillFilter}
                    className="ml-1 hover:text-red-900 font-black cursor-pointer"
                    title="Clear filter"
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            <div className="inline-flex p-1 rounded-full bg-[#0b132b] border border-op-gold/30 shadow-inner overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-op-gold text-op-ink font-bold shadow-sm'
                      : 'text-op-cream/70 hover:text-op-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="scrim-card rounded-2xl p-5 border border-op-gold/25 shadow-md flex flex-col justify-between hover:border-op-gold/60 transition-all duration-200 group"
              >
                <div>
                  {/* Image Frame */}
                  <div
                    onClick={() => setSelectedProjectForModal(project)}
                    className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#0b132b] border border-op-gold/20 cursor-pointer group-hover:border-op-gold/40 transition-all"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0b132b]/90 border border-op-gold/30 text-[9px] font-mono text-op-gold uppercase">
                      {project.category}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-op-gold text-op-ink font-cinzel font-bold text-xs flex items-center gap-1 shadow-md">
                        <Eye size={12} /> Inspect Specs
                      </span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setSelectedProjectForModal(project)}
                    className="font-cinzel font-bold text-lg text-op-cream mb-1 cursor-pointer hover:text-op-gold transition-colors"
                  >
                    {project.title}
                  </h3>

                  <div className="text-xs font-mono text-op-gold mb-2.5">
                    Role: <span className="text-op-cream/90">{project.myRole}</span>
                  </div>

                  <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Problem Solved & Metric */}
                  <div className="p-3 rounded-xl bg-[#0b132b] border border-op-gold/20 mb-3 space-y-1 text-[11px] font-sans">
                    <div>
                      <strong className="text-op-gold font-mono uppercase">Problem:</strong>{' '}
                      <span className="text-op-cream/90">{project.problemSolved}</span>
                    </div>
                    {project.metrics && (
                      <div>
                        <strong className="text-emerald-400 font-mono uppercase">Impact:</strong>{' '}
                        <span className="text-op-cream/90">{project.metrics}</span>
                      </div>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-1 mb-4">
                    {project.keyFeatures.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-op-cream/75">
                        <CheckCircle2 size={12} className="text-op-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-op-gold/15 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0b132b] border border-op-gold/20 text-op-gold text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedProjectForModal(project)}
                      className="py-2 rounded-xl bg-[#0b132b] hover:bg-[#152244] text-op-cream border border-op-gold/30 text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye size={13} className="text-op-gold" />
                      <span>Architecture</span>
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Interactive Modal */}
        <ProjectDetailModal
          project={selectedProjectForModal}
          onClose={() => setSelectedProjectForModal(null)}
        />

      </div>
    </section>
  );
};

export default Projects;