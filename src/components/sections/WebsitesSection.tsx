import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';
import { WEBSITES_DATA } from '../../data/portfolioData';

interface WebsitesSectionProps {
  onViewProject: () => void;
  onContactClick: () => void;
}

export const WebsitesSection: React.FC<WebsitesSectionProps> = ({
  onViewProject,
  onContactClick,
}) => {
  return (
    <section
      id="about"
      className="relative w-full bg-white overflow-hidden border-b border-[#C8C8C8]/60"
    >
      {/* ================= UPPER SECTION: Warm Still-Life Device Showcase ================= */}
      <div className="relative w-full bg-[#FCFBF8] border-b border-[#C8C8C8]/60 py-24 sm:py-32">
        {/* Subtle leaf shadow & plaster ambiance overlay */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-gradient-to-tr from-[#f5f2eb]/80 via-transparent to-[#faf7f0]/60 pointer-events-none" 
        />

        <div className="relative z-10 w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
          {/* Header Row with Section Eyebrow & Compact Header CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-[#C8C8C8]">
            <span className="text-[12px] sm:text-[13px] font-medium tracking-editorial uppercase text-[#090909]">
              {WEBSITES_DATA.eyebrow}
            </span>

            <button
              type="button"
              onClick={onContactClick}
              className="self-start sm:self-auto inline-flex items-center gap-2 bg-[#17B8C2] hover:bg-[#149da6] text-[#090909] font-medium text-xs tracking-button uppercase px-6 py-2.5 transition-all cursor-pointer select-none active:scale-[0.98]"
            >
              <span>{WEBSITES_DATA.headerCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Main Showcase Layout: Left Text & Right Realistic Device Mockups */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 sm:pt-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.0] tracking-tight text-[#090909] whitespace-pre-line mb-6">
                  {WEBSITES_DATA.headline}
                </h2>

                <p className="text-lg sm:text-2xl text-[#323232] font-light leading-snug whitespace-pre-line mb-8 max-w-[460px]">
                  {WEBSITES_DATA.supporting}
                </p>

                {/* Amber Section CTA */}
                <div className="mb-10">
                  <ArrowButton
                    id="websites-view-project-btn"
                    variant="amber"
                    onClick={onViewProject}
                  >
                    {WEBSITES_DATA.ctaText}
                  </ArrowButton>
                </div>
              </div>

              {/* Project Metadata & Capability List */}
              <div className="pt-8 border-t border-[#C8C8C8] flex gap-4">
                <div className="w-[2px] bg-[#F0AD37] shrink-0 my-1" />
                <div className="space-y-3">
                  <div className="text-[11px] font-medium tracking-editorial uppercase text-[#090909] whitespace-pre-line">
                    {WEBSITES_DATA.projectMeta}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-medium tracking-editorial uppercase text-[#747474] whitespace-pre-line leading-relaxed">
                    {WEBSITES_DATA.capabilities}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Layered Hardware Mockups (Laptop + Phone Composition) */}
            <div className="lg:col-span-7 xl:col-span-8 relative flex items-center justify-center p-2 sm:p-6">
              {/* Composition Container */}
              <div className="relative w-full max-w-[880px]">
                {/* Desktop Laptop Mockup */}
                <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] rounded-[10px] sm:rounded-[14px] p-2 sm:p-3 shadow-2xl border border-neutral-700/60">
                  {/* Laptop Top Bar / Camera */}
                  <div className="w-2 h-2 rounded-full bg-neutral-700 mx-auto mb-1 sm:mb-2 opacity-50" />
                  
                  {/* Laptop Screen Content (Palm Residence Website) */}
                  <div className="relative w-full h-[calc(100%-12px)] sm:h-[calc(100%-16px)] bg-white overflow-hidden border border-neutral-200">
                    <div className="relative w-full h-full bg-neutral-900 text-white flex flex-col justify-between p-4 sm:p-8">
                      <img
                        src={WEBSITES_DATA.mockupDesktop}
                        alt="Palm Residence Luxury Architecture Website Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                      {/* Mockup Header */}
                      <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-xs font-mono tracking-widest text-white/80 border-b border-white/20 pb-2">
                        <span>PALM RESIDENCE</span>
                        <span className="hidden sm:inline">OFF-MARKET PORTFOLIO</span>
                        <span>01 / 04</span>
                      </div>

                      {/* Mockup Headline */}
                      <div className="relative z-10 max-w-[420px]">
                        <span className="text-[9px] sm:text-[10px] tracking-editorial uppercase text-[#17B8C2] bg-black/50 px-2 py-0.5 mb-2 inline-block">
                          PRIVATE ESTATE
                        </span>
                        <div className="text-xl sm:text-3xl font-light leading-tight">
                          Sculptural Living Above The Coast.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Laptop Base Stand */}
                <div className="w-[110%] -ml-[5%] h-3 sm:h-4 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-xl shadow-md border-t border-white/40 relative z-20" />

                {/* Layered Mobile Phone Mockup */}
                <div className="absolute -bottom-6 -right-2 sm:-bottom-10 sm:right-6 w-[34%] sm:w-[28%] aspect-[9/19] bg-[#111] rounded-[22px] sm:rounded-[32px] p-1.5 sm:p-2.5 shadow-2xl border-2 border-neutral-700 z-30">
                  {/* Phone Speaker Notch */}
                  <div className="w-10 h-1.5 bg-neutral-800 rounded-full mx-auto mb-1" />
                  
                  {/* Phone Screen */}
                  <div className="relative w-full h-[calc(100%-8px)] rounded-[16px] sm:rounded-[24px] overflow-hidden bg-neutral-900 border border-neutral-800">
                    <img
                      src={WEBSITES_DATA.mockupMobile}
                      alt="Palm Residence Mobile Experience"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-4 left-3 right-3 text-white">
                      <div className="text-[9px] tracking-editorial uppercase text-[#F0AD37] mb-0.5">
                        MOBILE WEB APP
                      </div>
                      <div className="text-xs font-light leading-snug">
                        Touch-first property exploration.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LOWER SECTION: 4-Step Strategic Approach ================= */}
      <div className="w-full bg-white py-20 sm:py-28">
        <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Process Intro: Cyan Vertical Rule & Headline */}
            <div className="lg:col-span-4 xl:col-span-4 flex gap-5">
              <div className="w-[3px] bg-[#17B8C2] shrink-0 my-1" />
              <div>
                <span className="text-[11px] sm:text-[12px] font-medium tracking-editorial uppercase text-[#747474] block mb-2">
                  {WEBSITES_DATA.processIntro.eyebrow}
                </span>
                <h3 className="text-3xl sm:text-4xl font-normal leading-[1.05] tracking-tight text-[#090909] whitespace-pre-line">
                  {WEBSITES_DATA.processIntro.heading}
                </h3>
              </div>
            </div>

            {/* Right Process Stages: 4 Columns with Alternating Cyan / Amber Numerals */}
            <div className="lg:col-span-8 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-6">
              {WEBSITES_DATA.processSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex flex-col justify-between pt-4 border-t border-[#C8C8C8] min-h-[180px]"
                >
                  <div>
                    {/* Alternating Accent Numeral */}
                    <div
                      className={`font-sans text-3xl sm:text-4xl font-light leading-none mb-3 ${
                        step.accent === 'cyan' ? 'text-[#17B8C2]' : 'text-[#F0AD37]'
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Title */}
                    <div className="text-[13px] font-medium tracking-editorial uppercase text-[#090909] mb-3">
                      {step.title}
                    </div>

                    {/* Step Description */}
                    <p className="text-xs sm:text-[13px] text-[#747474] font-normal leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Tiny Baseline Accent Indicator */}
                  <div
                    className={`w-6 h-[1.5px] mt-6 ${
                      step.accent === 'cyan' ? 'bg-[#17B8C2]' : 'bg-[#F0AD37]'
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
