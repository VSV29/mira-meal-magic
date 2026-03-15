import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigateBackOrTo } from "@/lib/navigation";
import { generateMealPlan } from "@/hooks/use-meal-plan";

const LoadingTransition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any) || {};
  const [phase, setPhase] = useState(0);

  const cuisines: string[] = state.cuisines || [];
  const diet: string = state.diet || "Non-Vegetarian";
  const weekday: string = state.weekday || "30 min";
  const weekend: string = state.weekend || "60 min";
  const country: string = state.country || "your region";

  // Generate meal plan on mount
  useEffect(() => {
    const plan = generateMealPlan(cuisines, diet, parseInt(weekday) || 30, parseInt(weekend) || 60);
    localStorage.setItem("mealmate-meal-plan", JSON.stringify(plan));
    localStorage.setItem("mealmate-user-profile", JSON.stringify({
      country, cuisines, diet,
      religious: state.religious || [],
      weekday, weekend,
    }));
    window.dispatchEvent(new Event("mealplan-updated"));

    const t1 = setTimeout(() => setPhase(1), 2500);
    return () => clearTimeout(t1);
  }, []);

  const goHome = () => navigate("/home");

  const pantryCount = Object.values(state.pantryItems || {}).flat().length;

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-center relative"
      style={{ background: "linear-gradient(180deg, hsl(263,84%,58%), hsl(270,60%,25%))" }}>

      {phase === 0 && (
        <button onClick={() => navigateBackOrTo(navigate)} className="absolute top-12 left-5 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform">
          <span className="text-cream text-sm">←</span>
        </button>
      )}

      <div className="w-20 h-20 rounded-full bg-card border-[3px] border-mira-purple flex items-center justify-center animate-pulse-gentle">
        <span className="text-4xl">✨</span>
      </div>

      <p className="text-xl font-bold text-cream mt-6">
        {phase === 0 ? "Mira™ is building your plan..." : "Done! Your personalised week is ready 🎉"}
      </p>

      {phase === 0 && (
        <div className="relative w-16 h-16 mt-6 animate-spin-slow">
          {["🍛", "🍱", "🥘"].map((e, i) => (
            <span key={i} className="absolute text-2xl" style={{
              top: `${50 - 40 * Math.cos((i * 2 * Math.PI) / 3)}%`,
              left: `${50 + 40 * Math.sin((i * 2 * Math.PI) / 3)}%`,
              transform: "translate(-50%, -50%)",
            }}>{e}</span>
          ))}
        </div>
      )}

      <div className="w-2/5 h-1 bg-cream/20 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-cream rounded-full animate-fill-bar" />
      </div>
      <p className="text-[12px] text-cream/70 mt-2">
        {phase === 0 ? "Analysing your cuisines, pantry & schedule..." : ""}
      </p>

      {phase === 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-5 animate-slide-up">
          <p className="text-lg font-bold text-navy">✅ All set{country ? `, ${country} foodie` : ""}!</p>
          <div className="mt-3 space-y-2 text-[13px] text-foreground">
            <p>✓ Cuisines: {cuisines.length > 0 ? cuisines.join(" · ") : "Global mix"}</p>
            <p>✓ Diet: {diet}{state.religious?.length > 0 ? `, ${state.religious.join(", ")}` : ""}</p>
            <p>✓ Weekdays: {weekday} max · Weekends: {weekend} max</p>
            <p>✓ Pantry: {pantryCount > 0 ? `${pantryCount} ingredients used` : "No items yet"} — shopping list ready</p>
          </div>
          <button onClick={goHome}
            className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base mt-4 active:scale-[0.98] transition-transform">
            Let's go →
          </button>
        </div>
      )}
    </div>
  );
};

export default LoadingTransition;
