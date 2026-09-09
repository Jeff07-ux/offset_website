import React from 'react';

interface MediaPlayButtonProps {
  isPlaying?: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
  id?: string;
}

export const MediaPlayButton: React.FC<MediaPlayButtonProps> = ({
  isPlaying = false,
  onToggle,
  size = 'md',
  label = 'Play video',
  className = '',
  id,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6 sm:w-7 sm:h-7',
    lg: 'w-8 h-8',
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause video' : label}
      className={`group relative flex items-center justify-center rounded-full border border-white/80 bg-black/25 backdrop-blur-[2px] text-white transition-all duration-200 hover:scale-105 hover:bg-black/40 hover:border-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none cursor-pointer ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <div className="flex gap-1.5 items-center justify-center">
          <span className="w-1.5 h-6 bg-white rounded-none" />
          <span className="w-1.5 h-6 bg-white rounded-none" />
        </div>
      ) : (
        <svg
          className={`${iconSizes[size]} translate-x-0.5 fill-current text-white transition-transform duration-200 group-hover:scale-110`}
          viewBox="0 0 24 24"
        >
          <path d="M7 4.5v15l13-7.5L7 4.5z" />
        </svg>
      )}
    </button>
  );
};
