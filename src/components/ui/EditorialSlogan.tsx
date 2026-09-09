import React from 'react';

interface EditorialSloganProps {
  lines: string[];
  orientation?: 'horizontal' | 'vertical';
  rulePosition?: 'left' | 'right' | 'bottom' | 'none';
  theme?: 'dark' | 'light' | 'white';
  className?: string;
}

export const EditorialSlogan: React.FC<EditorialSloganProps> = ({
  lines,
  orientation = 'horizontal',
  rulePosition = 'left',
  theme = 'dark',
  className = '',
}) => {
  const textColors = {
    dark: 'text-[#090909]',
    light: 'text-[#747474]',
    white: 'text-white',
  };

  const ruleColors = {
    dark: 'bg-[#8A8A8A]',
    light: 'bg-[#C8C8C8]',
    white: 'bg-white/60',
  };

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-3 select-none ${className}`}>
        {rulePosition === 'left' && <div className={`w-[1px] h-8 ${ruleColors[theme]}`} />}
        <div className="flex flex-col gap-1 text-[11px] font-medium tracking-editorial uppercase text-center leading-tight">
          {lines.map((line, idx) => (
            <span key={idx} className={textColors[theme]}>
              {line}
            </span>
          ))}
        </div>
        {rulePosition === 'right' && <div className={`w-[1px] h-8 ${ruleColors[theme]}`} />}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {rulePosition === 'left' && <div className={`h-[1px] w-8 sm:w-12 ${ruleColors[theme]}`} />}
      <span className={`text-[11px] sm:text-[12px] font-medium tracking-editorial uppercase whitespace-nowrap ${textColors[theme]}`}>
        {lines.join(' / ')}
      </span>
      {rulePosition === 'right' && <div className={`h-[1px] w-8 sm:w-12 ${ruleColors[theme]}`} />}
    </div>
  );
};
