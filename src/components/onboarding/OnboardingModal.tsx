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
  Sparkles,
  Target,
  Dumbbell,
  Apple,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile) => void;
  currentProfile: UserProfile;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  currentProfile,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(currentProfile.name || '');
  const [age, setAge] = useState(currentProfile.age || 25);
  const [height, setHeight] = useState(currentProfile.height || 175);
  const [weight, setWeight] = useState(currentProfile.weight || 72);
  const [goal, setGoal] = useState<FitnessGoal>(currentProfile.goal || 'Muscle Gain');
  const [experience, setExperience] = useState<FitnessExperience>(
    currentProfile.experience || 'Intermediate'
  );
  const [location, setLocation] = useState<WorkoutLocation>(currentProfile.location || 'Gym');
  const [workoutDays, setWorkoutDays] = useState(currentProfile.workoutDaysPerWeek || 4);
  const [diet, setDiet] = useState<DietaryPreference>(
    currentProfile.diet || 'Vegetarian'
  );
  const [activityLevel, setActivityLevel] = useState<
    'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'
  >(currentProfile.activityLevel || 'Moderately Active');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const updated: UserProfile = {
        ...currentProfile,
        name: name.trim() || 'Athlete',
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        goal,
        experience,
        location,
        workoutDaysPerWeek: Number(workoutDays),
        diet,
        activityLevel,
        onboardingCompleted: true,
      };
      StorageService.saveUserProfile(updated);
      onComplete(updated);
    }
  };

  const goalsList: { id: FitnessGoal; title: string; desc: string }[] = [
    {
      id: 'Muscle Gain',
      title: 'Muscle Hypertrophy',
      desc: 'Build lean contractile muscle mass, size, and sculpted muscular density.',
    },
    {
      id: 'Fat Loss',
      title: 'Shred & Fat Loss',
      desc: 'Burn subcutaneous body fat while preserving metabolically active muscle.',
    },
    {
      id: 'Strength Improvement',
      title: 'Raw Power & Strength',
      desc: 'Maximal mechanical tension, CNS efficiency, and heavy compound progression.',
    },
    {
      id: 'General Fitness',
      title: 'Athletic Conditioning',
      desc: 'Cardiovascular endurance, joint mobility, functional agility, and vitality.',
    },
    {
      id: 'Weight Maintenance',
      title: 'Weight Maintenance',
      desc: 'Hold peak physique, optimize metabolic health, and refine movement quality.',
    },
  ];

  const experienceList: { id: FitnessExperience; title: string; desc: string }[] = [
    { id: 'Beginner', title: 'Beginner', desc: '< 1 year of consistent structured lifting' },
    { id: 'Intermediate', title: 'Intermediate', desc: '1 – 3 years of progressive resistance training' },
    { id: 'Advanced', title: 'Advanced', desc: '3+ years with mastery over compound mechanics' },
  ];

  const dietList: { id: DietaryPreference; title: string }[] = [
    { id: 'Vegetarian', title: 'Vegetarian (Paneer, Dal, Dairy)' },
    { id: 'Non-Vegetarian', title: 'Non-Vegetarian (Eggs, Chicken, Fish)' },
    { id: 'Eggetarian', title: 'Eggetarian (Dairy + Eggs)' },
    { id: 'Vegan', title: '100% Plant-Based Vegan' },
    { id: 'High-Protein / Keto', title: 'High-Protein / Ketogenic' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#171923] border border-[#2A2E3D] rounded-3xl p-6 md:p-8 shadow-2xl relative">
        {/* Step progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-[#A4A7B2] mb-2 font-medium">
            <span>
              Step {step} of 4 ·{' '}
              {step === 1 && 'Personal Metrics'}
              {step === 2 && 'Primary Goal'}
              {step === 3 && 'Training Profile'}
              {step === 4 && 'Nutrition Architecture'}
            </span>
            <span className="text-[#C6FF4D] font-bold">{step * 25}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#252837] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9B7BFF] to-[#C6FF4D] transition-all duration-300"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Personal Metrics */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-black text-[#F5F6FA]">Let's Calibrate Your Physique</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                DENT ZYM APP calculates your caloric expenditure and muscle volume thresholds.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                Your Preferred Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111219] border border-[#2B2F40] text-sm text-[#F5F6FA] focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Age (years)
                </label>
                <input
                  type="number"
                  min="14"
                  max="95"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#111219] border border-[#2B2F40] text-sm text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="120"
                  max="240"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#111219] border border-[#2B2F40] text-sm text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4A7B2] mb-1">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="35"
                  max="200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#111219] border border-[#2B2F40] text-sm text-[#F5F6FA] font-tabular focus:border-[#C6FF4D] focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1F222F] border border-[#292D3E] text-xs text-[#A4A7B2] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9B7BFF] shrink-0" />
              <span>Calculated BMI: {(weight / Math.pow(height / 100, 2)).toFixed(1)} kg/m²</span>
            </div>
          </div>
        )}

        {/* STEP 2: Fitness Goal */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="text-center mb-3">
              <h3 className="text-xl font-black text-[#F5F6FA]">Select Your Prime Objective</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                Your workout plans and macronutrient distributions will automatically adapt.
              </p>
            </div>

            <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
              {goalsList.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    goal === g.id
                      ? 'bg-[#1F2332] border-[#C6FF4D] text-[#F5F6FA]'
                      : 'bg-[#12131B] border-[#252837] text-[#A4A7B2] hover:border-[#383C50]'
                  }`}
                >
                  <div className="pr-3">
                    <div className="text-sm font-bold text-[#F5F6FA] flex items-center gap-2">
                      <Target className={`w-4 h-4 ${goal === g.id ? 'text-[#C6FF4D]' : 'text-[#6B7082]'}`} />
                      <span>{g.title}</span>
                    </div>
                    <p className="text-xs text-[#A4A7B2] mt-0.5">{g.desc}</p>
                  </div>
                  {goal === g.id && (
                    <div className="w-5 h-5 rounded-full bg-[#C6FF4D] text-[#101116] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Experience & Location */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h3 className="text-xl font-black text-[#F5F6FA]">Experience & Schedule</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                Calibrating volume, recovery cycles, and gym environment.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">
                Training Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {experienceList.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setExperience(exp.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      experience === exp.id
                        ? 'bg-[#1F2332] border-[#C6FF4D] text-[#C6FF4D] font-bold'
                        : 'bg-[#12131A] border-[#262939] text-[#A4A7B2] hover:border-[#3A3E54]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{exp.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">
                Workout Location
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Gym', 'Home', 'Both'] as WorkoutLocation[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      location === loc
                        ? 'bg-[#1F2332] border-[#C6FF4D] text-[#C6FF4D] font-bold'
                        : 'bg-[#12131A] border-[#262939] text-[#A4A7B2] hover:border-[#3A3E54]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{loc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">
                Target Days Per Week: <span className="text-[#C6FF4D] font-bold">{workoutDays} Days</span>
              </label>
              <div className="flex gap-2">
                {[3, 4, 5, 6].map((d) => (
                  <button
                    key={d}
                    onClick={() => setWorkoutDays(d)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      workoutDays === d
                        ? 'bg-[#C6FF4D] border-[#C6FF4D] text-[#101116]'
                        : 'bg-[#12131A] border-[#262939] text-[#A4A7B2] hover:border-[#3A3E54]'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Nutrition & Activity */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h3 className="text-xl font-black text-[#F5F6FA]">Nutrition & Daily Activity</h3>
              <p className="text-xs text-[#A4A7B2] mt-1">
                Customize your fuel sources and daily NEAT baseline.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">
                Dietary Preference
              </label>
              <div className="space-y-1.5">
                {dietList.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDiet(d.id)}
                    className={`w-full px-3.5 py-2 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                      diet === d.id
                        ? 'bg-[#1E2333] border-[#C6FF4D] text-[#F5F6FA]'
                        : 'bg-[#12131A] border-[#262939] text-[#A4A7B2] hover:border-[#383C50]'
                    }`}
                  >
                    <span>{d.title}</span>
                    {diet === d.id && <Check className="w-4 h-4 text-[#C6FF4D]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A4A7B2] mb-1.5">
                Daily Activity Level (Excluding Workouts)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active'] as const).map(
                  (act) => (
                    <button
                      key={act}
                      onClick={() => setActivityLevel(act)}
                      className={`p-2 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                        activityLevel === act
                          ? 'bg-[#1F2332] border-[#C6FF4D] text-[#C6FF4D] font-bold'
                          : 'bg-[#12131A] border-[#262939] text-[#A4A7B2] hover:border-[#3A3E54]'
                      }`}
                    >
                      {act}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-6 pt-4 border-t border-[#252837] flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl border border-[#2B2F40] text-xs font-semibold text-[#A4A7B2] hover:text-[#F5F6FA] flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs tracking-wide hover:bg-[#d5ff73] flex items-center gap-1.5 shadow-lg shadow-[#C6FF4D]/15 active:scale-95 transition-all cursor-pointer"
          >
            <span>{step === 4 ? 'Complete Onboarding' : 'Continue'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
