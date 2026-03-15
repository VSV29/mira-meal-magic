import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigateBackOrTo } from "@/lib/navigation";

const LoadingTransition = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0=loading, 1=done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500);
    const t2 = setTimeout(() => {}, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const goHome = () => navigate("/home");

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-center relative"
      style={{ background: "linear-gradient(180deg, hsl(263,84%,58%), hsl(270,60%,25%))" }}>
      
      {/* Pulsing logo */}
      <div className="w-20 h-20 rounded-full bg-card border-[3px] border-mira-purple flex items-center justify-center animate-pulse-gentle">
        <span className="text-4xl">✨</span>
      </div>

      <p className="text-xl font-bold text-cream mt-6">
        {phase === 0 ? "Mira™ is building your plan..." : "Done! Your personalised week is ready 🎉"}
      </p>

      {/* Spinning emojis */}
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

      {/* Progress bar */}
      <div className="w-2/5 h-1 bg-cream/20 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-cream rounded-full animate-fill-bar" />
      </div>
      <p className="text-[12px] text-cream/70 mt-2">
        {phase === 0 ? "Analysing your cuisines, pantry & schedule..." : ""}
      </p>

      {/* Summary card */}
      {phase === 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-5 animate-slide-up">
          <p className="text-lg font-bold text-navy">✅ All set, Priya!</p>
          <div className="mt-3 space-y-2 text-[13px] text-foreground">
            <p>✓ Cuisines: North Indian · South Indian · Japanese</p>
            <p>✓ Diet: Strict Vegetarian, Jain-friendly</p>
            <p>✓ Weekdays: 30 min max · Weekends: 60 min max</p>
            <p>✓ Pantry: 18 ingredients used — shopping list ready</p>
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
