import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

const CookingTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevState = (location.state as any) || {};
  const [weekday, setWeekday] = useState("30 min");
  const [weekend, setWeekend] = useState("60 min");
  const [skill, setSkill] = useState("Intermediate");
  const [equipment, setEquipment] = useState<string[]>(["Gas stove", "Microwave", "Air fryer"]);
  const [showEquip, setShowEquip] = useState(true);

  const weekdayOpts = ["15 min", "30 min", "45 min", "60+ min"];
  const weekendOpts = ["30 min", "45 min", "60 min", "90+ min"];
  const skills = [
    { emoji: "🌱", label: "Beginner", sub: "Simple, 5 ingredients max" },
    { emoji: "🍳", label: "Intermediate", sub: "Comfortable cooking" },
    { emoji: "👨‍🍳", label: "Advanced", sub: "Complex techniques OK" },
  ];
  const equipOpts = ["Gas stove", "Microwave", "Oven", "Air fryer", "Pressure cooker", "Blender"];

  const toggleEquip = (e: string) => {
    setEquipment(prev => prev.includes(e) ? prev.filter(x => x !== e) : [...prev, e]);
  };

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={5} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-navy">How much time can you cook?</h2>
          <p className="text-[13px] text-mm-gray mt-1">Mira™ only suggests meals that fit your schedule</p>
        </div>

        {/* Weekday */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Weekday</p>
          <div className="grid grid-cols-4 gap-2">
            {weekdayOpts.map(o => (
              <button key={o} onClick={() => setWeekday(o)}
                className={`h-11 rounded-lg text-[13px] font-semibold transition-all active:scale-95 ${
                  weekday === o ? "bg-saffron text-cream" : "bg-card border border-light-gray text-foreground"
                }`}
              >{o}</button>
            ))}
          </div>
          <p className="text-[13px] text-mm-green italic mt-2">⏱ Meals will be max {weekday} on weekdays</p>
        </div>

        {/* Weekend */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Weekend</p>
          <div className="grid grid-cols-4 gap-2">
            {weekendOpts.map(o => (
              <button key={o} onClick={() => setWeekend(o)}
                className={`h-11 rounded-lg text-[13px] font-semibold transition-all active:scale-95 ${
                  weekend === o ? "bg-saffron text-cream" : "bg-card border border-light-gray text-foreground"
                }`}
              >{o}</button>
            ))}
          </div>
        </div>

        {/* Skill */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Skill Level</p>
          <div className="grid grid-cols-3 gap-2">
            {skills.map(s => (
              <button key={s.label} onClick={() => setSkill(s.label)}
                className={`h-[72px] rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  skill === s.label ? "bg-navy text-cream" : "bg-card shadow-card text-foreground"
                }`}
              >
                <span className={`text-[28px] ${skill === s.label ? "bg-card/20 rounded-full w-10 h-10 flex items-center justify-center" : ""}`}>{s.emoji}</span>
                <span className="text-[13px] font-bold">{s.label}</span>
                <span className={`text-[11px] ${skill === s.label ? "text-cream/70" : "text-mm-gray"}`}>{s.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <button onClick={() => setShowEquip(!showEquip)} className="flex items-center gap-2 text-[11px] text-mm-gray uppercase font-semibold mb-2">
            Equipment {showEquip ? "▾" : "▸"}
          </button>
          {showEquip && (
            <div className="grid grid-cols-2 gap-2">
              {equipOpts.map(e => (
                <button key={e} onClick={() => toggleEquip(e)}
                  className={`h-11 rounded-lg text-[13px] font-medium flex items-center gap-2 px-3 transition-all active:scale-95 ${
                    equipment.includes(e) ? "bg-saffron-light border border-saffron text-foreground" : "bg-card border border-light-gray text-foreground"
                  }`}
                >
                  {equipment.includes(e) ? "✅" : "☐"} {e}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button onClick={() => navigate("/onboarding/pantry", { state: { ...prevState, weekday, weekend, skill, equipment } })}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform">
          Continue →
        </button>
      </div>
    </div>
  );
};

export default CookingTime;
