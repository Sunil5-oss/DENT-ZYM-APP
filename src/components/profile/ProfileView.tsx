import React, { useState } from 'react';
import {
  UserProfile,
  FitnessGoal,
  FitnessExperience,
  DietaryPreference,
  WorkoutLocation,
} from '../../types';
import { StorageService } from '../../services/storageService';
import {
  User,
  Shield,
  Bell,
  LogOut,
  Trash2,
  Save,
  CheckCircle2,
  Lock,
  FileText,
  Sliders,
  ChevronRight,
} from 'lucide-react';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onLogout: () => void;
  onOpenPremium: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  onOpenPremium,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [email] = useState(userProfile.email);
  const [age, setAge] = useState(userProfile.age);
  const [height, setHeight] = useState(userProfile.height);
  const [weight, setWeight] = useState(userProfile.weight);
  const [goal, setGoal] = useState<FitnessGoal>(userProfile.goal);
  const [experience, setExperience] = useState<FitnessExperience>(userProfile.experience);
  const [diet, setDiet] = useState<DietaryPreference>(userProfile.diet);
  const [location, setLocation] = useState<WorkoutLocation>(userProfile.location);
  const [workoutDays, setWorkoutDays] = useState(userProfile.workoutDaysPerWeek);

  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [waterReminders, setWaterReminders] = useState(true);
  const [mealReminders, setMealReminders] = useState(true);

  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      name: name.trim(),
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      goal,
      experience,
      diet,
      location,
      workoutDaysPerWeek: Number(workoutDays),
    };

    StorageService.saveUserProfile(updated);
    onUpdateProfile(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleResetAccount = () => {
    StorageService.resetAllData();
    setShowDeleteModal(false);
    onLogout();
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-4xl mx-auto animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#171923] border border-[#272B3B] shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9B7BFF] to-[#C6FF4D] p-1 shadow-lg shadow-[#C6FF4D]/10">
            <div className="w-full h-full bg-[#101116] rounded-[12px] flex items-center justify-center font-black text-2xl text-[#C6FF4D]">
              {userProfile.name ? userProfile.name[0].toUpperCase() : 'A'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#F5F6FA]">{userProfile.name}</h1>
              {userProfile.isPremium && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C6FF4D]/20 text-[#C6FF4D] border border-[#C6FF4D]/40">
                  PRO VIP
                </span>
              )}
            </div>
            <p className="text-xs text-[#A4A7B2] mt-0.5">{userProfile.email}</p>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7082] mt-1">
              <span>Goal: {userProfile.goal}</span>
              <span>·</span>
              <span>Level: {userProfile.experience}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenPremium}
          className="px-4 py-2 rounded-xl bg-[#202330] border border-[#2F3446] text-xs font-semibold text-[#F5F6FA] hover:border-[#C6FF4D] transition-colors cursor-pointer self-start sm:self-auto"
        >
          {userProfile.isPremium ? 'Manage Pro Subscription' : 'Upgrade to Pro'}
        </button>
      </div>

      {isSavedNotice && (
        <div className="p-3 rounded-xl bg-[#C6FF4D]/15 border border-[#C6FF4D]/40 text-xs text-[#C6FF4D] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile configuration saved and calibrated.</span>
        </div>
      )}

      {/* Edit Profile Form */}
      <div className="p-6 rounded-3xl bg-[#171923] border border-[#272B3B] space-y-6 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[#242738]">
          <Sliders className="w-4 h-4 text-[#C6FF4D]" />
          <h2 className="text-base font-bold text-[#F5F6FA]">Athlete Calibration Settings</h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Email</label>
              <input
                type="text"
                disabled
                value={email}
                className="w-full px-3.5 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#6B7082] cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none cursor-pointer"
              >
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Fat Loss">Fat Loss</option>
                <option value="Strength Improvement">Strength Improvement</option>
                <option value="General Fitness">General Fitness</option>
                <option value="Weight Maintenance">Weight Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Dietary Preference</label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value as DietaryPreference)}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none cursor-pointer"
              >
                <option value="Vegetarian">Vegetarian (Indian / Dairy)</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="High-Protein / Keto">High-Protein / Keto</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value as FitnessExperience)}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none cursor-pointer"
              >
                <option value="Beginner">Beginner (&lt;1 yr)</option>
                <option value="Intermediate">Intermediate (1-3 yrs)</option>
                <option value="Advanced">Advanced (3+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">Workout Days / Week</label>
              <select
                value={workoutDays}
                onChange={(e) => setWorkoutDays(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none cursor-pointer"
              >
                <option value={3}>3 Days per week</option>
                <option value={4}>4 Days per week</option>
                <option value={5}>5 Days per week</option>
                <option value={6}>6 Days per week</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs hover:bg-[#d5ff73] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#C6FF4D]/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Calibration</span>
          </button>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="p-6 rounded-3xl bg-[#171923] border border-[#272B3B] space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[#242738]">
          <Bell className="w-4 h-4 text-[#9B7BFF]" />
          <h2 className="text-base font-bold text-[#F5F6FA]">Reminders & Notifications</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#12131A] border border-[#222533] text-xs">
            <div>
              <div className="font-semibold text-[#F5F6FA]">Daily Workout Scheduling Prompt</div>
              <div className="text-[11px] text-[#A4A7B2]">Alert when scheduled workout time arrives</div>
            </div>
            <input
              type="checkbox"
              checked={workoutReminders}
              onChange={(e) => setWorkoutReminders(e.target.checked)}
              className="accent-[#C6FF4D] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#12131A] border border-[#222533] text-xs">
            <div>
              <div className="font-semibold text-[#F5F6FA]">Hydration Reminders</div>
              <div className="text-[11px] text-[#A4A7B2]">Prompts every 2 hours to drink 250ml water</div>
            </div>
            <input
              type="checkbox"
              checked={waterReminders}
              onChange={(e) => setWaterReminders(e.target.checked)}
              className="accent-[#C6FF4D] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#12131A] border border-[#222533] text-xs">
            <div>
              <div className="font-semibold text-[#F5F6FA]">Macro Logging Prompts</div>
              <div className="text-[11px] text-[#A4A7B2]">Post-meal protein checklist alerts</div>
            </div>
            <input
              type="checkbox"
              checked={mealReminders}
              onChange={(e) => setMealReminders(e.target.checked)}
              className="accent-[#C6FF4D] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Privacy and Account Actions */}
      <div className="p-6 rounded-3xl bg-[#171923] border border-[#272B3B] space-y-4 shadow-xl">
        <div className="flex items-center gap-2 pb-3 border-b border-[#242738]">
          <Shield className="w-4 h-4 text-[#6B7082]" />
          <h2 className="text-base font-bold text-[#F5F6FA]">Privacy & Account Security</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowPrivacyModal(true)}
            className="flex-1 p-3 rounded-2xl bg-[#12131A] border border-[#222533] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#9B7BFF]" />
              <span>Privacy Policy & Medical Disclaimer</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLogout}
            className="flex-1 p-3 rounded-2xl bg-[#12131A] border border-[#222533] text-xs font-semibold text-[#A4A7B2] hover:text-[#FF7043] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 text-[#FF7043]" />
              <span>Log Out of Session</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-xs text-[#FF4D4D] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Local Athlete Data & Records</span>
          </button>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#181A25] border border-[#2A2E3F] rounded-3xl p-6 shadow-2xl relative space-y-4 max-h-[85vh] overflow-y-auto text-xs text-[#A4A7B2] leading-relaxed">
            <div className="flex justify-between items-center text-[#F5F6FA]">
              <h3 className="text-base font-bold">DENT ZYM APP Privacy & Health Disclaimers</h3>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-lg font-bold text-[#6B7082] hover:text-[#F5F6FA] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p>
              1. <strong>Health & Exercise Safety:</strong> DENT ZYM APP provides general fitness and nutritional information. Always consult a physician or licensed healthcare provider prior to beginning any intense physical exercise program.
            </p>
            <p>
              2. <strong>AI Coach Boundaries:</strong> The AI Fitness Coach does not diagnose injuries or diseases, prescribe medication, or endorse dangerous crash diets. If you experience severe chest pain, shortness of breath, or joint sharp pain, cease exercise immediately.
            </p>
            <p>
              3. <strong>Data Privacy:</strong> All your exercise sessions, personal body weights, and meal records are stored locally with zero third-party commercial profiling.
            </p>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs hover:bg-[#d5ff73] cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      {/* DELETE / RESET DATA CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#181A25] border border-[#3E2226] rounded-3xl p-6 shadow-2xl relative space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FF4D4D]/20 text-[#FF4D4D] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#F5F6FA]">Reset Athlete History?</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                This will clear local workout sessions, meal logs, and custom PR records back to fresh factory state.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#202330] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAccount}
                className="flex-1 py-2.5 rounded-xl bg-[#FF4D4D] text-white text-xs font-bold hover:bg-[#ff6161] cursor-pointer"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
