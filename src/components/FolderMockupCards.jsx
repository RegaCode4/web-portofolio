import React from 'react';

// Render mockup cards based on folder type or provided items
export default function FolderMockupCards({ folderType, items, onSelectProject }) {
  if (!items || items.length === 0) {
    return null;
  }

  if (folderType === 'blog') {
    return <BlogMockupCards items={items} onSelectProject={onSelectProject} />;
  }

  if (folderType === 'experience') {
    return <ExperienceMockupCards items={items} onSelectProject={onSelectProject} />;
  }

  // Default: Projects mockup cards (matching user reference screenshot)
  return <ProjectsMockupCards items={items} onSelectProject={onSelectProject} />;
}

// -------------------------------------------------------------
// Projects Mockup Stack (Halo Temmo, Gopay QRIS, JARITMAS)
// -------------------------------------------------------------
function ProjectsMockupCards({ items = [], onSelectProject }) {
  const item1 = items[0] || {};
  const item2 = items[1] || {};
  const item3 = items[2] || {};

  return (
    <>
      {/* CARD 1 (LEFT - Halo Temmo Event) */}
      <div 
        onClick={() => onSelectProject && item1.id && onSelectProject(item1)}
        className="folder-card-stack folder-card-1 absolute left-[3.5%] bottom-[14px] z-10 w-[58%] h-[150px] sm:h-[170px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md -rotate-[8.5deg] origin-bottom-left transition-all duration-500 ease-out flex flex-col justify-between"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span className="text-[8px] font-bold text-zinc-800 bg-zinc-100 px-1.5 py-0.5 rounded">/p</span>
        </div>

        {/* Card Body */}
        <div className="space-y-1.5 mt-1">
          <div className="inline-block bg-orange-50 border border-orange-200/80 px-1.5 py-0.5 rounded text-[8px] font-bold text-orange-700">
            Temukan yang dekat dengan...
          </div>
          <p className="text-[9.5px] font-bold text-zinc-900 leading-tight">
            Halo Temmo Event Platform
          </p>
          <div className="h-1.5 w-3/4 bg-zinc-100 rounded-full" />
          <div className="h-1.5 w-1/2 bg-zinc-100 rounded-full" />
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-[8px] font-semibold text-zinc-400">QR Ticketing</span>
          <span className="px-2 py-0.5 bg-amber-500 text-white font-bold text-[8px] rounded-full shadow-2xs">
            Daftar Event
          </span>
        </div>
      </div>

      {/* CARD 2 (MIDDLE - Gopay QRIS Payment) */}
      <div 
        onClick={() => onSelectProject && item2.id && onSelectProject(item2)}
        className="folder-card-stack folder-card-2 absolute left-[17%] bottom-[20px] z-20 w-[66%] h-[160px] sm:h-[180px] select-none p-3 bg-white border border-zinc-200/90 rounded-xl shadow-lg -rotate-[1.5deg] origin-bottom-center transition-all duration-500 ease-out flex flex-col"
      >
        {/* Top Navbar matching screenshot */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
          <div className="flex items-center gap-1">
            <span className="flex items-center justify-center w-4 h-4 bg-zinc-900 text-white font-bold text-[8.5px] rounded-md">
              /p
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[8px] font-semibold text-zinc-500">
            <span className="hover:text-zinc-900">About</span>
            <span className="hover:text-zinc-900 font-bold text-zinc-900">Projects</span>
            <span className="hover:text-zinc-900">Blog</span>
            <span className="hover:text-zinc-900">Contact</span>
            <span className="bg-zinc-900 text-white px-1.5 py-0.5 rounded text-[7.5px] font-bold">Resume</span>
          </div>
        </div>

        {/* Main Content matching screenshot headline */}
        <div className="mt-2.5 space-y-2">
          <h4 className="text-[11px] sm:text-[12px] font-extrabold text-zinc-900 leading-snug tracking-tight">
            Cara lebih baik untuk menerima pembayaran QRIS
          </h4>
          <div className="flex items-center gap-1.5 p-1 bg-zinc-50 border border-zinc-200/70 rounded-lg">
            <div className="h-2 w-full bg-zinc-200/70 rounded" />
            <span className="bg-zinc-900 text-white text-[7.5px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">
              Scan QRIS
            </span>
          </div>
        </div>

        {/* Status Pills */}
        <div className="mt-auto grid grid-cols-2 gap-1 pt-1.5">
          <div className="bg-emerald-50 border border-emerald-200/60 rounded p-1 flex items-center justify-between">
            <span className="text-[7.5px] font-bold text-emerald-800">Direct Pay</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="bg-blue-50 border border-blue-200/60 rounded p-1 flex items-center justify-between">
            <span className="text-[7.5px] font-bold text-blue-800">Instant CB</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          </div>
        </div>
      </div>

      {/* CARD 3 (RIGHT - JARITMAS Analytics Dashboard) */}
      <div 
        onClick={() => onSelectProject && item3.id && onSelectProject(item3)}
        className="folder-card-stack folder-card-3 absolute left-[30%] bottom-[10px] z-30 w-[66%] h-[160px] sm:h-[180px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md rotate-[3.5deg] origin-bottom-right transition-all duration-500 ease-out flex flex-col"
      >
        {/* Top metrics row matching screenshot: 537, 0, 1500, 19 */}
        <div className="grid grid-cols-4 gap-1 pb-1.5 border-b border-zinc-100">
          <div className="bg-zinc-50 rounded p-1 text-center border border-zinc-100">
            <span className="block text-[7px] text-zinc-400 font-medium">minggu IV</span>
            <span className="block text-[9.5px] font-extrabold text-zinc-900">537</span>
          </div>
          <div className="bg-zinc-50 rounded p-1 text-center border border-zinc-100">
            <span className="block text-[7px] text-zinc-400 font-medium">minggu V</span>
            <span className="block text-[9.5px] font-extrabold text-zinc-900">0</span>
          </div>
          <div className="bg-zinc-50 rounded p-1 text-center border border-zinc-100">
            <span className="block text-[7px] text-zinc-400 font-medium">prediksi</span>
            <span className="block text-[9.5px] font-extrabold text-zinc-900">1500</span>
          </div>
          <div className="bg-zinc-50 rounded p-1 text-center border border-zinc-100">
            <span className="block text-[7px] text-zinc-400 font-medium">total IP</span>
            <span className="block text-[9.5px] font-extrabold text-zinc-900">19</span>
          </div>
        </div>

        {/* Dashboard Grid (Pie chart left, Map right) */}
        <div className="grid grid-cols-2 gap-1.5 mt-2 flex-1">
          {/* Left: Pie chart */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-1.5 flex flex-col justify-center items-center">
            <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1557ff" strokeWidth="6" strokeDasharray="60 100" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="25 100" strokeDashoffset="-60" />
            </svg>
            <span className="text-[7.5px] font-bold text-zinc-600 mt-1">Analytics</span>
          </div>

          {/* Right: Map mock */}
          <div className="bg-sky-950 border border-sky-900 rounded-lg p-1 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px]" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[7px] font-semibold text-sky-200">JARITMAS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            </div>
            {/* Glowing Map pins */}
            <div className="relative z-10 h-6 flex items-center justify-around">
              <span className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-blue-300/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-cyan-200/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// -------------------------------------------------------------
// Blog Mockup Stack
// -------------------------------------------------------------
function BlogMockupCards({ items = [], onSelectProject }) {
  const item1 = items[0] || {};
  const item2 = items[1] || {};

  return (
    <>
      {/* CARD 1 (LEFT - Laravel VPS) */}
      <div 
        onClick={() => onSelectProject && item1.id && onSelectProject(item1)}
        className="folder-card-stack folder-card-1 absolute left-[3.5%] bottom-[14px] z-10 w-[58%] h-[150px] sm:h-[170px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md -rotate-[8.5deg] origin-bottom-left transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
          <span className="text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">Laravel & VPS</span>
          <span className="text-[7.5px] text-zinc-400">6 min</span>
        </div>
        <div className="space-y-1 mt-1">
          <h5 className="text-[9.5px] font-bold text-zinc-900 leading-tight">
            Cara Deploy Laravel ke VPS Ubuntu
          </h5>
          <div className="bg-zinc-900 text-emerald-400 font-mono text-[7.5px] p-1.5 rounded space-y-0.5">
            <div>$ sudo systemctl restart nginx</div>
            <div>$ php artisan migrate --force</div>
          </div>
        </div>
        <span className="text-[7.5px] font-semibold text-zinc-400 mt-auto">Aug 2024</span>
      </div>

      {/* CARD 2 (MIDDLE - Framer Motion UI) */}
      <div 
        onClick={() => onSelectProject && item2.id && onSelectProject(item2)}
        className="folder-card-stack folder-card-2 absolute left-[17%] bottom-[20px] z-20 w-[66%] h-[160px] sm:h-[180px] select-none p-3 bg-white border border-zinc-200/90 rounded-xl shadow-lg -rotate-[1.5deg] origin-bottom-center transition-all duration-500 ease-out flex flex-col"
      >
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
          <span className="flex items-center gap-1 text-[8.5px] font-bold text-zinc-900">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            Article Deep-Dive
          </span>
          <span className="text-[8px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
            UI & Physics
          </span>
        </div>
        <div className="mt-2 space-y-1.5">
          <h4 className="text-[11px] font-extrabold text-zinc-900 leading-snug">
            Mastering Skeuomorphic UI with Framer Motion
          </h4>
          <p className="text-[8px] text-zinc-500 line-clamp-2">
            Crafting tactile interactions, spring physics, and 3D folder opening effects in React.
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-1 border-t border-zinc-100">
          <span className="text-[7.5px] font-bold text-zinc-700">4 min read</span>
          <span className="text-[7.5px] font-bold text-blue-600">Read article →</span>
        </div>
      </div>

      {/* CARD 3 (RIGHT - Tech Notes Snippets) */}
      <div 
        className="folder-card-stack folder-card-3 absolute left-[30%] bottom-[10px] z-30 w-[66%] h-[160px] sm:h-[180px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md rotate-[3.5deg] origin-bottom-right transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
          <span className="text-[8px] font-bold text-zinc-800">Code Snippets</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <div className="bg-zinc-950 text-zinc-200 rounded p-1.5 font-mono text-[7.5px] space-y-1">
          <div className="text-purple-400">const springConfig = &#123;</div>
          <div className="pl-2 text-blue-300">stiffness: 300,</div>
          <div className="pl-2 text-blue-300">damping: 30</div>
          <div className="text-purple-400">&#125;;</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-1 flex items-center justify-between">
          <span className="text-[7.5px] font-bold text-blue-900">100% Tactile Motion</span>
        </div>
      </div>
    </>
  );
}

// -------------------------------------------------------------
// Experience Mockup Stack
// -------------------------------------------------------------
function ExperienceMockupCards({ items = [], onSelectProject }) {
  const item1 = items[0] || {};
  const item2 = items[1] || {};
  const item3 = items[2] || {};

  return (
    <>
      {/* CARD 1 (LEFT - Widya Analytic) */}
      <div 
        onClick={() => onSelectProject && item1.id && onSelectProject(item1)}
        className="folder-card-stack folder-card-1 absolute left-[3.5%] bottom-[14px] z-10 w-[58%] h-[150px] sm:h-[170px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md -rotate-[8.5deg] origin-bottom-left transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
          <span className="text-[8.5px] font-bold text-zinc-900">Widya Analytic</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        </div>
        <div className="space-y-1 mt-1">
          <span className="text-[8px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
            Software Engineer
          </span>
          <p className="text-[9px] font-bold text-zinc-900">
            Big Data & Telemetry Portal
          </p>
        </div>
        <div className="h-10 bg-zinc-50 border border-zinc-100 rounded p-1 flex items-end justify-between">
          <div className="w-2 bg-blue-400 h-4 rounded-xs" />
          <div className="w-2 bg-blue-600 h-7 rounded-xs" />
          <div className="w-2 bg-blue-500 h-5 rounded-xs" />
          <div className="w-2 bg-indigo-600 h-8 rounded-xs" />
        </div>
      </div>

      {/* CARD 2 (MIDDLE - Seven Media Tech) */}
      <div 
        onClick={() => onSelectProject && item2.id && onSelectProject(item2)}
        className="folder-card-stack folder-card-2 absolute left-[17%] bottom-[20px] z-20 w-[66%] h-[160px] sm:h-[180px] select-none p-3 bg-white border border-zinc-200/90 rounded-xl shadow-lg -rotate-[1.5deg] origin-bottom-center transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
          <span className="text-[9px] font-extrabold text-zinc-900">Seven Media Tech</span>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            Frontend Dev
          </span>
        </div>
        <div className="space-y-1">
          <h4 className="text-[10.5px] font-bold text-zinc-900 leading-tight">
            Production Engineering & Client Systems
          </h4>
          <div className="flex flex-wrap gap-1">
            <span className="text-[7px] font-bold bg-zinc-100 px-1 py-0.5 rounded text-zinc-700">React</span>
            <span className="text-[7px] font-bold bg-zinc-100 px-1 py-0.5 rounded text-zinc-700">Node.js</span>
            <span className="text-[7px] font-bold bg-zinc-100 px-1 py-0.5 rounded text-zinc-700">TypeScript</span>
          </div>
        </div>
        <div className="bg-zinc-900 text-white rounded p-1 text-[7.5px] font-bold text-center">
          Delivered 12+ enterprise apps
        </div>
      </div>

      {/* CARD 3 (RIGHT - Firstudio) */}
      <div 
        onClick={() => onSelectProject && item3.id && onSelectProject(item3)}
        className="folder-card-stack folder-card-3 absolute left-[30%] bottom-[10px] z-30 w-[66%] h-[160px] sm:h-[180px] select-none p-2.5 bg-white border border-zinc-200/90 rounded-xl shadow-md rotate-[3.5deg] origin-bottom-right transition-all duration-500 ease-out flex flex-col justify-between"
      >
        <div className="flex items-center justify-between pb-1 border-b border-zinc-100">
          <span className="text-[8.5px] font-bold text-zinc-900">Firstudio</span>
          <span className="text-[7.5px] text-purple-700 font-bold bg-purple-50 px-1 rounded">UI/UX</span>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-zinc-900">Design Systems & Prototypes</p>
          <div className="flex gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </div>
        <div className="bg-zinc-50 border border-zinc-200/80 rounded p-1 text-[7.5px] font-semibold text-zinc-700 text-center">
          Interactive Design Specs
        </div>
      </div>
    </>
  );
}
