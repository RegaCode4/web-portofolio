import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, Camera, X, Folder } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ProjectsSection({ onSelectProject, selectedTechFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTech, setActiveTech] = useState(selectedTechFilter || 'All');

  const allProjects = portfolioData.projects || [];

  // Dynamically extract unique tech filters from actual projects
  const dynamicTechs = Array.from(new Set(allProjects.flatMap(p => [p.category, ...(p.tags || [])]))).filter(Boolean);
  const techFilters = ['All', ...dynamicTechs];

  // Filter projects based on search query and active tech tag/category
  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags && project.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesTech = 
      activeTech === 'All' || 
      project.category === activeTech ||
      (project.tags && project.tags.includes(activeTech));

    return matchesSearch && matchesTech;
  });

  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24 relative z-[1] isolate scroll-mt-20" id="portfolio">
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-1/3 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[750px] sm:w-[950px]" />

      <div className="mx-auto w-full max-w-content">
        
        {/* Section Label & Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest block mb-2">
            WORK
          </span>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-3">
            Projects made with <br className="hidden sm:inline" />
            curiosity and <span className="text-[#1557ff]">craft</span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-zinc-500 font-medium">
            Browse what I've shipped. Filter by tech or search by name.
          </p>
        </motion.div>

        {allProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20 px-6 bg-white rounded-3xl border border-zinc-200/90 shadow-2xs max-w-xl mx-auto flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 mb-4">
              <Folder size={30} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mb-1">
              Belum ada proyek yang ditambahkan
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-sm">
              Proyek dan hasil karya terbaru akan ditampilkan di sini setelah ditambahkan.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Search & Tech Filters Box */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border border-zinc-200/90 bg-white/90 backdrop-blur-xs p-4 sm:p-5 shadow-2xs space-y-4 mb-10"
            >
              {/* Search Input Bar */}
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full rounded-full border border-zinc-200/90 bg-zinc-50/60 py-3 pl-11 pr-10 text-xs sm:text-sm font-medium text-zinc-800 placeholder-zinc-400 focus:bg-white focus:border-[#1557ff] focus:ring-2 focus:ring-[#1557ff]/20 focus:outline-none transition-all"
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Tech Filters Row */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-zinc-500 mr-1 shrink-0">
                  Filter by tech:
                </span>
                
                {techFilters.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => setActiveTech(tech)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      activeTech === tech 
                        ? 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-2xs' 
                        : 'bg-white text-zinc-800 border border-zinc-200/90 hover:border-zinc-400 hover:bg-zinc-50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Projects Cards Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project) => (
                <article 
                  key={project.id}
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="group rounded-3xl border border-zinc-200/90 bg-white p-3.5 sm:p-4 shadow-2xs hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Image & Badges Container */}
                  <div className="relative h-[200px] sm:h-[220px] w-full rounded-2xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200/50">
                    {/* Season Badge Top Left */}
                    <span className="absolute top-3 left-3 z-10 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-bold text-zinc-800 shadow-2xs border border-zinc-200/60">
                      {project.season || 'Summer 2026'}
                    </span>

                    {/* Photo Counter Badge Bottom Left */}
                    <span className="absolute bottom-3 left-3 z-10 rounded-md bg-black/60 backdrop-blur-xs px-2 py-1 text-[11px] font-bold text-white flex items-center gap-1 shadow-xs">
                      <Camera size={12} />
                      {project.imageCount || 3}
                    </span>

                    {/* Thumbnail Image */}
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="220"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 flex flex-col justify-between px-1">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-[#1557ff] transition-colors">
                          {project.title}
                        </h3>
                        <span className="h-8 w-8 rounded-full border border-zinc-200/90 flex items-center justify-center text-zinc-700 group-hover:border-[#1557ff] group-hover:bg-[#1557ff] group-hover:text-white transition-all shadow-2xs shrink-0">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>

                      {/* Role Line */}
                      <p className="text-xs font-semibold text-zinc-500 mt-1 mb-2.5">
                        {project.role || 'Role — Development'}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tags Footer */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-zinc-100 mt-auto">
                      {(project.tags || []).slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className="rounded-full bg-zinc-100/80 px-3 py-1 text-[11px] font-semibold text-zinc-700 border border-zinc-200/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags && project.tags.length > 3 && (
                        <span className="rounded-full bg-zinc-100/80 px-2 py-1 text-[11px] font-semibold text-zinc-500">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                </article>
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16 bg-zinc-50 rounded-3xl border border-zinc-200/80">
                <p className="text-zinc-500 font-semibold text-sm">No projects found matching your search or tech filter.</p>
                <button 
                  type="button" 
                  onClick={() => { setSearchTerm(''); setActiveTech('All'); }}
                  className="mt-3 text-xs font-bold text-[#1557ff] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
