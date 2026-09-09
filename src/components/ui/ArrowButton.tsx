import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonVariant } from '../../types';

interface ArrowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  arrowClassName?: string;
  href?: string;
  onClick?: () => void;
  id?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  variant = 'outlineDark',
  children,
  className = '',
  arrowClassName = '',
  href,
  onClick,
  id,
  ...props
}) => {
  const baseClasses = 
    'group relative inline-flex items-center justify-between font-sans uppercase font-bold text-[10px] tracking-button transition-all duration-200 outline-none select-none active:scale-[0.985] cursor-pointer';

  const variantClasses: Record<ButtonVariant, string> = {
    white: 
      'bg-white text-[#090909] hover:bg-neutral-100 min-h-[35px] sm:min-h-[35px] px-6 sm:px-8 rounded-[2px] min-w-[220px] sm:min-w-[270px] focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
    outlineLight: 
      'bg-transparent text-white border border-white hover:bg-white hover:text-[#090909] min-h-[54px] sm:min-h-[66px] px-6 sm:px-8 rounded-[2px] min-w-[220px] sm:min-w-[270px] focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
    outlineDark: 
      'bg-transparent text-[#090909] border border-[#090909] hover:bg-[#090909] hover:text-white min-h-[50px] sm:min-h-[58px] px-6 sm:px-7 rounded-none focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
    cobalt: 
      'bg-[#052DC8] text-white hover:bg-[#0424a1] min-h-[54px] sm:min-h-[64px] px-6 sm:px-8 rounded-none min-w-[240px] sm:min-w-[320px] focus-visible:ring-2 focus-visible:ring-[#17B8C2] focus-visible:ring-offset-2',
    teal: 
      'bg-[#008F98] text-white hover:bg-[#007b82] min-h-[52px] sm:min-h-[62px] px-6 sm:px-8 rounded-none min-w-[240px] sm:min-w-[310px] focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
    amber: 
      'bg-[#F0AD37] text-[#090909] hover:bg-[#e29e28] min-h-[50px] sm:min-h-[60px] px-6 sm:px-8 rounded-none min-w-[220px] sm:min-w-[290px] focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
    cyan: 
      'bg-[#17B8C2] text-[#090909] hover:bg-[#149da6] min-h-[44px] sm:min-h-[50px] px-5 sm:px-6 rounded-none focus-visible:ring-2 focus-visible:ring-[#052DC8] focus-visible:ring-offset-2',
  };

  const content = (
    <>
      <span className="mr-2 sm:mr-4 whitespace-nowrap">{children}</span>
      <ArrowRight 
        className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5 shrink-0 ${arrowClassName}`} 
        strokeWidth={1.5}
      />
    </>
  );

  if (href) {
    return (
      <a 
        id={id}
        href={href} 
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};
