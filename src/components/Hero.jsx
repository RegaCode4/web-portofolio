import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Code, Briefcase, Bot, Laptop } from 'lucide-react';

export default function Hero() {
  const [avatarAlt, setAvatarAlt] = useState(false);
  const [showJoke, setShowJoke] = useState(false);

  const handleAvatarClick = () => {
    setAvatarAlt(!avatarAlt);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.3 }
    });
  };

  return (
    <section className="relative z-[1] isolate overflow-hidden px-5 pb-10 sm:px-8 sm:pb-20 pt-28 sm:pt-36">
      
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-[42%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 sm:h-[690px] sm:w-[690px]" />

      <motion.div 
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-content flex flex-col gap-6 sm:gap-12"
      >
        
        {/* Category Pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f7f5] px-3 py-1.5 text-xs font-semibold text-[#76766f]">
            Personal Portfolio
            <span className="h-1.5 w-1.5 rotate-45 bg-[#1557ff]" />
          </span>
        </div>

        {/* Hero Grid layout */}
        <div className="grid items-center gap-3 sm:grid-cols-[minmax(200px,0.78fr)_1.22fr] sm:gap-10 md:gap-12">
          
          {/* Avatar Column */}
          <div className="relative pt-2 sm:pt-2">
            <button 
              type="button" 
              onClick={handleAvatarClick}
              onMouseEnter={() => setAvatarAlt(true)}
              onMouseLeave={() => setAvatarAlt(false)}
              className="group/avatar relative mx-auto block h-[160px] w-[160px] -rotate-6 rounded-[28px] text-left focus:outline-none sm:mx-0 sm:h-[230px] sm:w-[230px] cursor-pointer"
            >
              {/* Blur Shadow */}
              <span className="pointer-events-none absolute inset-x-[12%] bottom-[4%] top-[58%] rounded-[50%] bg-black/20 blur-xl transition duration-500 group-hover/avatar:scale-95 group-hover/avatar:opacity-70" />
              
              {/* Dual Avatar WebP Images from Assets */}
              <div className="relative h-full w-full">
                <img 
                  src="/images/avatar-aslam.webp" 
                  alt="Illustrated avatar of Adip" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width="230"
                  height="230"
                  className={`object-contain transition duration-500 ease-out absolute inset-0 h-full w-full ${avatarAlt ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
                />
                <img 
                  src="/images/avatar-aslam-2.webp" 
                  alt="Alternate avatar pose" 
                  loading="eager"
                  decoding="async"
                  width="230"
                  height="230"
                  className={`object-contain transition duration-500 ease-out absolute inset-0 h-full w-full ${avatarAlt ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                />
              </div>

              {/* Hover Speech Note */}
              <span className={`pointer-events-none absolute -top-6 left-[18%] rotate-3 whitespace-nowrap font-note text-base sm:text-lg font-semibold text-[#1557ff] transition duration-300 ${avatarAlt ? '-translate-y-1 opacity-100' : 'opacity-0'}`}>
                hey guys, nice to meet you
                <svg aria-hidden="true" viewBox="0 0 150 12" className="absolute -bottom-2 left-0 h-2.5 w-full">
                  <path d="M2 7C34 1 61 11 91 5C113 1 132 4 148 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Heading Column */}
          <div className="relative min-w-0 pb-10 text-center sm:pb-8 sm:text-left">
            <h1 className="text-[clamp(2.15rem,8.4vw,5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-[#111111]">
              <span className="block">Here for the</span>
              <span className="mt-1.5 block text-pretty sm:mt-2">
                {/* Styled highlight box around 'people' */}
                <span className="group/useful relative inline-block -rotate-2 border-2 border-[#1557ff] px-[0.14em] pb-[0.06em] text-[#1557ff]">
                  people
                  {/* Selection Handle Corners */}
                  <span className="absolute h-2.5 w-2.5 border-2 border-[#1557ff] bg-white -left-1.5 -top-1.5"></span>
                  <span className="absolute h-2.5 w-2.5 border-2 border-[#1557ff] bg-white -right-1.5 -top-1.5"></span>
                  <span className="absolute h-2.5 w-2.5 border-2 border-[#1557ff] bg-white -bottom-1.5 -left-1.5"></span>
                  <span className="absolute h-2.5 w-2.5 border-2 border-[#1557ff] bg-white -bottom-1.5 -right-1.5"></span>

                  {/* Cursor Badge Tag */}
                  <span className="pointer-events-none absolute right-[-4.5rem] bottom-[-2.6rem] z-30 hidden sm:flex items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="-mr-1 -rotate-[28deg] fill-[#1557ff] text-white drop-shadow-sm">
                      <path d="M3.039 4.277l3.904 13.563c.185 .837 .92 1.516 1.831 1.642l.17 .016a2.2 2.2 0 0 0 1.982 -1.006l.045 -.078l1.4 -2.072l4.05 4.05a2.067 2.067 0 0 0 2.924 0l1.047 -1.047c.388 -.388 .606 -.913 .606 -1.461l-.008 -.182a2.067 2.067 0 0 0 -.598 -1.28l-4.047 -4.048l2.103 -1.412c.726 -.385 1.18 -1.278 1.053 -2.189a2.2 2.2 0 0 0 -1.701 -1.845l-13.524 -3.89a1 1 0 0 0 -1.236 1.24z"></path>
                    </svg>
                    <span className="mt-3 flex max-w-[9rem] items-center gap-1.5 truncate rounded-full bg-[#1557ff] py-1 pl-1 pr-2.5 text-xs font-bold text-white shadow-[0_7px_18px_rgba(21,87,255,0.24)]">
                      <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full border border-white/70 bg-white">
                        <img src="/images/avatar-aslam.webp" alt="" loading="eager" decoding="async" width="20" height="20" className="object-contain h-full w-full" />
                      </span>
                      Adip
                    </span>
                  </span>
                </span>
                {" "}<span className="whitespace-nowrap">side of growing up.</span>
              </span>
            </h1>
          </div>

        </div>

        {/* Footer info & Keycaps row */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-end sm:gap-8">
          
          {/* Skill Tag Pills */}
          <div className="order-2 flex flex-wrap items-center justify-center gap-2 sm:order-1 sm:justify-start">
            <span className="inline-flex items-center gap-2 rounded-[8px_16px_9px_14px] border border-[#deded9] bg-white px-3 py-2 text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:scale-105">
              <Code size={15} /> Web
            </span>
            <span className="inline-flex items-center gap-2 rounded-[8px_16px_9px_14px] border border-[#deded9] bg-white px-3 py-2 text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:scale-105">
              <Briefcase size={15} /> Product
            </span>
            <span className="inline-flex items-center gap-2 rounded-[8px_16px_9px_14px] border border-[#deded9] bg-white px-3 py-2 text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:scale-105">
              <Bot size={15} /> ML
            </span>
            <span className="inline-flex items-center gap-2 rounded-[8px_16px_9px_14px] border border-[#deded9] bg-white px-3 py-2 text-xs font-semibold text-[#111111] shadow-[0_6px_16px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:scale-105">
              <Laptop size={15} /> Tech
            </span>
          </div>

          {/* Keycaps Joke Easter Egg */}
          <div className="order-1 flex flex-col items-center sm:order-2 sm:items-end">
            <button 
              type="button" 
              onMouseEnter={() => setShowJoke(true)}
              onMouseLeave={() => setShowJoke(false)}
              onClick={() => setShowJoke(!showJoke)}
              className="group/shortcuts relative flex items-end gap-3 rounded-xl text-left focus:outline-none cursor-pointer sm:gap-4"
            >
              {/* Cmd + C */}
              <div className="flex items-center gap-1.5 transition duration-300 -rotate-6 group-hover/shortcuts:-translate-y-2 group-hover/shortcuts:-rotate-3">
                <div className="keycap-box">
                  <span className="keycap-inner font-mono text-base font-bold">
                    <span className="text-xl leading-none">⌘</span>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#76766f]">+</span>
                <div className="keycap-box">
                  <span className="keycap-inner font-mono text-base font-bold">C</span>
                </div>
              </div>

              {/* Cmd + V */}
              <div className="flex items-center gap-1.5 transition duration-300 rotate-6 group-hover/shortcuts:translate-y-1 group-hover/shortcuts:rotate-2">
                <div className="keycap-box">
                  <span className="keycap-inner font-mono text-base font-bold">
                    <span className="text-xl leading-none">⌘</span>
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#76766f]">+</span>
                <div className="keycap-box">
                  <span className="keycap-inner font-mono text-base font-bold">V</span>
                </div>
              </div>

              {/* Joke Tooltip */}
              <div className={`pointer-events-none absolute right-0 top-full hidden pt-3 transition duration-300 sm:block ${showJoke ? 'opacity-100 translate-y-1' : 'opacity-0'}`}>
                <span className="relative block rotate-2 whitespace-nowrap font-note text-sm font-semibold text-[#1557ff]">
                  copy paste professional
                  <span className="pointer-events-none absolute right-0 top-full mt-0.5 -rotate-3 whitespace-nowrap text-xs text-[#ff5a0a]">
                    ... just kidding
                  </span>
                </span>
              </div>
            </button>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
