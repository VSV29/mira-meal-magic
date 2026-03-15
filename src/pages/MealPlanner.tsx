import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import MealSlotPicker from "@/components/MealSlotPicker";
import { getRecipesByIngredients, type Recipe } from "@/data/recipes";
import { useMealPlan, type MealSlot } from "@/hooks/use-meal-plan";
import { toast } from "sonner";
import { navigateBackOrTo } from "@/lib/navigation";

const commonIngredients: Record<string, string[]> = {
  "🌾 Grains": ["Rice", "Pasta", "Noodles", "Bread", "Flour", "Oats", "Quinoa", "Tortillas", "Couscous"],
  "🥦 Vegetables": ["Tomatoes", "Onions", "Potatoes", "Spinach", "Garlic", "Ginger", "Peppers", "Mushrooms", "Carrots", "Broccoli", "Zucchini", "Eggplant", "Corn", "Avocado", "Cucumber"],
  "🥩 Proteins": ["Chicken", "Eggs", "Tofu", "Paneer", "Chickpeas", "Lentils", "Fish", "Shrimp", "Beans", "Beef", "Pork"],
  "🥛 Dairy": ["Milk", "Butter", "Cheese", "Yoghurt", "Cream", "Ghee"],
  "🧂 Spices": ["Cumin", "Turmeric", "Chilli", "Pepper", "Garam Masala", "Paprika", "Cinnamon", "Oregano", "Basil", "Coriander"],
  "🫙 Pantry": ["Soy Sauce", "Olive Oil", "Coconut Milk", "Tomato Paste", "Vinegar", "Sesame Oil", "Tahini", "Miso Paste", "Lemon juice", "Lime"],
};

const timeSlots = [
  { label: "< 15 min", emoji: "⚡", max: 15 },
  { label: "15-30 min", emoji: "⏱", max: 30 },
  { label: "30-45 min", emoji: "🕐", max: 45 },
  { label: "45+ min", emoji: "🍳", max: 120 },
];

const diets = ["Any", "Vegetarian", "Vegan", "Non-Vegetarian", "Pescatarian"];

type Step = "ingredients" | "time" | "results";

const MealPlanner = () => {
  const navigate = useNavigate();
  const { addRecipeToSlot } = useMealPlan();
  const [step, setStep] = useState<Step>("ingredients");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(30);
  const [selectedDiet, setSelectedDiet] = useState("Any");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("🥦 Vegetables");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [search, setSearch] = useState("");
  const [showSlotPicker, setShowSlotPicker] = useState(false);

  const toggleIngredient = (i: string) => {
    setSelectedIngredients(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  const results = useMemo(() => {
    if (step !== "results" || selectedIngredients.length === 0) return [];
    return getRecipesByIngredients(
      selectedIngredients,
      selectedDiet !== "Any" ? selectedDiet : undefined,
      selectedTime
    );
  }, [step, selectedIngredients, selectedDiet, selectedTime]);

  const filteredIngredients = (items: string[]) => {
    if (!search) return items;
    return items.filter(i => i.toLowerCase().includes(search.toLowerCase()));
  };

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
      {/* Header */}
      <div className="sticky top-0 z-20 bg-navy px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => {
            if (step === "results") setStep("time");
            else if (step === "time") setStep("ingredients");
            else navigateBackOrTo(navigate);
          }} className="text-cream text-lg">←</button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-cream">Help Me Plan a Meal</h1>
            <p className="text-[11px] text-cream/60">
              {step === "ingredients" ? "Step 1: Select ingredients" : step === "time" ? "Step 2: Time & diet" : `${results.length} recipes found`}
            </p>
          </div>
        </div>
        <div className="flex gap-1 mt-2">
          {["ingredients", "time", "results"].map((s, i) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${
              (step === "ingredients" && i === 0) || (step === "time" && i <= 1) || step === "results"
                ? "bg-saffron" : "bg-cream/20"
            }`} />
          ))}
        </div>
      </div>

      {step === "ingredients" && (
        <div className="px-4 pt-4 space-y-3 pb-24">
          <h2 className="text-lg font-bold text-navy">What ingredients do you have?</h2>
          <p className="text-[12px] text-mm-gray">Select what's available — Mira™ finds the best match</p>
          {selectedIngredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selectedIngredients.map(i => (
                <button key={i} onClick={() => toggleIngredient(i)}
                  className="h-7 px-2.5 rounded-full bg-saffron text-cream text-[11px] font-medium flex items-center gap-1 active:scale-95">
                  {i} ✕
                </button>
              ))}
            </div>
          )}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mm-gray text-sm">🔍</span>
            <input type="text" placeholder="Search ingredients..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-light-gray text-sm outline-none" />
          </div>
          {Object.entries(commonIngredients).map(([category, items]) => {
            const filtered = filteredIngredients(items);
            if (filtered.length === 0) return null;
            const isExpanded = expandedCategory === category;
            return (
              <div key={category} className="bg-card rounded-xl shadow-card overflow-hidden">
                <button onClick={() => setExpandedCategory(isExpanded ? null : category)}
                  className="w-full flex items-center justify-between px-3 py-2.5">
                  <span className="text-sm font-bold text-foreground">{category}</span>
                  <div className="flex items-center gap-2">
                    {items.filter(i => selectedIngredients.includes(i)).length > 0 && (
                      <span className="text-[10px] bg-saffron text-cream px-1.5 py-0.5 rounded-full">
                        {items.filter(i => selectedIngredients.includes(i)).length}
                      </span>
                    )}
                    <span className={`text-mm-gray transition-transform ${isExpanded ? "rotate-90" : ""}`}>›</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-3 pb-3 flex flex-wrap gap-1.5">
                    {filtered.map(item => (
                      <button key={item} onClick={() => toggleIngredient(item)}
                        className={`h-8 px-3 rounded-full text-[12px] font-medium transition-all active:scale-95 ${
                          selectedIngredients.includes(item)
                            ? "bg-saffron-light border border-saffron text-foreground"
                            : "bg-light-gray border border-transparent text-foreground"
                        }`}>
                        {selectedIngredients.includes(item) ? "✓ " : ""}{item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
            <button onClick={() => setStep("time")} disabled={selectedIngredients.length === 0}
              className={`w-full h-[52px] rounded-xl font-bold text-base active:scale-[0.98] transition-all ${
                selectedIngredients.length > 0 ? "bg-saffron text-cream" : "bg-light-gray text-mm-gray cursor-not-allowed"
              }`}>
              Next: Set Time & Diet ({selectedIngredients.length} selected) →
            </button>
          </div>
        </div>
      )}

      {step === "time" && (
        <div className="px-4 pt-4 space-y-4 pb-24">
          <h2 className="text-lg font-bold text-navy">How much time do you have?</h2>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map(t => (
              <button key={t.label} onClick={() => setSelectedTime(t.max)}
                className={`h-16 rounded-xl flex flex-col items-center justify-center gap-1 shadow-card transition-all active:scale-95 ${
                  selectedTime === t.max ? "bg-saffron-light border-2 border-saffron" : "bg-card border-2 border-transparent"
                }`}>
                <span className="text-xl">{t.emoji}</span>
                <span className="text-[12px] font-bold text-foreground">{t.label}</span>
              </button>
            ))}
          </div>
          <h2 className="text-lg font-bold text-navy mt-2">Dietary preference?</h2>
          <div className="flex flex-wrap gap-2">
            {diets.map(d => (
              <button key={d} onClick={() => setSelectedDiet(d)}
                className={`h-9 px-4 rounded-full text-[13px] font-medium transition-all active:scale-95 ${
                  selectedDiet === d ? "bg-mm-green text-cream" : "bg-card border border-light-gray text-foreground"
                }`}>{d}</button>
            ))}
          </div>
          <div className="bg-card rounded-xl shadow-card p-3 mt-2">
            <p className="text-[12px] text-mm-gray">📋 Summary:</p>
            <p className="text-sm text-foreground mt-1">
              <strong>{selectedIngredients.length}</strong> ingredients · <strong>≤ {selectedTime}min</strong> · <strong>{selectedDiet}</strong>
            </p>
          </div>
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
            <button onClick={() => setStep("results")}
              className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform">
              ✨ Find Recipes →
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="px-4 pt-4 space-y-3 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy">Recipe Matches</h2>
            <span className="text-[12px] text-mm-gray">{results.length} found</span>
          </div>
          {results.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl">😔</span>
              <p className="text-sm text-mm-gray mt-2">No recipes match your ingredients and filters.</p>
              <button onClick={() => setStep("ingredients")} className="mt-3 text-saffron text-sm font-bold">← Try different ingredients</button>
            </div>
          )}
          {results.map(r => (
            <button key={r.id} onClick={() => setSelectedRecipe(r)}
              className="w-full bg-card rounded-xl shadow-card p-4 text-left active:scale-[0.98] transition-transform">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{r.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-foreground">{r.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.matchPercent >= 70 ? "bg-mm-green/10 text-mm-green" :
                      r.matchPercent >= 40 ? "bg-saffron-light text-saffron" :
                      "bg-light-gray text-mm-gray"
                    }`}>{r.matchPercent}% match</span>
                  </div>
                  <p className="text-[11px] text-mm-gray">{r.cuisine} · {r.country}</p>
                  <p className="text-[11px] text-mm-gray mt-0.5">{r.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">⏱ {r.time}</span>
                    <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">🔥 {r.calories} cal</span>
                    <span className="text-[10px] bg-light-gray rounded-full px-2 py-0.5">{r.matchCount}/{r.ingredients.length} ingredients</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recipe detail */}
      {selectedRecipe && !showSlotPicker && (
        <div className="fixed inset-0 z-[60] flex items-end" onClick={() => setSelectedRecipe(null)}>
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
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-bold text-foreground mb-2">Ingredients:</p>
                <div className="space-y-1">
                  {selectedRecipe.ingredients.map(i => {
                    const have = selectedIngredients.some(si =>
                      i.toLowerCase().includes(si.toLowerCase()) || si.toLowerCase().includes(i.toLowerCase())
                    );
                    return (
                      <p key={i} className="text-[12px] flex items-center gap-2">
                        <span className={have ? "text-mm-green" : "text-coral"}>{have ? "✅" : "🔴"}</span>
                        {i}
                        <span className="text-[10px] text-mm-gray">{have ? "— Have it" : "— Need to buy"}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setShowSlotPicker(true)}
                  className="w-full h-11 rounded-lg bg-saffron text-cream font-bold text-sm active:scale-[0.98]"
                >
                  📅 Add to Meal Plan
                </button>
                <button className="w-full h-11 rounded-lg bg-mm-green text-cream font-bold text-sm active:scale-[0.98]">
                  🛒 Add missing to Shopping List
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

export default MealPlanner;
