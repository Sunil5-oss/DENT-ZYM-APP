export type FitnessGoal =
  | 'Muscle Gain'
  | 'Fat Loss'
  | 'General Fitness'
  | 'Strength Improvement'
  | 'Weight Maintenance';

export type FitnessExperience = 'Beginner' | 'Intermediate' | 'Advanced';

export type DietaryPreference =
  | 'Vegetarian'
  | 'Non-Vegetarian'
  | 'Vegan'
  | 'Eggetarian'
  | 'High-Protein / Keto';

export type WorkoutLocation = 'Gym' | 'Home' | 'Both';

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Legs'
  | 'Abs'
  | 'Full Body'
  | 'Cardio';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  targetWeight?: number;
  experience: FitnessExperience;
  goal: FitnessGoal;
  diet: DietaryPreference;
  location: WorkoutLocation;
  workoutDaysPerWeek: number;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  isPremium: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  level: FitnessExperience;
  targetMuscle: string;
  secondaryMuscles?: string[];
  equipment: string;
  defaultSets: number;
  defaultReps: string;
  restDurationSeconds: number;
  instructions: string[];
  safetyTips: string[];
  caloriesBurnEstimate: number; // per 3 sets
  svgType: 'push' | 'pull' | 'legs' | 'core' | 'arms' | 'cardio';
}

export interface WorkoutSetTracker {
  setNumber: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface ActiveWorkoutSession {
  id: string;
  workoutTitle: string;
  category: MuscleGroup;
  exercises: {
    exercise: Exercise;
    sets: WorkoutSetTracker[];
  }[];
  currentExerciseIndex: number;
  elapsedSeconds: number;
  isActive: boolean;
  isPaused: boolean;
  startedAt: string;
}

export interface CompletedWorkout {
  id: string;
  title: string;
  category: MuscleGroup;
  durationMinutes: number;
  exercisesCompleted: number;
  totalSets: number;
  totalVolumeKg: number;
  caloriesBurned: number;
  date: string; // ISO string
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'Indian Staples' | 'Proteins' | 'Dairy' | 'Grains & Carbs' | 'Fruits & Veggies' | 'Snacks';
  servingUnit: string;
  caloriesPerServing: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams?: number;
  isVegetarian: boolean;
}

export interface MealLogItem {
  id: string;
  foodId: string;
  foodName: string;
  servings: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  timestamp: string;
}

export interface WeightRecord {
  id: string;
  weight: number;
  bodyFatPercentage?: number;
  date: string; // YYYY-MM-DD
  notes?: string;
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  maxWeightKg: number;
  reps: number;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isDemo?: boolean;
}

export interface DietTemplate {
  id: string;
  title: string;
  description: string;
  targetGoal: FitnessGoal;
  dietPreference: DietaryPreference;
  targetCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  sampleMeals: {
    mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
    items: string[];
  }[];
}
