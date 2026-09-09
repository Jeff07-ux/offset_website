import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';
import { SectionIdentity } from '../ui/SectionIdentity';
import { EditorialSlogan } from '../ui/EditorialSlogan';
import { MediaPlayButton } from '../ui/MediaPlayButton';
import { BRANDED_VILLAS_DATA } from '../../data/portfolioData';

interface BrandedVillasSectionProps {
  onExploreFilms: () => void;
}

export const BrandedVillasSection: React.FC<BrandedVillasSectionProps> = ({
  onExploreFilms,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(88); // 1:28 default

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="villas"
      className="relative w-full bg-white pt-24 sm:pt-32 pb-24 sm:pb-32 overflow-hidden border-b border-[#C8C8C8]/60"
    >
      <div className="w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Top Header Rail */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 sm:pb-16 border-b border-[#C8C8C8]">
          <SectionIdentity
            number={BRANDED_VILLAS_DATA.number}
            label={BRANDED_VILLAS_DATA.label.replace('\n', ' ')}
            accent="cyan"
            ruleColor="bg-[#008F98]"
          />
          <EditorialSlogan
            lines={BRANDED_VILLAS_DATA.slogan}
            theme="dark"
            rulePosition="right"
          />
        </div>

        {/* Section Intro: Headline, Copy, Capabilities & CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 sm:pt-16 pb-12 items-end">
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-normal leading-[0.98] tracking-tight text-[#090909] whitespace-pre-line mb-6">
              {BRANDED_VILLAS_DATA.headline}
            </h2>
            <p className="text-lg sm:text-2xl text-[#323232] font-light leading-snug whitespace-pre-line max-w-[620px]">
              {BRANDED_VILLAS_DATA.supporting}
            </p>
          </div>

          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start lg:items-end justify-between gap-8">
            {/* Capability navigation with cyan diagonal slashes */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] sm:text-[12px] font-medium tracking-editorial uppercase text-[#090909]">
              {BRANDED_VILLAS_DATA.capabilities.map((cap, i) => (
                <React.Fragment key={cap}>
                  <span>{cap}</span>
                  {i < BRANDED_VILLAS_DATA.capabilities.length - 1 && (
                    <span className="text-[#17B8C2] font-light">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Primary Teal CTA */}
            <ArrowButton
              id="villas-explore-btn"
              variant="teal"
              onClick={onExploreFilms}
            >
              {BRANDED_VILLAS_DATA.ctaText}
            </ArrowButton>
          </div>
        </div>

        {/* Desktop Media Grid: Left Rail + Large Main Video (~55%) + 2 Portrait Detail Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-4 items-stretch">
          {/* Left Narrow Rail (Desktop) */}
          <div className="hidden xl:flex xl:col-span-1 flex-col justify-between items-center py-4 select-none border-r border-[#C8C8C8]/60 pr-4">
            <span className="text-xs font-mono font-medium tracking-widest text-[#090909]">
              {BRANDED_VILLAS_DATA.number}
            </span>
            <div className="w-[1px] h-36 bg-[#C8C8C8]" />
            <span className="text-[10px] font-medium tracking-editorial uppercase text-[#747474] [writing-mode:vertical-rl] rotate-180">
              {BRANDED_VILLAS_DATA.slogan.join(' · ')}
            </span>
          </div>

          {/* Main Cinema Video Box (~55% width / 7 columns on xl grid) */}
          <div className="lg:col-span-7 xl:col-span-7 relative aspect-[16/10] bg-neutral-900 overflow-hidden shadow-xs group">
            <video
              ref={videoRef}
              src={BRANDED_VILLAS_DATA.mainVideo.videoUrl}
              poster={BRANDED_VILLAS_DATA.mainVideo.poster}
              playsInline
              loop
              muted={isMuted}
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

            {/* Centered Circular Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MediaPlayButton
                id="branded-villa-main-play"
                isPlaying={isPlaying}
                onToggle={togglePlay}
                size="lg"
                label="Play branded villa hero film"
              />
            </div>

            {/* Video Control Bar at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-2 select-none">
              <div className="flex items-center justify-between text-white text-xs">
                <span className="font-mono tracking-wider">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="hover:opacity-80 p-1 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="hover:opacity-80 p-1 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full h-[2px] bg-white/30 relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#008F98]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Image Columns: 2 Portrait Crops (Textures & Details) */}
          <div className="lg:col-span-5 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-6">
            {BRANDED_VILLAS_DATA.detailImages.map((detail, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] sm:aspect-[9/14] bg-neutral-100 overflow-hidden shadow-xs group"
              >
                <img
                  src={detail.image}
                  alt={detail.captionLines.join(' ')}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                {/* White Uppercase Caption with Short White Rule */}
                <div className="absolute bottom-6 left-6 right-6 text-white select-none">
                  <div className="w-6 h-[1px] bg-white mb-2" />
                  <div className="text-[11px] sm:text-xs font-medium tracking-editorial uppercase leading-snug">
                    {detail.captionLines[0]}<br />{detail.captionLines[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Rail: Villas for a Brighter Tomorrow / Architecture Content Impact */}
        <div className="mt-14 pt-8 border-t border-[#C8C8C8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] font-medium tracking-editorial uppercase text-[#323232]">
          <div>
            <span>{BRANDED_VILLAS_DATA.bottomLeft}</span>
          </div>

          <div className="hidden md:block flex-1 mx-8 h-[1px] bg-[#C8C8C8]" />

          <div className="flex items-center gap-3">
            <span>{BRANDED_VILLAS_DATA.bottomRight}</span>
            <span className="w-8 h-[1px] bg-[#008F98]" />
          </div>
        </div>
      </div>
    </section>
  );
};
