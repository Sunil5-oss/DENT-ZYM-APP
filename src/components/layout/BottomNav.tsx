import React from 'react';
import { LayoutDashboard, Dumbbell, Sparkles, Utensils, TrendingUp } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'aicoach', label: 'AI Coach', icon: Sparkles, isAi: true },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#101116]/95 backdrop-blur-lg border-t border-[#222533] px-2 py-1.5">
      <div className="grid grid-cols-5 items-center h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] relative cursor-pointer"
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? tab.isAi
                        ? 'text-[#9B7BFF]'
                        : 'text-[#C6FF4D]'
                      : 'text-[#A4A7B2]'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] tracking-tight transition-colors ${
                  isActive
                    ? 'font-bold text-[#F5F6FA]'
                    : 'font-medium text-[#A4A7B2]'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className={`absolute bottom-0 w-4 h-0.5 rounded-full ${
                    tab.isAi ? 'bg-[#9B7BFF]' : 'bg-[#C6FF4D]'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
