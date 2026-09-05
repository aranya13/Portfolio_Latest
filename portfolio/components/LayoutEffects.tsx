import React from 'react';
import { PortfolioTheme } from '../types';

// --- Custom Cursor DISABLED — using native system cursor for maximum 120fps responsiveness ---
export const CustomCursor: React.FC = () => null;

// --- Real Photographic Backgrounds with Neutral Contrast Scrim (High-Performance GPU composited) ---
export const PhotographicBackground: React.FC<{ theme: PortfolioTheme }> = ({ theme }) => {
  const sunrisePhotoUrl =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=75';
  
  // Custom user-uploaded BG from /public/BG.jpg
  const customBgUrl = '/BG.jpg';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ transform: 'translateZ(0)' }}>
      {/* Background image — GPU composited layer */}
      <img
        src={theme === 'recruiter' ? sunrisePhotoUrl : customBgUrl}
        onError={(e) => {
          if (theme === 'viewer') {
            (e.currentTarget as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?auto=format&fit=crop&w=1920&q=75';
          }
        }}
        alt=""
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover object-center"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Dark scrim */}
      <div
        className="absolute inset-0"
        style={{
          background: theme === 'recruiter' ? 'rgba(7,12,24,0.80)' : 'rgba(4,8,20,0.75)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Minimal CSS-only starfield for Viewer theme — 6 stars, pure CSS, zero JS */}
      {theme === 'viewer' && (
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.45 }}>
          <style>{`
            @keyframes twinkle { 0%,100%{opacity:.15} 50%{opacity:.9} }
            .st{position:absolute;border-radius:50%;background:#fff;animation:twinkle var(--d,3s) var(--dl,0s) ease-in-out infinite;box-shadow:0 0 4px rgba(255,255,255,.6);}
          `}</style>
          <span className="st" style={{ top:'8%',  left:'12%', width:'2px', height:'2px', '--d':'3.2s', '--dl':'0s'   } as React.CSSProperties} />
          <span className="st" style={{ top:'22%', left:'73%', width:'1.5px',height:'1.5px','--d':'2.5s','--dl':'0.6s'} as React.CSSProperties} />
          <span className="st" style={{ top:'55%', left:'88%', width:'2px', height:'2px', '--d':'4s',  '--dl':'1.1s'} as React.CSSProperties} />
          <span className="st" style={{ top:'71%', left:'34%', width:'1.5px',height:'1.5px','--d':'2.8s','--dl':'0.3s'} as React.CSSProperties} />
          <span className="st" style={{ top:'40%', left:'5%',  width:'2px', height:'2px', '--d':'3.6s','--dl':'1.5s'} as React.CSSProperties} />
          <span className="st" style={{ top:'85%', left:'60%', width:'1.5px',height:'1.5px','--d':'2.2s','--dl':'0.9s'} as React.CSSProperties} />
        </div>
      )}
    </div>
  );
};