import React from 'react';
import { motion } from 'framer-motion';
import { Folder, Briefcase, BookOpen, Layers } from 'lucide-react';
import FolderCard from './FolderCard';
import { portfolioData } from '../data/portfolioData';

export default function FeaturedFolders({ onSelectProject }) {
  const projectItems = (portfolioData.projects || []).map(p => ({
    ...p,
    pillLabel: p.title
  }));

  const blogItems = (portfolioData.blogs || []).map(b => ({
    ...b,
    pillLabel: b.title
  }));

  const experienceItems = [];

  return (
    <section className="px-5 sm:px-8 scroll-mt-28 py-16 sm:py-20 relative z-[1] isolate overflow-visible" id="work">
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[700px] sm:w-[900px]" />

      <div className="mx-auto w-full max-w-content overflow-visible">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between gap-4 flex-col sm:flex-row mb-10"
        >
          <div className="flex items-start gap-3">
            <span className="shrink-0">
              <span className="block -rotate-12 rounded-xl border-2 border-zinc-900 p-2 bg-amber-100 shadow-sm">
                <Folder size={22} className="text-zinc-900" />
              </span>
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900">
                Featured Folders
              </h2>
              <p className="mt-1 text-sm font-medium text-zinc-500">
                Open a folder. Peek around.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a 
              href="#blog" 
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-bold border border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400 hover:-translate-y-0.5 h-9 px-4 shadow-xs transition"
            >
              See all posts
            </a>
            <a 
              href="#portfolio" 
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 hover:-translate-y-0.5 h-9 px-4 shadow-xs transition"
            >
              See all projects
            </a>
          </div>
        </motion.div>

        {/* 3 Folders Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 overflow-visible"
        >
          
          {/* Folder 1: Projects */}
          <FolderCard 
            icon={Briefcase}
            title="Projects"
            subtitle="Stuff I've shipped"
            description="Real work — interfaces, systems, and experiments that made it out the door."
            seeAllText="See all projects"
            seeAllHref="#portfolio"
            folderType="projects"
            items={projectItems}
            onSelectProject={onSelectProject}
          />

          {/* Folder 2: Blog */}
          <FolderCard 
            icon={BookOpen}
            title="Blog & Articles"
            subtitle="Notes & technical writing"
            description="Thoughts, tutorials, and deep-dives into modern web engineering, VPS, and UI physics."
            seeAllText="See all posts"
            seeAllHref="#blog"
            folderType="blog"
            items={blogItems}
            onSelectProject={onSelectProject}
          />

          {/* Folder 3: Tech Stack & Experience */}
          <FolderCard 
            icon={Layers}
            title="Experience & Tech"
            subtitle="Companies & stack built with"
            description="Organizations I've worked with and tech stacks used in production applications."
            seeAllText="View experience"
            seeAllHref="#experience"
            folderType="experience"
            items={experienceItems}
            onSelectProject={onSelectProject}
          />

        </motion.div>

      </div>
    </section>
  );
}
