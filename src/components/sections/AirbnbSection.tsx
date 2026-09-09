import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';
import { SectionIdentity } from '../ui/SectionIdentity';
import { EditorialSlogan } from '../ui/EditorialSlogan';
import { AIRBNB_DATA } from '../../data/portfolioData';

interface AirbnbSectionProps {
  onOpenCaseStudy: (id: string) => void;
}

export const AirbnbSection: React.FC<AirbnbSectionProps> = ({
  onOpenCaseStudy,
}) => {
  return (
    <section
      id="services"
      className="relative w-full bg-white pt-24 sm:pt-32 pb-20 sm:pb-28 overflow-hidden border-b border-[#C8C8C8]/60"
    >
      <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Top Header Rail: Section Identity & Editorial Slogan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-[#C8C8C8]">
          <SectionIdentity
            number={AIRBNB_DATA.number}
            label={AIRBNB_DATA.label}
            accent="cyan"
            ruleColor="bg-[#E35D43]"
          />
          <EditorialSlogan
            lines={AIRBNB_DATA.slogan}
            theme="dark"
            rulePosition="right"
          />
        </div>

        {/* Main Editorial Grid: Left Copy & Right Asymmetric Image Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-12 sm:pt-16 items-start">
          {/* Left Content Column (approx 4-5 cols on 12-col grid) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between h-full pr-0 lg:pr-8">
            <div>
              {/* Display Headline */}
              <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-medium leading-[0.98] tracking-tight text-[#090909] whitespace-pre-line mb-6 sm:mb-8">
                {AIRBNB_DATA.headline}
              </h2>

              {/* Supporting Editorial Paragraph */}
              <p className="text-xl sm:text-2xl text-[#323232] font-light leading-snug whitespace-pre-line mb-8 sm:mb-10 max-w-[440px]">
                {AIRBNB_DATA.supporting}
              </p>

              {/* Case Study Metadata */}
              <div className="text-[11px] sm:text-[12px] font-medium tracking-editorial uppercase text-[#747474] mb-8 pb-3 border-b border-[#C8C8C8] inline-block">
                {AIRBNB_DATA.metadata}
              </div>

              {/* Primary Section CTA */}
              <div>
                <ArrowButton
                  id="airbnb-case-study-btn"
                  variant="outlineDark"
                  onClick={() => onOpenCaseStudy('villa-marrakech')}
                >
                  {AIRBNB_DATA.ctaText}
                </ArrowButton>
              </div>
            </div>

            {/* Handwritten Editorial Accent Note (More memorable stays) */}
            <div className="mt-12 lg:mt-24 relative pl-4 select-none">
              <div className="w-12 h-[2px] bg-[#E35D43] mb-3" />
              <div className="font-editorial-script text-4xl sm:text-5xl lg:text-[52px] text-[#E35D43] leading-[1.05] -rotate-3">
                More<br />memorable<br />stays
              </div>
            </div>
          </div>

          {/* Right Visual Composition: Interlocking Asymmetric Collage with Backing Blocks */}
          <div className="lg:col-span-8 xl:col-span-8 relative min-h-[480px] sm:min-h-[620px] lg:min-h-[720px]">
            {/* Background Accent Rectangles (Pure editorial shapes) */}
            {/* Cyan Backing Block */}
            <div 
              aria-hidden="true" 
              className="absolute top-4 left-4 sm:top-8 sm:left-8 w-48 sm:w-80 h-48 sm:h-80 bg-[#17B8C2] -z-10" 
            />
            {/* Coral Backing Block */}
            <div 
              aria-hidden="true" 
              className="absolute bottom-6 right-2 sm:bottom-12 sm:right-6 w-44 sm:w-72 h-44 sm:h-72 bg-[#E35D43] -z-10" 
            />

            {/* Main Center Image: Blue Bedroom */}
            <div className="relative z-10 w-full sm:w-[76%] lg:w-[68%] aspect-[4/3] bg-neutral-100 overflow-hidden shadow-xs">
              <img
                src={AIRBNB_DATA.images.blueBedroom}
                alt="Villa Marrakech architectural master suite with blue linen styling and morning light"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] tracking-editorial uppercase px-2.5 py-1">
                IMG_6017 · BEDROOM ATMOSPHERE
              </div>
            </div>

            {/* Top-Right Overlapping Image: Yellow Bedroom */}
            <div className="relative sm:absolute sm:top-0 sm:right-0 z-20 w-full sm:w-[50%] lg:w-[46%] aspect-[16/10] mt-6 sm:mt-0 bg-neutral-100 overflow-hidden border-4 border-white shadow-xs">
              <img
                src={AIRBNB_DATA.images.yellowBedroom}
                alt="Sunlit guest bedroom with warm amber ochre tones"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] tracking-editorial uppercase px-2.5 py-1">
                IMG_8245 · MORNING LIGHT
              </div>
            </div>

            {/* Bottom-Right Overlapping Image: Breakfast Morning Spread */}
            <div className="relative sm:absolute sm:bottom-0 sm:right-10 z-20 w-full sm:w-[44%] lg:w-[40%] aspect-[1/1] mt-6 sm:mt-0 bg-neutral-100 overflow-hidden border-4 border-white shadow-xs">
              <img
                src={AIRBNB_DATA.images.breakfast}
                alt="Curated Mediterranean breakfast table with fresh fruit and espresso"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] tracking-editorial uppercase px-2.5 py-1">
                IMG_4592 · LIFESTYLE TABLEAU
              </div>
            </div>
          </div>
        </div>

        {/* Value Sequence Row: 01 Capture Attention -> 02 Build Desire -> 03 Drive Bookings */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-[#C8C8C8] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 lg:gap-14 w-full md:w-auto">
            {AIRBNB_DATA.steps.map((step, idx) => (
              <React.Fragment key={step.number}>
                <div className="flex items-baseline gap-3">
                  <span className="font-sans text-2xl sm:text-3xl font-light text-[#17B8C2]">
                    {step.number}
                  </span>
                  <span className="text-[12px] sm:text-[13px] font-medium tracking-editorial uppercase text-[#090909]">
                    {step.label}
                  </span>
                </div>
                {idx < AIRBNB_DATA.steps.length - 1 && (
                  <ArrowRight 
                    className="w-4 h-4 text-[#E35D43] hidden sm:block shrink-0" 
                    strokeWidth={1.5} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-[11px] font-medium tracking-editorial uppercase text-[#747474] flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#E35D43]" />
            <span>MEASURABLE OCCUPANCY GROWTH</span>
          </div>
        </div>

        {/* Bottom Editorial Rail with Coral Rules */}
        <div className="mt-10 pt-6 border-t border-[#C8C8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-medium tracking-editorial uppercase text-[#323232]">
          <div className="flex items-center gap-3">
            <span className="w-4 h-[2px] bg-[#E35D43]" />
            <span>{AIRBNB_DATA.bottomLeft}</span>
          </div>
          <div>
            <span>{AIRBNB_DATA.bottomRight}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
