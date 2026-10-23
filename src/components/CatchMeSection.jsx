import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import { Instagram, Linkedin, Youtube } from './BrandIcons';


const quotes = [
  "hover over me. what's the worst",
  "wait, you actually did",
  "that was cute",
  "saw that coming",
  "fine, you win"
];

export default function CatchMeSection() {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [avatarPos, setAvatarPos] = useState({ x: 50, y: 50 }); // percentage
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const lastDodgeRef = useRef(0);

  const isWon = dodgeCount >= quotes.length - 1;

  const handleCursorApproach = () => {
    if (isWon) return;

    // Cooldown check (prevent rapid multi-triggers in milliseconds)
    const now = Date.now();
    if (now - lastDodgeRef.current < 400) return;
    lastDodgeRef.current = now;

    setDodgeCount((prevCount) => {
      const nextCount = prevCount + 1;
      if (nextCount < quotes.length - 1) {
        // Jump/dodge to a random position inside container (between 18% and 82%)
        const newX = Math.floor(Math.random() * 64) + 18;
        const newY = Math.floor(Math.random() * 64) + 18;
        setAvatarPos({ x: newX, y: newY });
      } else {
        // Center position when caught/won
        setAvatarPos({ x: 50, y: 50 });
      }
      return nextCount;
    });
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24 relative z-10 isolate scroll-mt-28" id="catch-up">
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[750px] sm:w-[950px]" />

      <div className="mx-auto w-full max-w-content">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          
          {/* Left Playground Box (Interactive Escape Avatar Game - Cursor Hover Dodge) */}
          <div className="relative h-[380px] sm:h-[450px] w-full rounded-[2.5rem] bg-[#f7f7f5] border border-[#deded9] p-6 overflow-hidden shadow-inner flex items-center justify-center">
            
            {/* Background Hint Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            {/* Jumping Avatar (Triggers on cursor hover entry with cooldown) */}
            <motion.div
              animate={{
                left: `${avatarPos.x}%`,
                top: `${avatarPos.y}%`
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none group"
              onMouseEnter={handleCursorApproach}
            >
              {/* Speech Bubble */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={dodgeCount}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md pointer-events-none transition-colors ${
                    isWon 
                      ? 'bg-[#1557ff] text-white' 
                      : 'bg-white text-[#111111] border border-[#deded9]'
                  }`}
                >
                  {quotes[Math.min(dodgeCount, quotes.length - 1)]}
                  {/* Bubble Pointer Tail */}
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${
                    isWon ? 'bg-[#1557ff]' : 'bg-white'
                  }`} />
                </motion.div>
              </AnimatePresence>

              {/* Avatar Character Head Image from Assets */}
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-2 border-[#111111] shadow-xl p-1.5 flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
                <img 
                  src={isWon ? "/images/avatar-pose1.webp" : "/images/avatar-pose2.webp"} 
                  alt="Interactive Avatar Head" 
                  loading="lazy"
                  decoding="async"
                  width="96"
                  height="96"
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>

              {/* Winning Link Button underneath when caught */}
              {isWon && (
                <motion.a
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  href="https://www.linkedin.com/in/adiphabibullah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#1557ff] hover:underline justify-center bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-blue-200"
                >
                  LinkedIn ↗
                </motion.a>
              )}
            </motion.div>

          </div>

          {/* Right Info Column */}
          <div className="flex flex-col">
            
            {/* Top Handwritten Note */}
            <span className="font-note text-base font-semibold text-[#1557ff] mb-2 block">
              {isWon ? 'ok you got me, now say hi for real.' : 'go on, move cursor over the avatar ←'}
            </span>

            {/* Giant Watermark Heading */}
            <h2 className="text-4xl sm:text-6xl font-black text-[#deded9] tracking-tight uppercase leading-none select-none mb-1">
              COULDN'T CATCH ME?
            </h2>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1557ff] mb-6 flex items-center gap-2">
              Find me here ✦—
            </h3>

            {/* Contact Card Box */}
            <div className="rounded-3xl bg-[#f7f7f5] border border-[#deded9] p-5 sm:p-6 space-y-4">
              
              {/* Social Buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#deded9] bg-white px-4 py-2 text-xs font-bold text-[#111111] transition hover:-translate-y-0.5 hover:border-[#1557ff] shadow-xs"
                >
                  <Instagram size={15} className="text-[#111111]" />
                  Instagram
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#deded9] bg-white px-4 py-2 text-xs font-bold text-[#111111] transition hover:-translate-y-0.5 hover:border-[#1557ff] shadow-xs"
                >
                  <Linkedin size={15} className="text-[#111111]" />
                  Linkedin
                </a>

                {/* <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#deded9] bg-white px-4 py-2 text-xs font-bold text-[#111111] transition hover:-translate-y-0.5 hover:border-[#1557ff] shadow-xs"
                >
                  <Youtube size={15} className="text-[#111111]" />
                  Youtube
                </a> */}

                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#deded9] bg-white px-4 py-2 text-xs font-bold text-[#111111] transition hover:-translate-y-0.5 hover:border-[#1557ff] shadow-xs"
                >
                  <span className="text-xs font-mono font-bold">🎵</span>
                  Tiktok
                </a>
              </div>

              <hr className="border-[#deded9] border-dashed my-2" />

              {/* Email Pill */}
              <div className="flex items-center justify-between rounded-2xl bg-white border border-[#deded9] px-4 py-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <Mail size={16} className="text-[#76766f]" />
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">
                    regacode4@gmail.com
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleCopy('regacode4@gmail.com', 'email')}
                  className="text-xs font-bold text-[#76766f] hover:text-[#1557ff] transition cursor-pointer"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Pill */}
              <div className="flex items-center justify-between rounded-2xl bg-white border border-[#deded9] px-4 py-3 shadow-xs">
                <div className="flex items-center gap-2.5">
                  <Phone size={16} className="text-[#76766f]" />
                  <span className="text-xs sm:text-sm font-bold text-[#111111]">
                    082278954406
                  </span>
                </div>
                <button 
                  type="button" 
                  onClick={() => handleCopy('083197512000', 'phone')}
                  className="text-xs font-bold text-[#76766f] hover:text-[#1557ff] transition cursor-pointer"
                >
                  {copiedPhone ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
