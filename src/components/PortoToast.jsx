import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Flame, X } from 'lucide-react';
import portoFX from '../lib/portoFX';

export default function PortoToast() {
  const [toast, setToast] = useState(null);
  const pillRef = useRef(null);
  const timerRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const isCalm = prefersReduced || portoFX.calm;

  useEffect(() => {
    const onToast = (ev) => {
      const detail = ev?.detail;
      if (!detail?.message) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast(detail);
      timerRef.current = setTimeout(() => {
        setToast(null);
      }, detail.duration || 2400);
    };

    window.addEventListener('porto:toast', onToast);
    return () => {
      window.removeEventListener('porto:toast', onToast);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!toast || portoFX.calm) return;
    // Wait one frame for pillRef layout so VFX anchor right on the landing toast
    const id = requestAnimationFrame(() => {
      const pt = portoFX.at(pillRef.current);
      if (!pt.valid) return;
      const mode = toast.preset === 'fire' ? 'fire' : 'sketch';
      portoFX.slash(pt.x, pt.y, { len: Math.max(88, pt.w * 0.65), ang: -0.25, thick: 11, preset: mode, life: 0.34 });
      if (mode === 'fire') {
        portoFX.flames(pt.x, pt.y + 4, { tongues: 6, h: 42, w: 11, life: 0.44 });
        portoFX.embers(pt.x, pt.y, { n: 7, speed: 115, life: 0.55 });
      } else {
        portoFX.puff(pt.x - pt.w * 0.42, pt.y + 8, { n: 3, size: 7.5, vx: -18, vy: -10, preset: 'sketch', life: 0.45 });
        portoFX.puff(pt.x + pt.w * 0.42, pt.y + 8, { n: 3, size: 7.5, vx: 18, vy: -10, preset: 'sketch', life: 0.45 });
        portoFX.kira(pt.x - pt.w * 0.35, pt.y - 16, { r: 7.5, preset: 'sketch', life: 0.45 });
      }
      if (toast.word) {
        portoFX.sfx(toast.word, pt.x + pt.w * 0.28, pt.y - 34, { size: 25, preset: mode });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [toast]);

  const dismiss = () => {
    if (pillRef.current && !portoFX.calm) {
      const pt = portoFX.at(pillRef.current);
      if (pt.valid) {
        portoFX.puff(pt.x, pt.y, { n: 3, size: 7, vy: -10, preset: toast?.preset, life: 0.36 });
      }
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  };

  const isFire = toast?.preset === 'fire';

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            ref={pillRef}
            role="status"
            aria-live="polite"
            initial={isCalm ? false : { opacity: 0, y: 24, scaleX: 1.16, scaleY: 0.82, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scaleX: 1, scaleY: 1, rotate: 0 }}
            exit={isCalm ? { opacity: 0 } : { opacity: 0, scale: 0.65, y: 10 }}
            transition={isCalm ? { duration: 0 } : { type: 'spring', stiffness: 480, damping: 24 }}
            className={`pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-3 text-xs sm:text-sm font-bold text-[#111111] border-2 ${
              isFire
                ? 'border-[#ff5a0a] shadow-[0_4px_0_#ff5a0a,0_12px_28px_rgba(255,90,10,0.18)]'
                : 'border-[#1557ff] shadow-[0_4px_0_#1557ff,0_12px_28px_rgba(21,87,255,0.16)]'
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                isFire ? 'bg-[#ff5a0a]' : 'bg-[#1557ff]'
              }`}
            >
              {isFire ? <Flame size={13} /> : <Check size={13} strokeWidth={2.8} />}
            </span>
            <span className="tracking-tight">{toast.message}</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close notification"
              className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-800 cursor-pointer"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
