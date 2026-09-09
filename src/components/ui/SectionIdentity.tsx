import React from 'react';

interface SectionIdentityProps {
  number: string;
  label: string;
  accent?: 'cyan' | 'amber' | 'coral' | 'teal' | 'cobalt';
  ruleColor?: string;
  ruleLength?: string;
  className?: string;
}

export const SectionIdentity: React.FC<SectionIdentityProps> = ({
  number,
  label,
  accent = 'cyan',
  ruleColor,
  className = '',
}) => {
  const accentColors = {
    cyan: 'text-[#17B8C2]',
    amber: 'text-[#F0AD37]',
    coral: 'text-[#E35D43]',
    teal: 'text-[#008F98]',
    cobalt: 'text-[#052DC8]',
  };

  const defaultRuleColors = {
    cyan: 'bg-[#17B8C2]',
    amber: 'bg-[#F0AD37]',
    coral: 'bg-[#E35D43]',
    teal: 'bg-[#008F98]',
    cobalt: 'bg-[#052DC8]',
  };

  return (
    <div className={`flex items-baseline gap-4 sm:gap-6 ${className}`}>
      <span className={`font-sans text-4xl sm:text-5xl lg:text-[62px] font-light leading-none select-none tracking-tight ${accentColors[accent]}`}>
        {number}
      </span>
      <div className="flex flex-col gap-1.5 justify-center">
        <span className="text-[11px] sm:text-[13px] font-medium uppercase tracking-editorial text-[#323232] leading-tight">
          {label}
        </span>
        <div className={`h-[1px] w-12 sm:w-16 ${ruleColor || defaultRuleColors[accent]}`} />
      </div>
    </div>
  );
};
