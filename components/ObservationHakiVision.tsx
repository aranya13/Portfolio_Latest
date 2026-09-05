import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Sparkles, X, Shield, Compass, Sliders, ZoomIn, ZoomOut, Check, ArrowLeft, ArrowRight, Eye, MousePointer, ShieldCheck, Lock } from 'lucide-react';

interface ObservationHakiVisionProps {
  onTriggerAction?: (actionType: 'select' | 'next' | 'prev') => void;
  onOpenSection?: (sectionId: string) => void;
  externalToggle?: boolean;
}

// Dynamically inject MediaPipe Hands script tags on demand (Zero bytes on initial load)
async function loadMediaPipeScripts(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if ((window as any).Hands) return true;

  const loadScript = (src: string) =>
    new Promise<void>((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.crossOrigin = 'anonymous';
      s.onload = () => resolve();
      s.onerror = (e) => reject(e);
      document.head.appendChild(s);
    });

  try {
    await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
    await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');
    return true;
  } catch (err) {
    console.warn('Failed to load MediaPipe Hands dynamically:', err);
    return false;
  }
}

export const ObservationHakiVision: React.FC<ObservationHakiVisionProps> = ({
  onTriggerAction,
  onOpenSection,
  externalToggle,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [gestureStatus, setGestureStatus] = useState<string>('Observation Haki Ready');
  const [scrollSensitivity] = useState<number>(3.5);
  const scrollAccumRef = useRef<number>(0);

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
  });
  const [isHandDetected, setIsHandDetected] = useState<boolean>(false);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number; active: boolean; type: 'click' | 'zoom' }>({
    x: 0,
    y: 0,
    active: false,
    type: 'click',
  });
  const [isAirTapping, setIsAirTapping] = useState<boolean>(false);
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const handsInstanceRef = useRef<any>(null);
  const isProcessingFrameRef = useRef<boolean>(false);
  const lastFrameSentTimeRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(false);
  const frameSkipCounterRef = useRef<number>(0);

  const smoothedCursorRef = useRef<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
  });
  const scrollVelocityRef = useRef<number>(0);

  const lastTapTimeRef = useRef<number>(0);
  const lastClickActionRef = useRef<number>(0);
  const wasTappingRef = useRef<boolean>(false);
  const prevWristYRef = useRef<number | null>(null);
  const prevWristXRef = useRef<{ x: number; time: number } | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);

  const zoomedImageSrcRef = useRef<string | null>(null);
  zoomedImageSrcRef.current = zoomedImageSrc;

  // Respond to external toggle from Hero button
  const prevExternalToggleRef = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    if (externalToggle === undefined || externalToggle === prevExternalToggleRef.current) return;
    prevExternalToggleRef.current = externalToggle;
    if (!isActive) {
      if (hasPermission) {
        setIsActive(true);
      } else {
        setShowConsentModal(true);
      }
    } else {
      setIsActive(false);
    }
  }, [externalToggle]);

  const onTriggerActionRef = useRef(onTriggerAction);
  onTriggerActionRef.current = onTriggerAction;

  const onResultsRef = useRef<((results: any) => void) | null>(null);

  // Virtual Click / Zoom under Virtual Index Cursor
  const handleVirtualClickOrZoom = useCallback((screenX: number, screenY: number) => {
    const now = performance.now();
    if (now - lastClickActionRef.current < 400) return;
    lastClickActionRef.current = now;

    const el =
      document.elementFromPoint(screenX, screenY) ||
      document.elementFromPoint(screenX - 5, screenY - 5) ||
      document.elementFromPoint(screenX + 5, screenY + 5);
    if (!el) return;

    const imgEl = (el.tagName === 'IMG' ? el : el.querySelector('img') || el.closest('img')) as HTMLImageElement | null;
    if (imgEl && imgEl.src && !imgEl.classList.contains('no-zoom')) {
      if (zoomedImageSrcRef.current) {
        setZoomedImageSrc(null);
        setGestureStatus('🔍 Zoomed Out');
      } else {
        setZoomedImageSrc(imgEl.src);
        setGestureStatus('🔍 Zoomed In');
      }
      setClickRipple({ x: screenX, y: screenY, active: true, type: 'zoom' });
      setTimeout(() => setClickRipple((prev) => ({ ...prev, active: false })), 600);
      return;
    }

    const clickable = (el.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select, [tabindex], .scrim-card') || el) as HTMLElement;
    if (clickable) {
      setClickRipple({ x: screenX, y: screenY, active: true, type: 'click' });
      try {
        clickable.click();
        clickable.focus?.();
        const mouseEvt = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          clientX: screenX,
          clientY: screenY,
          view: window,
        });
        clickable.dispatchEvent(mouseEvt);
      } catch (e) {}

      setTimeout(() => setClickRipple((prev) => ({ ...prev, active: false })), 500);
      setGestureStatus('⚡ CLICK TRIGGERED!');
    }
  }, []);

  // Stop Camera & Fully Dispose Model & Streams
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    isActiveRef.current = false;
    setIsActive(false);
    setIsHandDetected(false);
    isProcessingFrameRef.current = false;
    setGestureStatus('Observation Haki Standby');
  }, []);

  // Initialize MediaPipe Hands on demand after consent
  const initMediaPipeHands = async () => {
    const loaded = await loadMediaPipeScripts();
    if (!loaded) {
      alert('Could not initialize hand tracking. Please check your internet connection.');
      return false;
    }
    const HandsClass = (window as any).Hands;
    if (!HandsClass) return false;

    if (!handsInstanceRef.current) {
      try {
        const hands = new HandsClass({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 0, // 0 = Lite Real-Time Model (Zero Latency)
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5,
        });

        hands.onResults((results: any) => {
          isProcessingFrameRef.current = false;
          if (onResultsRef.current) {
            onResultsRef.current(results);
          }
        });

        handsInstanceRef.current = hands;
      } catch (e) {
        console.warn('MediaPipe init error:', e);
        return false;
      }
    }
    return true;
  };

  // Start Camera Stream with fast standard constraints
  const startCamera = async () => {
    setShowConsentModal(false);
    try {
      setGestureStatus('Initializing MediaPipe...');
      const ready = await initMediaPipeHands();
      if (!ready) return;

      setGestureStatus('Starting Camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 320, max: 640 },
          height: { ideal: 240, max: 480 },
          facingMode: 'user',
        },
        audio: false,
      });

      streamRef.current = stream;
      isActiveRef.current = true;
      setIsActive(true);
      setHasPermission(true);
      setGestureStatus('☝️ Point Index Finger');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Camera access denied:', err);
      setHasPermission(false);
      setIsActive(false);
      isActiveRef.current = false;
    }
  };

  // Visibility change & tab blur safety
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActiveRef.current) {
        isProcessingFrameRef.current = false;
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Frame results processor
  onResultsRef.current = (results: any) => {
    if (!isActiveRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width || 160;
    const height = canvas.height || 120;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -width, 0, width, height);
    ctx.restore();

    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      setIsHandDetected(false);
      prevWristYRef.current = null;
      prevWristXRef.current = null;
      wasTappingRef.current = false;
      setIsAirTapping(false);
      setGestureStatus('☝️ Raise Hand to Control');
      return;
    }

    setIsHandDetected(true);
    const landmarks = results.multiHandLandmarks[0];

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const indexPip = landmarks[6];
    const indexTip = landmarks[8];
    const middleMcp = landmarks[9];
    const middlePip = landmarks[10];
    const middleTip = landmarks[12];
    const ringPip = landmarks[14];
    const ringTip = landmarks[16];
    const pinkyPip = landmarks[18];
    const pinkyTip = landmarks[20];

    const now = performance.now();
    const dist = (p1: { x: number; y: number }, p2: { x: number; y: number }) =>
      Math.hypot(p1.x - p2.x, p1.y - p2.y);

    const isIndexExtended = dist(indexTip, wrist) > dist(indexPip, wrist) * 1.15 && indexTip.y < indexPip.y + 0.04;
    const isMiddleExtended = dist(middleTip, wrist) > dist(middlePip, wrist) * 1.15 && middleTip.y < middlePip.y + 0.04;
    const isRingExtended = dist(ringTip, wrist) > dist(ringPip, wrist) * 1.14 && ringTip.y < ringPip.y + 0.04;
    const isPinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPip, wrist) * 1.14 && pinkyTip.y < pinkyPip.y + 0.04;

    const isIndexCurled = indexTip.y > indexPip.y || dist(indexTip, wrist) < dist(indexPip, wrist) * 1.05;
    const isMiddleCurled = middleTip.y > middlePip.y || dist(middleTip, wrist) < dist(middlePip, wrist) * 1.05;
    const isRingCurled = ringTip.y > ringPip.y || dist(ringTip, wrist) < dist(ringPip, wrist) * 1.05;
    const isPinkyCurled = pinkyTip.y > pinkyPip.y || dist(pinkyTip, wrist) < dist(pinkyPip, wrist) * 1.05;

    const extendedCount =
      (isIndexExtended ? 1 : 0) +
      (isMiddleExtended ? 1 : 0) +
      (isRingExtended ? 1 : 0) +
      (isPinkyExtended ? 1 : 0);

    const screenWristX = 1 - wrist.x;
    const screenMiddleX = 1 - middleMcp.x;
    const tiltVecX = screenMiddleX - screenWristX;
    const tiltVecY = middleMcp.y - wrist.y;
    const palmTiltDeg = (Math.atan2(tiltVecX, -tiltVecY) * 180) / Math.PI;

    const isOpenPalm =
      (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) ||
      (extendedCount >= 3 && isIndexExtended && isMiddleExtended);

    const isClosedPalm = isIndexCurled && isMiddleCurled && isRingCurled && isPinkyCurled;
    const isTwoFingers = isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended;
    const isOneFinger = (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) || (isIndexExtended && extendedCount === 1);

    if (isOpenPalm) {
      wasTappingRef.current = false;
      setIsAirTapping(false);

      if (palmTiltDeg < -25) {
        scrollVelocityRef.current = 0;
        setGestureStatus('👈 Palm Tilted Left → Back / Prev Page');
        if (now - lastSwipeTimeRef.current > 600) {
          lastSwipeTimeRef.current = now;
          if (onTriggerActionRef.current) onTriggerActionRef.current('prev');
        }
      } else {
        const upTarget = -Math.min(40, scrollSensitivity * 5.5);
        scrollVelocityRef.current += (upTarget - scrollVelocityRef.current) * 0.18;
        setGestureStatus('✋ Open Palm → Scrolling Up ↑');
      }
    } else if (isTwoFingers) {
      const downTarget = Math.min(40, scrollSensitivity * 5.5);
      scrollVelocityRef.current += (downTarget - scrollVelocityRef.current) * 0.18;
      setGestureStatus('✌️ 2 Fingers → Scrolling Down ↓');
      wasTappingRef.current = false;
      setIsAirTapping(false);
    } else if (isClosedPalm) {
      scrollVelocityRef.current = 0;
      setGestureStatus('✊ Fist → Paused');
      wasTappingRef.current = false;
      setIsAirTapping(false);
    } else if (isOneFinger) {
      scrollVelocityRef.current = 0;
      const margin = 0.10;
      const normX = Math.max(0.0, Math.min(1.0, (1 - indexTip.x - margin) / (1 - 2 * margin)));
      const normY = Math.max(0.0, Math.min(1.0, (indexTip.y - margin) / (1 - 2 * margin)));

      const targetScreenX = normX * window.innerWidth;
      const targetScreenY = normY * window.innerHeight;

      const dx = targetScreenX - smoothedCursorRef.current.x;
      const dy = targetScreenY - smoothedCursorRef.current.y;
      const dist2D = Math.hypot(dx, dy);
      const lerpFactor = Math.min(0.72, Math.max(0.32, dist2D / 300));
      smoothedCursorRef.current.x += dx * lerpFactor;
      smoothedCursorRef.current.y += dy * lerpFactor;

      const finalCursorX = Math.round(smoothedCursorRef.current.x);
      const finalCursorY = Math.round(smoothedCursorRef.current.y);

      setCursorPos({ x: finalCursorX, y: finalCursorY });

      const handScale = dist(landmarks[9], wrist) || 0.2;
      const distThumbIndex = dist(thumbTip, indexTip);
      const isIndexThumbTap = distThumbIndex < handScale * 0.38 || distThumbIndex < 0.058;
      setIsAirTapping(isIndexThumbTap);

      if (isIndexThumbTap && !wasTappingRef.current) {
        wasTappingRef.current = true;
        const timeSinceLastTap = now - lastTapTimeRef.current;

        if (timeSinceLastTap > 70 && timeSinceLastTap < 1000) {
          setGestureStatus('⚡ THUMB TAP 2x → CLICK!');
          handleVirtualClickOrZoom(finalCursorX, finalCursorY);
          lastTapTimeRef.current = 0;
        } else {
          lastTapTimeRef.current = now;
          setGestureStatus('☝️ Thumb Tap 1/2 (Tap Again to Click)');
          setClickRipple({ x: finalCursorX, y: finalCursorY, active: true, type: 'click' });
          setTimeout(() => setClickRipple((prev) => ({ ...prev, active: false })), 220);
        }
      } else if (!isIndexThumbTap && wasTappingRef.current) {
        wasTappingRef.current = false;
      }
    } else {
      scrollVelocityRef.current = 0;
      setIsAirTapping(false);
    }

    // Draw HUD Keypoints
    ctx.strokeStyle = '#e0a93b';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = '#ffffff';

    landmarks.forEach((pt: any) => {
      const px = (1 - pt.x) * width;
      const py = pt.y * height;
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    const tipX = (1 - indexTip.x) * width;
    const tipY = indexTip.y * height;
    ctx.strokeStyle = isAirTapping ? '#e0a93b' : isTwoFingers ? '#38bdf8' : isOpenPalm ? '#fbbf24' : isClosedPalm ? '#f87171' : '#10b981';
    ctx.lineWidth = isAirTapping ? 3.5 : 2.5;
    ctx.beginPath();
    ctx.arc(tipX, tipY, isAirTapping ? 8 : 6, 0, Math.PI * 2);
    ctx.stroke();
  };

  // High-Performance Frame Loop with Frame-Throttling (~30 FPS Cap)
  useEffect(() => {
    if (!isActive) return;
    const video = videoRef.current;
    if (!video) return;

    let isLoopRunning = true;

    const processFrame = async () => {
      if (!isLoopRunning) return;

      // Friction-damped scrolling
      if (Math.abs(scrollVelocityRef.current) > 0.15) {
        scrollAccumRef.current += scrollVelocityRef.current;
        const scrollPx = Math.trunc(scrollAccumRef.current);
        if (Math.abs(scrollPx) >= 1) {
          window.scrollBy({ top: scrollPx, behavior: 'instant' as ScrollBehavior });
          scrollAccumRef.current -= scrollPx;
        }
        scrollVelocityRef.current *= 0.80;
      } else {
        scrollVelocityRef.current = 0;
        scrollAccumRef.current = 0;
      }

      // Throttle: Send every 2nd animation frame to MediaPipe (~30 FPS inference)
      frameSkipCounterRef.current++;
      const shouldIncurInference = frameSkipCounterRef.current % 2 === 0;

      const now = performance.now();
      if (isProcessingFrameRef.current && now - lastFrameSentTimeRef.current > 180) {
        isProcessingFrameRef.current = false;
      }

      if (shouldIncurInference && video.readyState >= 2 && handsInstanceRef.current && !isProcessingFrameRef.current) {
        isProcessingFrameRef.current = true;
        lastFrameSentTimeRef.current = now;
        try {
          await handsInstanceRef.current.send({ image: video });
        } catch (e) {
          isProcessingFrameRef.current = false;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(processFrame);
    };

    animFrameIdRef.current = requestAnimationFrame(processFrame);

    return () => {
      isLoopRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isActive]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <>
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', width: 160, height: 120, zIndex: -10 }}
      />

      {/* FULLSCREEN IMAGE ZOOM MODAL */}
      <AnimatePresence>
        {zoomedImageSrc && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setZoomedImageSrc(null)}
            className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer select-none"
          >
            <div className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-op-gold/50 shadow-[0_0_50px_rgba(224,169,59,0.3)]">
              <img
                src={zoomedImageSrc}
                alt="Zoomed Preview"
                className="w-full h-full object-contain max-h-[80vh]"
              />
              <div className="absolute top-4 right-4 p-2 rounded-full bg-black/80 border border-op-gold text-op-gold">
                <X size={18} />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#070a12]/90 border border-op-gold/40 text-xs font-mono text-op-gold">
                Double tap or Click anywhere to Zoom Out
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRIVACY CONSENT MODAL */}
      <AnimatePresence>
        {showConsentModal && (
          <div className="fixed inset-0 z-[999998] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full rounded-2xl bg-[#080d1e] border-2 border-op-gold/60 p-6 shadow-2xl font-mono text-op-cream space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-op-gold/30">
                <div className="flex items-center gap-2 text-op-gold font-bold text-sm">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Observation Haki — Privacy Consent</span>
                </div>
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="p-1 rounded-lg hover:bg-op-gold/20 text-op-slate hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-op-cream/90">
                <p>
                  <strong className="text-op-gold">Camera Hand-Gesture Navigation</strong> uses AI landmark detection to let you control the cursor and scroll hands-free.
                </p>
                <div className="p-3 rounded-xl bg-[#050914] border border-emerald-500/40 text-[11px] text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Lock size={12} />
                    <span>100% Client-Side RAM Processing</span>
                  </div>
                  <div>
                    Video frames are processed strictly in your local browser memory. <strong>Zero video or audio data is ever recorded, stored, or sent to any server.</strong>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#0b132b] border border-op-slate/30 text-op-cream text-xs hover:border-op-gold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={startCamera}
                  className="flex-1 py-2.5 rounded-xl bg-op-gold hover:bg-op-goldLight text-op-ink font-cinzel font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Grant & Start
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIRTUAL INDEX FINGER CURSOR */}
      {isActive && (
        <>
          {clickRipple.active && (
            <motion.div
              initial={{ scale: 0.6, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="fixed pointer-events-none z-[99998] rounded-full border-2 border-op-gold"
              style={{
                left: `${clickRipple.x}px`,
                top: `${clickRipple.y}px`,
                width: '40px',
                height: '40px',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 20px rgba(224, 169, 59, 0.8)',
              }}
            />
          )}

          <div
            className={`fixed pointer-events-none z-[99999] transition-opacity duration-150 ${
              isHandDetected ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all duration-100 relative ${
                isAirTapping
                  ? 'border-op-gold bg-op-gold/30 scale-90 shadow-[0_0_25px_rgba(224,169,59,1)]'
                  : 'border-white bg-transparent shadow-[0_0_15px_rgba(255,255,255,0.9)] scale-105'
              }`}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-white/80" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-white/80" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-white/80" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-0.5 bg-white/80" />
            </div>

            <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#070a12]/95 border border-op-gold/50 text-[10px] font-mono text-op-gold shadow-lg backdrop-blur-sm">
              {gestureStatus}
            </div>
          </div>
        </>
      )}

      {/* FLOATING OBSERVATION HAKI CONTROL WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
        <AnimatePresence>
          {!isActive ? (
            <motion.button
              key="launch-btn"
              initial={{ scale: 0.9, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setShowConsentModal(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0b132b]/95 hover:bg-op-gold text-op-cream hover:text-op-ink border border-op-gold/40 shadow-2xl backdrop-blur-md transition-all cursor-pointer group hover:scale-105"
              title="Activate Hand Gesture Control"
            >
              <div className="p-1.5 rounded-xl bg-[#070a12] border border-op-gold/40 group-hover:border-op-ink/40">
                <Hand size={16} className="text-op-gold group-hover:text-op-ink animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-mono font-bold leading-tight flex items-center gap-1.5">
                  <span>Observation Haki</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[9px] font-mono text-op-slate group-hover:text-op-ink/80">
                  Palm (Up/Back) • 2-Finger (Down) • Fist (Pause) • Thumb Tap (Click)
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="active-hud"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-72 rounded-2xl bg-[#070a12]/95 border border-op-gold/40 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-lg p-3 text-op-cream overflow-hidden"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-op-gold/20 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-op-gold">Observation Haki</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 rounded-lg hover:bg-op-gold/20 text-op-slate hover:text-white"
                    title={isMinimized ? 'Expand' : 'Minimize'}
                  >
                    <Compass size={13} />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-1 rounded-lg hover:bg-red-500/20 text-op-slate hover:text-red-400"
                    title="Stop Camera Stream"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <div className="space-y-2.5">
                  <div className="relative rounded-xl overflow-hidden border border-op-gold/25 bg-[#03060c] aspect-[4/3] flex items-center justify-center">
                    <canvas
                      ref={canvasRef}
                      width={160}
                      height={120}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 pointer-events-none border border-op-gold/15 flex items-center justify-center">
                      <div className="w-full h-px bg-op-gold/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-full w-px bg-op-gold/20" />
                      </div>
                    </div>

                    <div className="absolute bottom-1.5 left-2 px-1.5 py-0.5 rounded bg-[#070a12]/80 border border-op-gold/20 text-[9px] font-mono text-op-gold">
                      {gestureStatus}
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-[#0b132b]/80 border border-op-gold/15 text-[10px] font-mono space-y-1">
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>✋ Open Palm (Up):</span>
                      <span className="text-amber-400">Scroll Up ↑</span>
                    </div>
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>👈 Palm Tilt Left:</span>
                      <span className="text-amber-300">Back / Prev Page</span>
                    </div>
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>✌️ 2 Fingers:</span>
                      <span className="text-cyan-400">Scroll Down ↓</span>
                    </div>
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>✊ Closed Fist:</span>
                      <span className="text-rose-400">Pause / Hold</span>
                    </div>
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>☝️ 1 Finger:</span>
                      <span className="text-op-gold">Move Cursor</span>
                    </div>
                    <div className="flex items-center justify-between text-op-cream/80">
                      <span>🤏 Tap Thumb 2x:</span>
                      <span className="text-emerald-400">Click / Zoom</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-op-slate/80 pt-1">
                    <Shield size={11} className="text-emerald-400 shrink-0" />
                    <span>100% Client-Side In RAM • Zero Uploads</span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ObservationHakiVision;
