export type VoicePermissionState = 'idle' | 'prompting' | 'listening' | 'denied' | 'unsupported';

export type VoiceCommandAction =
  | 'ACTIVATE_HAKI'
  | 'NAV_SKILLS'
  | 'NAV_PROJECTS'
  | 'NAV_ABOUT'
  | 'NAV_CONTACT'
  | 'NAV_EXPERIENCE'
  | 'NAV_FAST_SKILLS'
  | 'NAV_FAST_PROJECTS'
  | 'NAV_FAST_EXPERIENCE'
  | 'NAV_FAST_CONTACT'
  | 'NAV_HOME'
  | 'SCROLL_DOWN'
  | 'SCROLL_UP'
  | 'STOP_SCROLL'
  | 'CLICK_ELEMENT';

export interface RecognizedCommand {
  action: VoiceCommandAction;
  rawTranscript: string;
  displayTitle: string;
  displaySubtitle: string;
  icon?: string;
  isFast?: boolean;
  clickedElementText?: string;
}

// ── Web Audio Synthesizer ────────────────────────────────────────────────────
let audioCtx: AudioContext | null = null;
function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx || audioCtx.state === 'closed') {
      const AudioClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Haoshoku Sub-Bass Shockwave & Sonic Boom
export function playConquerorHakiAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    // Sub-bass sweep
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(24, now + 0.8);
    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 1.6);

    // Resonant Bell Chime
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(440, now + 0.1);
    chimeOsc.frequency.exponentialRampToValueAtTime(880, now + 0.5);
    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.linearRampToValueAtTime(0.3, now + 0.15);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start(now + 0.1);
    chimeOsc.stop(now + 1.8);
  } catch {}
}

// Voice Command Acknowledgment Ping
export function playVoiceAcknowledgeAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.07);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch {}
}

// ── Dynamic Button & Link Clicker on Active Screen ───────────────────────────
export function findAndClickScreenButton(rawText: string): { clickedText: string } | null {
  const clean = rawText
    .toLowerCase()
    .replace(/^(click|open|press|select|choose|hit|tap|go to)\s+/i, '')
    .trim();

  if (!clean || clean.length < 2) return null;

  const candidates = document.querySelectorAll<HTMLElement>(
    'button, a, input[type="button"], input[type="submit"], [role="button"], [tabindex="0"]'
  );

  let bestMatch: HTMLElement | null = null;
  let bestScore = 0;
  let matchedLabel = '';

  for (let i = 0; i < candidates.length; i++) {
    const el = candidates[i];
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0 || el.offsetParent === null) continue;

    const text = (el.innerText || el.textContent || '').toLowerCase().trim();
    const title = (el.getAttribute('title') || '').toLowerCase().trim();
    const aria = (el.getAttribute('aria-label') || '').toLowerCase().trim();

    const targets = [text, title, aria].filter(Boolean);
    for (const str of targets) {
      if (str === clean) {
        bestMatch = el;
        bestScore = 100;
        matchedLabel = text || title || aria || clean;
        break;
      }
      if (str.includes(clean) || clean.includes(str)) {
        const score = (clean.length / (str.length || 1)) * 50;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = el;
          matchedLabel = text || title || aria || clean;
        }
      }
    }
    if (bestScore === 100) break;
  }

  if (bestMatch && bestScore >= 25) {
    bestMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    try {
      bestMatch.focus();
      bestMatch.click();
    } catch {
      bestMatch.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
    return { clickedText: matchedLabel.slice(0, 24) || clean };
  }

  return null;
}

// ── Tech & Professional Vocabulary Canonical Normalization ──────────────────
export const TECH_TERM_MAP: Record<string, string> = {
  'front end': 'Frontend',
  'front-end': 'Frontend',
  'frontend': 'Frontend',
  'back end': 'Backend',
  'back-end': 'Backend',
  'backend': 'Backend',
  'full stack': 'Full Stack',
  'full-stack': 'Full Stack',
  'fullstack': 'Full Stack',
  'node js': 'Node.js',
  'nodejs': 'Node.js',
  'java script': 'JavaScript',
  'javascript': 'JavaScript',
  'type script': 'TypeScript',
  'typescript': 'TypeScript',
  'react js': 'React.js',
  'reactjs': 'React.js',
  'react': 'React',
  'next js': 'Next.js',
  'nextjs': 'Next.js',
  'express js': 'Express.js',
  'expressjs': 'Express.js',
  'mongo db': 'MongoDB',
  'mongodb': 'MongoDB',
  'postgre sql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'tailwind css': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'framer motion': 'Framer Motion',
  'rest api': 'RESTful API',
  'restful api': 'RESTful API',
  'aes 256': 'AES-256',
  'aes-256': 'AES-256',
  'yolo v8': 'YOLOv8',
  'yolov8': 'YOLOv8',
  'socket io': 'Socket.IO',
  'socketio': 'Socket.IO',
  'git hub': 'GitHub',
  'github': 'GitHub',
};

/**
 * Normalizes keys for robust list / tag matching: lowercase, strip all non-alphanumerics.
 */
export function normalizeSearchKey(term: string): string {
  return term.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Voice Transcript Cleaner:
 * 1. Strips filler words (um, uh, mm, mmm, hmm, ohh, err, ah, you know, etc.)
 * 2. Removes hesitation stutter repeats (e.g. "I I" -> "I", "open open" -> "open")
 * 3. Normalizes compound tech terms to canonical casing (Node.js, Frontend, JavaScript)
 * 4. Preserves semantic words & proper nouns
 */
export function cleanVoiceTranscript(raw: string): string {
  if (!raw || !raw.trim()) return '';

  let cleaned = raw;

  // Remove disfluencies & filler sounds
  cleaned = cleaned.replace(/\b(um+|uh+|mm+|mmm+|hmm+|ohh+|err+|ah+)\b/gi, ' ');

  // Remove filler phrases
  cleaned = cleaned.replace(/\b(you know|i mean)\b/gi, ' ');

  // Remove stutter-repeats (e.g. "I I have" -> "I have")
  cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, '$1');

  // Remove leading conversational starters
  cleaned = cleaned.replace(/^\s*(so|basically|well)\b\s*/i, '');

  // Normalize compound tech terms (longer phrases first)
  const sortedKeys = Object.keys(TECH_TERM_MAP).sort((a, b) => b.length - a.length);
  for (const term of sortedKeys) {
    const escaped = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    cleaned = cleaned.replace(regex, TECH_TERM_MAP[term]);
  }

  // Remove extra whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Capitalize sentence start
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }

  return cleaned;
}

// ── Centralized Command Matcher ──────────────────────────────────────────────
export function matchVoiceCommand(rawTranscript: string, isHakiActive: boolean): RecognizedCommand | null {
  const cleaned = cleanVoiceTranscript(rawTranscript);
  const text = cleaned.toLowerCase();
  if (!text) return null;

  // 1. Immediate "RETURN" / "PORTFOLIO" / "MAIN PAGE" / "HOME" -> Return to portfolio main page
  if (
    text === 'return' ||
    text.includes('return to portfolio') ||
    text.includes('return to main') ||
    text.includes('return home') ||
    text.includes('portfolio main page') ||
    text.includes('main page') ||
    text === 'portfolio' ||
    text === 'home' ||
    text === 'go back' ||
    text === 'back'
  ) {
    return {
      action: 'NAV_HOME',
      rawTranscript: cleaned,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'RETURN TO PORTFOLIO',
      icon: '🏠',
    };
  }

  // 2. "RESUME" / "HAKI" -> Activate Conqueror's Haki
  if (
    text.includes('resume') ||
    text.includes('conqueror') ||
    text.includes('haki') ||
    text.includes('rezume')
  ) {
    return {
      action: 'ACTIVATE_HAKI',
      rawTranscript: cleaned,
      displayTitle: 'CONQUEROR HAKI',
      displaySubtitle: 'RESUME UNLEASHED',
      icon: '👑',
    };
  }

  // Strictly gated until "RESUME" is spoken
  if (!isHakiActive) {
    return null;
  }

  // 2. Smooth Scrolling Commands
  if (text === 'stop' || text.includes('stop scroll') || text.includes('halt') || text.includes('pause')) {
    return {
      action: 'STOP_SCROLL',
      rawTranscript,
      displayTitle: 'SCROLL CONTROL',
      displaySubtitle: 'SCROLL PAUSED',
      icon: '🛑',
    };
  }

  if (text.includes('scroll down') || text.includes('go down') || text.includes('page down')) {
    return {
      action: 'SCROLL_DOWN',
      rawTranscript,
      displayTitle: 'SMOOTH SCROLL',
      displaySubtitle: 'SCROLLING DOWN ↓',
      icon: '⬇️',
    };
  }

  if (text.includes('scroll up') || text.includes('go up') || text.includes('page up')) {
    return {
      action: 'SCROLL_UP',
      rawTranscript,
      displayTitle: 'SMOOTH SCROLL',
      displaySubtitle: 'SCROLLING UP ↑',
      icon: '⬆️',
    };
  }

  // 3. FAST Navigation Modifiers (Bypasses cutscene delay)
  const isFast = text.includes('fast') || text.includes('quick') || text.includes('instant') || text.includes('without video');

  if (isFast && (text.includes('proj') || text.includes('zoro') || text.includes('work'))) {
    return {
      action: 'NAV_FAST_PROJECTS',
      rawTranscript,
      displayTitle: 'FAST MODE',
      displaySubtitle: 'PROJECTS (ZORO)',
      icon: '⚡',
      isFast: true,
    };
  }

  if (isFast && (text.includes('contact') || text.includes('nami') || text.includes('message') || text.includes('email'))) {
    return {
      action: 'NAV_FAST_CONTACT',
      rawTranscript,
      displayTitle: 'FAST MODE',
      displaySubtitle: 'CONTACT (NAMI)',
      icon: '⚡',
      isFast: true,
    };
  }

  if (isFast && (text.includes('experience') || text.includes('voyage') || text.includes('brook') || text.includes('exp'))) {
    return {
      action: 'NAV_FAST_EXPERIENCE',
      rawTranscript,
      displayTitle: 'FAST MODE',
      displaySubtitle: 'EXPERIENCE (BROOK)',
      icon: '⚡',
      isFast: true,
    };
  }

  if (text === 'fast' || (isFast && (text.includes('skill') || text.includes('luffy') || text.includes('tech')))) {
    return {
      action: 'NAV_FAST_SKILLS',
      rawTranscript,
      displayTitle: 'FAST MODE',
      displaySubtitle: 'SKILLS (LUFFY)',
      icon: '⚡',
      isFast: true,
    };
  }

  // 4. Standard Navigation Commands
  if (text.includes('skill') || text.includes('luffy') || text.includes('tech')) {
    return {
      action: 'NAV_SKILLS',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'SKILLS (LUFFY)',
      icon: '👒',
    };
  }

  if (text.includes('proj') || text.includes('zoro')) {
    return {
      action: 'NAV_PROJECTS',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'PROJECTS (ZORO)',
      icon: '⚔️',
    };
  }

  if (text.includes('experience') || text.includes('voyage') || text.includes('brook')) {
    return {
      action: 'NAV_EXPERIENCE',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'EXPERIENCE (BROOK)',
      icon: '🎻',
    };
  }

  if (text.includes('contact') || text.includes('nami') || text.includes('reach')) {
    return {
      action: 'NAV_CONTACT',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'CONTACT (NAMI)',
      icon: '⚡',
    };
  }

  if (text.includes('about') || text.includes('bio') || text.includes('profile')) {
    return {
      action: 'NAV_ABOUT',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'ABOUT ARANYA',
      icon: '🏴‍☠️',
    };
  }

  if (
    text.includes('return') ||
    text.includes('portfolio') ||
    text.includes('main page') ||
    text.includes('home') ||
    text.includes('exit') ||
    text.includes('back') ||
    text.includes('close')
  ) {
    return {
      action: 'NAV_HOME',
      rawTranscript,
      displayTitle: 'VOICE COMMAND',
      displaySubtitle: 'RETURN TO PORTFOLIO',
      icon: '🏠',
    };
  }

  // 5. Dynamic Screen Button Clicker
  const clicked = findAndClickScreenButton(text);
  if (clicked) {
    return {
      action: 'CLICK_ELEMENT',
      rawTranscript,
      displayTitle: 'VOICE CLICK',
      displaySubtitle: clicked.clickedText.toUpperCase(),
      icon: '👆',
      clickedElementText: clicked.clickedText,
    };
  }

  return null;
}
