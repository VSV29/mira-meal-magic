import { useState, useCallback, useEffect } from "react";

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

const defaultMealData: Record<string, DayMeals> = {
  Mon: {
    B: { name: "Poha + Chai", time: "12m", cuisine: "Indian", cuisineCode: "IN", emoji: "🍛" },
    L: { name: "Dal Tadka + Roti", time: "25m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🍛" },
    D: { name: "Palak Paneer", time: "30m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🥘" },
  },
  Tue: {
    B: { name: "Idli + Sambar", time: "10m", cuisine: "South Indian", cuisineCode: "IN-S", emoji: "🍚" },
    L: { name: "Chole Bhature", time: "35m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🍛" },
    D: { name: "Pasta Primavera", time: "30m", cuisine: "Italian", cuisineCode: "IT", emoji: "🍕" },
  },
  Wed: {
    B: { name: "Upma", time: "15m", cuisine: "South Indian", cuisineCode: "IN-S", emoji: "🍚" },
    L: { name: "Rajma Chawal", time: "30m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🍛" },
    D: { name: "Stir-fry Noodles", time: "20m", cuisine: "Chinese", cuisineCode: "CN", emoji: "🍜" },
  },
  Thu: {
    B: { name: "Paratha + Dahi", time: "15m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🫓" },
    L: { name: "Fish Curry Rice", time: "25m", cuisine: "Coastal", cuisineCode: "IN-C", emoji: "🐟" },
    D: { name: "Dal Makhani", time: "35m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🍛" },
  },
  Fri: {
    B: { name: "Moong Dal Chilla", time: "20m", cuisine: "Indian", cuisineCode: "IN", emoji: "🫓" },
    L: { name: "Pav Bhaji", time: "30m", cuisine: "West Indian", cuisineCode: "IN-W", emoji: "🍛" },
    D: { name: "Mezze Platter", time: "25m", cuisine: "Middle East", cuisineCode: "ME", emoji: "🥙" },
  },
  Sat: {
    B: { name: "Masala Dosa", time: "20m", cuisine: "South Indian", cuisineCode: "IN-S", emoji: "🍚" },
    L: { name: "Butter Chicken", time: "45m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🍛" },
    D: { name: "Miso Ramen", time: "35m", cuisine: "Japanese", cuisineCode: "JP", emoji: "🍜" },
  },
  Sun: {
    B: { name: "Aloo Paratha", time: "25m", cuisine: "North Indian", cuisineCode: "IN-N", emoji: "🫓" },
    L: { name: "Hyderabadi Biryani", time: "55m", cuisine: "Indian", cuisineCode: "IN", emoji: "🍛" },
    D: { name: "Khichdi + Papad", time: "20m", cuisine: "Indian", cuisineCode: "IN", emoji: "🍚" },
  },
};

function loadMealData(): Record<string, DayMeals> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultMealData;
}

export function useMealPlan() {
  const [mealData, setMealDataState] = useState<Record<string, DayMeals>>(loadMealData);

  const setMealData = useCallback((updater: Record<string, DayMeals> | ((prev: Record<string, DayMeals>) => Record<string, DayMeals>)) => {
    setMealDataState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // Dispatch storage event for cross-component sync
      window.dispatchEvent(new Event("mealplan-updated"));
      return next;
    });
  }, []);

  // Listen for updates from other components
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
