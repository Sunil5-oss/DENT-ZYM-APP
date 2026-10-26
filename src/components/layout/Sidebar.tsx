import React from 'react';
import {
  LayoutDashboard,
  Dumbbell,
  Sparkles,
  Utensils,
  TrendingUp,
  UserCheck,
  Flame,
  Award,
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  userProfile: UserProfile;
  workoutCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  userProfile,
  workoutCount,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'aicoach', label: 'AI Coach', icon: Sparkles, badge: 'AI' },
    { id: 'nutrition', label: 'Nutrition & Diet', icon: Utensils },
    { id: 'progress', label: 'Progress & PRs', icon: TrendingUp },
    { id: 'profile', label: 'Profile & Settings', icon: UserCheck },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#14161E] border-r border-[#222532] min-h-[calc(100vh-57px)] p-4 justify-between">
      <div className="space-y-6">
        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1F222F] text-[#C6FF4D] font-semibold border border-[#C6FF4D]/30 shadow-sm'
                    : 'text-[#A4A7B2] hover:text-[#F5F6FA] hover:bg-[#1A1D27]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-[#C6FF4D]'
                        : item.id === 'aicoach'
                        ? 'text-[#9B7BFF]'
                        : 'text-[#A4A7B2]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#9B7BFF]/20 text-[#9B7BFF] border border-[#9B7BFF]/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Training Summary Card */}
        <div className="p-3.5 rounded-2xl bg-[#191B24] border border-[#262A38] space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#A4A7B2]">
            <span>Current Goal</span>
            <span className="text-[#C6FF4D] font-semibold">{userProfile.goal}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#A4A7B2]">
            <span>Workouts Completed</span>
            <span className="font-tabular font-bold text-[#F5F6FA]">{workoutCount}</span>
          </div>

          <div className="pt-2 border-t border-[#252837] flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#F5F6FA]">
              <Flame className="w-3.5 h-3.5 text-[#FF7043] fill-[#FF7043]" />
              <span className="font-semibold">4-Day Streak</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#A4A7B2]">
              <Award className="w-3.5 h-3.5 text-[#C6FF4D]" />
              <span>Level: {userProfile.experience}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand motto footer */}
      <div className="pt-4 border-t border-[#222532] text-center">
        <p className="text-[11px] text-[#6B7082]">
          DENT ZYM APP v2.4 · Stay Strong
        </p>
      </div>
    </aside>
  );
};
