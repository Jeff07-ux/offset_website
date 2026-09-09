import React from 'react';
import { ArrowUp } from 'lucide-react';

interface SiteFooterProps {
  onNavigate?: (id: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#090909] text-white border-t border-white/10 py-16 sm:py-20 select-none">
      <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-white/10">
          {/* Logo & Category */}
          <div className="space-y-2">
            <span className="text-2xl sm:text-3xl font-normal tracking-[0.26em] uppercase text-white block">
              OFFSET
            </span>
            <span className="text-[11px] font-medium tracking-editorial uppercase text-white/50 block">
              VISUAL & DIGITAL STUDIO FOR REAL ESTATE
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-8 sm:gap-12" aria-label="Footer Navigation">
            {[
              { label: 'WORK', id: 'services' },
              { label: 'REALTORS', id: 'realtors' },
              { label: 'VILLAS', id: 'villas' },
              { label: 'WEBSITES', id: 'about' },
              { label: 'CONTACT', id: 'contact' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLink(e, link.id)}
                className="text-xs font-medium tracking-nav uppercase text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="flex items-center gap-2 text-xs font-medium tracking-editorial uppercase text-white/70 hover:text-white transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" strokeWidth={1.5} />
          </button>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-white/40 tracking-wider">
          <div>
            © {new Date().getFullYear()} OFFSET STUDIO LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>EDITORIAL VISUAL SYSTEMS</span>
            <span>·</span>
            <span>LONDON / DUBAI / MARRAKECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
