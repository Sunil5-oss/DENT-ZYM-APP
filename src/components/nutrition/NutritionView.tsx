import React, { useState } from 'react';
import { UserProfile, MealLogItem, FoodItem, DietTemplate } from '../../types';
import { FOOD_DATABASE, DIET_TEMPLATES } from '../../data/foodData';
import {
  Utensils,
  Plus,
  Trash2,
  Search,
  Check,
  Flame,
  Droplet,
} from 'lucide-react';

interface NutritionViewProps {
  userProfile: UserProfile;
  mealLogs: MealLogItem[];
  onAddMeal: (item: MealLogItem) => void;
  onDeleteMeal: (id: string) => void;
  waterIntakeMl: number;
  onUpdateWater: (delta: number) => void;
}

export const NutritionView: React.FC<NutritionViewProps> = ({
  userProfile,
  mealLogs,
  onAddMeal,
  onDeleteMeal,
}) => {
  const [selectedMealType, setSelectedMealType] = useState<
    'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
  >('Breakfast');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servingsCount, setServingsCount] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'log' | 'templates'>('log');

  const targetCalories =
    userProfile.goal === 'Fat Loss'
      ? 1850
      : userProfile.goal === 'Muscle Gain'
      ? 2500
      : userProfile.goal === 'Strength Improvement'
      ? 2750
      : 2150;

  const targetProtein = Math.round(userProfile.weight * 1.9);
  const targetCarbs = Math.round(userProfile.weight * 3.2);
  const targetFat = Math.round(userProfile.weight * 0.85);

  const totalCalories = mealLogs.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = mealLogs.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = mealLogs.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = mealLogs.reduce((acc, m) => acc + m.fat, 0);

  const mealTypes: ('Breakfast' | 'Lunch' | 'Dinner' | 'Snacks')[] = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snacks',
  ];

  const filteredFoods = FOOD_DATABASE.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogFood = () => {
    if (!selectedFood) return;

    const newLog: MealLogItem = {
      id: `ml-${Date.now()}`,
      foodId: selectedFood.id,
      foodName: selectedFood.name,
      servings: Number(servingsCount),
      servingUnit: selectedFood.servingUnit,
      calories: Math.round(selectedFood.caloriesPerServing * servingsCount),
      protein: Math.round(selectedFood.proteinGrams * servingsCount * 10) / 10,
      carbs: Math.round(selectedFood.carbsGrams * servingsCount * 10) / 10,
      fat: Math.round(selectedFood.fatGrams * servingsCount * 10) / 10,
      mealType: selectedMealType,
      timestamp: new Date().toISOString(),
    };

    onAddMeal(newLog);
    setSelectedFood(null);
    setServingsCount(1);
    setIsSearchOpen(false);
  };

  const handleApplyTemplate = (template: DietTemplate) => {
    template.sampleMeals.forEach((mealGroup) => {
      mealGroup.items.forEach((itemText) => {
        const matched = FOOD_DATABASE.find((f) =>
          itemText.toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
        );

        if (matched) {
          onAddMeal({
            id: `ml-${Date.now()}-${Math.random()}`,
            foodId: matched.id,
            foodName: matched.name,
            servings: 1,
            servingUnit: matched.servingUnit,
            calories: matched.caloriesPerServing,
            protein: matched.proteinGrams,
            carbs: matched.carbsGrams,
            fat: matched.fatGrams,
            mealType: mealGroup.mealType,
            timestamp: new Date().toISOString(),
          });
        }
      });
    });
    setActiveTab('log');
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12 max-w-6xl mx-auto">
      {/* Header and View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#F5F6FA] tracking-tight">
            Smart Nutrition & Diet Architecture
          </h1>
          <p className="text-xs text-[#A4A7B2] mt-0.5">
            Macro-accurate food logging with authentic Indian food database & goal-specific blueprints.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#171923] border border-[#272B3B] rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('log')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'log'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            Today's Log
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-[#C6FF4D] text-[#101116] shadow-sm'
                : 'text-[#A4A7B2] hover:text-[#F5F6FA]'
            }`}
          >
            Diet Templates ({DIET_TEMPLATES.length})
          </button>
        </div>
      </div>

      {/* Daily Macro Bar Summary */}
      <div className="p-5 rounded-3xl bg-[#171924] border border-[#262A3B] space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-[#A4A7B2] uppercase tracking-wider">
              Daily Caloric Balance
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-tabular font-black text-2xl text-[#F5F6FA]">
                {totalCalories}
              </span>
              <span className="text-xs text-[#A4A7B2]">/ {targetCalories} kcal</span>
              <span className="text-xs text-[#C6FF4D] font-bold">
                ({Math.max(0, targetCalories - totalCalories)} remaining)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedMealType('Breakfast');
                setIsSearchOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#C6FF4D] text-[#101116] text-xs font-bold hover:bg-[#d5ff73] transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#C6FF4D]/10"
            >
              <Plus className="w-4 h-4" />
              <span>Log Food Entry</span>
            </button>
          </div>
        </div>

        {/* 3 Macro Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Protein */}
          <div className="p-3 rounded-2xl bg-[#12131A] border border-[#222533]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A4A7B2] font-semibold">Protein</span>
              <span className="font-tabular font-bold text-[#C6FF4D]">
                {Math.round(totalProtein)}g / {targetProtein}g
              </span>
            </div>
            <div className="w-full bg-[#20232F] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C6FF4D] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalProtein / targetProtein) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="p-3 rounded-2xl bg-[#12131A] border border-[#222533]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A4A7B2] font-semibold">Carbohydrates</span>
              <span className="font-tabular font-bold text-[#F5F6FA]">
                {Math.round(totalCarbs)}g / {targetCarbs}g
              </span>
            </div>
            <div className="w-full bg-[#20232F] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#54A0FF] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalCarbs / targetCarbs) * 100)}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="p-3 rounded-2xl bg-[#12131A] border border-[#222533]">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A4A7B2] font-semibold">Healthy Fats</span>
              <span className="font-tabular font-bold text-[#F5F6FA]">
                {Math.round(totalFat)}g / {targetFat}g
              </span>
            </div>
            <div className="w-full bg-[#20232F] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#9B7BFF] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (totalFat / targetFat) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: MEAL LOG */}
      {activeTab === 'log' && (
        <div className="space-y-4">
          {mealTypes.map((type) => {
            const items = mealLogs.filter((m) => m.mealType === type);
            const mealCals = items.reduce((acc, i) => acc + i.calories, 0);
            const mealProtein = items.reduce((acc, i) => acc + i.protein, 0);

            return (
              <div
                key={type}
                className="p-4 rounded-3xl bg-[#171923] border border-[#26293A] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#F5F6FA]">{type}</h3>
                    <span className="text-xs text-[#A4A7B2]">
                      ({mealCals} kcal · {Math.round(mealProtein)}g protein)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedMealType(type);
                      setIsSearchOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-[#202330] border border-[#2B2F40] text-xs font-semibold text-[#C6FF4D] hover:bg-[#2A2E3D] flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add {type}</span>
                  </button>
                </div>

                {items.length > 0 ? (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-[#12131A] border border-[#222533] flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-[#F5F6FA]">{item.foodName}</div>
                          <div className="text-[11px] text-[#A4A7B2] mt-0.5">
                            {item.servings} × {item.servingUnit}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="font-tabular font-bold text-[#F5F6FA] block">
                              {item.calories} kcal
                            </span>
                            <span className="text-[10px] text-[#C6FF4D]">
                              {item.protein}g protein
                            </span>
                          </div>

                          <button
                            onClick={() => onDeleteMeal(item.id)}
                            className="p-1 text-[#6B7082] hover:text-[#FF6B6B] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-[#6B7082] bg-[#121319] rounded-2xl border border-dashed border-[#222533]">
                    No items logged for {type} yet.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: DIET PLAN TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIET_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-5 rounded-3xl bg-[#171923] border border-[#272B3B] flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#C6FF4D] uppercase tracking-wider">
                    {tmpl.targetGoal} · {tmpl.dietPreference}
                  </span>
                  <span className="font-tabular font-bold text-xs text-[#F5F6FA]">
                    {tmpl.targetCalories} kcal
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#F5F6FA]">{tmpl.title}</h3>
                <p className="text-xs text-[#A4A7B2] mt-1">{tmpl.description}</p>

                {/* Macro breakdown */}
                <div className="grid grid-cols-3 gap-2 my-3 text-center text-xs bg-[#12131A] p-2 rounded-xl border border-[#222533]">
                  <div>
                    <span className="text-[#A4A7B2] block text-[10px]">Protein</span>
                    <span className="font-bold text-[#C6FF4D]">{tmpl.macros.protein}g</span>
                  </div>
                  <div>
                    <span className="text-[#A4A7B2] block text-[10px]">Carbs</span>
                    <span className="font-bold text-[#54A0FF]">{tmpl.macros.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-[#A4A7B2] block text-[10px]">Fats</span>
                    <span className="font-bold text-[#9B7BFF]">{tmpl.macros.fat}g</span>
                  </div>
                </div>

                {/* Sample meals preview */}
                <div className="space-y-1.5 text-xs text-[#A4A7B2]">
                  {tmpl.sampleMeals.map((sm, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="font-semibold text-[#F5F6FA] w-18 shrink-0">
                        {sm.mealType}:
                      </span>
                      <span className="truncate">{sm.items.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleApplyTemplate(tmpl)}
                className="w-full py-2.5 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs hover:bg-[#d5ff73] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-[#C6FF4D]/10"
              >
                <Check className="w-4 h-4" />
                <span>Apply This Plan to Today</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SEARCH & ADD FOOD MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#181A25] border border-[#2A2E3F] rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F5F6FA]">Log Food to {selectedMealType}</h3>
                <p className="text-xs text-[#A4A7B2]">
                  Select from verified Indian & global nutritional database
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSelectedFood(null);
                }}
                className="text-lg text-[#6B7082] hover:text-[#F5F6FA] font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7082]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roti, dal, paneer, chicken, oats, eggs..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111219] border border-[#282C3D] text-xs text-[#F5F6FA] placeholder-[#555A6E] focus:border-[#C6FF4D] focus:outline-none"
              />
            </div>

            {/* Food selection list */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredFoods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedFood?.id === food.id
                      ? 'bg-[#1F2332] border-[#C6FF4D] text-[#F5F6FA]'
                      : 'bg-[#12131A] border-[#242738] text-[#A4A7B2] hover:border-[#383C50]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#F5F6FA]">{food.name}</div>
                    <div className="text-[11px] text-[#A4A7B2] mt-0.5">
                      {food.servingUnit} · {food.category}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-tabular font-bold text-xs text-[#F5F6FA] block">
                      {food.caloriesPerServing} kcal
                    </span>
                    <span className="text-[10px] text-[#C6FF4D]">
                      {food.proteinGrams}g P · {food.carbsGrams}g C · {food.fatGrams}g F
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Servings control & Confirm */}
            {selectedFood && (
              <div className="pt-3 border-t border-[#252837] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A4A7B2]">Serving Multiplier:</span>
                  <div className="flex items-center gap-2">
                    {[0.5, 1, 1.5, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() => setServingsCount(s)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          servingsCount === s
                            ? 'bg-[#C6FF4D] text-[#101116]'
                            : 'bg-[#202330] text-[#A4A7B2] hover:text-[#F5F6FA]'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#121319] border border-[#242738] flex items-center justify-between text-xs">
                  <span className="text-[#A4A7B2]">Calculated Nutrition:</span>
                  <span className="font-tabular font-bold text-[#C6FF4D]">
                    {Math.round(selectedFood.caloriesPerServing * servingsCount)} kcal ·{' '}
                    {(selectedFood.proteinGrams * servingsCount).toFixed(1)}g Protein
                  </span>
                </div>

                <button
                  onClick={handleLogFood}
                  className="w-full py-3 rounded-xl bg-[#C6FF4D] text-[#101116] font-bold text-xs hover:bg-[#d5ff73] transition-all cursor-pointer shadow-md shadow-[#C6FF4D]/15"
                >
                  Confirm & Add to {selectedMealType}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
