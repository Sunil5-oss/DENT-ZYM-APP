import React from 'react';

interface ExerciseGraphicProps {
  type: 'push' | 'pull' | 'legs' | 'core' | 'arms' | 'cardio';
  className?: string;
}

export const ExerciseGraphic: React.FC<ExerciseGraphicProps> = ({ type, className = 'w-full h-full' }) => {
  switch (type) {
    case 'push':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bench surface */}
          <rect x="35" y="85" width="130" height="8" rx="4" fill="#2A2E3D" />
          <rect x="50" y="93" width="10" height="20" fill="#1F232F" />
          <rect x="140" y="93" width="10" height="20" fill="#1F232F" />
          {/* Torso & Head */}
          <circle cx="55" cy="73" r="10" fill="#C6FF4D" />
          <line x1="65" y1="78" x2="135" y2="78" stroke="#F5F6FA" strokeWidth="12" strokeLinecap="round" />
          {/* Arms holding barbell */}
          <path d="M 80 78 L 92 45 L 105 32" stroke="#9B7BFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 120 78 L 108 45 L 95 32" stroke="#9B7BFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barbell */}
          <line x1="30" y1="30" x2="170" y2="30" stroke="#C6FF4D" strokeWidth="4" strokeLinecap="round" />
          <rect x="40" y="16" width="8" height="28" rx="2" fill="#C6FF4D" />
          <rect x="152" y="16" width="8" height="28" rx="2" fill="#C6FF4D" />
          {/* Subtle glow circle */}
          <circle cx="100" cy="55" r="40" fill="url(#limeGlow)" opacity="0.15" />
          <defs>
            <radialGradient id="limeGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 55) scale(40)">
              <stop stopColor="#C6FF4D" />
              <stop offset="1" stopColor="#C6FF4D" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );

    case 'pull':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Barbell on floor */}
          <line x1="30" y1="95" x2="170" y2="95" stroke="#F5F6FA" strokeWidth="3" />
          <rect x="42" y="75" width="10" height="40" rx="3" fill="#9B7BFF" />
          <rect x="148" y="75" width="10" height="40" rx="3" fill="#9B7BFF" />
          {/* Athlete hinging */}
          <circle cx="75" cy="38" r="9" fill="#C6FF4D" />
          <line x1="82" y1="44" x2="120" y2="68" stroke="#F5F6FA" strokeWidth="10" strokeLinecap="round" />
          {/* Legs hinging */}
          <path d="M 120 68 L 132 85 L 125 105" stroke="#A4A7B2" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arms pulling bar */}
          <path d="M 92 50 L 100 88" stroke="#C6FF4D" strokeWidth="5" strokeLinecap="round" />
          {/* Motion tension arcs */}
          <path d="M 98 42 C 115 48, 125 58, 128 72" stroke="#9B7BFF" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'legs':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Floor grid */}
          <line x1="25" y1="110" x2="175" y2="110" stroke="#2A2E3D" strokeWidth="3" strokeLinecap="round" />
          {/* Head & Torso in squat position */}
          <circle cx="100" cy="32" r="9" fill="#C6FF4D" />
          {/* Barbell on shoulders */}
          <line x1="45" y1="36" x2="155" y2="36" stroke="#C6FF4D" strokeWidth="4" strokeLinecap="round" />
          <rect x="52" y="24" width="8" height="24" rx="2" fill="#C6FF4D" />
          <rect x="140" y="24" width="8" height="24" rx="2" fill="#C6FF4D" />
          {/* Torso angled */}
          <line x1="100" y1="41" x2="88" y2="68" stroke="#F5F6FA" strokeWidth="10" strokeLinecap="round" />
          {/* Thigh parallel & Shin */}
          <path d="M 88 68 L 122 72 L 118 108" stroke="#9B7BFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Second leg depth */}
          <path d="M 88 68 L 72 74 L 80 108" stroke="#6B7082" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'arms':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head & Torso */}
          <circle cx="85" cy="30" r="9" fill="#C6FF4D" />
          <line x1="85" y1="39" x2="88" y2="85" stroke="#F5F6FA" strokeWidth="10" strokeLinecap="round" />
          {/* Bicep contracted */}
          <path d="M 85 45 L 105 60 L 98 42" stroke="#C6FF4D" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dumbbell */}
          <line x1="88" y1="42" x2="108" y2="42" stroke="#9B7BFF" strokeWidth="4" />
          <rect x="85" y="34" width="5" height="16" rx="2" fill="#9B7BFF" />
          <rect x="106" y="34" width="5" height="16" rx="2" fill="#9B7BFF" />
          {/* Legs */}
          <line x1="88" y1="85" x2="78" y2="110" stroke="#2A2E3D" strokeWidth="7" strokeLinecap="round" />
          <line x1="88" y1="85" x2="98" y2="110" stroke="#2A2E3D" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );

    case 'core':
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pull up bar */}
          <line x1="40" y1="18" x2="160" y2="18" stroke="#2A2E3D" strokeWidth="4" strokeLinecap="round" />
          {/* Hanging arms */}
          <line x1="90" y1="18" x2="96" y2="42" stroke="#9B7BFF" strokeWidth="5" strokeLinecap="round" />
          <line x1="110" y1="18" x2="104" y2="42" stroke="#9B7BFF" strokeWidth="5" strokeLinecap="round" />
          {/* Head & Torso */}
          <circle cx="100" cy="36" r="8" fill="#C6FF4D" />
          <line x1="100" y1="44" x2="100" y2="72" stroke="#F5F6FA" strokeWidth="9" strokeLinecap="round" />
          {/* Legs lifted horizontally for hanging leg raise */}
          <path d="M 100 72 L 140 70 L 142 70" stroke="#C6FF4D" strokeWidth="7" strokeLinecap="round" />
          {/* Core contraction glow */}
          <circle cx="102" cy="62" r="14" fill="#9B7BFF" opacity="0.3" />
        </svg>
      );

    case 'cardio':
    default:
      return (
        <svg viewBox="0 0 200 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Running track line */}
          <line x1="20" y1="108" x2="180" y2="108" stroke="#2A2E3D" strokeWidth="3" strokeDasharray="6 6" />
          {/* Runner head */}
          <circle cx="118" cy="30" r="9" fill="#C6FF4D" />
          {/* Dynamic forward lean torso */}
          <line x1="114" y1="38" x2="98" y2="68" stroke="#F5F6FA" strokeWidth="9" strokeLinecap="round" />
          {/* Arms in sprint drive */}
          <path d="M 108 45 L 88 52 L 82 40" stroke="#9B7BFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 108 45 L 126 55 L 136 68" stroke="#9B7BFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* High knee leg & back drive leg */}
          <path d="M 98 68 L 122 75 L 118 96" stroke="#C6FF4D" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 98 68 L 80 82 L 68 102" stroke="#A4A7B2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};
