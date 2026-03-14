import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

const dietOptions = [
  { emoji: "🥗", label: "Vegetarian", sub: "No meat, poultry or seafood" },
  { emoji: "🌱", label: "Vegan", sub: "No eggs or dairy either" },
  { emoji: "🐟", label: "Pescatarian", sub: "Fish and seafood allowed" },
  { emoji: "🍗", label: "Non-Vegetarian", sub: "All foods welcome" },
];

const religious = ["Jain-friendly", "Halal", "Kosher", "Sattvic", "No pork", "No beef"];
const allergies = ["Tree Nuts", "Dairy", "Gluten", "Soy", "Shellfish", "Eggs"];
const healthGoals = ["Eat Healthier", "Lose Weight", "High Protein", "Low Carb", "Diabetic-Friendly", "Gain Muscle"];

const DietaryProfile = () => {
  const navigate = useNavigate();
  const [diet, setDiet] = useState("Strict Vegetarian");
  const [selReligious, setSelReligious] = useState<string[]>(["Jain-friendly"]);
  const [selAllergies, setSelAllergies] = useState<string[]>([]);
  const [selGoals, setSelGoals] = useState<string[]>(["Eat Healthier"]);

  const toggleArr = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    set(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={4} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-navy">Any dietary rules or preferences?</h2>
          <p className="text-[13px] text-mm-gray italic mt-1">Mira™ will never suggest meals that break these rules</p>
        </div>

        {/* Diet type */}
        <div className="space-y-2">
          <p className="text-[11px] text-mm-gray uppercase font-semibold">I eat:</p>
          {dietOptions.map(o => (
            <button
              key={o.label}
              onClick={() => setDiet(o.label)}
              className={`w-full h-14 rounded-xl flex items-center px-3 gap-3 transition-all active:scale-[0.98] ${
                diet === o.label ? "bg-saffron-light border-2 border-saffron" : "bg-card border border-transparent shadow-card"
              }`}
            >
              <span className="text-2xl">{o.emoji}</span>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-bold text-foreground">{o.label}</p>
                <p className="text-[12px] text-mm-gray">{o.sub}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                diet === o.label ? "border-saffron bg-saffron" : "border-light-gray"
              }`}>
                {diet === o.label && <div className="w-2 h-2 rounded-full bg-cream" />}
              </div>
            </button>
          ))}
        </div>

        {/* Religious */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Religious / Cultural</p>
          <div className="flex flex-wrap gap-2">
            {religious.map(r => (
              <button key={r} onClick={() => toggleArr(selReligious, setSelReligious, r)}
                className={`h-9 px-4 rounded-full text-[13px] font-medium transition-all active:scale-95 ${
                  selReligious.includes(r) ? "bg-saffron text-cream font-bold" : "bg-card border border-light-gray text-foreground"
                }`}
              >
                {selReligious.includes(r) ? "✅ " : "☐ "}{r}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Allergies & Intolerances</p>
          <div className="flex flex-wrap gap-2">
            {allergies.map(a => (
              <button key={a} onClick={() => toggleArr(selAllergies, setSelAllergies, a)}
                className={`h-9 px-4 rounded-full text-[13px] font-medium transition-all active:scale-95 ${
                  selAllergies.includes(a) ? "bg-saffron text-cream font-bold" : "bg-card border border-light-gray text-foreground"
                }`}
              >
                {selAllergies.includes(a) ? "✅ " : "☐ "}{a}
              </button>
            ))}
          </div>
        </div>

        {/* Health goals */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Health Goal</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {healthGoals.map(g => (
              <button key={g} onClick={() => toggleArr(selGoals, setSelGoals, g)}
                className={`h-10 px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                  selGoals.includes(g) ? "bg-mm-green text-cream" : "bg-card border border-light-gray text-foreground"
                }`}
              >
                {selGoals.includes(g) ? "✅ " : "☐ "}{g}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button onClick={() => navigate("/onboarding/time")}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform">
          Continue →
        </button>
      </div>
    </div>
  );
};

export default DietaryProfile;
