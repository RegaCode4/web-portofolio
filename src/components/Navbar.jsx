import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onNavigateHome, onNavigateProjects, currentView }) {
  const [lang, setLang] = useState('EN');
  const [isResumeHovered, setIsResumeHovered] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-5 py-5 sm:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-content flex items-start justify-between">
        
        {/* Interactive Logo */}
        <a 
          href="#home"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="group relative isolate block text-[17px] font-black leading-[0.82] tracking-[-0.07em] outline-none sm:text-[22px] cursor-pointer"
          aria-label="adip habibullah — Home"
        >
          <span className="relative inline-block border border-[#1557ff] px-1.5 pb-0.5 pt-0.5 transition duration-300 group-hover:-rotate-2 group-hover:bg-[#1557ff] group-hover:text-white">
            adip
            {/* Selection handle corner dots */}
            <span className="absolute h-1.5 w-1.5 border border-[#1557ff] bg-white transition-transform duration-300 group-hover:scale-125 -left-1 -top-1"></span>
            <span className="absolute h-1.5 w-1.5 border border-[#1557ff] bg-white transition-transform duration-300 group-hover:scale-125 -right-1 -top-1"></span>
            <span className="absolute h-1.5 w-1.5 border border-[#1557ff] bg-white transition-transform duration-300 group-hover:scale-125 -bottom-1 -left-1"></span>
            <span className="absolute h-1.5 w-1.5 border border-[#1557ff] bg-white transition-transform duration-300 group-hover:scale-125 -bottom-1 -right-1"></span>
          </span>
          <span className="block px-0.5 pt-1 transition duration-300 group-hover:translate-x-1">
            habibullah
          </span>

          {/* Pointer Icon Badge */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="absolute -left-2 -top-2 z-10 rotate-[-18deg] fill-black text-white drop-shadow-sm transition duration-500 ease-out group-hover:left-[82%] group-hover:top-[52%] group-hover:rotate-[-8deg]"
          >
            <path d="M3.039 4.277l3.904 13.563c.185 .837 .92 1.516 1.831 1.642l.17 .016a2.2 2.2 0 0 0 1.982 -1.006l.045 -.078l1.4 -2.072l4.05 4.05a2.067 2.067 0 0 0 2.924 0l1.047 -1.047c.388 -.388 .606 -.913 .606 -1.461l-.008 -.182a2.067 2.067 0 0 0 -.598 -1.28l-4.047 -4.048l2.103 -1.412c.726 -.385 1.18 -1.278 1.053 -2.189a2.2 2.2 0 0 0 -1.701 -1.845l-13.524 -3.89a1 1 0 0 0 -1.236 1.24z"></path>
          </svg>
        </a>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Selector */}
          <div role="group" aria-label="Language" className="items-center gap-0.5 text-xs font-bold tracking-[-0.02em] mr-1 hidden sm:inline-flex bg-zinc-100 p-0.5 rounded-md">
            <button 
              type="button" 
              onClick={() => setLang('EN')}
              className={`rounded px-2 py-0.5 transition ${lang === 'EN' ? 'bg-white text-[#1557ff] shadow-sm font-bold' : 'text-zinc-500 hover:text-black'}`}
            >
              EN
            </button>
            <button 
              type="button" 
              onClick={() => setLang('ID')}
              className={`rounded px-2 py-0.5 transition ${lang === 'ID' ? 'bg-white text-[#1557ff] shadow-sm font-bold' : 'text-zinc-500 hover:text-black'}`}
            >
              ID
            </button>
          </div>

          {/* Company Avatar Stack & Resume Button (Mengembang / Fans out on hover) */}
          <div 
            className="group/resume relative flex items-center"
            onMouseEnter={() => setIsResumeHovered(true)}
            onMouseLeave={() => setIsResumeHovered(false)}
          >
            {/* Stacked Logos with smooth expanding width animation */}
            <div 
              className={`relative z-20 mr-1.5 h-8 shrink-0 sm:mr-2 sm:h-10 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isResumeHovered ? 'w-[72px] sm:w-[82px]' : 'w-[36px] sm:w-[42px]'
              }`}
            >
              {portfolioData.profile.companies.map((company, index) => {
                const rotation = [-8, 8][index] || 0;
                const collapsedLeft = index * 6;
                const expandedLeft = index * 32;
                const currentLeft = isResumeHovered ? expandedLeft : collapsedLeft;

                return (
                  <span 
                    key={index}
                    title={company.name}
                    className="absolute flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-[8px] border border-zinc-200 bg-white p-1 shadow-[0_5px_14px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-125 hover:z-30 sm:h-9 sm:w-9 sm:rounded-[10px]"
                    style={{
                      zIndex: 5 - index,
                      left: `${currentLeft}px`,
                      top: '50%',
                      transform: `translateY(-50%) rotate(${rotation}deg)`
                    }}
                  >
                    <img 
                      src={company.logo} 
                      alt={company.name}
                      loading="eager"
                      decoding="async"
                      width="36"
                      height="36"
                      className="h-full w-full object-contain pointer-events-none"
                    />
                  </span>
                );
              })}
            </div>

            {/* Resume Button */}
            <a 
              href="https://www.linkedin.com/in/adiphabibullah/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition duration-200 border border-zinc-200 bg-white text-zinc-900 hover:-translate-y-0.5 hover:border-zinc-400 h-10 px-4 shadow-sm relative z-10"
            >
              Resume
              <span className={`ml-0.5 inline-block transition duration-300 ${isResumeHovered ? 'rotate-45 text-[#1557ff]' : ''}`}>↗</span>
            </a>

            {/* Handwritten Note Tooltip */}
            <div className={`pointer-events-none absolute -bottom-8 left-8 z-30 hidden -rotate-3 whitespace-nowrap font-note text-base font-semibold text-[#1557ff] transition-all duration-300 sm:block ${isResumeHovered ? 'translate-y-1 opacity-100' : 'opacity-0'}`}>
              quite a lot...
              <svg aria-hidden="true" viewBox="0 0 100 10" className="absolute -bottom-1 left-0 h-2 w-full overflow-visible">
                <path d="M2 6C20 1 39 9 58 4C72 1 86 3 98 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"></path>
              </svg>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
