import React from 'react';
import { UserProfile, ActiveWorkoutSession } from '../../types';
import { DentZymLogo } from '../common/DentZymLogo';
import { Crown, Smartphone, Monitor, Play, User } from 'lucide-react';

interface NavbarProps {
  userProfile: UserProfile;
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenPremium: () => void;
  activeSession: ActiveWorkoutSession | null;
  onResumeWorkout: () => void;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  onNavigate,
  onOpenPremium,
  activeSession,
  onResumeWorkout,
  isMobilePreview,
  onToggleMobilePreview,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#101116]/95 backdrop-blur-md border-b border-[#252836] px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('dashboard')}
            className="group text-left cursor-pointer transition-opacity hover:opacity-95"
          >
            <DentZymLogo size="md" showTagline={true} />
          </button>
        </div>

        {/* Center / Active Workout Alert */}
        {activeSession && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C6FF4D]/10 border border-[#C6FF4D]/30">
            <span className="w-2 h-2 rounded-full bg-[#C6FF4D] animate-ping" />
            <span className="text-xs font-medium text-[#C6FF4D]">
              Workout Active: {activeSession.workoutTitle}
            </span>
            <button
              onClick={onResumeWorkout}
              className="ml-2 px-2.5 py-0.5 text-xs font-semibold text-[#101116] bg-[#C6FF4D] rounded-full hover:bg-[#d5ff7a] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              Resume
            </button>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mobile frame preview toggle on desktop */}
          <button
            onClick={onToggleMobilePreview}
            title={isMobilePreview ? 'Switch to Full Desktop View' : 'Preview Mobile Phone Layout'}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#191B23] border border-[#2A2E3D] text-[#A4A7B2] hover:text-[#F5F6FA] hover:border-[#3E4458] transition-colors cursor-pointer"
          >
            {isMobilePreview ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#C6FF4D]" />
                <span className="whitespace-nowrap">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#C6FF4D]" />
                <span className="whitespace-nowrap">Phone Preview</span>
              </>
            )}
          </button>

          {/* Premium Membership Button */}
          <button
            onClick={onOpenPremium}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              userProfile.isPremium
                ? 'bg-gradient-to-r from-[#9B7BFF]/20 to-[#C6FF4D]/20 text-[#C6FF4D] border border-[#C6FF4D]/40'
                : 'bg-[#191B23] text-[#F5F6FA] border border-[#2E3242] hover:border-[#C6FF4D]/40'
            }`}
          >
            <Crown className={`w-3.5 h-3.5 ${userProfile.isPremium ? 'text-[#C6FF4D]' : 'text-[#9B7BFF]'}`} />
            <span className="whitespace-nowrap">{userProfile.isPremium ? 'PRO VIP' : 'Upgrade PRO'}</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-[#191B23] border border-[#2E3242] hover:border-[#C6FF4D]/50 transition-colors cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#9B7BFF] to-[#C6FF4D] flex items-center justify-center text-[11px] font-bold text-[#101116]">
              {userProfile.name ? userProfile.name[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
            </div>
            <span className="hidden sm:inline text-xs font-medium text-[#F5F6FA] max-w-[90px] truncate">
              {userProfile.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
