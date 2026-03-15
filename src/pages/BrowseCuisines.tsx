import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import MealSlotPicker from "@/components/MealSlotPicker";
import { recipes, getCuisinesByCountry, getCuisinesByRegion, getRecipes, type Recipe } from "@/data/recipes";
import { useMealPlan, type MealSlot } from "@/hooks/use-meal-plan";
import { toast } from "sonner";

const cuisineEmojis: Record<string, string> = {
  "North Indian": "🍛", "South Indian": "🥘", "Bengali": "🐟", "Gujarati": "🫓",
  "Punjabi": "🫔", "Mughlai": "🥘", "Biryani Special": "🫙", "Street Food": "🌯",
  "Pakistani": "🇵🇰", "Sri Lankan": "🇱🇰", "Bangladeshi": "🇧🇩", "Nepali": "🇳🇵",
  "Japanese": "🍱", "Chinese": "🍜", "Korean": "🇰🇷", "Thai": "🍲",
  "Vietnamese": "🍜", "Singaporean": "🥡", "Malaysian": "🍛", "Indonesian": "🥘", "Filipino": "🥢",
  "Italian": "🍕", "French": "🥐", "Spanish": "🇪🇸", "Greek": "🇬🇷", "German": "🇩🇪", "British": "🇬🇧",
  "Mexican": "🌮", "American": "🍔", "Brazilian": "🇧🇷", "Peruvian": "🇵🇪",
  "Lebanese": "🧆", "Turkish": "🇹🇷", "Persian": "🥘", "Arabic": "🫓", "Middle Eastern": "🥙", "Mediterranean": "🥗",
  "Nigerian": "🇳🇬", "Ethiopian": "🇪🇹", "Moroccan": "🫕", "South African": "🇿🇦",
  "Dim Sum": "🥟", "Sushi & Sashimi": "🍣", "Ramen": "🍜",
};

const BrowseCuisines = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { country, region } = (location.state as any) || {};
  const { addRecipeToSlot } = useMealPlan();

  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dietFilter, setDietFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [showSlotPicker, setShowSlotPicker] = useState(false);

  const cuisines = useMemo(() => {
    const list: string[] = [];
    if (country) list.push(...getCuisinesByCountry(country));
    if (region) {
      getCuisinesByRegion(region).forEach(c => { if (!list.includes(c)) list.push(c); });
    }
    [...new Set(recipes.map(r => r.cuisine))].forEach(c => { if (!list.includes(c)) list.push(c); });
    return list;
  }, [country, region]);

  const filteredCuisines = search
    ? cuisines.filter(c => c.toLowerCase().includes(search.toLowerCase()))
    : cuisines;

  const filteredRecipes = useMemo(() => {
    if (!selectedCuisine) return [];
    return getRecipes({
      cuisine: selectedCuisine,
      diet: dietFilter !== "All" ? dietFilter : undefined,
    });
  }, [selectedCuisine, dietFilter]);

  const diets = ["All", "Vegetarian", "Vegan", "Non-Vegetarian", "Pescatarian"];

  const handleAddToMealPlan = (day: string, slot: MealSlot) => {
    if (!selectedRecipe) return;
    addRecipeToSlot(day, slot, {
      name: selectedRecipe.name,
      time: selectedRecipe.time,
      cuisine: selectedRecipe.cuisine,
      cuisineCode: selectedRecipe.cuisineCode,
      emoji: selectedRecipe.emoji,
    });
    setShowSlotPicker(false);
    setSelectedRecipe(null);
    toast.success(`✅ ${selectedRecipe.name} added to ${day} ${slot === "B" ? "Breakfast" : slot === "L" ? "Lunch" : "Dinner"}!`);
  };

  return (
    <div className="mobile-container bg-cream min-h-screen pb-20">
      <div className="sticky top-0 z-20 bg-navy px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-cream text-lg">←</button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-cream">Browse Cuisines</h1>
            {country && <p className="text-[11px] text-cream/60">{country} · {region}</p>}
          </div>
        </div>
      </div>

      {!selectedCuisine ? (
        <div className="px-4 pt-4 space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mm-gray">🔍</span>
            <input type="text" placeholder="Search cuisines..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-light-gray text-sm outline-none" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {filteredCuisines.map(c => {
              const count = recipes.filter(r => r.cuisine === c).length;
              return (
                <button key={c} onClick={() => setSelectedCuisine(c)}
                  className="bg-card rounded-xl shadow-card p-3 flex flex-col items-center gap-1 active:scale-95 transition-transform">
                  <span className="text-[28px]">{cuisineEmojis[c] || "🍽️"}</span>
                  <span className="text-[11px] font-bold text-foreground text-center leading-tight">{c}</span>
                  <span className="text-[9px] text-mm-gray">{count} recipes</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="px-4 pt-4 space-y-3">
          <button onClick={() => setSelectedCuisine(null)} className="text-saffron text-sm font-semibold flex items-center gap-1">
            ← All Cuisines
          </button>
          <h2 className="text-lg font-bold text-navy flex items-center gap-2">
            {cuisineEmojis[selectedCuisine] || "🍽️"} {selectedCuisine}
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {diets.map(d => (
              <button key={d} onClick={() => setDietFilter(d)}
                className={`h-8 px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                  dietFilter === d ? "bg-saffron text-cream" : "bg-card border border-light-gray text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredRecipes.length === 0 && (
              <p className="text-sm text-mm-gray text-center py-8">No recipes found for this filter</p>
            )}
            {filteredRecipes.map(r => (
              <button key={r.id} onClick={() => setSelectedRecipe(r)}
                className="w-full bg-card rounded-xl shadow-card p-4 text-left active:scale-[0.98] transition-transform">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{r.name}</p>
                    <p className="text-[11px] text-mm-gray mt-0.5">{r.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">⏱ {r.time}</span>
                      <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">🔥 {r.calories} cal</span>
                      <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">💪 {r.protein}</span>
                      <span className={`text-[10px] rounded-full px-2 py-0.5 ${
                        r.difficulty === "Easy" ? "bg-green-light text-mm-green" :
                        r.difficulty === "Medium" ? "bg-saffron-light text-saffron" :
                        "bg-coral/10 text-coral"
                      }`}>{r.difficulty}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recipe detail sheet */}
      {selectedRecipe && !showSlotPicker && (
        <div className="fixed inset-0 z-40 flex items-end" onClick={() => setSelectedRecipe(null)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative w-full max-w-[390px] mx-auto bg-card rounded-t-2xl" style={{ maxHeight: "75vh" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center pt-3"><div className="w-8 h-1 bg-mm-gray/30 rounded-full" /></div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(75vh - 20px)" }}>
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selectedRecipe.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-navy">{selectedRecipe.name}</h3>
                  <p className="text-[12px] text-mm-gray">{selectedRecipe.cuisine} · {selectedRecipe.country}</p>
                </div>
              </div>
              <p className="text-[13px] text-mm-gray mt-2">{selectedRecipe.description}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-[11px] bg-light-gray rounded-full px-2.5 py-1">⏱ {selectedRecipe.time}</span>
                <span className="text-[11px] bg-light-gray rounded-full px-2.5 py-1">🔥 {selectedRecipe.calories} cal</span>
                <span className="text-[11px] bg-light-gray rounded-full px-2.5 py-1">💪 {selectedRecipe.protein}</span>
                <span className="text-[11px] bg-light-gray rounded-full px-2.5 py-1">🌾 {selectedRecipe.carbs}</span>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-bold text-foreground mb-2">Ingredients:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {selectedRecipe.ingredients.map(i => (
                    <p key={i} className="text-[12px] text-foreground">• {i}</p>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {selectedRecipe.diet.map(d => (
                  <span key={d} className="text-[10px] bg-mm-green/10 text-mm-green font-medium rounded-full px-2 py-0.5">{d}</span>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setShowSlotPicker(true)}
                  className="w-full h-11 rounded-lg bg-saffron text-cream font-bold text-sm active:scale-[0.98] transition-transform"
                >
                  📅 Add to Meal Plan
                </button>
                <button onClick={() => { setSelectedRecipe(null); navigate("/mira"); }}
                  className="w-full text-mira-purple text-sm font-medium">
                  💬 Ask Mira™ for step-by-step
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slot picker */}
      {showSlotPicker && selectedRecipe && (
        <MealSlotPicker
          recipeName={selectedRecipe.name}
          onSelect={handleAddToMealPlan}
          onClose={() => setShowSlotPicker(false)}
        />
      )}

      <BottomTabBar />
    </div>
  );
};

export default BrowseCuisines;
