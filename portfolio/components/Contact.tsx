import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin, MessageSquare, Zap, User, Globe } from 'lucide-react';
import { PortfolioTheme } from '../types';

interface ContactProps {
  theme?: PortfolioTheme;
}

export const Contact: React.FC<ContactProps> = ({ theme }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [isSent, setIsSent] = useState(false);

  const isRecruiter = theme === 'recruiter';

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
    const cleanSubject = (formData.subject || `Portfolio Inquiry from ${cleanName}`).trim().slice(0, 150);
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
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Viewer mode Nami artwork background */}
      {!isRecruiter && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/Nami.jpg"
            alt="Nami Contact Background"
            className="w-full h-full object-cover object-[center_top] opacity-25 mix-blend-screen scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070c18]/90 via-[#070c18]/70 to-[#070c18]/95" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header — same style as Skills */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b132b] border border-op-gold/30 text-op-gold font-mono text-xs uppercase tracking-widest mb-3">
              {isRecruiter ? <MessageSquare size={13} /> : <span>⚡</span>}
              <span>{isRecruiter ? 'Direct Professional Communication' : "Nami's Thunderbolt Transponder"}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-op-cream flex items-center gap-3">
              <span>CONTACT</span>
              {!isRecruiter && (
                <span className="text-sm font-pirate text-amber-300 bg-amber-950/60 px-3 py-0.5 rounded-full border border-amber-400/40 hidden sm:inline-block">
                  天候棒・サンダーボルト
                </span>
              )}
            </h2>
            <div className="w-20 h-0.5 bg-op-gold mt-3" />
          </div>

          <div className="text-xs font-mono text-op-cream/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Full-Time Roles · 2026</span>
          </div>
        </div>

        {/* Three-Column Grid — same structure as Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1: Direct Reach */}
          <div className="scrim-card rounded-2xl p-6 shadow-md flex flex-col gap-4 transition-all duration-200 hover:border-op-gold/50">
            <div className="flex items-center gap-2.5 pb-3 border-b border-op-gold/20">
              <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                <Mail size={18} className="text-op-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-base text-op-cream">
                {isRecruiter ? 'Direct Reach' : 'Transponder Signals'}
              </h3>
            </div>

            <p className="text-xs text-op-cream/75 font-sans leading-relaxed">
              Looking for a full-stack engineer with deep systems focus? Let's connect directly.
            </p>

            {/* Copy-able contact rows */}
            <div className="space-y-2.5">
              <div
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#0b132b] border border-op-gold/20 hover:border-op-gold flex items-center justify-between cursor-pointer transition-all group"
                title="Click to copy email"
              >
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-op-gold" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-op-gold">Email</div>
                    <div className="text-[11px] font-mono text-op-cream">bahugunaaranya@gmail.com</div>
                  </div>
                </div>
                <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-op-gold text-op-ink">
                  {copiedEmail ? '✓' : 'Copy'}
                </span>
              </div>

              <div
                onClick={handleCopyPhone}
                className="p-2.5 rounded-xl bg-[#0b132b] border border-op-gold/20 hover:border-op-gold flex items-center justify-between cursor-pointer transition-all group"
                title="Click to copy phone"
              >
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-op-gold" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-op-gold">Phone / WhatsApp</div>
                    <div className="text-[11px] font-mono text-op-cream">+91 82181 54757</div>
                  </div>
                </div>
                <span className="text-[9px] font-cinzel font-bold px-2 py-0.5 rounded bg-op-gold text-op-ink">
                  {copiedPhone ? '✓' : 'Copy'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0b132b] border border-op-gold/20 flex items-center gap-2">
                <MapPin size={14} className="text-op-gold shrink-0" />
                <div>
                  <div className="text-[9px] font-mono uppercase text-op-gold">Location</div>
                  <div className="text-[11px] font-mono text-op-cream">Dehradun / Bhopal (Open to Relocate)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Social Links & Profiles */}
          <div className="scrim-card rounded-2xl p-6 shadow-md flex flex-col gap-4 transition-all duration-200 hover:border-op-gold/50">
            <div className="flex items-center gap-2.5 pb-3 border-b border-op-gold/20">
              <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                <Globe size={18} className="text-op-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-base text-op-cream">
                Online Profiles
              </h3>
            </div>

            <p className="text-xs text-op-cream/75 font-sans leading-relaxed">
              Explore my open-source work, engineering articles, and professional network connections.
            </p>

            <div className="flex flex-col gap-2.5 flex-1">
              <a
                href="https://github.com/aranya13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#0b132b] border border-op-gold/20 hover:border-op-gold text-op-cream hover:text-op-gold transition-all group"
              >
                <Github size={18} className="text-op-gold shrink-0" />
                <div>
                  <div className="text-xs font-cinzel font-bold">GitHub</div>
                  <div className="text-[10px] font-mono text-op-cream/60">@aranya13 · 6 Repos</div>
                </div>
                <span className="ml-auto text-[10px] font-mono text-op-gold/60 group-hover:text-op-gold">→</span>
              </a>

              <a
                href="https://www.linkedin.com/in/aranya-bahuguna-40a7b4251/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#0b132b] border border-op-gold/20 hover:border-op-gold text-op-cream hover:text-op-gold transition-all group"
              >
                <Linkedin size={18} className="text-op-gold shrink-0" />
                <div>
                  <div className="text-xs font-cinzel font-bold">LinkedIn</div>
                  <div className="text-[10px] font-mono text-op-cream/60">Aranya Bahuguna</div>
                </div>
                <span className="ml-auto text-[10px] font-mono text-op-gold/60 group-hover:text-op-gold">→</span>
              </a>

              <div className="mt-auto pt-3 border-t border-op-gold/15">
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Full-Time Roles · 2026 Batch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Send Message Form */}
          <div className="scrim-card rounded-2xl p-6 shadow-md flex flex-col gap-4 transition-all duration-200 hover:border-op-gold/50 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 pb-3 border-b border-op-gold/20">
              <div className="p-2 rounded-lg bg-[#0b132b] border border-op-gold/30">
                <Send size={18} className="text-op-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-base text-op-cream">
                Send Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
              {/* Honeypot */}
              <input
                type="text"
                name="_hp_trap"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none', position: 'absolute', opacity: 0 }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-op-gold mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    placeholder={isRecruiter ? 'Hiring Manager' : 'Admiral Aokiji'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-op-gold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-op-gold mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Engineering Role / Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block font-mono text-[10px] uppercase text-op-gold mb-1">Message *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell me about the opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b132b] border border-op-gold/30 focus:border-op-gold text-op-cream text-xs font-mono outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={13} />
                <span>Transmit via Mailto</span>
              </button>

              {isSent && (
                <div className="p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-500 text-emerald-400 text-center font-mono text-xs">
                  ✓ Draft ready in your email client!
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;