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
// Projects Mockup Stack (Dynamic from portfolioData.projects)
// -------------------------------------------------------------
function ProjectsMockupCards({ items = [], onSelectProject }) {
  const slots = [
    {
      className:
        'folder-card-stack folder-card-1 absolute left-[5%] bottom-[14px] z-10 w-[58%] h-[150px] sm:h-[170px] select-none p-2 bg-white border border-zinc-200/90 rounded-xl shadow-md -rotate-[8.5deg] origin-bottom-left transition-all duration-500 ease-out flex flex-col'
    },
    {
      className:
        'folder-card-stack folder-card-2 absolute left-[17%] bottom-[20px] z-20 w-[66%] h-[160px] sm:h-[180px] select-none p-2 bg-white border border-zinc-200/90 rounded-xl shadow-lg -rotate-[1.5deg] origin-bottom-center transition-all duration-500 ease-out flex flex-col'
    },
    {
      className:
        'folder-card-stack folder-card-3 absolute left-[30%] bottom-[10px] z-30 w-[66%] h-[160px] sm:h-[180px] select-none p-2 bg-white border border-zinc-200/90 rounded-xl shadow-md rotate-[3.5deg] origin-bottom-right transition-all duration-500 ease-out flex flex-col'
    }
  ];

  const visibleItems = items.slice(0, 3);
  // If only 2 projects exist, place them on left + right-center slots so both peek out clearly
  const slotOrder = visibleItems.length === 2 ? [slots[0], slots[2]] : slots;

  return (
    <>
      {visibleItems.map((item, idx) => (
        <div
          key={item.id || idx}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectProject && item.id) onSelectProject(item);
          }}
          className={slotOrder[idx].className}
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-zinc-100">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[7.5px] font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded truncate max-w-[70%]">
              {item.category || 'Project'}
            </span>
          </div>

          <div className="relative flex-1 w-full rounded-lg overflow-hidden bg-[#ebe8df] border border-zinc-200/60">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <p className="mt-1.5 text-[9px] font-bold text-zinc-900 truncate">
            {item.title}
          </p>
        </div>
      ))}
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
