import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';

const experiences = [
  {
    id: 'pnp',
    role: 'Mahasiswa Teknologi Informasi',
    company: 'Politeknik Negeri Padang',
    handle: '@ Politeknik Negeri Padang',
    location: 'Padang, Sumatera Barat',
    period: '2024 — SEKARANG',
    dateLabel: '2024 — PRES',
    bgColor: 'bg-[#ff5500]',
    accentColor: '#ff5500',
    about: 'Sedang menempuh pendidikan tinggi di Politeknik Negeri Padang dengan fokus pada pengembangan sistem web, rekayasa perangkat lunak, dan teknologi informasi.',
    bullets: [
      'Menempuh pendidikan tinggi program studi Teknologi Informasi dengan fokus pada arsitektur web modern, rekayasa perangkat lunak, dan basis data.',
      'Mengembangkan berbagai proyek aplikasi web interaktif berbasis JavaScript, React, Astro, Node.js, dan Tailwind CSS.',
      'Mempelajari dan mengimplementasikan konsep Machine Learning, Cloud Computing, RESTful API, serta manajemen jaringan komputer.',
      'Aktif berkolaborasi dalam tim proyek akademik, praktikum laboratorium, dan pengembangan solusi teknologi tepat guna.'
    ],
    logo: '/asset/icon/pnp.webp',
    image: '/pnp.webp',
    photos: ['/pnp.webp'],
    avatar: '/images/avatar-pose2.webp'
  },
  {
    id: 'sman1pagel',
    role: 'Siswa / Alumni MIPA',
    company: 'SMAN 1 Padang Gelugur',
    handle: '@ SMAN 1 Padang Gelugur',
    location: 'Pasaman, Sumatera Barat',
    period: '2020 — 2023',
    dateLabel: '2020 — 2023',
    bgColor: 'bg-[#15803d]',
    accentColor: '#15803d',
    about: 'Menyelesaikan jenjang pendidikan menengah atas di SMAN 1 Padang Gelugur dengan konsentrasi MIPA serta aktif dalam kegiatan akademik dan pengenalan dunia teknologi komputer.',
    bullets: [
      'Menyelesaikan studi jenjang sekolah menengah atas peminatan Matematika dan Ilmu Pengetahuan Alam (MIPA).',
      'Membangun fondasi logika berpikir terstruktur, pemecahan masalah (problem solving), serta sains dan matematika.',
      'Mulai mengeksplorasi ketertarikan di bidang komputer, pemrograman dasar, dan teknologi digital.',
      'Aktif dalam kebersamaan kelas, kegiatan akademik sekolah, dan organisasi kesiswaan untuk melatih komunikasi serta kerja sama tim.'
    ],
    logo: '/asset/icon/sman1pagel.png',
    image: '/sma.webp',
    photos: ['/sma.webp'],
    avatar: '/images/avatar-pose2.webp'
  }
];

export default function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const timelineRef = useRef(null);

  const activeExp = experiences[selectedIndex];
  const photos = activeExp.photos || [activeExp.image];

  // Prevent background scrolling when modal is open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = () => {
    setActivePhotoIdx(0);
    setIsModalOpen(true);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const scrollTimeline = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      timelineRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24 scroll-mt-28 relative z-10 isolate" id="experience">
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[750px] sm:w-[950px]" />

      <div className="mx-auto w-full max-w-content">
        
        {/* Section Header */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div className="flex items-start gap-3">
            <span className="shrink-0">
              <span className="block rounded-2xl border border-zinc-200 bg-white p-3 shadow-xs">
                <History size={24} className="text-zinc-900" />
              </span>
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900">
                Recent Experience
              </h2>
              <p className="mt-1 text-sm font-medium text-zinc-500">
                Roles, rooms, and what stuck.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Featured Banner + Right Role Details */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-12 items-start mb-12">
          
          {/* Left Orange/Featured Experience Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeExp.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className={`${activeExp.bgColor} rounded-[2rem] p-7 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-[380px] sm:min-h-[420px] shadow-xl`}
            >
              <div className="relative z-10">
                {/* Date Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider mb-6 backdrop-blur-md text-white border border-white/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  {activeExp.period}
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  {activeExp.role}
                </h3>
                
                <p className="text-lg sm:text-xl font-semibold opacity-95 mb-2">
                  {activeExp.handle}
                </p>

                <p className="text-xs sm:text-sm opacity-85 flex items-center gap-1.5 font-medium">
                  <MapPin size={15} />
                  {activeExp.location}
                </p>
              </div>

              {/* View Full Details Button */}
              <div className="mt-8 relative z-10">
                <button 
                  type="button" 
                  onClick={openModal}
                  className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold text-xs sm:text-sm shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  View full details
                </button>
              </div>

              {/* Character Illustration / Avatar Sticker */}
              <div className="absolute right-0 sm:right-2 bottom-0 w-52 h-52 sm:w-72 sm:h-72 pointer-events-none select-none z-10">
                <div className="relative w-full h-full">
                  {activeExp.avatar?.includes('/') ? (
                    <>
                      {/* Character WebP Sticker */}
                      <img 
                        src={activeExp.avatar} 
                        alt={activeExp.company}
                        loading="lazy"
                        decoding="async"
                        width="288"
                        height="288"
                        className="w-full h-full object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
                      />
                      
                      {/* Company Logo Badge centered exactly on character's chest circle */}
                      {activeExp.logo && (
                        <div className="absolute left-[51.5%] top-[72.5%] -translate-x-1/2 -translate-y-1/2 w-[16.5%] h-[16.5%] rounded-full bg-white p-0.5 sm:p-1 border border-zinc-200/80 shadow-md flex items-center justify-center overflow-hidden z-20">
                          <img 
                            src={activeExp.logo} 
                            alt={activeExp.company} 
                            loading="lazy"
                            decoding="async"
                            width="48"
                            height="48"
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/10 border-4 border-white/20 backdrop-blur-xs flex items-center justify-center text-7xl shadow-2xl">
                      <span className="text-6xl sm:text-7xl">{activeExp.avatar}</span>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Right Details Panel */}
          <div className="flex flex-col justify-between h-full gap-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 block mb-3 font-mono">
                ABOUT THIS ROLE
              </span>
              
              <p className="text-base sm:text-lg font-medium leading-relaxed text-zinc-800">
                {activeExp.about}
              </p>

              {/* Workspace Photo Preview & Floating Lanyard ID Badge */}
              <div 
                onClick={openModal}
                className="mt-6 relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 aspect-video shadow-xs group cursor-pointer"
              >
                <img 
                  src={activeExp.image} 
                  alt={activeExp.company}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />

                {/* Floating Lanyard ID Badge (top right) */}
                <div className="absolute top-3 right-3 z-20 bg-zinc-900 text-white rounded-xl p-2.5 px-3 shadow-xl border border-white/20 transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-white p-0.5 overflow-hidden shrink-0">
                      <img src={activeExp.logo} alt="" loading="lazy" decoding="async" width="24" height="24" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold leading-tight">Adip Habibullah</p>
                      <p className="text-[9px] text-zinc-400 font-semibold">{activeExp.company}</p>
                    </div>
                  </div>
                </div>

                {/* Slide Counter pill */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {String(selectedIndex + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Horizontal Timeline Slider */}
        <div className="border-t border-zinc-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">
              TIMELINE
            </span>
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => scrollTimeline('left')}
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                type="button" 
                onClick={() => scrollTimeline('right')}
                className="w-8 h-8 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Timeline Connected Line & Cards */}
          <div 
            ref={timelineRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-2 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            {experiences.map((exp, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`min-w-[250px] sm:min-w-[270px] text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer shrink-0 ${
                    isSelected 
                      ? (exp.bgColor === 'bg-[#ff5500]' ? 'border-[#ff5500] bg-orange-50/40' : 'border-[#15803d] bg-emerald-50/40') + ' shadow-md translate-y-[-2px]' 
                      : 'border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 rounded-xl border border-zinc-200 bg-white p-1 overflow-hidden shadow-2xs">
                      <img src={exp.logo} alt={exp.company} loading="lazy" decoding="async" width="32" height="32" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider">
                      {exp.dateLabel}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-zinc-900 truncate">
                    {exp.role}
                  </h4>
                  <p className="text-xs font-semibold text-zinc-500 mt-0.5 truncate">
                    {exp.handle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Experience Detail Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-4xl lg:max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-zinc-950 border border-white/10 grid grid-cols-1 md:grid-cols-[1.18fr_0.82fr] max-h-[90vh]"
            >
              {/* Left Column: Dark Photo Carousel */}
              <div className="relative bg-black flex flex-col justify-between items-center overflow-hidden min-h-[280px] sm:min-h-[380px] md:min-h-[500px]">
                {/* Image Container */}
                <div className="relative w-full h-full flex-1 flex items-center justify-center p-3 sm:p-4">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={photos[activePhotoIdx]}
                      src={photos[activePhotoIdx]} 
                      alt={activeExp.company}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full max-h-[46vh] md:max-h-[520px] object-contain select-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                {photos.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      onClick={prevPhoto}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      type="button" 
                      onClick={nextPhoto}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-zinc-900 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer z-10"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Photo Counter */}
                <div className="w-full py-2.5 pb-3 text-center bg-gradient-to-t from-black/90 to-transparent">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-white/70">
                    Photo {activePhotoIdx + 1} of {photos.length}
                  </span>
                </div>
              </div>

              {/* Right Column: Experience Details */}
              <div className="bg-white p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[600px] [scrollbar-width:thin]">
                <div>
                  {/* Top Header: Badge, Date, Close Button */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {activeExp.period.includes('SEKARANG') && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                          Now
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-zinc-400 tracking-wider uppercase">
                        {activeExp.period}
                      </span>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center transition cursor-pointer shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                    {activeExp.role}
                  </h3>

                  {/* Company Handle with Logo */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="h-6 w-6 rounded-md bg-white p-0.5 border border-zinc-200 shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={activeExp.logo} alt="" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-sm font-bold text-zinc-600">
                      {activeExp.handle}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mt-2">
                    <MapPin size={14} className="text-zinc-400 shrink-0" />
                    <span>{activeExp.location}</span>
                  </div>

                  {/* Section Label */}
                  <div className="mt-6 mb-3">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                      ABOUT THIS ROLE
                    </span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 text-xs sm:text-[13px] leading-relaxed text-zinc-700 font-medium">
                    {activeExp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-zinc-900 font-bold text-base leading-none mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
