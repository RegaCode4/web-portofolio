import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function FlightPath() {
  const containerRef = useRef(null);
  const airplaneInnerRef = useRef(null);

  useEffect(() => {
    let ctx;

    function initGSAP() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const pathElem = document.querySelector("#flight-path-svg-line");
        const box = document.querySelector("#flight-airplane-box");
        const iconWrapper = airplaneInnerRef.current;

        if (!pathElem || !box) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              if (!iconWrapper) return;
              if (self.direction === 1) {
                // Scrolling down -> point downward/forward along travel direction
                iconWrapper.style.transform = 'rotate(0deg)';
              } else if (self.direction === -1) {
                // Scrolling up -> point upward/backward along travel direction
                iconWrapper.style.transform = 'rotate(180deg)';
              }
            }
          }
        });

        tl.to(box, {
          duration: 1,
          ease: "none",
          motionPath: {
            path: pathElem,
            align: pathElem,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          }
        });
      }, containerRef);
    }

    const timer = setTimeout(initGSAP, 200);
    window.addEventListener("resize", initGSAP);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", initGSAP);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden w-full h-full min-h-full"
    >
      {/* Background SVG Flight Path Canvas (Asset aslam-thariq-portfolio.svg.svg-3.Woblo.svg) */}
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none" 
        className="absolute inset-0 h-full w-full opacity-40"
      >
        <defs>
          <linearGradient id="flight-tail-fade" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1557ff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#1557ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1557ff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Drawn SVG Flight Trail matching original asset path 3 */}
        <path
          id="flight-path-svg-line"
          d="M11 1.2C22 2.1 38 2.8 48 4.2C62 6.1 71 7.4 78 9.6C86 12.2 84 14.1 68 15.4C46 17.2 24 18.6 14 21.2C7 23.1 9 25.4 22 27C41 29.2 64 30.1 76 33.2C86 35.8 82 38.4 61 40.1C38 41.9 19 43.6 12 46.8C7 49.2 14 51.4 33 53C55 54.9 79 55.8 87 59.4C93 62.2 84 65.1 58 66.8C36 68.2 18 70.4 13 74C9 76.8 18 78.6 36 80.2C58 82.1 74 83.4 79 86.6C83 89.1 72 91.4 52 93.2C34 94.8 22 96.2 18 98.4"
          fill="none"
          stroke="#1557ff"
          strokeWidth="0.25"
          strokeDasharray="0.6 0.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Floating Pointer Cursor Icon (Exact match to user uploaded blue-outlined white pointer cursor) */}
      <div 
        id="flight-airplane-box" 
        className="absolute left-0 top-0 z-10 p-1 will-change-transform drop-shadow-[0_4px_12px_rgba(21,87,255,0.35)]"
      >
        <div 
          ref={airplaneInnerRef}
          className="transition-transform duration-300 ease-out origin-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            className="h-7 w-7 rotate-[135deg]"
          >
            <path 
              d="M3 3l7 18 3-7 7-3L3 3z" 
              fill="#ffffff" 
              stroke="#1557ff" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      </div>

      {/* Handwritten Flight Notes & SVG-35 Arrow Annotations */}
      <div className="absolute top-[15%] left-[10%] z-0 flex items-center gap-2 -rotate-3 font-note text-sm sm:text-base font-extrabold text-[#1557ff]">
        <span>onto the work...</span>
        <svg aria-hidden="true" viewBox="0 0 92 24" className="h-6 w-24 stroke-current text-[#1557ff]" xmlns="http://www.w3.org/2000/svg">
          <path d="M88 4C67 3 58 10 42 14C29 18 17 18 4 15M4 15L14 9M4 15L14 21" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="absolute top-[38%] right-[6%] z-0 flex items-center gap-2 rotate-2 font-note text-sm sm:text-base font-extrabold text-[#1557ff]">
        <svg aria-hidden="true" viewBox="0 0 92 24" className="h-6 w-24 stroke-current text-[#1557ff] rotate-180" xmlns="http://www.w3.org/2000/svg">
          <path d="M88 4C67 3 58 10 42 14C29 18 17 18 4 15M4 15L14 9M4 15L14 21" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>a little history...</span>
      </div>

      <div className="absolute top-[65%] left-[12%] z-0 flex items-center gap-2 -rotate-2 font-note text-sm sm:text-base font-extrabold text-[#1557ff]">
        <span>meet the pilot...</span>
        <svg aria-hidden="true" viewBox="0 0 92 24" className="h-6 w-24 stroke-current text-[#1557ff]" xmlns="http://www.w3.org/2000/svg">
          <path d="M88 4C67 3 58 10 42 14C29 18 17 18 4 15M4 15L14 9M4 15L14 21" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div className="absolute top-[88%] right-[10%] z-0 flex items-center gap-2 rotate-2 font-note text-sm sm:text-base font-extrabold text-[#1557ff]">
        <svg aria-hidden="true" viewBox="0 0 92 24" className="h-6 w-24 stroke-current text-[#1557ff] rotate-180" xmlns="http://www.w3.org/2000/svg">
          <path d="M88 4C67 3 58 10 42 14C29 18 17 18 4 15M4 15L14 9M4 15L14 21" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>saying hello...</span>
      </div>

    </div>
  );
}
