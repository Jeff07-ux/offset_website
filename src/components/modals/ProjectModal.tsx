import React, { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../../types';

interface ProjectModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onInquire: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  caseStudy,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    if (!caseStudy) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
    >
      <div 
        className="relative w-full max-w-5xl bg-white text-[#090909] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#C8C8C8] bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-medium tracking-editorial uppercase text-[#17B8C2]">
              CASE STUDY ARCHIVE
            </span>
            <div className="w-8 h-[1px] bg-[#C8C8C8]" />
            <span className="text-xs font-mono tracking-wider text-[#747474]">
              {caseStudy.client}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer text-[#090909]"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto space-y-10">
          {/* Main Hero Media */}
          <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden shadow-xs">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-medium tracking-editorial uppercase text-[#17B8C2] block mb-2">
                {caseStudy.category}
              </span>
              <h3 id="case-study-title" className="text-3xl sm:text-5xl font-light tracking-tight">
                {caseStudy.title}
              </h3>
            </div>
          </div>

          {/* Project Details & Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Description & Deliverables */}
            <div className="lg:col-span-8 space-y-6">
              <h4 className="text-xl font-medium tracking-tight text-[#090909]">
                Strategic Execution
              </h4>
              <p className="text-base sm:text-lg text-[#323232] font-light leading-relaxed">
                {caseStudy.description}
              </p>

              <div className="pt-6 border-t border-[#C8C8C8]">
                <h5 className="text-xs font-medium tracking-editorial uppercase text-[#747474] mb-4">
                  STUDIO DELIVERABLES
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {caseStudy.deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-[#090909]">
                      <div className="w-4 h-4 rounded-none bg-[#17B8C2]/15 text-[#17B8C2] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" strokeWidth={2} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Performance Stats */}
            {caseStudy.stats && (
              <div className="lg:col-span-4 bg-[#FCFBF8] border border-[#C8C8C8] p-6 space-y-6">
                <div className="text-xs font-medium tracking-editorial uppercase text-[#090909] border-b border-[#C8C8C8] pb-3">
                  PROVEN RESULTS
                </div>
                {caseStudy.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-3xl sm:text-4xl font-light text-[#052DC8]">
                      {stat.value}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-editorial text-[#747474] mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gallery Cutdowns */}
          {caseStudy.secondaryImages && caseStudy.secondaryImages.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-[#C8C8C8]">
              <div className="text-xs font-medium tracking-editorial uppercase text-[#747474]">
                SELECTED ARCHIVE FRAMES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {caseStudy.secondaryImages.map((img, i) => (
                  <div key={i} className="aspect-[4/3] bg-neutral-100 overflow-hidden shadow-xs">
                    <img
                      src={img}
                      alt={`Archive frame ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#C8C8C8]">
            <div className="text-xs font-medium tracking-editorial uppercase text-[#747474]">
              COMMISSION A SIMILAR CAMPAIGN
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onInquire();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#052DC8] hover:bg-[#0424a1] text-white px-8 py-4 text-xs font-medium tracking-button uppercase cursor-pointer transition-colors"
            >
              <span>INQUIRE ABOUT THIS SERVICE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
