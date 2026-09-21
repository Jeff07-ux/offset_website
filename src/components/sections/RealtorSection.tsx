import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaPlayButton } from '../ui/MediaPlayButton';
import { REALTOR_DATA } from '../../data/portfolioData';

interface RealtorSectionProps {
  onWatchStory: () => void;
}

/*
 * Desktop (lg, >=1024px) replicates the 1672x941 design sheet: every element is placed with the
 * comp-scale utilities from globals.css (`u-left-602` = 602px of the comp, scaled with the viewport).
 * Below lg the section stacks in normal flow.
 */
const CAP_LEFT = ['lg:u-left-603', 'lg:u-left-859', 'lg:u-left-1115'];
const DIVIDER_LEFT = ['lg:u-left-787', 'lg:u-left-1043'];
const THUMB_BOX = [
  'lg:u-left-619 lg:u-w-107',
  'lg:u-left-730 lg:u-w-102',
  'lg:u-left-838 lg:u-w-117',
  'lg:u-left-961 lg:u-w-115',
  'lg:u-left-1083 lg:u-w-116',
];
const TICK_LEFT = ['16.5%', '33.4%', '50.2%', '67.1%', '83.6%'];

export const RealtorSection: React.FC<RealtorSectionProps> = ({
  onWatchStory,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPortraitPlaying, setIsPortraitPlaying] = useState(false);

  const galleryItems = REALTOR_DATA.gallery;
  const currentItem = galleryItems[selectedIdx];
  const secondaryItem = galleryItems[(selectedIdx + 1) % galleryItems.length];
  const [primaryLabel, secondaryLabel] = REALTOR_DATA.imageLabels;

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const microLabel =
    'text-[11px] font-medium uppercase tracking-editorial lg:u-text-11.5 lg:u-lh-17';

  return (
    <section
      id="realtors"
      className="relative w-full overflow-hidden bg-white px-6 pb-24 pt-28 sm:px-12 lg:flex lg:min-h-screen lg:items-center lg:p-0"
    >
      <div className="relative mx-auto flex w-full max-w-[720px] flex-col gap-10 lg:mx-0 lg:block lg:u-h-941 lg:max-w-none">
        {/* Architectural vertical rail (desktop): counter, rule, section name */}
        <span className="hidden select-none text-[#090909] [writing-mode:vertical-rl] rotate-180 lg:block lg:absolute lg:u-left-34.5 lg:u-top-268 lg:u-text-13 lg:u-lh-12 font-medium tracking-[0.25em]">
          {REALTOR_DATA.counter}
        </span>
        <span className="hidden bg-[#3a3a3a] lg:block lg:absolute lg:u-left-42 lg:u-top-349 lg:u-w-1 lg:u-h-47" />
        <span className="hidden select-none text-[#090909] [writing-mode:vertical-rl] rotate-180 lg:block lg:absolute lg:u-left-34.5 lg:u-top-781 lg:u-text-13 lg:u-lh-12 font-medium uppercase tracking-[0.345em]">
          {REALTOR_DATA.verticalLabel}
        </span>

        {/* Portrait video card */}
        <div className="group relative aspect-[9/16] w-full max-h-[760px] overflow-hidden bg-neutral-900 lg:absolute lg:u-left-86 lg:u-top-84 lg:u-w-464 lg:u-h-818 lg:aspect-auto lg:max-h-none">
          <img
            src={REALTOR_DATA.portraitVideo.poster}
            alt="Realtor presenting a modern property in a contemporary timber kitchen"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center lg:block">
            <MediaPlayButton
              id="realtor-portrait-play"
              isPlaying={isPortraitPlaying}
              onToggle={() => {
                setIsPortraitPlaying(!isPortraitPlaying);
                onWatchStory();
              }}
              size="md"
              label="Play realtor brand film"
              className="lg:absolute lg:u-left-191.5 lg:u-top-366.5 lg:u-w-89 lg:u-h-89 lg:bg-transparent lg:backdrop-blur-none"
            />
          </div>

          <div className="pointer-events-none absolute bottom-6 left-6 select-none text-[12px] font-medium uppercase leading-tight tracking-editorial text-white whitespace-pre-line [text-shadow:0_1px_14px_rgba(0,0,0,.5)] lg:bottom-auto lg:left-auto lg:u-left-33 lg:u-top-737 lg:u-text-12.5 lg:u-lh-23 lg:tracking-[0.41em]">
            {REALTOR_DATA.portraitVideo.caption}
          </div>
          <div className="pointer-events-none absolute bottom-6 right-6 flex select-none items-center gap-3 text-white [text-shadow:0_1px_14px_rgba(0,0,0,.5)] lg:bottom-auto lg:right-auto lg:u-left-309 lg:u-top-763 lg:u-w-123 lg:gap-0 lg:justify-between">
            <span className="h-[1px] w-8 bg-white/70 lg:u-w-62" />
            <span className="font-mono text-xs tracking-widest lg:u-text-12.5 lg:u-lh-16 lg:tracking-[0.18em]">
              {REALTOR_DATA.portraitVideo.duration}
            </span>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="m-0 text-[11px] font-medium uppercase tracking-editorial text-[#747474] lg:tracking-[0.295em] lg:absolute lg:u-left-603 lg:u-top-114 lg:u-text-12.5 lg:u-lh-20 lg:whitespace-nowrap">
          <span className="text-[#052DC8]">{REALTOR_DATA.number}.</span> {REALTOR_DATA.label}
        </p>

        {/* Headline + supporting copy */}
        <div className="lg:contents">
          <h2 className="m-0 whitespace-pre-line text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-[#090909] sm:text-6xl lg:absolute lg:u-left-603 lg:u-top-158.5 lg:u-text-55 lg:u-lh-54 lg:tracking-[0.06em]">
            {REALTOR_DATA.headline}
          </h2>
          <p className="m-0 mt-5 whitespace-pre-line text-lg font-light leading-snug text-[#4a4a4a] sm:text-2xl lg:absolute lg:mt-0 lg:u-left-603 lg:u-top-291 lg:u-text-23 lg:u-lh-30 lg:tracking-[0.015em]">
            {REALTOR_DATA.supporting}
          </p>
        </div>

        {/* Capabilities with dividers */}
        <div className="-mt-4 flex flex-wrap gap-x-8 gap-y-4 lg:contents">
          {REALTOR_DATA.capabilities.map((cap, i) => (
            <div key={cap} className={`flex flex-col gap-2 lg:absolute lg:u-top-380 ${CAP_LEFT[i]}`}>
              <span className="text-[12px] font-medium uppercase tracking-editorial text-[#090909] lg:tracking-[0.29em] lg:u-text-12.5 lg:u-lh-20 lg:whitespace-nowrap">
                {cap}
              </span>
              <span className="h-[2px] w-3 bg-[#090909] lg:mt-[calc(var(--u)*8)] lg:u-w-13" />
            </div>
          ))}
          {DIVIDER_LEFT.map((cls) => (
            <span key={cls} className={`hidden bg-[#c8c8c8] lg:block lg:absolute lg:u-top-383 lg:u-w-1 lg:u-h-40 ${cls}`} />
          ))}
        </div>

        {/* Opportunity panel (bleeds to the right edge of the viewport on desktop) */}
        <div className="relative flex min-h-[220px] select-none flex-col justify-between bg-[#F0AD37] p-6 sm:p-8 lg:absolute lg:right-0 lg:u-top-96 lg:u-w-288 lg:u-h-337 lg:p-0">
          <div className="text-[15px] font-medium uppercase leading-[1.6] tracking-[0.22em] text-[#090909] lg:tracking-[0.26em] lg:absolute lg:u-left-49 lg:u-top-61 lg:u-text-15 lg:u-lh-24.3 lg:whitespace-nowrap">
            {REALTOR_DATA.opportunityPanel.words.map((w, idx) => (
              <div key={idx}>{w}</div>
            ))}
          </div>
          <span className="mt-6 block h-[1.5px] w-3 bg-[#090909] lg:absolute lg:mt-0 lg:u-left-49 lg:u-top-195 lg:u-w-13" />
          <div className="mt-6 text-[11px] font-medium uppercase leading-relaxed tracking-editorial text-[#090909]/45 lg:tracking-[0.36em] lg:absolute lg:mt-0 lg:u-left-48 lg:u-top-259 lg:u-text-11.5 lg:u-lh-20 lg:whitespace-nowrap">
            {REALTOR_DATA.opportunityPanel.supporting.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>

        {/* Gallery: two landscape views with their labels underneath */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:contents">
          <figure className="m-0 lg:absolute lg:u-left-602 lg:u-top-457 lg:u-w-474 lg:u-h-246">
            <div className="group relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto lg:h-full">
              <img
                src={currentItem.image}
                alt={currentItem.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className={`mt-3 text-[#6d6d6e] lg:absolute lg:left-0 lg:mt-0 lg:u-top-256 ${microLabel}`}>
              {primaryLabel}
            </figcaption>
          </figure>
          <figure className="m-0 lg:absolute lg:u-left-1090 lg:u-top-457 lg:u-w-498 lg:u-h-246">
            <div className="group relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto lg:h-full">
              <img
                src={secondaryItem.image}
                alt={secondaryItem.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className={`mt-3 text-[#6d6d6e] lg:absolute lg:left-0 lg:mt-0 lg:u-top-256 ${microLabel}`}>
              {secondaryLabel}
            </figcaption>
          </figure>
        </div>

        {/* Thumbnail strip, arrows and timeline */}
        <div className="lg:contents">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous gallery image"
            className="hidden cursor-pointer items-center justify-center text-[#090909] transition-colors hover:text-[#052DC8] lg:absolute lg:flex lg:u-left-583 lg:u-top-795 lg:u-w-24 lg:u-h-24"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next gallery image"
            className="hidden cursor-pointer items-center justify-center text-[#090909] transition-colors hover:text-[#052DC8] lg:absolute lg:flex lg:u-left-1214 lg:u-top-795 lg:u-w-24 lg:u-h-24"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 lg:contents">
            {galleryItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Select ${item.title}`}
                aria-current={selectedIdx === idx ? 'true' : 'false'}
                className={`relative aspect-[16/10] cursor-pointer overflow-hidden transition-all lg:absolute lg:u-top-764 lg:u-h-87 lg:aspect-auto ${THUMB_BOX[idx]} ${
                  selectedIdx === idx
                    ? 'bg-[#052DC8] p-[3px]'
                    : 'bg-neutral-200 hover:opacity-80'
                }`}
              >
                <img
                  src={item.thumb ?? item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Timeline: cobalt progress segment, grey rail, evenly spaced ticks */}
          <div className="relative mt-2 h-[2px] w-full bg-[#cacacb] lg:absolute lg:mt-0 lg:u-left-602 lg:u-top-877 lg:u-w-617 lg:u-h-2">
            <div
              className="absolute bottom-0 left-0 top-0 bg-[#052DC8] transition-all duration-300"
              style={{ width: `${(selectedIdx + 1) * 16.55}%` }}
            />
            {TICK_LEFT.map((left) => (
              <span
                key={left}
                className="absolute top-1/2 h-[6px] w-[1px] -translate-y-1/2 bg-[#b5b5b5] lg:h-[calc(var(--u)*9)]"
                style={{ left }}
              />
            ))}
          </div>
        </div>

        {/* Primary CTA and supporting statement */}
        <div className="flex flex-col items-start gap-5 lg:contents">
          <button
            id="realtor-watch-story-btn"
            type="button"
            onClick={onWatchStory}
            className="group flex min-h-[56px] w-full cursor-pointer items-center justify-between bg-[#052DC8] px-8 text-[12px] font-medium uppercase tracking-[0.3em] text-white outline-none transition-colors hover:bg-[#0424a1] focus-visible:ring-2 focus-visible:ring-[#17B8C2] focus-visible:ring-offset-2 sm:w-auto sm:min-w-[300px] lg:absolute lg:u-left-1285 lg:u-top-759 lg:u-w-304 lg:u-h-56 lg:min-w-0 lg:justify-start lg:px-0 lg:u-text-12.5"
          >
            <span className="lg:absolute lg:u-left-34 lg:u-top-19">{REALTOR_DATA.ctaText}</span>
            <svg
              className="ml-6 h-[10px] w-[28px] shrink-0 transition-transform duration-200 group-hover:translate-x-1.5 lg:absolute lg:ml-0 lg:u-left-244 lg:u-top-23 lg:u-w-28"
              viewBox="0 0 28 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <path d="M0 5H27M23 1.5L27 5l-4 3.5" />
            </svg>
          </button>

          <div className="flex flex-col gap-3 lg:contents">
            <span className="h-[1.5px] w-3 bg-[#6d6e6f] lg:absolute lg:u-left-1286 lg:u-top-834 lg:u-w-13" />
            <p className="m-0 whitespace-pre-line text-[11px] font-medium uppercase tracking-editorial text-[#6d6e6f] lg:absolute lg:u-left-1286 lg:u-top-850 lg:u-text-11 lg:u-lh-17 lg:tracking-[0.3em]">
              {REALTOR_DATA.supportingStatement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
