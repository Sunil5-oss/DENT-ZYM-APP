import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  ActiveWorkoutSession,
  CompletedWorkout,
  MealLogItem,
  WeightRecord,
  PersonalRecord,
} from './types';
import { StorageService } from './services/storageService';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { WorkoutsView } from './components/workouts/WorkoutsView';
import { WorkoutPlayer } from './components/workouts/WorkoutPlayer';
import { AICoachView } from './components/aicoach/AICoachView';
import { NutritionView } from './components/nutrition/NutritionView';
import { ProgressView } from './components/progress/ProgressView';
import { ProfileView } from './components/profile/ProfileView';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { PremiumModal } from './components/premium/PremiumModal';
import { EXERCISES_DATABASE } from './data/exercisesData';

export default function App() {
  const [userProfile, setUserProfile] = useState<UserProfile>(() =>
    StorageService.getUserProfile()
  );
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeSession, setActiveSession] = useState<ActiveWorkoutSession | null>(() =>
    StorageService.getActiveSession()
  );
  const [isInPlayerMode, setIsInPlayerMode] = useState<boolean>(false);

  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>(() =>
    StorageService.getCompletedWorkouts()
  );
  const [mealLogs, setMealLogs] = useState<MealLogItem[]>(() =>
    StorageService.getMealLogs()
  );

  const todayDateStr = new Date().toISOString().split('T')[0];
  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(() =>
    StorageService.getWaterIntake(todayDateStr)
  );

  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>(() =>
    StorageService.getWeightRecords()
  );
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(() =>
    StorageService.getPersonalRecords()
  );

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [isMobilePreview, setIsMobilePreview] = useState(false);

  // Check if onboarding needs to be shown on fresh user
  useEffect(() => {
    if (!userProfile.onboardingCompleted) {
      setIsOnboardingOpen(true);
    }
  }, [userProfile.onboardingCompleted]);

  // Persist active session
  const handleUpdateSession = (session: ActiveWorkoutSession) => {
    setActiveSession(session);
    StorageService.saveActiveSession(session);
  };

  // Launch a new workout session
  const handleStartSession = (session: ActiveWorkoutSession) => {
    setActiveSession(session);
    StorageService.saveActiveSession(session);
    setIsInPlayerMode(true);
  };

  // Resume existing workout session
  const handleResumeWorkout = () => {
    if (activeSession) {
      setIsInPlayerMode(true);
    }
  };

  // Finish workout session
  const handleFinishWorkout = (completed: CompletedWorkout) => {
    StorageService.addCompletedWorkout(completed);
    setCompletedWorkouts(StorageService.getCompletedWorkouts());
    setActiveSession(null);
    StorageService.saveActiveSession(null);
    setIsInPlayerMode(false);
    setCurrentTab('dashboard');
  };

  // Water tracking
  const handleUpdateWater = (delta: number) => {
    const updated = Math.max(0, waterIntakeMl + delta);
    setWaterIntakeMl(updated);
    StorageService.saveWaterIntake(todayDateStr, updated);
  };

  // Meal tracking
  const handleAddMeal = (item: MealLogItem) => {
    StorageService.addMealLog(item);
    setMealLogs(StorageService.getMealLogs());
  };

  const handleDeleteMeal = (id: string) => {
    StorageService.deleteMealLog(id);
    setMealLogs(StorageService.getMealLogs());
  };

  // Weight tracking
  const handleAddWeight = (record: WeightRecord) => {
    StorageService.addWeightRecord(record);
    setWeightRecords(StorageService.getWeightRecords());
    // Also update current weight on profile
    const updatedProfile = { ...userProfile, weight: record.weight };
    setUserProfile(updatedProfile);
    StorageService.saveUserProfile(updatedProfile);
  };

  const handleDeleteWeight = (id: string) => {
    StorageService.deleteWeightRecord(id);
    setWeightRecords(StorageService.getWeightRecords());
  };

  // PR tracking
  const handleAddPR = (pr: PersonalRecord) => {
    StorageService.addPersonalRecord(pr);
    setPersonalRecords(StorageService.getPersonalRecords());
  };

  // Quick Start Today's workout from dashboard
  const handleStartTodayWorkout = () => {
    const chestExercises = EXERCISES_DATABASE.filter((e) => e.category === 'Chest').slice(0, 3);
    const tricepExercises = EXERCISES_DATABASE.filter((e) => e.category === 'Triceps').slice(0, 1);
    const combined = [...chestExercises, ...tricepExercises];

    const session: ActiveWorkoutSession = {
      id: `session-today-${Date.now()}`,
      workoutTitle: "Today's Chest & Tricep Hypertrophy",
      category: 'Chest',
      exercises: combined.map((ex) => ({
        exercise: ex,
        sets: Array.from({ length: ex.defaultSets }, (_, i) => ({
          setNumber: i + 1,
          reps: 10,
          weight: ex.category === 'Chest' ? 45 : 20,
          completed: false,
        })),
      })),
      currentExerciseIndex: 0,
      elapsedSeconds: 0,
      isActive: true,
      isPaused: false,
      startedAt: new Date().toISOString(),
    };

    handleStartSession(session);
  };

  // Auth & Logout
  const handleAuthSuccess = (profile: UserProfile, isNewUser?: boolean) => {
    setUserProfile(profile);
    if (isNewUser) {
      setIsOnboardingOpen(true);
    }
  };

  const handleLogout = () => {
    setIsAuthOpen(true);
  };

  const handleTogglePremium = (isPremium: boolean) => {
    const updated = { ...userProfile, isPremium };
    setUserProfile(updated);
    StorageService.saveUserProfile(updated);
  };

  // Main content area renderer
  const renderContent = () => {
    if (isInPlayerMode && activeSession) {
      return (
        <WorkoutPlayer
          session={activeSession}
          onUpdateSession={handleUpdateSession}
          onFinishWorkout={handleFinishWorkout}
          onExitPlayer={() => setIsInPlayerMode(false)}
        />
      );
    }

    switch (currentTab) {
      case 'dashboard':
        return (
          <HomeDashboard
            userProfile={userProfile}
            completedWorkouts={completedWorkouts}
            todayMeals={mealLogs}
            waterIntakeMl={waterIntakeMl}
            onUpdateWater={handleUpdateWater}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              setIsInPlayerMode(false);
            }}
            onStartTodayWorkout={handleStartTodayWorkout}
            activeSession={activeSession}
            onResumeWorkout={handleResumeWorkout}
          />
        );

      case 'workouts':
        return (
          <WorkoutsView
            onStartSession={handleStartSession}
            completedWorkouts={completedWorkouts}
          />
        );

      case 'aicoach':
        return <AICoachView userProfile={userProfile} />;

      case 'nutrition':
        return (
          <NutritionView
            userProfile={userProfile}
            mealLogs={mealLogs}
            onAddMeal={handleAddMeal}
            onDeleteMeal={handleDeleteMeal}
            waterIntakeMl={waterIntakeMl}
            onUpdateWater={handleUpdateWater}
          />
        );

      case 'progress':
        return (
          <ProgressView
            userProfile={userProfile}
            weightRecords={weightRecords}
            onAddWeightRecord={handleAddWeight}
            onDeleteWeightRecord={handleDeleteWeight}
            personalRecords={personalRecords}
            onAddPersonalRecord={handleAddPR}
            completedWorkouts={completedWorkouts}
          />
        );

      case 'profile':
        return (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={(p) => setUserProfile(p)}
            onLogout={handleLogout}
            onOpenPremium={() => setIsPremiumOpen(true)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#101116] text-[#F5F6FA] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar
        userProfile={userProfile}
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setIsInPlayerMode(false);
        }}
        onOpenPremium={() => setIsPremiumOpen(true)}
        activeSession={activeSession}
        onResumeWorkout={handleResumeWorkout}
        isMobilePreview={isMobilePreview}
        onToggleMobilePreview={() => setIsMobilePreview(!isMobilePreview)}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex justify-center">
        {/* If Mobile Preview Frame is toggled on desktop */}
        {isMobilePreview ? (
          <div className="py-6 px-4 flex justify-center items-center w-full bg-[#0B0C0E]">
            <div className="w-[390px] h-[844px] bg-[#101116] border-[10px] border-[#252837] rounded-[52px] shadow-2xl relative flex flex-col overflow-hidden">
              {/* iPhone Notch & Speaker Bar */}
              <div className="w-full h-8 bg-transparent flex items-center justify-between px-7 shrink-0 z-50">
                <span className="text-[11px] font-bold text-[#F5F6FA] font-mono">9:41</span>
                <div className="w-24 h-4 bg-[#1E212E] rounded-full mx-auto" />
                <div className="flex items-center gap-1.5 text-[10px] text-[#F5F6FA]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-xs border border-current p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#C6FF4D]" />
                  </div>
                </div>
              </div>

              {/* Scrollable Mobile Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-2 pb-16">
                {renderContent()}
              </div>

              {/* Bottom Nav inside Phone Frame */}
              <BottomNav
                currentTab={currentTab}
                onNavigate={(tab) => {
                  setCurrentTab(tab);
                  setIsInPlayerMode(false);
                }}
              />
            </div>
          </div>
        ) : (
          /* Normal Responsive Layout */
          <div className="flex-1 flex max-w-7xl w-full">
            {/* Desktop Navigation Rail / Sidebar */}
            <Sidebar
              currentTab={currentTab}
              onNavigate={(tab) => {
                setCurrentTab(tab);
                setIsInPlayerMode(false);
              }}
              userProfile={userProfile}
              workoutCount={completedWorkouts.length}
            />

            {/* Main view container */}
            <main className="flex-1 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-57px)]">
              {renderContent()}
            </main>
          </div>
        )}
      </div>

      {/* Mobile Fixed Bottom Navigation (visible on native small screens when mobile preview is off) */}
      {!isMobilePreview && (
        <BottomNav
          currentTab={currentTab}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setIsInPlayerMode(false);
          }}
        />
      )}

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={(p) => {
          setUserProfile(p);
          setIsOnboardingOpen(false);
        }}
        currentProfile={userProfile}
      />

      <PremiumModal
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        userProfile={userProfile}
        onTogglePremium={handleTogglePremium}
      />
    </div>
  );
}
