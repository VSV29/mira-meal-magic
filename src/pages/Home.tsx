import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import { toast } from "sonner";
import { useMealPlan, DAYS, DATES, type MealSlot } from "@/hooks/use-meal-plan";

import { recipes } from "@/data/recipes";

const cuisineColors: Record<string, string> = {
  "IN": "bg-saffron", "IN-N": "bg-saffron", "IN-W": "bg-saffron",
  "IN-S": "bg-mm-green", "IN-C": "bg-mm-green",
  "IT": "bg-[#276FBF]", "EU": "bg-[#276FBF]", "FR": "bg-[#276FBF]",
  "GR": "bg-[#276FBF]", "ES": "bg-[#276FBF]",
  "CN": "bg-coral", "JP": "bg-coral", "KR": "bg-coral",
  "TH": "bg-coral", "VN": "bg-coral",
  "ME": "bg-mira-purple", "LB": "bg-mira-purple", "TR": "bg-mira-purple",
  "US": "bg-[#3B82F6]", "MX": "bg-[#EF4444]", "BR": "bg-[#22C55E]",
  "PE": "bg-[#F59E0B]", "PK": "bg-mm-green", "LK": "bg-mm-green",
  "NG": "bg-[#22C55E]", "ET": "bg-[#F59E0B]", "MA": "bg-coral",
};

const todayIdx = 0;
const slotLabels: Record<MealSlot, string> = { B: "Breakfast", L: "Lunch", D: "Dinner" };
const slotEmoji: Record<MealSlot, string> = { B: "🌅", L: "☀️", D: "🌙" };

const Home = () => {
  const navigate = useNavigate();
  const { mealData, addRecipeToSlot, markCooked } = useMealPlan();
  const [cookedCount, setCookedCount] = useState(3);
  const [selectedMeal, setSelectedMeal] = useState<{ day: string; slot: MealSlot } | null>(null);
  const [showSwap, setShowSwap] = useState<{ day: string; slot: MealSlot } | null>(null);
  const [showNewPlan, setShowNewPlan] = useState(false);
  const [fabLabel, setFabLabel] = useState(true);

  // Load user profile
  const userProfile = (() => {
    try { return JSON.parse(localStorage.getItem("mealmate-user-profile") || "{}"); }
    catch { return {}; }
  })();
  const userName = userProfile.country || "";

  // Auto-hide fab label
  const [_init] = useState(() => {
    setTimeout(() => setFabLabel(false), 3000);
    return null;
  });

  const meal = selectedMeal ? mealData[selectedMeal.day]?.[selectedMeal.slot] : null;

  // Generate swap options from recipes
  const getSwapOptions = () => {
    const diet = userProfile.diet || "Non-Vegetarian";
    const filtered = recipes
      .filter(r => diet === "Non-Vegetarian" || r.diet.includes(diet as any))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return filtered.map(r => ({
      name: r.name, time: r.time, cuisine: r.cuisine, cuisineCode: r.cuisineCode, emoji: r.emoji,
    }));
  };

  const handleMarkCooked = () => {
    if (!selectedMeal) return;
    markCooked(selectedMeal.day, selectedMeal.slot);
    setCookedCount(c => c + 1);
    setSelectedMeal(null);
    toast.success(`🎉 ${meal?.name} marked as cooked! Pantry updated.`);
  };

  const handleSwapSelect = (opt: { name: string; time: string; cuisine: string; cuisineCode: string; emoji: string }) => {
    if (!showSwap) return;
    addRecipeToSlot(showSwap.day, showSwap.slot, opt);
    setShowSwap(null);
    setSelectedMeal(null);
    toast.success("Meal swapped ✅");
  };

  // Collect unique cuisine codes from current meal plan for legend
  const usedCuisineCodes = new Set<string>();
  DAYS.forEach(day => {
    (["B", "L", "D"] as const).forEach(slot => {
      const m = mealData[day]?.[slot];
      if (m) usedCuisineCodes.add(m.cuisineCode);
    });
  });

  return (
    <div className="mobile-container bg-cream min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-card shadow-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <p className="text-base font-bold text-navy">Good morning 👋</p>
              <p className="text-[12px] text-mm-gray">Week of Mar 14 – Mar 20</p>
            </div>
          </div>
          <div className="flex gap-2 text-lg">
            <span>⚙️</span>
            <span className="relative">🔔<span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-coral rounded-full" /></span>
          </div>
        </div>
      </div>

      {/* Mira banner */}
      <button onClick={() => navigate("/mira")} className="mx-4 mt-3 rounded-xl bg-mira-purple p-3.5 text-left">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-sm">✨</span>
          <div className="flex-1">
            <p className="text-[11px] font-bold text-[#E9D5FF]">Mira™:</p>
            <p className="text-[13px] text-cream mt-0.5">Your weekly meal plan is ready! Tap to chat with Mira™ for adjustments 🎉</p>
            <p className="text-[12px] text-[#E9D5FF] underline mt-1">Tap to chat with Mira™ →</p>
          </div>
        </div>
      </button>

      {/* Quick actions */}
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => navigate("/browse-cuisines")}
          className="bg-card rounded-xl shadow-card p-3 flex items-center gap-2.5 active:scale-95 transition-transform">
          <span className="w-10 h-10 rounded-lg bg-saffron-light flex items-center justify-center text-lg">🍽️</span>
          <div className="text-left">
            <p className="text-[12px] font-bold text-foreground">Browse Cuisines</p>
            <p className="text-[10px] text-mm-gray">Explore recipes by cuisine</p>
          </div>
        </button>
        <button onClick={() => navigate("/meal-planner")}
          className="bg-card rounded-xl shadow-card p-3 flex items-center gap-2.5 active:scale-95 transition-transform">
          <span className="w-10 h-10 rounded-lg bg-mira-purple-light flex items-center justify-center text-lg">✨</span>
          <div className="text-left">
            <p className="text-[12px] font-bold text-foreground">Plan a Meal</p>
            <p className="text-[10px] text-mm-gray">From your ingredients</p>
          </div>
        </button>
      </div>

      {/* Week grid with meal slot labels */}
      <div className="mt-3 px-4">
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          <div className="inline-block min-w-full">
            {/* Day headers row */}
            <div className="flex gap-1.5 mb-1" style={{ paddingLeft: "40px" }}>
              {DAYS.map((day, di) => (
                <div key={day} className="w-[72px] flex-shrink-0 text-center">
                  <p className="text-[11px] font-bold text-mm-gray">{day}</p>
                  <p className="text-sm font-bold text-navy">{DATES[di]}</p>
                  {di === todayIdx && (
                    <span className="inline-block text-[8px] font-bold bg-saffron text-cream px-1.5 py-0.5 rounded-full">TODAY</span>
                  )}
                </div>
              ))}
            </div>

            {/* Meal rows: B, L, D */}
            <div>
              {(["B", "L", "D"] as const).map((slot) => (
                <div key={slot} className="flex gap-1.5 mb-1.5">
                  {/* Slot label */}
                  <div className="w-[36px] flex-shrink-0 flex flex-col items-center justify-center">
                    <span className="text-sm">{slotEmoji[slot]}</span>
                    <span className="text-[8px] font-bold text-mm-gray leading-tight">{slotLabels[slot].slice(0, 1)}</span>
                  </div>
                  {/* Day cells */}
                  {DAYS.map((day) => {
                    const m = mealData[day]?.[slot];
                    if (!m) return <div key={day} className="w-[72px] flex-shrink-0 min-h-[90px]" />;
                    const cc = cuisineColors[m.cuisineCode] || "bg-mm-gray";
                    return (
                      <button key={day} onClick={() => setSelectedMeal({ day, slot })}
                        className={`relative w-[72px] flex-shrink-0 min-h-[90px] bg-card rounded-lg shadow-card overflow-hidden text-left transition-all active:scale-95 ${
                          m.cooked ? "opacity-60" : ""
                        }`}
                      >
                        <div className={`h-1 w-full ${cc}`} />
                        <div className="p-1.5">
                          <span className="text-lg">{m.emoji}</span>
                          <p className="text-[9px] font-bold text-foreground leading-tight mt-0.5 line-clamp-2">{m.name}</p>
                          <span className="inline-block text-[7px] text-mm-gray bg-light-gray rounded-full px-1 mt-0.5">⏱{m.time}</span>
                          <span className={`inline-block text-[8px] font-bold ${cc} text-cream rounded-full px-1 mt-0.5 ml-0.5`}>
                            {m.cuisineCode}
                          </span>
                          {m.cooked && <span className="absolute top-2 right-1 text-sm">✅</span>}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowSwap({ day, slot }); }}
                          className="absolute top-1.5 right-1 text-[10px] text-mm-gray"
                        >↔</button>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine legend - dynamic based on used codes */}
      <div className="mt-2 px-4 overflow-x-auto">
        <div className="flex gap-3 text-[10px] text-mm-gray whitespace-nowrap">
          {Array.from(usedCuisineCodes).map(code => {
            const bg = cuisineColors[code] || "bg-mm-gray";
            return (
              <span key={code} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-sm ${bg}`} />{code}
              </span>
            );
          })}
        </div>
      </div>

      {/* Weekly summary */}
      <div className="mx-4 mt-3 bg-card rounded-xl shadow-card p-3">
        <p className="text-sm font-bold text-foreground">📊 This week</p>
        <div className="flex gap-2 mt-2">
          <span className="text-[11px] bg-light-gray rounded-full px-2 py-1">🍳 21 meals</span>
          <span className="text-[11px] bg-light-gray rounded-full px-2 py-1">✅ {cookedCount} cooked</span>
          <span className="text-[11px] bg-light-gray rounded-full px-2 py-1">💰 est. budget</span>
        </div>
        <div className="mt-2">
          <div className="flex justify-between text-[11px] text-mm-gray">
            <span>Weekly progress</span>
          </div>
          <div className="h-1.5 bg-light-gray rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-mm-green rounded-full" style={{ width: `${Math.round((cookedCount / 21) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowNewPlan(true)}
        className="fixed bottom-24 right-6 h-13 bg-saffron text-cream shadow-elevated rounded-full flex items-center gap-2 px-4 py-3 active:scale-95 transition-transform z-30"
      >
        <span className="text-xl">↻</span>
        {fabLabel && <span className="text-sm font-bold">New Plan</span>}
      </button>

      {/* Meal detail sheet */}
      {selectedMeal && meal && (
        <div className="fixed inset-0 z-[60] flex items-end" onClick={() => setSelectedMeal(null)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative w-full max-w-[390px] mx-auto bg-card rounded-t-2xl animate-slide-up" style={{ maxHeight: "70vh" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center pt-3"><div className="w-8 h-1 bg-mm-gray/30 rounded-full" /></div>
            <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(70vh - 20px)" }}>
              <h3 className="text-xl font-bold text-navy">{meal.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className={`text-[11px] font-bold ${cuisineColors[meal.cuisineCode] || "bg-mm-gray"} text-cream px-2 py-0.5 rounded-full`}>{meal.cuisineCode}</span>
                <span className="text-[11px] bg-light-gray text-mm-gray px-2 py-0.5 rounded-full">⏱ {meal.time}</span>
              </div>
              <div className="mt-4">
                <p className="text-[13px] font-bold text-foreground mb-2">Meal type: {slotLabels[selectedMeal.slot]}</p>
              </div>
              <div className="mt-4 space-y-2">
                <button onClick={() => { setShowSwap(selectedMeal); }} className="w-full h-11 rounded-lg bg-saffron text-cream font-bold text-sm">↔ Swap this meal</button>
                <button onClick={handleMarkCooked} className="w-full h-11 rounded-lg bg-mm-green text-cream font-bold text-sm">✅ Mark as Cooked</button>
                <button className="w-full h-11 rounded-lg border border-coral text-coral font-bold text-sm">🚫 Never suggest this again</button>
                <button onClick={() => { setSelectedMeal(null); navigate("/mira"); }} className="w-full text-mira-purple text-sm font-medium">💬 Ask Mira™ about this recipe</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swap sheet */}
      {showSwap && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowSwap(null)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative w-full max-w-[390px] mx-auto bg-card rounded-t-2xl animate-slide-up p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-3"><div className="w-8 h-1 bg-mm-gray/30 rounded-full" /></div>
            <h3 className="text-lg font-bold text-navy mb-3">{slotLabels[showSwap.slot]} {showSwap.day} Swap</h3>
            <div className="space-y-2">
              {getSwapOptions().map((opt) => (
                <button key={opt.name} onClick={() => handleSwapSelect(opt)}
                  className="w-full flex items-center gap-3 bg-light-bg rounded-xl p-3 active:scale-[0.98] transition-transform">
                  <span className="text-2xl">{opt.emoji}</span>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-foreground">{opt.name}</p>
                    <p className="text-[11px] text-mm-gray">⏱{opt.time} · {opt.cuisine}</p>
                  </div>
                  <span className="text-saffron text-sm font-bold">Select</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New plan dialog */}
      {showNewPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-8" onClick={() => setShowNewPlan(false)}>
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="relative bg-card rounded-2xl p-6 shadow-elevated w-full max-w-[340px]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-navy">Generate a completely new week?</h3>
            <p className="text-[13px] text-mm-gray mt-1">Your current plan will be replaced.</p>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowNewPlan(false)} className="flex-1 h-11 rounded-lg border border-light-gray text-foreground font-semibold text-sm">Cancel</button>
              <button onClick={() => { setShowNewPlan(false); toast.success("New plan generated!"); }}
                className="flex-1 h-11 rounded-lg bg-saffron text-cream font-bold text-sm">Yes, refresh plan →</button>
            </div>
          </div>
        </div>
      )}

      <BottomTabBar />
    </div>
  );
};

export default Home;
