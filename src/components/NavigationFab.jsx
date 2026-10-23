import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Briefcase, BookOpen, Route, User, MessageSquare, Mail } from 'lucide-react';

export default function NavigationFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const getAvatarImage = () => {
    if (!isOpen) return "/images/avatara-aslam-3.webp";
    if (hoveredItem === 'Say hi') return "/images/avatara-aslam-3.webp";
    if (hoveredItem) return "/images/avatar-pose1.webp";
    return "/images/avatar-pose2.webp";
  };

  const menuItems = [
    { icon: <LayoutGrid className="w-5 h-5" />, label: 'Home', shortcut: '1', href: '#' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Work', shortcut: '2', href: '#work' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Blog', shortcut: '3', href: '#blog' },
    { icon: <Route className="w-5 h-5" />, label: 'Experience', shortcut: '4', href: '#experience' },
    { icon: <User className="w-5 h-5" />, label: 'About', shortcut: '5', href: '#about' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Catch up', shortcut: '6', href: '#catch-up' },
  ];

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && !e.altKey) {
        const item = menuItems.find(i => i.shortcut === e.key);
        if (item) {
          e.preventDefault();
          window.location.hash = item.href;
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12 z-[80] flex flex-col items-end"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
            className="flex flex-col items-end gap-2.5 mb-4 origin-bottom-right"
          >
            {/* Header title */}
            <div className="font-note text-base font-bold text-[#1557ff] mb-1 mr-4 flex items-center gap-2 -rotate-3">
              <span className="opacity-60 font-mono text-xs">(-)</span> Where to?
            </div>
            
            {/* Menu Items */}
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: 20, rotate: 0 }}
                animate={{ opacity: 1, x: 0, rotate: -2 }}
                exit={{ opacity: 0, x: 20, rotate: 0 }}
                transition={{ delay: index * 0.03 }}
                className="bg-white/95 backdrop-blur-xs border border-[#deded9] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-[2rem] py-2.5 px-5 flex items-center justify-between w-[240px] hover:scale-[1.03] hover:border-[#1557ff] transition-all cursor-pointer"
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#f7f7f5] p-2 rounded-full text-[#111111]">
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm text-[#111111]">{item.label}</span>
                </div>
                <div className="flex items-center gap-1 text-[#76766f] text-xs font-bold font-mono">
                  <span>⌘</span>
                  <span>{item.shortcut}</span>
                </div>
              </motion.a>
            ))}

            {/* Say Hi CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20, rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              exit={{ opacity: 0, x: 20, rotate: 0 }}
              transition={{ delay: menuItems.length * 0.03 }}
              className="bg-white/95 backdrop-blur-xs border border-[#ff5a0a]/30 shadow-[0_8px_24px_rgba(255,90,10,0.12)] rounded-[2rem] py-2.5 px-5 flex items-center justify-between w-[240px] mt-1 hover:scale-[1.03] transition-all cursor-pointer group"
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => setHoveredItem('Say hi')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#ff5a0a]/10 p-2 rounded-full text-[#ff5a0a]">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm text-[#ff5a0a]">Say hi</span>
              </div>
              <div className="text-[#ff5a0a]/60 text-xs font-bold font-mono">
                ↵
              </div>
            </motion.a>

          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Trigger Button with WebP Avatar from Assets */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        className="w-14 h-14 hover:scale-110 active:scale-95 transition-transform focus:outline-none drop-shadow-xl cursor-pointer"
      >
        <img 
          src={getAvatarImage()} 
          alt="Navigation Menu Avatar" 
          loading="eager"
          decoding="async"
          width="56"
          height="56"
          className="w-full h-full object-contain pointer-events-none" 
        />
      </button>
    </div>
  );
}
