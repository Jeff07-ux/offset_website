'use client';

import React, { useState } from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { CASE_STUDIES } from '@/data/portfolioData';
import { CaseStudy } from '@/types';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Hospitality & Airbnb',
  'Realtor Branding',
  'Branded Villa Films',
  'Digital Platforms',
];

export default function WorkPage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const caseStudyList = Object.values(CASE_STUDIES);

  const filteredProjects = selectedCategory === 'All'
    ? caseStudyList
    : caseStudyList.filter((item) => {
        if (selectedCategory === 'Hospitality & Airbnb') {
          return item.category.toLowerCase().includes('rental') || item.category.toLowerCase().includes('hospitality');
        }
        if (selectedCategory === 'Realtor Branding') {
          return item.category.toLowerCase().includes('realtor') || item.category.toLowerCase().includes('personal');
        }
        if (selectedCategory === 'Branded Villa Films') {
          return item.category.toLowerCase().includes('villa') || item.category.toLowerCase().includes('cinema');
        }
        if (selectedCategory === 'Digital Platforms') {
          return item.category.toLowerCase().includes('digital') || item.category.toLowerCase().includes('platform') || item.category.toLowerCase().includes('website');
        }
        return true;
      });

  return (
    <div className="min-h-screen bg-white text-[#090909] selection:bg-[#052DC8] selection:text-white flex flex-col font-sans">
      <SiteHeader
        slogan={['SPACES', 'INTO', 'STORIES']}
        onContactClick={() => {
          window.location.href = '/#contact';
        }}
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />

      <main className="flex-1 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-20 pt-36 sm:pt-44 pb-28">
        {/* Page Header */}
        <div className="border-b border-[#C8C8C8] pb-12 mb-12">
          <div className="flex items-center gap-3 text-xs tracking-editorial text-[#747474] uppercase mb-4">
            <span className="w-2 h-2 bg-[#17B8C2]" />
            <span>Archive 2024 — 2026</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight-display text-[#090909] leading-none mb-6">
            Selected Works & Case Studies
          </h1>
          <p className="text-lg sm:text-xl text-[#747474] font-normal max-w-3xl leading-relaxed">
            A curated record of architectural cinematography, strategic positioning, and responsive web platforms engineered to make exceptional properties impossible to ignore.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-8">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors border ${
                    active
                      ? 'bg-[#090909] text-white border-[#090909]'
                      : 'bg-white text-[#747474] border-[#C8C8C8] hover:border-[#090909] hover:text-[#090909]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setActiveCaseStudy(project)}
              className="group cursor-pointer border border-[#C8C8C8] hover:border-[#090909] transition-all duration-300 flex flex-col bg-white"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F4F4]">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#090909] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-editorial text-[#747474] mb-2 font-medium">
                    {project.category} · {project.year || '2025'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-light text-[#090909] group-hover:text-[#052DC8] transition-colors mb-3">
                    {project.title}
                  </h2>
                  <p className="text-sm text-[#747474] line-clamp-2 leading-relaxed mb-6 font-normal">
                    {project.subtitle || project.description}
                  </p>
                </div>

                {/* Performance Metric Pill */}
                <div className="pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#747474]">Impact</span>
                  <span className="text-xs font-semibold tracking-wider text-[#17B8C2]">
                    {project.impactMetric?.value || (project.stats && project.stats[0]?.value) || '+42%'} {project.impactMetric?.label || (project.stats && project.stats[0]?.label) || 'Engagement'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter
        onNavigate={(id) => {
          window.location.href = `/#${id}`;
        }}
      />

      <ProjectModal
        caseStudy={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onInquire={() => {
          setActiveCaseStudy(null);
          window.location.href = '/#contact';
        }}
      />
    </div>
  );
}
