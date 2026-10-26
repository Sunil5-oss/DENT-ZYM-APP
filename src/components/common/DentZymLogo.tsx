import React from 'react';

interface DentZymLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const DentZymLogo: React.FC<DentZymLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  const titleSizes = {
    sm: 'text-base font-black',
    md: 'text-lg font-black',
    lg: 'text-2xl font-black',
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Distinctive DENT ZYM Fitness Symbol */}
      <div
        className={`${iconDimensions} rounded-xl bg-gradient-to-br from-[#C6FF4D] via-[#191B23] to-[#9B7BFF] p-0.5 shadow-lg shadow-[#C6FF4D]/10 shrink-0 group-hover:scale-105 transition-transform`}
      >
        <div className="w-full h-full bg-[#101116] rounded-[10px] flex items-center justify-center p-1.5 relative overflow-hidden">
          {/* Custom SVG Monogram Dumbbell D-Z Emblem */}
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outer athletic shield ring */}
            <path
              d="M6 8C6 6.89543 6.89543 6 8 6H20C26.6274 6 30 11.3726 30 18C30 24.6274 26.6274 30 20 30H8C6.89543 30 6 29.1046 6 28V8Z"
              stroke="#C6FF4D"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Dumbbell plates on sides */}
            <rect x="3" y="13" width="3" height="10" rx="1.5" fill="#C6FF4D" />
            <rect x="30" y="13" width="3" height="10" rx="1.5" fill="#C6FF4D" />
            {/* Dynamic Z-slice / Core energy bar in Electric Violet */}
            <path
              d="M13 13H21L14 23H22"
              stroke="#9B7BFF"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`${titleSizes} tracking-wider text-[#F5F6FA] uppercase`}>
            DENT <span className="text-[#C6FF4D]">ZYM</span>
          </span>
          <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded bg-[#C6FF4D]/15 text-[#C6FF4D] border border-[#C6FF4D]/30 uppercase">
            APP
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A4A7B2] mt-1">
            Train Hard · Stay Strong · Transform Yourself
          </span>
        )}
      </div>
    </div>
  );
};
