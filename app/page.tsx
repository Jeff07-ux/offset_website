'use client';

import React, { useState, useEffect } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HeroSection } from '@/components/sections/HeroSection';
import { AirbnbSection } from '@/components/sections/AirbnbSection';
import { RealtorSection } from '@/components/sections/RealtorSection';
import { BrandedVillasSection } from '@/components/sections/BrandedVillasSection';
import { WebsitesSection } from '@/components/sections/WebsitesSection';
import { ContactCtaSection } from '@/components/sections/ContactCtaSection';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { CASE_STUDIES } from '@/data/portfolioData';
import { CaseStudy } from '@/types';

export default function HomePage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [currentSlogan, setCurrentSlogan] = useState<string[]>([
    'SPACES',
    'PEOPLE',
    'POSSIBILITIES',
  ]);

  // Section scroll spy to update header slogan dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;

      const servicesEl = document.getElementById('services');
      const realtorsEl = document.getElementById('realtors');
      const villasEl = document.getElementById('villas');
      const aboutEl = document.getElementById('about');

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setCurrentSlogan(['SPACES', 'INTO', 'STORIES']);
      } else if (villasEl && scrollPos >= villasEl.offsetTop) {
        setCurrentSlogan(['PEOPLE', 'PLACES', 'POSSIBILITIES']);
      } else if (realtorsEl && scrollPos >= realtorsEl.offsetTop) {
        setCurrentSlogan(['SPACES', 'PEOPLE', 'STORIES']);
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setCurrentSlogan(['SPACES', 'PEOPLE LOVE', 'BOOK']);
      } else {
        setCurrentSlogan(['SPACES', 'PEOPLE', 'POSSIBILITIES']);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCaseStudy = (id: string) => {
    const item = CASE_STUDIES[id] || CASE_STUDIES['villa-marrakech'];
    setActiveCaseStudy(item);
  };

  return (
    <div className="min-h-screen bg-white text-[#090909] selection:bg-[#052DC8] selection:text-white flex flex-col font-sans">
      {/* Universal Global Header */}
      <SiteHeader
        theme="hero"
        slogan={currentSlogan}
        onContactClick={() => scrollToSection('contact')}
        onNavigate={scrollToSection}
      />

      {/* Main Continuous Homepage Experience */}
      <main className="flex-1 w-full">
        {/* Section 01: Hero */}
        <HeroSection
          onViewWork={() => scrollToSection('services')}
          onStartProject={() => scrollToSection('contact')}
        />

        {/* Section 02: Airbnb and Rental Businesses */}
        <AirbnbSection
          onOpenCaseStudy={openCaseStudy}
        />

        {/* Section 03: Realtors and Personal Branding */}
        <RealtorSection
          onWatchStory={() => openCaseStudy('realtor-brand')}
        />

        {/* Section 04: Branded Villas */}
        <BrandedVillasSection
          onExploreFilms={() => openCaseStudy('branded-villa-film')}
        />

        {/* Section 05: Websites and Strategic Approach */}
        <WebsitesSection
          onViewProject={() => openCaseStudy('palm-residence')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Section 06: Final CTA & Editorial Enquiry Form */}
        <ContactCtaSection />
      </main>

      {/* Semantic Studio Footer */}
      <SiteFooter onNavigate={scrollToSection} />

      {/* Interactive Case Study Inspector Modal */}
      <ProjectModal
        caseStudy={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onInquire={() => {
          setActiveCaseStudy(null);
          scrollToSection('contact');
        }}
      />
    </div>
  );
}
