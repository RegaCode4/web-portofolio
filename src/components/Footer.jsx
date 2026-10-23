import React, { useState } from 'react';
import { Copy, Check, Mail, Heart } from 'lucide-react';
import { Linkedin, Github, Instagram, Tiktok } from './BrandIcons';


export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "regacode4@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer className="relative z-10 border-t border-zinc-200 bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-content flex flex-col items-center justify-between gap-8 sm:flex-row">
        
        {/* Left Info */}
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
            Let's build something together
          </h3>
          <p className="mt-1 text-sm text-zinc-500 font-medium">
            Open for fulltime, freelance, & interesting collaborations.
          </p>

          {/* Email Copy Pill */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 p-1 pl-4 text-xs font-semibold text-zinc-700">
            <span>{email}</span>
            <button 
              type="button" 
              onClick={handleCopyEmail}
              className="flex h-7 items-center gap-1.5 rounded-full bg-white px-3 text-xs font-bold text-zinc-900 shadow-xs border border-zinc-200 transition hover:bg-zinc-100 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Socials */}
        <div className="flex flex-col items-center sm:items-end gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a 
              href="https://www.linkedin.com/in/adip-habibullah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-[#1557ff] hover:text-[#1557ff]"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://www.instagram.com/adip.v2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-[#1557ff] hover:text-[#1557ff]"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.tiktok.com/@rega280804" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-[#1557ff] hover:text-[#1557ff]"
              aria-label="TikTok"
            >
              <Tiktok size={16} />
            </a>
            <a 
              href="https://github.com/RegaCode4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-[#1557ff] hover:text-[#1557ff]"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href={`mailto:${email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:-translate-y-1 hover:border-[#1557ff] hover:text-[#1557ff]"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          <span className="font-note text-base font-semibold text-[#1557ff] -rotate-2">
            build with Astro
          </span>
        </div>

      </div>
    </footer>
  );
}
