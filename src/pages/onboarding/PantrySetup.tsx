import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

const categories = [
  { emoji: "🌾", name: "Grains", pre: true },
  { emoji: "🥦", name: "Vegetables", pre: true },
  { emoji: "🥩", name: "Proteins" },
  { emoji: "🥛", name: "Dairy", pre: true },
  { emoji: "🧂", name: "Spices", pre: true },
  { emoji: "🫙", name: "Condiments" },
];

const grainItems = [
  "Rice", "Atta / Wheat flour", "Poha", "Dal (Toor/Chana/Moong)",
  "Bread / Pav", "Oats", "Semolina / Rava", "Besan / Chickpea flour",
];

const PantrySetup = () => {
  const navigate = useNavigate();
  const [selCats, setSelCats] = useState<string[]>(["Grains", "Vegetables", "Dairy", "Spices"]);
  const [selGrains, setSelGrains] = useState<string[]>(["Rice", "Atta / Wheat flour", "Poha", "Dal (Toor/Chana/Moong)"]);
  const [budget, setBudget] = useState("200");

  const toggleCat = (name: string) => {
    setSelCats(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  };
  const toggleGrain = (name: string) => {
    setSelGrains(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  };

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-24">
      <OnboardingHeader step={6} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-navy">What's already in your kitchen?</h2>
          <p className="text-[13px] text-mm-gray mt-1">Mira™ uses this to minimise what you need to buy</p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map(c => (
            <button key={c.name} onClick={() => toggleCat(c.name)}
              className={`h-[72px] rounded-xl flex flex-col items-center justify-center gap-1 shadow-card transition-all active:scale-95 ${
                selCats.includes(c.name) ? "bg-saffron-light border-2 border-saffron" : "bg-card border-2 border-transparent"
              }`}
            >
              <span className="text-[28px]">{c.emoji}</span>
              <span className="text-[12px] font-bold text-foreground">{c.name}</span>
            </button>
          ))}
        </div>

        {/* Expanded grains panel */}
        {selCats.includes("Grains") && (
          <div className="bg-card rounded-xl p-3 border-t-2 border-saffron shadow-card">
            <p className="text-[12px] text-mm-gray mb-2">Common grains in your pantry:</p>
            <div className="grid grid-cols-2 gap-2">
              {grainItems.map(g => (
                <button key={g} onClick={() => toggleGrain(g)}
                  className={`h-9 px-2 rounded-lg text-[12px] text-left flex items-center gap-2 transition-all ${
                    selGrains.includes(g) ? "text-mm-green font-bold" : "text-mm-gray"
                  }`}
                >
                  {selGrains.includes(g) ? "✅" : "☐"} {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scan */}
        <button className="w-full h-[52px] rounded-xl border-[1.5px] border-dashed border-teal text-teal font-bold text-sm flex items-center justify-center gap-2">
          📸 Scan ingredients with camera
        </button>

        {/* Budget */}
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">₹ Budget per meal</p>
            <p className="text-[12px] text-mm-gray">Used to prioritise affordable suggestions</p>
          </div>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-20 text-right text-base font-bold text-saffron bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream space-y-2">
        <button onClick={() => navigate("/onboarding/loading")}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform">
          ✨ Generate My Plan →
        </button>
        <button onClick={() => navigate("/onboarding/loading")}
          className="w-full text-center text-mm-gray text-sm">
          Skip for now — I'll add later
        </button>
      </div>
    </div>
  );
};

export default PantrySetup;
