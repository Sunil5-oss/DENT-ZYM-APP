import React from 'react';
import {
  UserProfile,
  CompletedWorkout,
  MealLogItem,
  ActiveWorkoutSession,
} from '../../types';
import { ProgressRing } from '../common/ProgressRing';
import {
  Play,
  Flame,
  Droplet,
  Utensils,
  Dumbbell,
  Sparkles,
  TrendingUp,
  Plus,
  Minus,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Target,
} from 'lucide-react';

interface HomeDashboardProps {
  userProfile: UserProfile;
  completedWorkouts: CompletedWorkout[];
  todayMeals: MealLogItem[];
  waterIntakeMl: number;
  onUpdateWater: (delta: number) => void;
  onNavigate: (tab: string) => void;
  onStartTodayWorkout: () => void;
  activeSession: ActiveWorkoutSession | null;
  onResumeWorkout: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  userProfile,
  completedWorkouts,
  todayMeals,
  waterIntakeMl,
  onUpdateWater,
  onNavigate,
  onStartTodayWorkout,
  activeSession,
  onResumeWorkout,
}) => {
  // Target calculations based on user profile
  const targetCalories =
    userProfile.goal === 'Fat Loss'
      ? 1850
      : userProfile.goal === 'Muscle Gain'
      ? 2500
      : userProfile.goal === 'Strength Improvement'
      ? 2750
      : 2150;

  const targetProteinGrams = Math.round(userProfile.weight * 1.9); // ~1.9g per kg
  const targetWaterMl = 3000;

  // Actual consumed
  const consumedCalories = todayMeals.reduce((acc, m) => acc + m.calories, 0);
  const consumedProtein = todayMeals.reduce((acc, m) => acc + m.protein, 0);
  const consumedCarbs = todayMeals.reduce((acc, m) => acc + m.carbs, 0);
  const consumedFat = todayMeals.reduce((acc, m) => acc + m.fat, 0);

  const remainingCalories = Math.max(0, targetCalories - consumedCalories);
  const caloriePercent = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((consumedProtein / targetProteinGrams) * 100));
  const waterPercent = Math.min(100, Math.round((waterIntakeMl / targetWaterMl) * 100));

  // Weekly day badges
  const daysOfWeek = [
    { day: 'Mon', status: 'done', label: 'Chest' },
    { day: 'Tue', status: 'done', label: 'Back' },
    { day: 'Wed', status: 'rest', label: 'Rest' },
    { day: 'Thu', status: 'today', label: 'Legs' },
    { day: 'Fri', status: 'upcoming', label: 'Shoulders' },
    { day: 'Sat', status: 'upcoming', label: 'Arms' },
    { day: 'Sun', status: 'rest', label: 'Rest' },
  ];

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto animate-fadeIn">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#171923] via-[#1A1D27] to-[#1F2231] border border-[#272B3C] shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6FF4D]">
              Day 18 · Consistency Phase
            </span>
            <span className="text-[#6B7082]">·</span>
            <span className="text-xs text-[#A4A7B2] flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-[#9B7BFF]" />
              {userProfile.goal}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F6FA] tracking-tight">
            Welcome back, {userProfile.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-[#A4A7B2] max-w-md">
            Train Hard · Stay Strong · Transform Yourself. Let's crush today's training!
          </p>
        </div>

        {/* Quick CTA */}
        <div className="relative z-10 shrink-0">
          {activeSession ? (
            <button
              onClick={onResumeWorkout}
              className="px-5 py-3 rounded-2xl bg-[#C6FF4D] text-[#101116] font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#d5ff73] transition-all cursor-pointer shadow-lg shadow-[#C6FF4D]/20 animate-pulse"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Active Workout</span>
            </button>
          ) : (
            <button
              onClick={onStartTodayWorkout}
              className="px-5 py-3 rounded-2xl bg-[#C6FF4D] text-[#101116] font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 hover:bg-[#d5ff73] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#C6FF4D]/20"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Today's Workout</span>
            </button>
          )}
        </div>

        {/* Subtle decorative background lights */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#C6FF4D]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Horizontal Weekly Training Calendar */}
      <div className="p-4 rounded-2xl bg-[#151720] border border-[#232635]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-bold text-[#F5F6FA] flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#C6FF4D]" />
            Weekly Schedule & Progression
          </span>
          <span className="text-[#A4A7B2]">Week 4 of Program</span>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((d, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                d.status === 'today'
                  ? 'bg-[#1E2333] border-[#C6FF4D] text-[#C6FF4D]'
                  : d.status === 'done'
                  ? 'bg-[#17201B] border-[#2A3F31] text-[#A4A7B2]'
                  : 'bg-[#12131A] border-[#222533] text-[#6B7082]'
              }`}
            >
              <span className="text-[11px] font-bold">{d.day}</span>
              <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">{d.label}</span>
              {d.status === 'done' && (
                <CheckCircle2 className="w-3 h-3 text-[#C6FF4D] mt-1 fill-[#C6FF4D]/20" />
              )}
              {d.status === 'today' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4D] mt-1.5 animate-ping" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Calories & Nutrition */}
        <div className="p-5 rounded-3xl bg-[#171923] border border-[#262A3B] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4A7B2] flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FF7043]" />
              Daily Calorie Target
            </span>
            <span className="text-xs font-semibold text-[#C6FF4D]">{caloriePercent}%</span>
          </div>

          <div className="flex items-center gap-4 my-2">
            <ProgressRing
              progress={caloriePercent}
              size={90}
              strokeWidth={8}
              strokeColor="#FF7043"
              trackColor="#252936"
            >
              <span className="font-tabular font-bold text-sm text-[#F5F6FA]">
                {consumedCalories}
              </span>
              <span className="text-[9px] text-[#A4A7B2]">kcal</span>
            </ProgressRing>

            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex justify-between">
                <span className="text-[#A4A7B2]">Target:</span>
                <span className="font-tabular font-bold text-[#F5F6FA]">{targetCalories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A4A7B2]">Remaining:</span>
                <span className="font-tabular font-bold text-[#C6FF4D]">{remainingCalories} kcal</span>
              </div>
              <div className="w-full bg-[#242735] h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#FF7043] h-full rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('nutrition')}
            className="mt-3 pt-3 border-t border-[#232737] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-between w-full cursor-pointer"
          >
            <span>Log Meals & View Macros</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C6FF4D]" />
          </button>
        </div>

        {/* Metric 2: Protein & Macronutrients */}
        <div className="p-5 rounded-3xl bg-[#171923] border border-[#262A3B] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4A7B2] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#C6FF4D]" />
              Protein Benchmark
            </span>
            <span className="text-xs font-semibold text-[#C6FF4D]">{proteinPercent}%</span>
          </div>

          <div className="flex items-center gap-4 my-2">
            <ProgressRing
              progress={proteinPercent}
              size={90}
              strokeWidth={8}
              strokeColor="#C6FF4D"
              trackColor="#252936"
            >
              <span className="font-tabular font-bold text-sm text-[#F5F6FA]">
                {Math.round(consumedProtein)}g
              </span>
              <span className="text-[9px] text-[#A4A7B2]">of {targetProteinGrams}g</span>
            </ProgressRing>

            <div className="space-y-1.5 text-xs flex-1">
              <div className="flex justify-between">
                <span className="text-[#A4A7B2]">Carbs:</span>
                <span className="font-tabular font-semibold text-[#F5F6FA]">{Math.round(consumedCarbs)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A4A7B2]">Fats:</span>
                <span className="font-tabular font-semibold text-[#F5F6FA]">{Math.round(consumedFat)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A4A7B2]">Diet Style:</span>
                <span className="text-[#9B7BFF] font-semibold">{userProfile.diet.split(' ')[0]}</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#232737] text-[11px] text-[#A4A7B2]">
            High bioavailability support for myofibrillar repair.
          </div>
        </div>

        {/* Metric 3: Water Intake Tracker */}
        <div className="p-5 rounded-3xl bg-[#171923] border border-[#262A3B] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A4A7B2] flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-[#54A0FF]" />
              Hydration Tracker
            </span>
            <span className="text-xs font-semibold text-[#54A0FF]">{waterPercent}%</span>
          </div>

          <div className="flex items-center gap-4 my-2">
            <ProgressRing
              progress={waterPercent}
              size={90}
              strokeWidth={8}
              strokeColor="#54A0FF"
              trackColor="#252936"
            >
              <span className="font-tabular font-bold text-sm text-[#F5F6FA]">
                {waterIntakeMl}
              </span>
              <span className="text-[9px] text-[#A4A7B2]">ml</span>
            </ProgressRing>

            <div className="flex flex-col gap-2 flex-1">
              <span className="text-xs text-[#A4A7B2]">
                Target: <span className="text-[#F5F6FA] font-bold">3,000 ml</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateWater(-250)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#222533] border border-[#2B2F40] text-xs font-bold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center gap-1 cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                  <span>250ml</span>
                </button>
                <button
                  onClick={() => onUpdateWater(250)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#54A0FF]/15 border border-[#54A0FF]/40 text-xs font-bold text-[#54A0FF] hover:bg-[#54A0FF]/25 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>250ml</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[#232737] text-[11px] text-[#A4A7B2]">
            Drinking water keeps muscle cells hydrated & prevents cramps.
          </div>
        </div>
      </div>

      {/* Quick Launchpad & AI Coach Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AI Coach Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1C1A2E] to-[#181A25] border border-[#9B7BFF]/30 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#9B7BFF]/20 border border-[#9B7BFF]/50 flex items-center justify-center text-[#9B7BFF]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#F5F6FA]">DENT ZYM AI Coach</h3>
                <span className="text-[11px] text-[#9B7BFF] font-medium">Real-time Exercise & Nutrition Brain</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#9B7BFF]/20 text-[10px] font-bold text-[#9B7BFF] border border-[#9B7BFF]/30">
              Active
            </span>
          </div>

          <p className="text-xs text-[#A4A7B2] leading-relaxed">
            Need form feedback on squats? Want an Indian high-protein meal blueprint with dal and paneer? Ask your coach anytime.
          </p>

          <button
            onClick={() => onNavigate('aicoach')}
            className="w-full py-2.5 rounded-xl bg-[#9B7BFF] text-[#101116] font-bold text-xs tracking-wide hover:bg-[#b297ff] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#9B7BFF]/20"
          >
            <span>Ask DENT ZYM AI Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Workout History card */}
        <div className="p-6 rounded-3xl bg-[#171923] border border-[#262939] space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#F5F6FA] flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#C6FF4D]" />
              <span>Recent Sessions</span>
            </h3>
            <button
              onClick={() => onNavigate('workouts')}
              className="text-xs font-semibold text-[#C6FF4D] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5">
            {completedWorkouts.slice(0, 2).map((cw) => (
              <div
                key={cw.id}
                className="p-3 rounded-2xl bg-[#12131A] border border-[#232635] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#F5F6FA]">{cw.title}</div>
                  <div className="text-[11px] text-[#A4A7B2] mt-0.5">
                    {new Date(cw.date).toLocaleDateString()} · {cw.durationMinutes} min · {cw.totalSets} sets
                  </div>
                </div>
                <div className="font-tabular font-bold text-[#C6FF4D]">
                  {cw.totalVolumeKg.toLocaleString()} kg
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="w-full py-2 rounded-xl bg-[#202330] border border-[#2B2F40] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#C6FF4D]" />
            <span>View Progress & Personal Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
