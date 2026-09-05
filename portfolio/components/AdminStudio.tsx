import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, ArrowLeft, Download, Copy, Check, Sparkles, Database, Layers, Briefcase, Code, ShieldCheck, Save, Eye } from 'lucide-react';
import { Project, Experience } from '../types';

interface AdminStudioProps {
  onBackToPortfolio: () => void;
}

interface NewSkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  gearTag: string;
}

export const AdminStudio: React.FC<AdminStudioProps> = ({ onBackToPortfolio }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'experience' | 'export'>('projects');
  const [copied, setCopied] = useState(false);
  const [savedAlert, setSavedAlert] = useState<string | null>(null);

  // Local state for dynamically added projects
  const [projects, setProjects] = useState<Array<Partial<Project>>>([
    {
      id: 1,
      title: 'SOS-Service Platform',
      category: 'Security & Systems',
      tagline: 'Emergency Response & Cryptographic Dispatch System',
      description: 'Cross-platform safety application with client-side AES-256 and YOLOv8 fire hazard severity visual detection.',
      tags: ['Flutter', 'React', 'YOLOv8 AI', 'AES-256', 'Supabase'],
      link: 'https://github.com/aranya13/SOS-Website',
      metrics: 'Sub-second incident triage • Zero-knowledge payload privacy',
    },
  ]);

  // Project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full Stack',
    tagline: '',
    problemSolved: '',
    myRole: 'Lead Systems Architect',
    description: '',
    metrics: '',
    keyFeatures: '',
    tags: '',
    link: '',
    image: '',
  });

  // Local state for dynamically added skills
  const [skills, setSkills] = useState<NewSkillItem[]>([
    { id: '1', name: 'React.js / Next.js', category: 'Frontend', proficiency: 95, gearTag: 'Gear 2 • Jet Speed' },
    { id: '2', name: 'Node.js / Express', category: 'Backend', proficiency: 92, gearTag: 'Gear 3 • Gigant Power' },
    { id: '3', name: 'AES-256 Cryptography', category: 'AI & Security', proficiency: 94, gearTag: 'Gear 5 • Sun God Nika' },
    { id: '4', name: 'MongoDB / PostgreSQL', category: 'Databases', proficiency: 88, gearTag: 'Gear 4 • Boundman Data' },
  ]);

  // Skill form state
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 90,
    gearTag: 'Gear 2 • Jet Speed',
  });

  // Local state for dynamically added experience
  const [experiences, setExperiences] = useState<Array<Partial<Experience>>>([
    {
      id: 1,
      role: 'Learning Intern — Space Technology & UAV Telemetry',
      organization: 'Indian Space Lab (ISL)',
      period: 'Dec 2023 – Jan 2024',
      location: 'India',
      summary: 'Engineered computational flight dynamics and telemetry processing modules.',
      skills: ['Python', 'Simulation', 'Telemetry Processing'],
    },
  ]);

  // Experience form state
  const [expForm, setExpForm] = useState({
    role: '',
    organization: '',
    period: '',
    location: '',
    summary: '',
    highlights: '',
    skills: '',
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const newProj: Partial<Project> = {
      id: Date.now(),
      title: projectForm.title,
      category: projectForm.category as any,
      tagline: projectForm.tagline,
      problemSolved: projectForm.problemSolved,
      myRole: projectForm.myRole,
      description: projectForm.description,
      metrics: projectForm.metrics,
      keyFeatures: projectForm.keyFeatures ? projectForm.keyFeatures.split('\n').filter((f) => f.trim()) : [],
      tags: projectForm.tags ? projectForm.tags.split(',').map((t) => t.trim()) : ['React', 'Node.js'],
      link: projectForm.link || 'https://github.com/aranya13',
      image: projectForm.image || '/src/assets/SOS.jpeg',
    };

    setProjects([newProj, ...projects]);
    setProjectForm({
      title: '',
      category: 'Full Stack',
      tagline: '',
      problemSolved: '',
      myRole: 'Lead Systems Architect',
      description: '',
      metrics: '',
      keyFeatures: '',
      tags: '',
      link: '',
      image: '',
    });

    setSavedAlert('Project added to workspace studio successfully!');
    setTimeout(() => setSavedAlert(null), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillForm.name.trim()) return;

    const newSkill: NewSkillItem = {
      id: Date.now().toString(),
      name: skillForm.name,
      category: skillForm.category,
      proficiency: skillForm.proficiency,
      gearTag: skillForm.gearTag,
    };

    setSkills([newSkill, ...skills]);
    setSkillForm({
      name: '',
      category: 'Frontend',
      proficiency: 90,
      gearTag: 'Gear 2 • Jet Speed',
    });

    setSavedAlert('Skill added to workspace studio successfully!');
    setTimeout(() => setSavedAlert(null), 3000);
  };

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.role.trim() || !expForm.organization.trim()) return;

    const newExp: Partial<Experience> = {
      id: Date.now(),
      role: expForm.role,
      organization: expForm.organization,
      period: expForm.period || '2024 – Present',
      location: expForm.location || 'India',
      summary: expForm.summary,
      highlights: expForm.highlights ? expForm.highlights.split('\n').filter((h) => h.trim()) : [],
      skills: expForm.skills ? expForm.skills.split(',').map((s) => s.trim()) : ['Full Stack'],
    };

    setExperiences([newExp, ...experiences]);
    setExpForm({
      role: '',
      organization: '',
      period: '',
      location: '',
      summary: '',
      highlights: '',
      skills: '',
    });

    setSavedAlert('Experience entry added successfully!');
    setTimeout(() => setSavedAlert(null), 3000);
  };

  const fullDataPayload = {
    metadata: {
      author: 'Aranya Bahuguna',
      timestamp: new Date().toISOString(),
      source: 'Admin Studio Workspace',
    },
    projects,
    skills,
    experiences,
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(fullDataPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[#050811] text-op-cream font-sans pt-20 pb-24 relative overflow-x-hidden selection:bg-op-gold selection:text-black"
    >
      {/* Volumetric Studio Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-op-gold/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e0a93b_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-op-gold/30">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="px-4 py-2 rounded-xl bg-[#0b132b] hover:bg-op-gold hover:text-op-ink text-op-gold border border-op-gold/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </button>

            <div>
              <div className="font-cinzel font-bold text-lg sm:text-xl text-white flex items-center gap-2">
                <span>Developer Studio & CMS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                  Ready for Database
                </span>
              </div>
              <div className="text-[11px] font-mono text-op-gold/70">
                Aranya Bahuguna • Content Management & API Architect
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJSON}
              className="px-3.5 py-2 rounded-xl bg-[#0b132b] hover:bg-op-gold hover:text-op-ink text-op-gold border border-op-gold/40 text-xs font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Copy all dynamic state as structured JSON payload"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'JSON Copied!' : 'Export JSON Payload'}</span>
            </button>
          </div>
        </div>

        {savedAlert && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-400 text-xs font-mono flex items-center gap-2 shadow-lg">
            <Check size={16} />
            <span>{savedAlert}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 pb-4 mb-8 border-b border-op-gold/20 overflow-x-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'projects'
                ? 'bg-op-gold text-op-ink shadow-md'
                : 'bg-[#0b132b] text-op-cream/70 hover:text-op-gold border border-op-gold/25'
            }`}
          >
            <Layers size={14} />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'skills'
                ? 'bg-op-gold text-op-ink shadow-md'
                : 'bg-[#0b132b] text-op-cream/70 hover:text-op-gold border border-op-gold/25'
            }`}
          >
            <Code size={14} />
            <span>Skills ({skills.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'experience'
                ? 'bg-op-gold text-op-ink shadow-md'
                : 'bg-[#0b132b] text-op-cream/70 hover:text-op-gold border border-op-gold/25'
            }`}
          >
            <Briefcase size={14} />
            <span>Experience ({experiences.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'export'
                ? 'bg-op-gold text-op-ink shadow-md'
                : 'bg-[#0b132b] text-op-cream/70 hover:text-op-gold border border-op-gold/25'
            }`}
          >
            <Database size={14} />
            <span>Database API Payload</span>
          </button>
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Project Creation Form */}
            <div className="lg:col-span-6 space-y-4">
              <div className="scrim-card rounded-2xl p-6 border border-op-gold/30 shadow-xl">
                <h3 className="font-cinzel font-bold text-xl text-white mb-1 flex items-center gap-2">
                  <Plus size={18} className="text-op-gold" />
                  <span>Add New Production Project</span>
                </h3>
                <p className="text-xs text-op-cream/70 font-sans mb-5">
                  Enter architectural and deployment parameters to add a project entry.
                </p>

                <form onSubmit={handleAddProject} className="space-y-3.5 text-xs font-mono">
                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Telemetry Dispatcher"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      >
                        <option value="Full Stack">Full Stack</option>
                        <option value="Security & Systems">Security & Systems</option>
                        <option value="AI & ML">AI & ML</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">My Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Lead Security Architect"
                        value={projectForm.myRole}
                        onChange={(e) => setProjectForm({ ...projectForm, myRole: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Zero-Knowledge Cryptographic Dispatch System"
                      value={projectForm.tagline}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Technical Solution Summary *</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Describe the application features and stack..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Problem Solved</label>
                    <input
                      type="text"
                      placeholder="e.g. Eliminates response latency in emergency triage..."
                      value={projectForm.problemSolved}
                      onChange={(e) => setProjectForm({ ...projectForm, problemSolved: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Tech Tags (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, AES-256, Python, Supabase"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">GitHub Repository / Live URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/aranya13/..."
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Save size={15} />
                    <span>Save Project to Studio</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Project List Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-op-gold uppercase tracking-wider flex items-center justify-between">
                <span>Active Studio Projects ({projects.length})</span>
                <span className="text-op-cream/60">Live Local State</span>
              </div>

              <div className="space-y-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#0b132b]/80 border border-op-gold/25 hover:border-op-gold/50 transition-all flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-op-gold text-op-ink font-bold">
                          {p.category}
                        </span>
                        <h4 className="font-cinzel font-bold text-base text-white">{p.title}</h4>
                      </div>
                      <p className="text-xs text-op-cream/80 font-sans line-clamp-2 mb-2">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.tags?.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded bg-[#060a14] text-[10px] font-mono text-op-gold/90 border border-op-gold/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setProjects(projects.filter((item) => item.id !== p.id))}
                      className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer shrink-0"
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Skill Creation Form */}
            <div className="lg:col-span-6 space-y-4">
              <div className="scrim-card rounded-2xl p-6 border border-op-gold/30 shadow-xl">
                <h3 className="font-cinzel font-bold text-xl text-white mb-1 flex items-center gap-2">
                  <Plus size={18} className="text-op-gold" />
                  <span>Add New Technical Skill</span>
                </h3>
                <p className="text-xs text-op-cream/70 font-sans mb-5">
                  Add languages, frameworks, or algorithms to the skill matrix.
                </p>

                <form onSubmit={handleAddSkill} className="space-y-3.5 text-xs font-mono">
                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Skill / Technology Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Web Crypto API AES-256"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">Category</label>
                      <select
                        value={skillForm.category}
                        onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      >
                        <option value="Frontend">Frontend & UI</option>
                        <option value="Backend">Backend & APIs</option>
                        <option value="Languages">Programming Languages</option>
                        <option value="Databases">Databases & Ledgers</option>
                        <option value="AI & Security">AI & Cryptography</option>
                        <option value="DevOps">DevOps & Cloud</option>
                      </select>
                    </div>

                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">Proficiency (1-100)%</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={skillForm.proficiency}
                        onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Anime Gear / Soul Tag</label>
                    <input
                      type="text"
                      placeholder="e.g. Gear 5 • Sun God Nika or Wadō Ichimonji"
                      value={skillForm.gearTag}
                      onChange={(e) => setSkillForm({ ...skillForm, gearTag: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Save size={15} />
                    <span>Save Skill to Studio</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Skill List Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-op-gold uppercase tracking-wider flex items-center justify-between">
                <span>Active Studio Skills ({skills.length})</span>
                <span className="text-op-cream/60">Live Local State</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((s) => (
                  <div
                    key={s.id}
                    className="p-3.5 rounded-xl bg-[#0b132b]/80 border border-op-gold/25 flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-[10px] font-mono text-op-gold/80 uppercase">{s.category}</div>
                        <h4 className="font-cinzel font-bold text-sm text-white">{s.name}</h4>
                      </div>
                      <button
                        onClick={() => setSkills(skills.filter((item) => item.id !== s.id))}
                        className="p-1 rounded bg-red-950/60 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div>
                      <div className="text-[9px] font-mono text-emerald-400 mb-1">{s.gearTag}</div>
                      <div className="w-full h-1 bg-[#060a14] rounded-full overflow-hidden">
                        <div className="h-full bg-op-gold" style={{ width: `${s.proficiency}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Experience Creation Form */}
            <div className="lg:col-span-6 space-y-4">
              <div className="scrim-card rounded-2xl p-6 border border-op-gold/30 shadow-xl">
                <h3 className="font-cinzel font-bold text-xl text-white mb-1 flex items-center gap-2">
                  <Plus size={18} className="text-op-gold" />
                  <span>Add Experience / Academic Milestone</span>
                </h3>
                <p className="text-xs text-op-cream/70 font-sans mb-5">
                  Record research positions, internships, or engineering initiatives.
                </p>

                <form onSubmit={handleAddExperience} className="space-y-3.5 text-xs font-mono">
                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Role Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lead Systems Architect"
                      value={expForm.role}
                      onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">Organization / Company *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Indian Space Lab (ISL)"
                        value={expForm.organization}
                        onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block uppercase text-op-gold mb-1 font-bold">Time Period</label>
                      <input
                        type="text"
                        placeholder="e.g. Dec 2023 – Jan 2024"
                        value={expForm.period}
                        onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. India / Remote"
                      value={expForm.location}
                      onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Executive Summary</label>
                    <textarea
                      rows={2}
                      placeholder="Summary of responsibilities and technical domains..."
                      value={expForm.summary}
                      onChange={(e) => setExpForm({ ...expForm, summary: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block uppercase text-op-gold mb-1 font-bold">Key Highlights (1 per line)</label>
                    <textarea
                      rows={2}
                      placeholder="Developed Python simulation scripts&#10;Engineered real-time sensor pipelines"
                      value={expForm.highlights}
                      onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-white outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Save size={15} />
                    <span>Save Experience to Studio</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Experience List Preview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-op-gold uppercase tracking-wider flex items-center justify-between">
                <span>Active Studio Experiences ({experiences.length})</span>
                <span className="text-op-cream/60">Live Local State</span>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl bg-[#0b132b]/80 border border-op-gold/25 flex items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-cinzel font-bold text-base text-white">{exp.role}</h4>
                      <div className="text-xs font-mono text-op-gold mb-1">
                        {exp.organization} • {exp.period}
                      </div>
                      <p className="text-xs text-op-cream/80 font-sans">{exp.summary}</p>
                    </div>

                    <button
                      onClick={() => setExperiences(experiences.filter((item) => item.id !== exp.id))}
                      className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer shrink-0"
                      title="Delete experience"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: JSON DATABASE EXPORT */}
        {activeTab === 'export' && (
          <div className="scrim-card rounded-2xl p-6 border border-op-gold/30 shadow-xl space-y-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-op-gold/20">
              <div>
                <h3 className="font-cinzel font-bold text-xl text-white">
                  Database Ready JSON Payload
                </h3>
                <p className="text-xs text-op-gold/80">
                  Ready to send to Supabase, MongoDB, or any REST/GraphQL backend endpoint.
                </p>
              </div>

              <button
                onClick={handleCopyJSON}
                className="px-4 py-2 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy JSON Payload'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-[#060a14] border border-op-gold/25 text-xs text-emerald-400 overflow-x-auto max-h-[500px]">
              {JSON.stringify(fullDataPayload, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default AdminStudio;
