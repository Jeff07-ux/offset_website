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

  // Over the hero the header stays minimal; everywhere else (scrolled or on inner pages) it shows the
  // compact bar from the design sheet: slogan stack, cobalt CTA, and on desktop the sheet's exact placement.
  const compact = !(theme === 'hero' && !scrolled);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md py-4 lg:py-0'
            : 'bg-transparent py-6 sm:py-8'
        } ${compact ? 'lg:u-h-85' : ''}`}
      >
        <div
          className={`w-full px-5 sm:px-10 flex items-center justify-between ${
            compact ? 'lg:relative lg:block lg:h-full lg:px-0' : 'lg:px-16'
          }`}
        >
          {/* Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className={`group flex items-center select-none ${
              compact ? 'lg:absolute lg:u-left-86 lg:u-top-24' : ''
            }`}
            aria-label="OFFSET Studio Home"
          >
            <span
              className={`text-2xl sm:text-3xl font-normal tracking-[0.26em] uppercase leading-none text-[#090909] transition-colors ${
                compact ? 'lg:u-text-28 lg:u-lh-32 lg:tracking-[0.13em]' : 'lg:text-[36px]'
              }`}
            >
              OFFSET
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center space-x-10 lg:space-x-16 ${
              compact ? 'lg:absolute lg:u-left-332 lg:u-top-30 lg:space-x-0! lg:gap-[calc(var(--u)*50)]' : ''
            }`}
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`font-medium uppercase transition-opacity duration-200 hover:opacity-60 relative py-1 text-[#090909] ${
                  compact
                    ? 'text-[12px] tracking-nav lg:u-text-12.5 lg:u-lh-20 lg:py-0 lg:font-normal lg:tracking-normal'
                    : 'text-[12px] tracking-nav'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Rail: Slogan & Optional CTA & Hamburger */}
          <div className={`flex items-center space-x-6 lg:space-x-10 ${compact ? 'lg:contents' : ''}`}>
            {/* Editorial slogan stack with its short rule — hidden over the hero, which shows its own slogan rail */}
            {compact && (
              <>
                <div className="hidden lg:block lg:absolute lg:u-left-1247 lg:u-top-19 select-none text-[11px] font-medium tracking-editorial uppercase text-[#727274] lg:u-text-11 lg:u-lh-17 lg:tracking-[0.28em] lg:whitespace-pre-line">
                  {slogan.join('\n')}
                </div>
                <span className="hidden lg:block lg:absolute lg:u-left-1344 lg:u-top-43 lg:u-w-34 lg:u-h-1 bg-[#a4a4a5]" />
              </>
            )}

            {/* CTA Button — hidden over the hero to match its clean unscrolled header */}
            {showCta && compact && (
              <button
                type="button"
                onClick={onContactClick || ((e) => handleLinkClick(e as any, 'contact'))}
                className="hidden sm:inline-flex items-center justify-center space-x-2 bg-[#052DC8] hover:bg-[#0424a1] text-white font-medium text-[12px] uppercase tracking-button px-5 py-2.5 transition-all duration-200 cursor-pointer active:scale-[0.98] select-none lg:absolute lg:u-left-1431 lg:u-top-18 lg:u-w-158 lg:u-h-50 lg:px-0 lg:space-x-3 lg:u-text-12.5 lg:tracking-[0.22em]"
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
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-[#052DC8] text-white font-medium text-sm tracking-button uppercase px-8 py-4 cursor-pointer"
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
