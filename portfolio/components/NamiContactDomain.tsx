import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Phone, MapPin, Send, Check, Github, Linkedin, ArrowLeft, Sparkles, CloudLightning, Shield, Globe, ExternalLink, Download, MessageSquare, Clock, Radio, UserCheck } from 'lucide-react';

interface NamiContactDomainProps {
  onBackToMain: () => void;
}

const contactChannels = [
  { name: 'Email Dispatch', icon: '✉️', tag: 'bahugunaaranya@gmail.com' },
  { name: 'Phone / WhatsApp', icon: '📞', tag: '+91 82181 54757' },
  { name: 'LinkedIn Network', icon: '💼', tag: 'in/aranya-bahuguna' },
  { name: 'GitHub Code', icon: '🐙', tag: 'github.com/aranya13' },
  { name: 'Location Base', icon: '📍', tag: 'Dehradun / Bhopal' },
  { name: 'Resume PDF', icon: '📄', tag: 'Direct Download' },
  { name: 'Response Latency', icon: '⚡', tag: '< 24 Hours' },
  { name: 'Full-Time Role', icon: '🚀', tag: 'Class of 2026' },
];

export const NamiContactDomain: React.FC<NamiContactDomainProps> = ({ onBackToMain }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'direct' | 'social' | 'message'>('all');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bahugunaaranya@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+918218154757');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim()) {
      setIsSent(true);
      return;
    }
    const cleanName = formData.name.trim().slice(0, 100);
    const cleanEmail = formData.email.trim().slice(0, 100);
    const cleanSubject = (formData.subject || `Grand Line Signal from ${cleanName}`).trim().slice(0, 150);
    const cleanMessage = formData.message.trim().slice(0, 3000);

    const mailtoUrl = `mailto:bahugunaaranya@gmail.com?subject=${encodeURIComponent(
      cleanSubject
    )}&body=${encodeURIComponent(
      `From: ${cleanName} (${cleanEmail})\n\nMessage:\n${cleanMessage}`
    )}`;
    window.location.href = mailtoUrl;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#070502] text-op-cream font-sans relative overflow-x-hidden pt-24 pb-20 selection:bg-amber-400 selection:text-black"
    >
      {/* Background Image: Nami.jpg Full-Bleed Wallpaper */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/Nami.jpg"
          alt="Nami Background"
          className="w-full h-full object-cover object-[center_top] opacity-65 brightness-95 contrast-105"
          style={{ transform: 'translateZ(0)' }}
        />
        {/* Cinematic atmospheric overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070502]/70 via-[#070502]/35 to-[#070502]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,#070502_85%)]" />
        
        {/* Volumetric Amber & Gold Thunderbolt Ambient Glow Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-amber-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[550px] h-[400px] bg-orange-500/12 rounded-full blur-[130px]" />
        
        {/* Subtle Lightning Grid */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Navigation & Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-6 mb-8 border-b border-amber-400/30">
          <button
            onClick={onBackToMain}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#140f06]/90 hover:bg-amber-950/90 text-amber-300 hover:text-amber-200 border border-amber-400/40 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md backdrop-blur-md"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono text-amber-300/80 border border-amber-400/30 px-3 py-1 rounded-full bg-amber-950/60 shrink-0">
              天候棒 • サンダーボルトテンポ
            </span>
          </div>
        </div>

        {/* TOP-LEFT HEADER: CLEAN "CONTACT" TITLE & INTERACTIVE CONTROLS */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-amber-400/20">
          <div className="text-left">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#140f06]/90 border border-amber-400/40 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3 shadow-md backdrop-blur-sm"
            >
              <Zap size={13} className="text-amber-400 animate-pulse" />
              <span>Direct Professional Communication</span>
            </motion.div>

            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-7xl md:text-8xl font-cinzel font-bold tracking-tight text-white mb-2"
              style={{
                textShadow: '0 0 35px rgba(245,158,11,0.5)',
              }}
            >
              CONTACT
            </motion.h1>

            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-transparent rounded-full mb-3" />

            <p className="text-xs sm:text-sm font-mono text-amber-200/80 max-w-xl leading-relaxed">
              Open for full-time Software Engineer and Systems Architect roles in 2026. Direct transponder channels, cryptographic channels, and collaboration inquiries.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Channels' },
              { id: 'direct', label: 'Direct Reach' },
              { id: 'social', label: 'Networks & Profiles' },
              { id: 'message', label: 'Send Message' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer backdrop-blur-md ${
                  activeFilter === tab.id
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-300 scale-105'
                    : 'bg-[#140f06]/80 text-amber-200/70 border border-amber-400/25 hover:border-amber-400 hover:text-amber-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* LOGO / CHANNEL CONTINUOUS MARQUEE */}
        <div className="mb-10 overflow-hidden py-3 relative rounded-2xl bg-[#140f06]/60 border border-amber-400/25 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
            {[...contactChannels, ...contactChannels].map((ch, idx) => (
              <div
                key={`${ch.name}-${idx}`}
                className="flex items-center justify-center p-2.5 px-4 rounded-xl bg-[#090602]/90 border border-amber-400/20 hover:border-amber-400 hover:bg-[#140f06] cursor-pointer transition-all hover:scale-110 shadow-sm group shrink-0 gap-2.5"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{ch.icon}</span>
                <span className="text-xs font-mono font-medium text-amber-200/85 group-hover:text-amber-300 transition-colors">
                  {ch.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 border border-amber-400/30 text-amber-400">
                  {ch.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-COLUMN DYNAMIC GRID OF CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Direct Signals & Reach */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`rounded-2xl p-6 bg-[#140f06]/85 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between group ${
              activeFilter !== 'all' && activeFilter !== 'direct' ? 'opacity-40 grayscale pointer-events-none' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-400/20">
                <div className="p-2.5 rounded-xl bg-[#090602] border border-amber-400/30 group-hover:border-amber-400 group-hover:scale-110 transition-all shadow-inner">
                  <Mail size={20} className="text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 block font-bold">
                    DIRECT SIGNALS
                  </span>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Transponder Reach
                  </h3>
                </div>
              </div>

              <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-4">
                Available for engineering conversations, systems design consultations, and full-time role inquiries.
              </p>

              {/* Copy-able channels */}
              <div className="space-y-3">
                <div
                  onClick={handleCopyEmail}
                  className="p-3 rounded-xl bg-[#090602] border border-amber-400/20 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all group/item"
                  title="Click to copy email"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail size={15} className="text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase text-amber-400">Email Address</div>
                      <div className="text-xs font-mono text-op-cream">bahugunaaranya@gmail.com</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-amber-400 text-black">
                    {copiedEmail ? '✓ Copied' : 'Copy'}
                  </span>
                </div>

                <div
                  onClick={handleCopyPhone}
                  className="p-3 rounded-xl bg-[#090602] border border-amber-400/20 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all group/item"
                  title="Click to copy phone number"
                >
                  <div className="flex items-center gap-2.5">
                    <Phone size={15} className="text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase text-amber-400">Phone / WhatsApp</div>
                      <div className="text-xs font-mono text-op-cream">+91 82181 54757</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-amber-400 text-black">
                    {copiedPhone ? '✓ Copied' : 'Copy'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#090602] border border-amber-400/20 flex items-center gap-2.5">
                  <MapPin size={15} className="text-amber-400 shrink-0" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-amber-400">Location Base</div>
                    <div className="text-xs font-mono text-op-cream">Dehradun / Bhopal (Open to Relocate)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center justify-between text-[10px] font-mono text-amber-300/80">
              <span>Timezone: IST (UTC+5:30)</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available Now
              </span>
            </div>
          </motion.div>

          {/* Card 2: Developer Networks & Portfolios */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`rounded-2xl p-6 bg-[#140f06]/85 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between group ${
              activeFilter !== 'all' && activeFilter !== 'social' ? 'opacity-40 grayscale pointer-events-none' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-400/20">
                <div className="p-2.5 rounded-xl bg-[#090602] border border-amber-400/30 group-hover:border-amber-400 group-hover:scale-110 transition-all shadow-inner">
                  <Globe size={20} className="text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 block font-bold">
                    ONLINE PRESENCE
                  </span>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Networks & Profiles
                  </h3>
                </div>
              </div>

              <p className="text-xs text-op-cream/80 font-sans leading-relaxed mb-4">
                Explore open-source cryptographic repositories, professional experience logs, and verified code.
              </p>

              <div className="space-y-3">
                <a
                  href="https://linkedin.com/in/aranya-bahuguna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#090602] border border-amber-400/20 hover:border-amber-400 flex items-center justify-between group/link transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} className="text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase text-amber-400">LinkedIn Profile</div>
                      <div className="text-xs font-mono text-op-cream">aranya-bahuguna</div>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-amber-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://github.com/aranya13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#090602] border border-amber-400/20 hover:border-amber-400 flex items-center justify-between group/link transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} className="text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase text-amber-400">GitHub Repositories</div>
                      <div className="text-xs font-mono text-op-cream">@aranya13</div>
                    </div>
                  </div>
                  <ExternalLink size={13} className="text-amber-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="/Aranya_Bahuguna_Resume.pdf?v=latest"
                  download="Aranya_Bahuguna_Resume.pdf"
                  className="p-3 rounded-xl bg-[#090602] border border-amber-400/30 hover:border-amber-400 flex items-center justify-between group/link transition-all bg-gradient-to-r from-amber-950/40 to-transparent"
                >
                  <div className="flex items-center gap-2.5">
                    <Download size={16} className="text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono uppercase text-amber-400">Verified Resume</div>
                      <div className="text-xs font-mono text-op-cream">Download PDF Format</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    PDF ↗
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-400/20 flex flex-wrap gap-1.5">
              {['Full Stack', 'AES-256', 'VIT Bhopal \'26', 'ISL Intern'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-[#090602] border border-amber-400/20 text-amber-300 text-[10px] font-mono">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Encrypted Snail Dispatch (Contact Form) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`rounded-2xl p-6 bg-[#140f06]/85 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between group ${
              activeFilter !== 'all' && activeFilter !== 'message' ? 'opacity-40 grayscale pointer-events-none' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-400/20">
                <div className="p-2.5 rounded-xl bg-[#090602] border border-amber-400/30 group-hover:border-amber-400 group-hover:scale-110 transition-all shadow-inner">
                  <Send size={20} className="text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 block font-bold">
                    FAST DISPATCH
                  </span>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Send Signal Direct
                  </h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div>
                  <label className="text-[9px] font-mono uppercase text-amber-400 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter / Captain"
                    className="w-full px-3 py-2 rounded-xl bg-[#090602] border border-amber-400/25 focus:border-amber-400 text-xs font-mono text-op-cream placeholder-op-cream/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase text-amber-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#090602] border border-amber-400/25 focus:border-amber-400 text-xs font-mono text-op-cream placeholder-op-cream/40 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-mono uppercase text-amber-400 block mb-1">Message</label>
                  <textarea
                    required
                    maxLength={2000}
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Let's discuss full-stack engineering roles..."
                    className="w-full px-3 py-2 rounded-xl bg-[#090602] border border-amber-400/25 focus:border-amber-400 text-xs font-mono text-op-cream placeholder-op-cream/40 focus:outline-none resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02]"
                >
                  {isSent ? (
                    <>
                      <Check size={14} className="text-black" />
                      <span>Signal Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} className="text-black" />
                      <span>Send Snail Dispatch →</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* BOTTOM FEATURE MODULE: AVAILABILITY & DIRECT STATUS */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#140f06]/85 border border-amber-400/35 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-amber-400/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-400/50 text-amber-400">
                <Radio size={20} />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-lg text-white flex items-center gap-2">
                  <span>Transponder Frequency Status</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-xs font-mono text-amber-300/70">
                  Real-time communication frequency for engineering recruitment and technical collaborations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-300 bg-[#090602] px-3.5 py-1.5 rounded-xl border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Frequency: 142.80 MHz</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-amber-200/90">
            <div className="p-4 rounded-xl bg-[#090602] border border-amber-400/20">
              <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Recruitment Availability</div>
              <div className="text-xl font-bold text-white mb-1">Class of 2026</div>
              <div className="text-[11px] text-op-cream/70">Open for Full-Time, Remote & On-Site Engineering</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090602] border border-amber-400/20">
              <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Expected Response Time</div>
              <div className="text-xl font-bold text-white mb-1">&lt; 12–24 Hours</div>
              <div className="text-[11px] text-op-cream/70">Fast turnaround on all email and WhatsApp signals</div>
            </div>

            <div className="p-4 rounded-xl bg-[#090602] border border-amber-400/20">
              <div className="text-[10px] text-amber-400 uppercase tracking-wider mb-1">Target Engineering Domains</div>
              <div className="text-xl font-bold text-white mb-1">Full Stack & Security</div>
              <div className="text-[11px] text-op-cream/70">Distributed Systems, Web Platforms & Cryptography</div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default NamiContactDomain;
