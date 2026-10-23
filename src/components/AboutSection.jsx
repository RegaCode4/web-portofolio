import React from 'react';
import { motion } from 'framer-motion';
import { User, ArrowUpRight, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="px-5 sm:px-8 py-16 sm:py-24 scroll-mt-28 relative z-10 isolate" id="about">
      {/* Background Radial Grid */}
      <div className="pointer-events-none absolute -z-10 bg-grid-pattern left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[750px] sm:w-[950px]" />

      <div className="mx-auto w-full max-w-content">
        
        {/* Section Header */}
        <div className="flex items-start gap-3 mb-12">
          <span className="shrink-0">
            <span className="block rounded-2xl border border-zinc-200 bg-white p-3 shadow-xs">
              <User size={24} className="text-zinc-900" />
            </span>
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-zinc-900">
              About
            </h2>
            <p className="mt-1 text-sm font-medium text-zinc-500">
              a small note from behind the screen
            </p>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Polaroid Photo Card + Based Here Map */}
          <div className="relative flex flex-col items-center sm:items-start max-w-md mx-auto lg:max-w-none">
            
            {/* Polaroid Photo Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-white p-3 pb-5 rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-[320px] sm:max-w-[340px]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-100 mb-3">
                <img 
                  src="/images/adip.webp" 
                  alt="Adip Habibullah" 
                  loading="lazy"
                  decoding="async"
                  width="340"
                  height="425"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Photo Tag Overlay */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-bold">
                  Adip Habibullah
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between px-1">
                <span className="font-note text-base font-semibold text-[#1557ff]">
                  hello there!
                </span>
                <span className="text-[11px] font-bold text-zinc-400 font-mono">
                  @adiphabibullah
                </span>
              </div>

              {/* Handwritten Arrow Callout (Top Right pointing to head) */}
              <div className="absolute -top-3 -right-16 hidden sm:flex items-center gap-1 font-note text-base font-bold text-[#1557ff] rotate-6">
                <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-[#1557ff]">
                  <path d="M5 25 Q 20 5 35 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M30 10 L35 15 L30 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
                <span>yep, that's me</span>
              </div>
            </motion.div>

            {/* Based Here Map Card (Below Photo) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-6 w-full max-w-[320px] sm:max-w-[340px] relative"
            >
              {/* Curving Blue Arrow SVG from Photo to Map */}
              <div className="absolute -top-10 -left-10 hidden sm:block pointer-events-none text-[#1557ff]">
                <svg width="60" height="50" viewBox="0 0 60 50" fill="none">
                  <path d="M50 5 Q 10 20 20 45" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3,3" />
                </svg>
              </div>

              {/* Map Card */}
              <a 
                href="https://maps.google.com/?q=Padang,Indonesia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-white border border-zinc-200 rounded-2xl shadow-lg hover:border-[#1557ff] hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-16 rounded-xl bg-blue-50 border border-blue-200 overflow-hidden relative shrink-0">
                    {/* Map Thumbnail Placeholder */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=400&auto=format&fit=crop')" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin size={18} className="text-[#1557ff] fill-[#1557ff]/20" />
                    </div>
                  </div>
                  <div>
                    <span className="font-note text-sm font-semibold text-[#1557ff] block">
                      based here
                    </span>
                    <h4 className="font-bold text-sm text-zinc-900">Padang</h4>
                    <p className="text-xs font-semibold text-zinc-400">West Sumatra, Indonesia</p>
                    
                  </div>
                </div>

                <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#1557ff] group-hover:text-white transition-colors">
                  <ArrowUpRight size={16} />
                </div>
              </a>
            </motion.div>

          </div>

          {/* Right Column: Statement, Bio Paragraph & Notes */}
          <div className="flex flex-col">
            
            {/* Handwritten Top Note */}
            <span className="font-note text-base font-semibold text-[#1557ff] mb-3 block">
              not the final-final version of me...
            </span>

            {/* Main Typography Statement */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 leading-[1.15] tracking-tight mb-8">
              Just here to make things{' '}
              
              {/* Highlight box around 'happen' */}
              <span className="group/happen relative inline-block border-2 border-[#1557ff] px-2 py-0.5 text-[#1557ff] bg-blue-50/30 rounded-sm">
                happen
                
                {/* Corner Handle Dots */}
                <span className="absolute h-2 w-2 border-2 border-[#1557ff] bg-white -left-1 -top-1"></span>
                <span className="absolute h-2 w-2 border-2 border-[#1557ff] bg-white -right-1 -top-1"></span>
                <span className="absolute h-2 w-2 border-2 border-[#1557ff] bg-white -bottom-1 -left-1"></span>
                <span className="absolute h-2 w-2 border-2 border-[#1557ff] bg-white -bottom-1 -right-1"></span>

                {/* Cursor Badge */}
                <span className="pointer-events-none absolute right-[-2.5rem] bottom-[-1.8rem] z-30 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="-mr-1 -rotate-[28deg] fill-[#1557ff] text-white">
                    <path d="M3.039 4.277l3.904 13.563c.185 .837 .92 1.516 1.831 1.642l.17 .016a2.2 2.2 0 0 0 1.982 -1.006l.045 -.078l1.4 -2.072l4.05 4.05a2.067 2.067 0 0 0 2.924 0l1.047 -1.047c.388 -.388 .606 -.913 .606 -1.461l-.008 -.182a2.067 2.067 0 0 0 -.598 -1.28l-4.047 -4.048l2.103 -1.412c.726 -.385 1.18 -1.278 1.053 -2.189a2.2 2.2 0 0 0 -1.701 -1.845l-13.524 -3.89a1 1 0 0 0 -1.236 1.24z"></path>
                  </svg>
                  <span className="rounded-full bg-[#1557ff] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    Adip
                  </span>
                </span>
              </span>
              . With people around, room to grow, and no need to overthink it.
            </h3>

            {/* Bio Paragraph */}
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-10 font-medium">
              Passionate about Web Developer, Machine Learning and other tech areas like Cloud Computing, NLP, IoT, and Networking, and I'm open to connecting with professionals for potential collaborations or projects.
            </p>

            {/* Handwritten Bottom Note */}
            <span className="font-note text-base font-semibold text-zinc-500 self-start sm:self-end">
              and if you made it this far... scroll once more →
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}
