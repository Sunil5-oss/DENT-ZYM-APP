import { FoodItem, DietTemplate } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
  // INDIAN STAPLES
  {
    id: 'food-roti',
    name: 'Whole Wheat Roti / Chapati',
    category: 'Indian Staples',
    servingUnit: '1 medium roti (approx 35g)',
    caloriesPerServing: 75,
    proteinGrams: 3.1,
    carbsGrams: 15.5,
    fatGrams: 0.5,
    fiberGrams: 2.2,
    isVegetarian: true,
  },
  {
    id: 'food-rice-white',
    name: 'Steamed Basmati Rice',
    category: 'Indian Staples',
    servingUnit: '1 cooked katori / bowl (150g)',
    caloriesPerServing: 195,
    proteinGrams: 4.2,
    carbsGrams: 43.0,
    fatGrams: 0.4,
    fiberGrams: 0.9,
    isVegetarian: true,
  },
  {
    id: 'food-dal-moong',
    name: 'Yellow Moong Dal (Tadka)',
    category: 'Indian Staples',
    servingUnit: '1 cooked bowl (180g)',
    caloriesPerServing: 145,
    proteinGrams: 9.5,
    carbsGrams: 20.0,
    fatGrams: 3.2,
    fiberGrams: 4.5,
    isVegetarian: true,
  },
  {
    id: 'food-dal-makhani',
    name: 'Dal Makhani (Traditional)',
    category: 'Indian Staples',
    servingUnit: '1 bowl (180g)',
    caloriesPerServing: 240,
    proteinGrams: 8.8,
    carbsGrams: 24.5,
    fatGrams: 12.0,
    fiberGrams: 5.2,
    isVegetarian: true,
  },
  {
    id: 'food-soya-chunks',
    name: 'Soya Chunks (Cooked Curry)',
    category: 'Indian Staples',
    servingUnit: '1 bowl cooked (150g)',
    caloriesPerServing: 180,
    proteinGrams: 25.0,
    carbsGrams: 14.0,
    fatGrams: 1.5,
    fiberGrams: 6.0,
    isVegetarian: true,
  },
  {
    id: 'food-chana-roasted',
    name: 'Roasted Chana (Bengal Gram)',
    category: 'Indian Staples',
    servingUnit: '1 handful (50g)',
    caloriesPerServing: 185,
    proteinGrams: 9.8,
    carbsGrams: 29.0,
    fatGrams: 2.7,
    fiberGrams: 7.2,
    isVegetarian: true,
  },

  // PROTEINS & DAIRY
  {
    id: 'food-paneer',
    name: 'Fresh Paneer (Cottage Cheese)',
    category: 'Dairy',
    servingUnit: '100g raw cubes',
    caloriesPerServing: 265,
    proteinGrams: 18.3,
    carbsGrams: 3.4,
    fatGrams: 20.5,
    fiberGrams: 0,
    isVegetarian: true,
  },
  {
    id: 'food-paneer-lowfat',
    name: 'Low-Fat Paneer',
    category: 'Dairy',
    servingUnit: '100g raw cubes',
    caloriesPerServing: 155,
    proteinGrams: 24.0,
    carbsGrams: 4.0,
    fatGrams: 4.5,
    fiberGrams: 0,
    isVegetarian: true,
  },
  {
    id: 'food-curd',
    name: 'Plain Curd / Dahi',
    category: 'Dairy',
    servingUnit: '1 cup (200g)',
    caloriesPerServing: 120,
    proteinGrams: 7.5,
    carbsGrams: 9.0,
    fatGrams: 6.0,
    fiberGrams: 0,
    isVegetarian: true,
  },
  {
    id: 'food-milk-toned',
    name: 'Toned Cow Milk',
    category: 'Dairy',
    servingUnit: '1 glass (250ml)',
    caloriesPerServing: 145,
    proteinGrams: 7.8,
    carbsGrams: 12.0,
    fatGrams: 7.0,
    fiberGrams: 0,
    isVegetarian: true,
  },
  {
    id: 'food-whey',
    name: 'Whey Protein Isolate',
    category: 'Proteins',
    servingUnit: '1 standard scoop (32g)',
    caloriesPerServing: 120,
    proteinGrams: 25.0,
    carbsGrams: 2.0,
    fatGrams: 1.0,
    fiberGrams: 0,
    isVegetarian: true,
  },
  {
    id: 'food-egg-whole',
    name: 'Whole Boiled Egg',
    category: 'Proteins',
    servingUnit: '1 large egg (50g)',
    caloriesPerServing: 74,
    proteinGrams: 6.3,
    carbsGrams: 0.4,
    fatGrams: 5.0,
    fiberGrams: 0,
    isVegetarian: false,
  },
  {
    id: 'food-egg-white',
    name: 'Boiled Egg Whites',
    category: 'Proteins',
    servingUnit: '2 large whites (66g)',
    caloriesPerServing: 34,
    proteinGrams: 7.2,
    carbsGrams: 0.5,
    fatGrams: 0.1,
    fiberGrams: 0,
    isVegetarian: false,
  },
  {
    id: 'food-chicken-breast',
    name: 'Grilled Chicken Breast',
    category: 'Proteins',
    servingUnit: '150g cooked fillet',
    caloriesPerServing: 245,
    proteinGrams: 46.5,
    carbsGrams: 0,
    fatGrams: 5.4,
    fiberGrams: 0,
    isVegetarian: false,
  },

  // GRAINS & CARBS
  {
    id: 'food-oats',
    name: 'Rolled Oats (Dry)',
    category: 'Grains & Carbs',
    servingUnit: '1 bowl / 50g dry',
    caloriesPerServing: 190,
    proteinGrams: 6.8,
    carbsGrams: 34.0,
    fatGrams: 3.2,
    fiberGrams: 5.3,
    isVegetarian: true,
  },
  {
    id: 'food-brown-rice',
    name: 'Brown Rice (Cooked)',
    category: 'Grains & Carbs',
    servingUnit: '1 cooked cup (150g)',
    caloriesPerServing: 170,
    proteinGrams: 3.8,
    carbsGrams: 36.0,
    fatGrams: 1.4,
    fiberGrams: 2.8,
    isVegetarian: true,
  },

  // FRUITS & NUTS
  {
    id: 'food-banana',
    name: 'Ripe Banana',
    category: 'Fruits & Veggies',
    servingUnit: '1 medium fruit (118g)',
    caloriesPerServing: 105,
    proteinGrams: 1.3,
    carbsGrams: 27.0,
    fatGrams: 0.3,
    fiberGrams: 3.1,
    isVegetarian: true,
  },
  {
    id: 'food-apple',
    name: 'Fresh Red Apple',
    category: 'Fruits & Veggies',
    servingUnit: '1 medium fruit (150g)',
    caloriesPerServing: 80,
    proteinGrams: 0.4,
    carbsGrams: 21.0,
    fatGrams: 0.2,
    fiberGrams: 4.0,
    isVegetarian: true,
  },
  {
    id: 'food-mixed-veggies',
    name: 'Steamed / Sauteed Greens & Veggies',
    category: 'Fruits & Veggies',
    servingUnit: '1 generous bowl (200g)',
    caloriesPerServing: 65,
    proteinGrams: 3.2,
    carbsGrams: 11.0,
    fatGrams: 1.2,
    fiberGrams: 4.8,
    isVegetarian: true,
  },
  {
    id: 'food-almonds',
    name: 'Raw California Almonds',
    category: 'Snacks',
    servingUnit: '15 nuts (20g)',
    caloriesPerServing: 115,
    proteinGrams: 4.2,
    carbsGrams: 4.3,
    fatGrams: 10.0,
    fiberGrams: 2.5,
    isVegetarian: true,
  },
  {
    id: 'food-peanut-butter',
    name: 'Natural Peanut Butter',
    category: 'Snacks',
    servingUnit: '1 tablespoon (32g)',
    caloriesPerServing: 190,
    proteinGrams: 8.0,
    carbsGrams: 6.0,
    fatGrams: 16.0,
    fiberGrams: 2.0,
    isVegetarian: true,
  }
];

export const DIET_TEMPLATES: DietTemplate[] = [
  {
    id: 'template-muscle-gain-veg',
    title: 'Indian Vegetarian Hypertrophy Diet',
    description: 'High-protein vegetarian blueprint utilizing paneer, yellow dal, curd, oats, and roasted chana.',
    targetGoal: 'Muscle Gain',
    dietPreference: 'Vegetarian',
    targetCalories: 2450,
    macros: {
      protein: 140,
      carbs: 280,
      fat: 65,
    },
    sampleMeals: [
      {
        mealType: 'Breakfast',
        items: ['Rolled Oats with Toned Milk & Banana', '15 Almonds', '1 Scoop Whey/Plant Protein']
      },
      {
        mealType: 'Lunch',
        items: ['2 Whole Wheat Rotis', '1 Bowl Yellow Moong Dal', '100g Fresh Paneer Curry', 'Cucumber Salad']
      },
      {
        mealType: 'Snacks',
        items: ['50g Roasted Chana', '1 Glass Green Tea / Black Coffee', '1 Apple']
      },
      {
        mealType: 'Dinner',
        items: ['1 Cooked Bowl Basmati Rice', '1 Bowl Soya Chunks Curry', '1 Cup Plain Curd (Dahi)']
      }
    ]
  },
  {
    id: 'template-fat-loss-shred',
    title: 'Lean Shred & Caloric Deficit Plan',
    description: 'Optimized high-protein, fiber-dense meals designed to shed body fat while defending lean muscle.',
    targetGoal: 'Fat Loss',
    dietPreference: 'Non-Vegetarian',
    targetCalories: 1850,
    macros: {
      protein: 165,
      carbs: 155,
      fat: 45,
    },
    sampleMeals: [
      {
        mealType: 'Breakfast',
        items: ['3 Boiled Egg Whites + 1 Whole Egg', '1 Slice Whole Grain Toast', 'Black Americano']
      },
      {
        mealType: 'Lunch',
        items: ['150g Grilled Chicken Breast', '1 Steamed Cup Brown Rice', 'Generous Green Leafy Salad']
      },
      {
        mealType: 'Snacks',
        items: ['1 Scoop Whey Protein with Water', '10 Almonds']
      },
      {
        mealType: 'Dinner',
        items: ['120g Pan-Seared Chicken or Low-Fat Paneer', '1 Bowl Mixed Steamed Vegetables', '1 Whole Wheat Roti']
      }
    ]
  },
  {
    id: 'template-strength-power',
    title: 'High-Performance Power & Strength',
    description: 'Calorically abundant, nutrient-dense nutrition to maximize central nervous system recovery and bar speed.',
    targetGoal: 'Strength Improvement',
    dietPreference: 'Non-Vegetarian',
    targetCalories: 2800,
    macros: {
      protein: 185,
      carbs: 340,
      fat: 75,
    },
    sampleMeals: [
      {
        mealType: 'Breakfast',
        items: ['3 Whole Eggs Scrambled', 'Large Bowl Rolled Oats with Honey & Berries', '1 Glass Milk']
      },
      {
        mealType: 'Lunch',
        items: ['200g Grilled Chicken Breast or 150g Paneer', '2 Bowls Basmati Rice', '1 Bowl Dal']
      },
      {
        mealType: 'Snacks',
        items: ['Peanut Butter Banana Toast', 'Whey Protein Shake', 'Handful Mixed Nuts']
      },
      {
        mealType: 'Dinner',
        items: ['3 Rotis', '150g Chicken/Paneer', '1 Cup Greek Yogurt / Curd', 'Green Salad']
      }
    ]
  },
  {
    id: 'template-clean-maintenance',
    title: 'Longevity & Clean Maintenance',
    description: 'Harmonious macro balance formulated for sustained energy, gut health, and daily athletic vitality.',
    targetGoal: 'General Fitness',
    dietPreference: 'Vegetarian',
    targetCalories: 2100,
    macros: {
      protein: 125,
      carbs: 235,
      fat: 55,
    },
    sampleMeals: [
      {
        mealType: 'Breakfast',
        items: ['Overnight Oats with Chia Seeds & Fruits', 'Handful Almonds', 'Spiced Masala Chai (No Sugar)']
      },
      {
        mealType: 'Lunch',
        items: ['2 Rotis', '1 Bowl Chana Masala / Dal', '1 Bowl Curd', 'Seasonal Greens']
      },
      {
        mealType: 'Snacks',
        items: ['Roasted Makhana or Roasted Chana', 'Fresh Orange or Guava']
      },
      {
        mealType: 'Dinner',
        items: ['1 Bowl Khichdi or Rice with Moong Dal', 'Stir-fried Paneer & Veggies']
      }
    ]
  }
];
