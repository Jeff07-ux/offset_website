import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';
import { SectionIdentity } from '../ui/SectionIdentity';
import { EditorialSlogan } from '../ui/EditorialSlogan';
import { MediaPlayButton } from '../ui/MediaPlayButton';
import { REALTOR_DATA } from '../../data/portfolioData';

interface RealtorSectionProps {
  onWatchStory: () => void;
}

export const RealtorSection: React.FC<RealtorSectionProps> = ({
  onWatchStory,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPortraitPlaying, setIsPortraitPlaying] = useState(false);

  const galleryItems = REALTOR_DATA.gallery;
  const currentItem = galleryItems[selectedIdx];
  const secondaryItem = galleryItems[(selectedIdx + 1) % galleryItems.length];

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="realtors"
      className="relative w-full bg-white pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden border-b border-[#C8C8C8]/60"
    >
      <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Top Header Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-[#C8C8C8]">
          <SectionIdentity
            number={REALTOR_DATA.number}
            label={REALTOR_DATA.label}
            accent="cyan"
            ruleColor="bg-[#052DC8]"
          />
          <EditorialSlogan
            lines={REALTOR_DATA.slogan}
            theme="dark"
            rulePosition="right"
          />
        </div>

        {/* Main Composition: Left Portrait Column + Right Editorial Content & Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 sm:pt-16 items-start">
          {/* Left Column: Vertical Rail & Portrait Video Poster */}
          <div className="lg:col-span-4 xl:col-span-4 flex gap-4 sm:gap-6">
            {/* Architectural Vertical Rail (Desktop) */}
            <div className="hidden sm:flex flex-col items-center justify-between py-2 select-none">
              <span className="text-xs font-mono font-medium tracking-widest text-[#090909]">
                {REALTOR_DATA.counter}
              </span>
              <div className="w-[1px] h-32 bg-[#C8C8C8]" />
              <span className="text-[11px] font-medium tracking-editorial uppercase text-[#747474] [writing-mode:vertical-rl] rotate-180">
                {REALTOR_DATA.verticalLabel}
              </span>
            </div>

            {/* Portrait Video Card */}
            <div className="relative flex-1 aspect-[9/16] max-h-[760px] bg-neutral-900 overflow-hidden shadow-xs group">
              <img
                src={REALTOR_DATA.portraitVideo.poster}
                alt="Realtor presenting modern architectural property in contemporary timber kitchen"
                loading="lazy"
                className="w-full h-full object-cover brightness-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

              {/* Centered Circular Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <MediaPlayButton
                  id="realtor-portrait-play"
                  isPlaying={isPortraitPlaying}
                  onToggle={() => {
                    setIsPortraitPlaying(!isPortraitPlaying);
                    onWatchStory();
                  }}
                  size="md"
                  label="Play realtor brand film"
                />
              </div>

              {/* Bottom Caption and Duration */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white select-none">
                <div>
                  <div className="w-8 h-[1px] bg-white/80 mb-2" />
                  <div className="text-xs sm:text-[13px] font-medium tracking-editorial uppercase leading-tight">
                    {REALTOR_DATA.portraitVideo.caption}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-[1px] bg-white/60" />
                  <span className="font-mono text-xs text-white/90">
                    {REALTOR_DATA.portraitVideo.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Main Region: Headlines, Opportunity Panel, Capabilities & Gallery */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between">
            {/* Top Row: Headline / Copy & Opportunity Panel */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start mb-10 sm:mb-12">
              <div className="xl:col-span-8">
                <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[0.98] tracking-tight text-[#090909] whitespace-pre-line mb-6">
                  {REALTOR_DATA.headline}
                </h2>
                <p className="text-lg sm:text-2xl text-[#323232] font-light leading-snug whitespace-pre-line max-w-[560px]">
                  {REALTOR_DATA.supporting}
                </p>

                {/* Capabilities Sub-Row with Vertical Dividers */}
                <div className="flex items-center gap-6 sm:gap-8 mt-8 pt-4 border-t border-[#C8C8C8]">
                  {REALTOR_DATA.capabilities.map((cap, i) => (
                    <div key={cap} className="flex items-center gap-6 sm:gap-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] sm:text-[13px] font-medium tracking-editorial uppercase text-[#090909]">
                          {cap}
                        </span>
                        <div className="w-6 h-[1px] bg-[#052DC8]" />
                      </div>
                      {i < REALTOR_DATA.capabilities.length - 1 && (
                        <div className="w-[1px] h-4 bg-[#C8C8C8]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunity Panel (Amber Box at Upper-Right) */}
              <div className="xl:col-span-4 bg-[#F0AD37] p-6 sm:p-8 flex flex-col justify-between min-h-[220px] select-none shadow-xs">
                <div>
                  <div className="text-2xl sm:text-3xl font-medium tracking-tight text-[#090909] leading-tight">
                    {REALTOR_DATA.opportunityPanel.words.map((w, idx) => (
                      <div key={idx}>{w}</div>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t border-[#090909]">
                  <div className="text-[11px] font-medium tracking-editorial uppercase text-[#090909]/80">
                    {REALTOR_DATA.opportunityPanel.supporting.join(' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Images Row: Two Large Landscape Views */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
              {/* Primary Image: The Property */}
              <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden shadow-xs group">
                <img
                  src={currentItem.image}
                  alt={currentItem.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#090909] text-[10px] font-medium tracking-editorial uppercase px-2.5 py-1">
                  THE PROPERTY · {currentItem.title}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium tracking-editorial uppercase bg-black/60 px-3 py-1.5 backdrop-blur-xs truncate">
                  {currentItem.caption}
                </div>
              </div>

              {/* Secondary Image: The Lifestyle */}
              <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden shadow-xs group">
                <img
                  src={secondaryItem.image}
                  alt={secondaryItem.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#090909] text-[10px] font-medium tracking-editorial uppercase px-2.5 py-1">
                  THE LIFESTYLE · {secondaryItem.title}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium tracking-editorial uppercase bg-black/60 px-3 py-1.5 backdrop-blur-xs truncate">
                  {secondaryItem.caption}
                </div>
              </div>
            </div>

            {/* Interactive Thumbnail Strip with Selected Cobalt Border & Timeline */}
            <div className="mt-6 pt-4 border-t border-[#C8C8C8]">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] font-medium tracking-editorial uppercase text-[#747474]">
                  SERIES ASSETS ({selectedIdx + 1} / {galleryItems.length})
                </div>

                {/* Left / Right Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous gallery image"
                    className="w-8 h-8 flex items-center justify-center border border-[#C8C8C8] hover:border-[#052DC8] hover:text-[#052DC8] text-[#090909] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next gallery image"
                    className="w-8 h-8 flex items-center justify-center border border-[#C8C8C8] hover:border-[#052DC8] hover:text-[#052DC8] text-[#090909] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={`Select ${item.title}`}
                    aria-current={selectedIdx === idx ? 'true' : 'false'}
                    className={`relative aspect-[16/10] overflow-hidden bg-neutral-200 transition-all cursor-pointer ${
                      selectedIdx === idx
                        ? 'border-[3px] border-[#052DC8] scale-[1.02]'
                        : 'border border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Timeline Progress Line with Evenly Distributed Ticks */}
              <div className="relative w-full h-[2px] bg-[#C8C8C8] mt-6 flex justify-between items-center">
                {galleryItems.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-[2px] h-3 transition-colors ${
                      idx === selectedIdx ? 'bg-[#052DC8] h-4' : 'bg-[#C8C8C8]'
                    }`}
                  />
                ))}
                {/* Active Cobalt Progress Segment */}
                <div
                  className="absolute top-0 left-0 bottom-0 bg-[#052DC8] transition-all duration-300"
                  style={{
                    width: `${((selectedIdx + 1) / galleryItems.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Bottom Primary CTA & Supporting Statement */}
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <ArrowButton
                id="realtor-watch-story-btn"
                variant="cobalt"
                onClick={onWatchStory}
              >
                {REALTOR_DATA.ctaText}
              </ArrowButton>

              <div className="text-[11px] font-medium tracking-editorial uppercase text-[#747474] leading-relaxed">
                {REALTOR_DATA.supportingStatement}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
