import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Play, Pause } from 'lucide-react';
import { ArrowButton } from '../ui/ArrowButton';
import { HERO_DATA } from '../../data/portfolioData';

interface HeroSectionProps {
  onViewWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWork,
  onStartProject,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [currentSlide, setCurrentSlide] = useState(1);

  // Background slides / variations for the 01 / 03 indicator
  const slides = [
    {
      video: HERO_DATA.videoSrc,
      poster: HERO_DATA.posterImage,
      headline: 'Real estate,\nseen differently.',
      sub: 'Digital presence for properties worth noticing.',
    },
    {
      video: 'https://assets.mixkit.co/videos/47102/47102-720.mp4',
      poster: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
      headline: 'Villas crafted\nas destinations.',
      sub: 'Cinematic storytelling commanding premium bookings.',
    },
    {
      video: 'https://assets.mixkit.co/videos/47102/47102-720.mp4',
      poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      headline: 'Identity built\nfor top brokers.',
      sub: 'Personal brand systems that turn authority into listings.',
    },
  ];

  const activeSlide = slides[currentSlide - 1];

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
  }, [currentSlide]);

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
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-dvh flex flex-col justify-between overflow-hidden select-none bg-[#090909]"
    >
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          key={activeSlide.video + currentSlide}
          src={activeSlide.video}
          poster={activeSlide.poster}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover object-[55%_center]"
        />
        {/* Soft editorial contrast gradient overlay to guarantee WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 w-full max-w-[1792px] mx-auto px-6 sm:px-12 lg:px-16 pt-[clamp(4.5rem,14vh,10rem)] flex-1 flex flex-col justify-between pb-[clamp(2rem,7vh,6rem)]">
        {/* Top Eyebrow & Display Headline Block */}
        <div className="max-w-[920px]">
          {/* Introductory Eyebrow */}
          <div className="text-[10px] sm:text-[10px] lg:text-[clamp(0.5rem,1.5vh,15px)] font-medium tracking-editorial uppercase text-white/70 whitespace-pre-line leading-relaxed mb-[clamp(1.25rem,5vh,3rem)] mt-5">
            {HERO_DATA.eyebrow}
          </div>

          {/* Main Two-Line Display Heading */}
          <h1 className="text-white text-[4rem] sm:text-[4rem] lg:text-[clamp(4.5rem,min(9vw,12.5vh),120px)] font-light leading-[0.94] tracking-tight-display whitespace-pre-line break-words mb-[clamp(1rem,2.8vh,2rem)] drop-shadow-xs">
            {activeSlide.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-white/95 text-[18px] sm:text-xl lg:text-[clamp(1.5rem,3.2vh,32px)] font-light leading-snug tracking-normal max-w-[720px] mb-[clamp(1.5rem,4.2vh,3rem)]">
            {activeSlide.sub}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row  items-start sm:items-center gap-4 sm:gap-6">
            <ArrowButton
              id="hero-cta-work"
              variant="white"
              onClick={onViewWork}
              className="!min-h-[40px] sm:!min-h-[40px] !min-w-0 !px-5 sm:!px-6 !w-[195px] sm:!w-[225px]"
            >
              VIEW OUR WORK
            </ArrowButton>

            <ArrowButton
              id="hero-cta-project"
              variant="outlineLight"
              onClick={onStartProject}
              className="!min-h-[40px] sm:!min-h-[40px] !min-w-0 !px-5 sm:!px-6 !w-[195px] sm:!w-[225px]"
            >
              START A PROJECT
            </ArrowButton>
          </div>
        </div>

        {/* Bottom-Left Trust Statement */}
        <div className="mt-[clamp(0.5rem,2vh,1.5rem)]">
          <p className="text-white/90 text-[10px] sm:text-[11px] lg:text-[clamp(0.62rem,1.1vh,13px)] font-medium tracking-editorial uppercase leading-relaxed max-w-[420px]">
            {HERO_DATA.trustStatement}
          </p>
        </div>
      </div>

      {/* Right Editorial Rail (Desktop) */}
      <aside
        aria-label="Editorial slide selection"
        className="hidden lg:flex absolute right-8 xl:right-16 top-40 bottom-32 z-10 flex-col justify-between items-end select-none"
      >
        <div className="flex flex-col items-end gap-0.5 text-[13px] font-medium tracking-editorial uppercase text-white/70 text-right">
          {HERO_DATA.slogan.map((word) => (
            <div key={word}>{word}</div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-white/40" />

          {/* Current / Total Slide Indicator */}
          <button
            type="button"
            onClick={() => setCurrentSlide((currentSlide % slides.length) + 1)}
            aria-label={`Slide ${currentSlide} of ${slides.length}, click for next`}
            className="flex flex-col items-center gap-3 cursor-pointer"
          >
            <span className="font-sans text-white text-base font-semibold">
              0{currentSlide}
            </span>
            <div className="w-[1px] h-6 bg-white/40" />
            <span className="font-sans text-white/40 text-xs">
              0{slides.length}
            </span>
          </button>

          <div className="w-[1px] h-16 bg-white/40" />
        </div>
      </aside>

      {/* Bottom Video Controls Bar (Accessible & Functional) */}
      <div 
        role="region"
        aria-label="Video playback controls"
        className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-3 sm:py-4 flex items-center justify-between gap-4 text-white text-xs select-none"
      >
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="flex items-center gap-2 text-white/90 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white p-1 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Play className="w-4 h-4 fill-white" strokeWidth={1.5} />
          )}
          <span className="font-mono tracking-wider hidden sm:inline">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </button>

        {/* Seekable Progress Bar */}
        <div
          role="slider"
          aria-label="Video timeline progress"
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(currentTime)}
          onClick={handleSeek}
          className="flex-1 mx-4 sm:mx-8 h-6 flex items-center cursor-pointer group"
        >
          <div className="relative w-full h-[2px] bg-white/50 group-hover:h-[4px] transition-all">
            <div
              className="absolute left-0 top-0 bottom-0 bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Audio Mute / Unmute & Fullscreen */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="text-white/80 hover:text-white p-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Volume2 className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="text-white/80 hover:text-white p-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};
