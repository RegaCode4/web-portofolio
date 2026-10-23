import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-2xl"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-72 w-full bg-zinc-100 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover" 
            />
            <button 
              type="button" 
              onClick={onClose}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center transition hover:bg-black cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="absolute bottom-3 left-4">
              <span className="rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-xs font-bold text-zinc-800 shadow-xs">
                {project.category || 'Featured'}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">
              {project.title}
            </h3>
            
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base mb-6">
              {project.description || project.snippet || "High performance interactive component with modern visuals and physics."}
            </p>

            {/* Tags */}
            {project.tags && (
              <div className="mb-6">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2">Technologies Used</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs font-semibold bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full border border-zinc-200">
                      <Tag size={12} className="text-[#1557ff]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
              <button 
                type="button" 
                onClick={onClose}
                className="text-xs font-bold text-zinc-500 hover:text-zinc-900 transition cursor-pointer"
              >
                Close preview
              </button>
              
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#1557ff] text-white px-5 py-2 text-xs font-bold transition hover:bg-blue-700 shadow-sm"
                >
                  Visit Live Site
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}
