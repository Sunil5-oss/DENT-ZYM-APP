import {
  UserProfile,
  CompletedWorkout,
  MealLogItem,
  WeightRecord,
  PersonalRecord,
  ActiveWorkoutSession,
  ChatMessage,
} from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'fitnova_user_profile',
  COMPLETED_WORKOUTS: 'fitnova_completed_workouts',
  MEAL_LOGS: 'fitnova_meal_logs',
  WATER_INTAKE: 'fitnova_water_intake',
  WEIGHT_RECORDS: 'fitnova_weight_records',
  PERSONAL_RECORDS: 'fitnova_personal_records',
  ACTIVE_SESSION: 'fitnova_active_session',
  AI_CHAT_HISTORY: 'fitnova_ai_chat_history',
};

// Default seed profile for initial launch
export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr-default-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@dentzym.app',
  age: 26,
  height: 178, // cm
  weight: 76.5, // kg
  targetWeight: 79.0, // kg
  experience: 'Intermediate',
  goal: 'Muscle Gain',
  diet: 'Non-Vegetarian',
  location: 'Gym',
  workoutDaysPerWeek: 4,
  activityLevel: 'Moderately Active',
  isPremium: false,
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
};

// Seed completed workouts
const SEED_COMPLETED_WORKOUTS: CompletedWorkout[] = [
  {
    id: 'cw-1',
    title: 'Chest & Tricep Hypertrophy',
    category: 'Chest',
    durationMinutes: 48,
    exercisesCompleted: 4,
    totalSets: 14,
    totalVolumeKg: 4620,
    caloriesBurned: 380,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'cw-2',
    title: 'Back Depth & Lat Width',
    category: 'Back',
    durationMinutes: 52,
    exercisesCompleted: 4,
    totalSets: 15,
    totalVolumeKg: 5240,
    caloriesBurned: 420,
    date: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'cw-3',
    title: 'Lower Body Quad & Posterior Drive',
    category: 'Legs',
    durationMinutes: 55,
    exercisesCompleted: 5,
    totalSets: 16,
    totalVolumeKg: 6100,
    caloriesBurned: 490,
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
];

// Seed weight records
const SEED_WEIGHT_RECORDS: WeightRecord[] = [
  {
    id: 'wr-1',
    weight: 75.0,
    bodyFatPercentage: 15.5,
    date: '2026-10-01',
    notes: 'Starting baseline measurement',
  },
  {
    id: 'wr-2',
    weight: 75.6,
    bodyFatPercentage: 15.2,
    date: '2026-10-08',
    notes: 'Good adherence to protein target',
  },
  {
    id: 'wr-3',
    weight: 76.1,
    bodyFatPercentage: 15.0,
    date: '2026-10-16',
    notes: 'Strength feeling solid across compound lifts',
  },
  {
    id: 'wr-4',
    weight: 76.5,
    bodyFatPercentage: 14.8,
    date: '2026-10-24',
    notes: 'Consistent lean weight progression',
  },
];

// Seed personal records
const SEED_PERSONAL_RECORDS: PersonalRecord[] = [
  { id: 'pr-1', exerciseName: 'Barbell Flat Bench Press', maxWeightKg: 95, reps: 5, date: '2026-10-20' },
  { id: 'pr-2', exerciseName: 'Barbell Back Squat', maxWeightKg: 130, reps: 5, date: '2026-10-18' },
  { id: 'pr-3', exerciseName: 'Conventional Barbell Deadlift', maxWeightKg: 160, reps: 3, date: '2026-10-14' },
  { id: 'pr-4', exerciseName: 'Overhead Barbell Military Press', maxWeightKg: 62.5, reps: 6, date: '2026-10-22' },
];

// Seed meal entries for today
const SEED_TODAY_MEALS: MealLogItem[] = [
  {
    id: 'ml-1',
    foodId: 'food-oats',
    foodName: 'Rolled Oats (Dry)',
    servings: 1,
    servingUnit: '1 bowl / 50g dry',
    calories: 190,
    protein: 6.8,
    carbs: 34.0,
    fat: 3.2,
    mealType: 'Breakfast',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'ml-2',
    foodId: 'food-whey',
    foodName: 'Whey Protein Isolate',
    servings: 1,
    servingUnit: '1 standard scoop (32g)',
    calories: 120,
    protein: 25.0,
    carbs: 2.0,
    fat: 1.0,
    mealType: 'Breakfast',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'ml-3',
    foodId: 'food-roti',
    foodName: 'Whole Wheat Roti / Chapati',
    servings: 2,
    servingUnit: '1 medium roti (approx 35g)',
    calories: 150,
    protein: 6.2,
    carbs: 31.0,
    fat: 1.0,
    mealType: 'Lunch',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'ml-4',
    foodId: 'food-paneer',
    foodName: 'Fresh Paneer (Cottage Cheese)',
    servings: 1,
    servingUnit: '100g raw cubes',
    calories: 265,
    protein: 18.3,
    carbs: 3.4,
    fat: 20.5,
    mealType: 'Lunch',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'ml-5',
    foodId: 'food-dal-moong',
    foodName: 'Yellow Moong Dal (Tadka)',
    servings: 1,
    servingUnit: '1 cooked bowl (180g)',
    calories: 145,
    protein: 9.5,
    carbs: 20.0,
    fat: 3.2,
    mealType: 'Lunch',
    timestamp: new Date().toISOString(),
  },
];

export const StorageService = {
  // USER PROFILE
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read user profile from storage', e);
    }
    this.saveUserProfile(DEFAULT_USER_PROFILE);
    return DEFAULT_USER_PROFILE;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile', e);
    }
  },

  // COMPLETED WORKOUTS
  getCompletedWorkouts(): CompletedWorkout[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_WORKOUTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read workouts', e);
    }
    this.saveCompletedWorkouts(SEED_COMPLETED_WORKOUTS);
    return SEED_COMPLETED_WORKOUTS;
  },

  saveCompletedWorkouts(workouts: CompletedWorkout[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_WORKOUTS, JSON.stringify(workouts));
    } catch (e) {
      console.error('Failed to save workouts', e);
    }
  },

  addCompletedWorkout(workout: CompletedWorkout): void {
    const list = this.getCompletedWorkouts();
    list.unshift(workout);
    this.saveCompletedWorkouts(list);
  },

  // ACTIVE SESSION
  getActiveSession(): ActiveWorkoutSession | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveActiveSession(session: ActiveWorkoutSession | null): void {
    try {
      if (!session) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      } else {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
      }
    } catch (e) {
      console.error('Failed to save active session', e);
    }
  },

  // MEAL LOGS
  getMealLogs(): MealLogItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEAL_LOGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read meal logs', e);
    }
    this.saveMealLogs(SEED_TODAY_MEALS);
    return SEED_TODAY_MEALS;
  },

  saveMealLogs(logs: MealLogItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MEAL_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save meal logs', e);
    }
  },

  addMealLog(item: MealLogItem): void {
    const logs = this.getMealLogs();
    logs.push(item);
    this.saveMealLogs(logs);
  },

  deleteMealLog(id: string): void {
    const logs = this.getMealLogs().filter((item) => item.id !== id);
    this.saveMealLogs(logs);
  },

  // WATER INTAKE
  getWaterIntake(dateString: string): number {
    try {
      const val = localStorage.getItem(`${STORAGE_KEYS.WATER_INTAKE}_${dateString}`);
      return val ? parseInt(val, 10) : 1750; // default initial demo: 1750 ml
    } catch (e) {
      return 1750;
    }
  },

  saveWaterIntake(dateString: string, ml: number): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.WATER_INTAKE}_${dateString}`, Math.max(0, ml).toString());
    } catch (e) {
      console.error('Failed to save water intake', e);
    }
  },

  // WEIGHT RECORDS
  getWeightRecords(): WeightRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEIGHT_RECORDS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read weight records', e);
    }
    this.saveWeightRecords(SEED_WEIGHT_RECORDS);
    return SEED_WEIGHT_RECORDS;
  },

  saveWeightRecords(records: WeightRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.WEIGHT_RECORDS, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save weight records', e);
    }
  },

  addWeightRecord(record: WeightRecord): void {
    const records = this.getWeightRecords().filter((r) => r.id !== record.id);
    records.push(record);
    records.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.saveWeightRecords(records);
  },

  deleteWeightRecord(id: string): void {
    const records = this.getWeightRecords().filter((r) => r.id !== id);
    this.saveWeightRecords(records);
  },

  // PERSONAL RECORDS (PRs)
  getPersonalRecords(): PersonalRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PERSONAL_RECORDS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read PRs', e);
    }
    this.savePersonalRecords(SEED_PERSONAL_RECORDS);
    return SEED_PERSONAL_RECORDS;
  },

  savePersonalRecords(records: PersonalRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save personal records', e);
    }
  },

  addPersonalRecord(record: PersonalRecord): void {
    const prs = this.getPersonalRecords().filter((p) => p.id !== record.id);
    prs.push(record);
    this.savePersonalRecords(prs);
  },

  // CHAT HISTORY
  getChatHistory(): ChatMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AI_CHAT_HISTORY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to read chat history', e);
    }
    const seedChat: ChatMessage[] = [
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `Welcome to **DENT ZYM APP**! I am your personal fitness & sports nutrition coach. 

I'm calibrated to your profile: **Muscle Gain** with **Gym Training**. How can we accelerate your progress today? You can ask me for custom workout routines, high-protein meal blueprints (including Indian foods like paneer and dal), or recovery advice!`,
        timestamp: new Date().toISOString(),
        isDemo: false,
      },
    ];
    this.saveChatHistory(seedChat);
    return seedChat;
  },

  saveChatHistory(messages: ChatMessage[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AI_CHAT_HISTORY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  },

  // BACKUP & RESET
  exportAllData(): string {
    const data = {
      profile: this.getUserProfile(),
      workouts: this.getCompletedWorkouts(),
      meals: this.getMealLogs(),
      weights: this.getWeightRecords(),
      personalRecords: this.getPersonalRecords(),
      exportedAt: new Date().toISOString(),
      appName: 'DENT ZYM APP',
    };
    return JSON.stringify(data, null, 2);
  },

  resetAllData(): void {
    localStorage.clear();
    this.saveUserProfile(DEFAULT_USER_PROFILE);
    this.saveCompletedWorkouts(SEED_COMPLETED_WORKOUTS);
    this.saveWeightRecords(SEED_WEIGHT_RECORDS);
    this.savePersonalRecords(SEED_PERSONAL_RECORDS);
    this.saveMealLogs(SEED_TODAY_MEALS);
  },
};
