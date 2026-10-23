import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import FolderMockupCards from './FolderMockupCards';
import '../styles/folder.css';

export default function FolderCard({
  icon: Icon,
  title,
  subtitle,
  description,
  seeAllText = "See all projects",
  seeAllHref = "#portfolio",
  folderType = "projects",
  items = [],
  onSelectProject
}) {
  return (
    <article className="group/folder relative min-w-0 flex flex-col justify-start p-3.5 sm:p-4 rounded-3xl transition-all duration-300 hover:bg-white/70 hover:shadow-xl hover:shadow-zinc-200/60 border border-transparent hover:border-zinc-200/80 cursor-pointer">
      
      {/* 1. Folder Graphic Header Container */}
      <div className="relative h-[210px] sm:h-[240px] md:h-[250px] w-full flex items-end justify-center select-none overflow-visible folder-dot-bg rounded-2xl p-2 border border-zinc-200/50 mb-3.5">
        
        {/* Floor Shadow */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-0 z-0 h-4 bg-black/10 blur-md rounded-full" />

        {/* Back SVG Sheet */}
        <svg 
          viewBox="0 0 340 210" 
          preserveAspectRatio="none" 
          className="pointer-events-none absolute inset-x-2 bottom-2 z-0 h-[88%] w-[95%] mx-auto"
        >
          <path 
            d="M 0 210 V 28 C 0 16, 12 8, 24 8 H 120 C 132 8, 140 18, 150 26 H 316 C 328 26, 340 36, 340 48 V 210 Z" 
            fill="#eaebed" 
            stroke="#dadce0" 
            strokeWidth="1.5" 
            strokeLinejoin="round" 
          />
        </svg>

        {/* Stacked Preview Cards Inside Folder */}
        <FolderMockupCards 
          folderType={folderType} 
          items={items} 
          onSelectProject={onSelectProject} 
        />

        {/* Front SVG Flap (Curved S-Shape Cutout Flap) */}
        <div 
          aria-hidden="true" 
          className="folder-front-flap-wrap absolute inset-x-2 bottom-2 z-30 h-[62%] w-[95%] mx-auto pointer-events-none"
        >
          <svg viewBox="0 0 340 170" preserveAspectRatio="none" className="h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
            <path 
              d="M 0 170 V 32 Q 0 18, 14 18 H 136 C 158 18, 166 50, 188 50 H 326 Q 340 50, 340 64 V 170 Z" 
              fill="#f3f4f6" 
              stroke="#d4d4d8" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
          </svg>
          
          {/* Label & Icon inside bottom left of Front Flap */}
          <div className="absolute left-5 bottom-3 flex items-center gap-2 z-40">
            {Icon && <Icon size={16} className="text-zinc-900 stroke-[2.2]" />}
            <span className="text-xs sm:text-sm font-bold text-zinc-900 tracking-tight">
              {title}
            </span>
          </div>
        </div>

      </div>

      {/* 2. Title, Subtitle & Arrow */}
      <div className="w-full text-left">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              {Icon && <Icon size={20} className="text-zinc-900 stroke-[2.2]" />}
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                {title}
              </h3>
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-medium text-zinc-500">
              {subtitle}
            </p>
          </div>
          <ArrowUpRight 
            size={20} 
            className="text-zinc-900 transition-transform duration-300 group-hover/folder:translate-x-1 group-hover/folder:-translate-y-1 group-hover/folder:text-[#1557ff]" 
          />
        </div>
      </div>

      {/* 3. Divider Line */}
      <hr className="my-3 border-zinc-200/80" />

      {/* 4. Bottom Interactive Drawer */}
      <div className="relative min-h-[72px] w-full">
        
        {/* Unhovered State: Peek text */}
        <div className="absolute inset-x-0 top-0 transition-all duration-300 group-hover/folder:opacity-0 group-hover/folder:pointer-events-none group-hover/folder:-translate-y-1">
          <p className="text-xs sm:text-sm font-medium text-zinc-400 font-sans">
            {items && items.length > 0 ? "Open to peek inside..." : "Folder kosong"}
          </p>
        </div>

        {/* Hovered State: Description + Interactive Tag Pills + See All Link */}
        <div className="transition-all duration-300 ease-out opacity-0 translate-y-1.5 pointer-events-none group-hover/folder:opacity-100 group-hover/folder:translate-y-0 group-hover/folder:pointer-events-auto">
          <p className="text-xs sm:text-sm font-medium text-zinc-700 leading-relaxed mb-2">
            {description}
          </p>
          {items && items.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {items.map((item, idx) => (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject && onSelectProject(item);
                  }}
                  className="rounded-full border border-zinc-200/90 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 shadow-2xs transition-all cursor-pointer"
                >
                  {item.pillLabel || item.title}
                </button>
              ))}
              <a
                href={seeAllHref}
                onClick={(e) => e.stopPropagation()}
                className="ml-1 text-xs font-bold text-[#1557ff] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                {seeAllText}
              </a>
            </div>
          ) : (
            <p className="text-xs font-semibold text-zinc-400">
              Belum ada item yang ditambahkan
            </p>
          )}
        </div>

      </div>

    </article>
  );
}
