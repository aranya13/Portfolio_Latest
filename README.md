# 🏴‍☠️ Aranya Bahuguna — Portfolio

A high-performance, interactive developer portfolio engineered with **React 18**, **TypeScript**, **Vite**, and **Framer Motion**. Features dual UI presentation modes, immersive One Piece themed character domains, client-side zero-knowledge cryptography demos, and hands-free voice command navigation powered by the **Web Speech API**.

---

## ✨ Features

- 🎙️ **Hands-Free Voice Navigation**  
  Navigate seamlessly through voice commands powered 100% locally by the browser's native **Web Speech API** and custom **Web Audio API** sound synthesizers.
- 🎨 **Dual Presentation Modes**  
  - **Recruiter Mode:** Clean, minimalist, and streamlined for hiring managers and recruiters.
  - **Pirate / Straw Hat Mode:** Fully immersive anime-inspired aesthetics, cinematic visuals, and custom sound effects.
- ⚔️ **Character Domains**  
  - 👒 **Luffy Domain (Tech Arsenal & Skills):** Categorized technical proficiencies, frontend/backend tools, and system skills.
  - ⚔️ **Zoro Domain (Featured Projects):** Detailed project deep-dives with architectures, problem-solving highlights, and live demos.
  - 🎻 **Brook Domain (Voyage & Experience):** Career timeline and research journey (Indian Space Lab, VIT Bhopal).
  - ⚡ **Nami Domain (Contact & Navigation):** Direct contact channel and social links.
- 🔮 **Cinematic Haki Overlays & Visuals**  
  - **Conqueror's Haki:** Screen-wide shockwaves, red-black lightning discharge, and dynamic audio synthesizer.
  - **Armament Haki Mode:** Metallic hardening and armor effects.
  - **Observation Haki Vision:** Futuristic scanlines and radar target locking.
- 🔐 **Zero-Knowledge Crypto Playground**  
  Interactive client-side **AES-256-GCM** encryption and decryption playground powered by the **Web Crypto API**.
- 💻 **Grand Line Interactive Terminal**  
  Embedded terminal emulator with custom commands (`help`, `skills`, `projects`, `clear`, `contact`).

---

## 🛠️ Tech Stack

- **Frontend Core:** [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Animations & FX:** [Framer Motion](https://www.framer.com/motion/), Custom WebGL / Canvas shaders, Web Audio API
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons & Typography:** [Lucide React](https://lucide.dev/), Google Fonts (*Cinzel*, *JetBrains Mono*, *Plus Jakarta Sans*)
- **Browser APIs:** Web Speech API (`SpeechRecognition`), Web Crypto API (`SubtleCrypto`), Web Audio API (`AudioContext`)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### 1. Clone the Repository

```bash
git clone https://github.com/AranyaBahuguna/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The portfolio will be live at `http://localhost:3000`.

> **Note:** No external API keys or environment variables are required. Voice recognition and cryptography run 100% locally in the browser!

---

## 🎙️ Voice Command Reference

Click the **Microphone** icon (or say *"Resume"* / *"Haki"*) to activate voice listening:

| Command | Action |
| :--- | :--- |
| `"Skills"` / `"Luffy"` | Scroll to Technical Skills |
| `"Projects"` / `"Zoro"` | Scroll to Projects Domain |
| `"Experience"` / `"Brook"` | Scroll to Journey / Experience |
| `"Contact"` / `"Nami"` | Scroll to Contact Form |
| `"Home"` / `"Portfolio"` / `"Return"` | Return to Hero Section |
| `"Scroll Down"` / `"Scroll Up"` | Trigger smooth auto-scrolling |
| `"Stop"` / `"Pause"` | Halt active scroll |
| `"Fast [Section]"` | Navigate instantly without cinematic delay |
| `"Click [Button Name]"` | Voice-activated dynamic button & link clicker |

---

## 📦 Build & Production

To generate the optimized production bundle:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
