import { useState, useCallback, useEffect } from "react";
import { recipes, type Recipe } from "@/data/recipes";

export type Meal = {
  name: string;
  time: string;
  cuisine: string;
  cuisineCode: string;
  emoji: string;
  cooked?: boolean;
};

export type DayMeals = { B: Meal; L: Meal; D: Meal };
export type MealSlot = "B" | "L" | "D";

const STORAGE_KEY = "mealmate-meal-plan";

// Generate a meal plan from the recipe database based on user preferences
export function generateMealPlan(
  cuisines: string[],
  diet: string,
  weekdayMaxMin: number,
  weekendMaxMin: number
): Record<string, DayMeals> {
  // Filter recipes matching user's diet
  const dietFiltered = recipes.filter(r => {
    if (diet === "Non-Vegetarian") return true;
    return r.diet.includes(diet as any);
  });

  // Score recipes by cuisine match
  const scored = dietFiltered.map(r => {
    let score = 0;
    if (cuisines.length === 0) score = 1;
    else if (cuisines.includes(r.cuisine)) score = 3;
    else score = 0.5; // allow some variety
    return { ...r, score };
  }).filter(r => r.score > 0);

  // Separate into quick (breakfast) and regular meals
  const quickMeals = scored.filter(r => r.timeMinutes <= 20).sort(() => Math.random() - 0.5);
  const regularMeals = scored.filter(r => r.timeMinutes > 15).sort(() => Math.random() - 0.5);

  const usedNames = new Set<string>();

  const pickMeal = (pool: (Recipe & { score: number })[], maxTime: number): Meal => {
    // Prefer cuisine-matched, unused meals within time limit
    const candidates = pool
      .filter(r => !usedNames.has(r.name) && r.timeMinutes <= maxTime)
      .sort((a, b) => b.score - a.score);

    const pick = candidates[0] || pool.filter(r => r.timeMinutes <= maxTime)[0] || pool[0];
    if (pick) usedNames.add(pick.name);

    return pick ? {
      name: pick.name,
      time: pick.time,
      cuisine: pick.cuisine,
      cuisineCode: pick.cuisineCode,
      emoji: pick.emoji,
    } : {
      name: "Chef's Choice",
      time: "20m",
      cuisine: "Mixed",
      cuisineCode: "MX",
      emoji: "🍽️",
    };
  };

  const plan: Record<string, DayMeals> = {};

  DAYS.forEach((day, i) => {
    const isWeekend = i >= 5; // Sat, Sun
    const maxTime = isWeekend ? weekendMaxMin : weekdayMaxMin;
    const breakfastMax = Math.min(maxTime, 20);

    plan[day] = {
      B: pickMeal(quickMeals.length > 0 ? quickMeals : scored, breakfastMax),
      L: pickMeal(regularMeals.length > 0 ? regularMeals : scored, maxTime),
      D: pickMeal(regularMeals.length > 0 ? regularMeals : scored, maxTime),
    };
  });

  return plan;
}

function loadMealData(): Record<string, DayMeals> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Generate fallback on first access
  try {
    return generateMealPlan(["American", "Mexican", "BBQ / Grill"], "Non-Vegetarian", 30, 60);
  } catch {
    return {} as Record<string, DayMeals>;
  }
}

export function useMealPlan() {
  const [mealData, setMealDataState] = useState<Record<string, DayMeals>>(loadMealData);

  const setMealData = useCallback((updater: Record<string, DayMeals> | ((prev: Record<string, DayMeals>) => Record<string, DayMeals>)) => {
    setMealDataState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("mealplan-updated"));
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = () => {
      const data = loadMealData();
      setMealDataState(data);
    };
    window.addEventListener("mealplan-updated", handler);
    return () => window.removeEventListener("mealplan-updated", handler);
  }, []);

  const addRecipeToSlot = useCallback((day: string, slot: MealSlot, recipe: {
    name: string; time: string; cuisine: string; cuisineCode: string; emoji: string;
  }) => {
    setMealData(prev => {
      const updated = { ...prev };
      updated[day] = { ...updated[day] };
      updated[day][slot] = { ...recipe, cooked: false };
      return updated;
    });
  }, [setMealData]);

  const markCooked = useCallback((day: string, slot: MealSlot) => {
    setMealData(prev => {
      const updated = { ...prev };
      updated[day] = { ...updated[day] };
      updated[day][slot] = { ...updated[day][slot], cooked: true };
      return updated;
    });
  }, [setMealData]);

  return { mealData, setMealData, addRecipeToSlot, markCooked };
}

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const DATES = [14, 15, 16, 17, 18, 19, 20] as const;
