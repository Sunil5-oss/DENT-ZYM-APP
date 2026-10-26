/**
 * DENT ZYM APP — Core Fitness & Nutrition Mathematical Utilities
 */

export interface MacroDistribution {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 */
export function calculateBMR(weightKg: number, heightCm: number, ageYears: number, isMale: boolean = true): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) return 0;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return Math.round(isMale ? base + 5 : base - 161);
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE).
 */
export function calculateTDEE(
  bmr: number,
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'
): number {
  const multipliers = {
    Sedentary: 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.375));
}

/**
 * Calculates target macronutrient profile according to athlete goal.
 */
export function calculateTargetMacros(weightKg: number, goal: string): MacroDistribution {
  let targetCalories = 2200;
  let proteinPerKg = 1.8;
  let fatRatio = 0.25;

  switch (goal) {
    case 'Fat Loss':
      targetCalories = 1850;
      proteinPerKg = 2.1; // Higher protein to preserve lean muscle during deficit
      fatRatio = 0.22;
      break;
    case 'Muscle Gain':
      targetCalories = 2500;
      proteinPerKg = 1.9;
      fatRatio = 0.25;
      break;
    case 'Strength Improvement':
      targetCalories = 2750;
      proteinPerKg = 2.0;
      fatRatio = 0.26;
      break;
    case 'Weight Maintenance':
    default:
      targetCalories = 2150;
      proteinPerKg = 1.7;
      fatRatio = 0.25;
      break;
  }

  const proteinGrams = Math.round(weightKg * proteinPerKg);
  const proteinCals = proteinGrams * 4;
  const fatCals = targetCalories * fatRatio;
  const fatGrams = Math.round(fatCals / 9);
  const remainingCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbsGrams = Math.round(remainingCals / 4);

  return {
    calories: targetCalories,
    proteinGrams,
    carbsGrams,
    fatGrams,
  };
}

/**
 * Calculates Body Mass Index (BMI).
 */
export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; classification: string } {
  if (weightKg <= 0 || heightCm <= 0) return { bmi: 0, classification: 'Invalid' };
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let classification = 'Normal Weight';
  if (bmi < 18.5) classification = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) classification = 'Overweight';
  else if (bmi >= 30) classification = 'Obese';

  return { bmi, classification };
}

/**
 * Calculates total mechanical work / tonnage volume (kg).
 */
export function calculateWorkoutVolume(sets: { weight: number; reps: number; completed: boolean }[]): number {
  return sets.reduce((sum, s) => (s.completed ? sum + s.weight * s.reps : sum), 0);
}
