import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { HeaderTheme } from '../../types';

interface SiteHeaderProps {
  theme?: HeaderTheme;
  slogan?: string[];
  showCta?: boolean;
  ctaColor?: 'cyan' | 'cobalt' | 'teal' | 'amber';
  onContactClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  theme = 'light',
  // slogan = ['SPACES', 'PEOPLE', 'POSSIBILITIES'],
   slogan = [],
  showCta = true,
  onContactClick,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'WORK', id: 'work' },
    { label: 'SERVICES', id: 'services' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md py-4 border-b border-[#C8C8C8]/60 shadow-xs'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="w-full px-5 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="group flex items-center select-none"
            aria-label="OFFSET Studio Home"
          >
            <span
              className={`text-2xl sm:text-3xl lg:text-[36px] font-normal tracking-[0.26em] uppercase leading-none transition-colors ${
                theme === 'hero' && !scrolled ? 'text-[#090909]' : 'text-[#090909]'
              }`}
            >
              OFFSET
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center space-x-10 lg:space-x-16"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`text-[12px] lg:text-[12px] font-medium tracking-nav uppercase transition-opacity duration-200 hover:opacity-60 relative py-1 ${
                  theme === 'hero' && !scrolled ? 'text-[#090909]' : 'text-[#090909]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Rail: Slogan & Optional CTA & Hamburger */}
          <div className="flex items-center space-x-6 lg:space-x-10">
            {/* Editorial Slogan (Desktop) — hidden over the hero, which shows its own slogan rail */}
            {!(theme === 'hero' && !scrolled) && (
              <div className="hidden xl:flex items-center space-x-3 text-[11px] font-medium tracking-editorial uppercase text-[#747474] select-none">
                <span>{slogan.join(' / ')}</span>
              </div>
            )}

            {/* CTA Button — hidden over the hero to match its clean unscrolled header */}
            {showCta && !(theme === 'hero' && !scrolled) && (
              <button
                type="button"
                onClick={onContactClick || ((e) => handleLinkClick(e as any, 'contact'))}
                className="hidden sm:inline-flex items-center justify-center space-x-2 bg-[#17B8C2] hover:bg-[#149da6] text-[#090909] font-medium text-[12px] uppercase tracking-button px-5 py-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] select-none"
              >
                <span>LET’S TALK</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            )}

            {/* Mobile / Compact Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="flex md:hidden flex-col justify-center items-center w-12 h-12 space-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052DC8] p-2 cursor-pointer"
            >
              <span className="w-8 h-[1px] bg-[#090909] block transition-transform" />
              <span className="w-8 h-[1px] bg-[#090909] block transition-opacity" />
              <span className="w-8 h-[1px] bg-[#090909] block transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
        >
          {/* Top Row: Wordmark & Close Button */}
          <div className="flex items-center justify-between border-b border-[#C8C8C8] pb-6">
            <span className="text-2xl font-normal tracking-[0.26em] uppercase text-[#090909]">
              OFFSET
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-12 h-12 flex items-center justify-center text-[#090909] hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#052DC8] cursor-pointer"
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className="group flex items-baseline justify-between py-2 border-b border-[#C8C8C8]/40"
              >
                <span className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-[#090909] group-hover:text-[#052DC8] transition-colors">
                  {link.label}
                </span>
                <span className="text-xs font-mono tracking-widest text-[#747474]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          {/* Bottom Rail in Mobile Menu */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-[#C8C8C8]">
            <div className="text-xs font-medium tracking-editorial uppercase text-[#747474]">
              REAL ESTATE VISUAL & DIGITAL STUDIO
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onContactClick) onContactClick();
                else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#17B8C2] text-[#090909] font-medium text-sm tracking-button uppercase px-8 py-4 cursor-pointer"
            >
              <span>LET’S TALK</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
