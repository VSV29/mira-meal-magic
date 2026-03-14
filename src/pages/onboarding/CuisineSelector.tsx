import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";
import { toast } from "sonner";

const cuisines = [
  { emoji: "🍛", name: "North Indian", pre: true },
  { emoji: "🥘", name: "South Indian", pre: true },
  { emoji: "🐟", name: "Bengali" },
  { emoji: "🫓", name: "Gujarati", pre: true },
  { emoji: "🍜", name: "Chinese" },
  { emoji: "🥗", name: "Mediterranean" },
  { emoji: "🌮", name: "Mexican" },
  { emoji: "🍱", name: "Japanese", pre: true },
  { emoji: "🍕", name: "Italian" },
  { emoji: "🥙", name: "Middle Eastern" },
  { emoji: "🌯", name: "Street Food 🚀" },
  { emoji: "🍲", name: "Thai" },
  { emoji: "🇰🇷", name: "Korean" },
  { emoji: "🫕", name: "Moroccan" },
  { emoji: "🧆", name: "Lebanese" },
  { emoji: "🫙", name: "Biryani Special" },
  { emoji: "🥘", name: "Mughlai" },
  { emoji: "🫔", name: "Punjabi" },
];

const dietStyles = ["Vegetarian", "Vegan", "Keto", "High-Protein", "Low-Carb"];

const CuisineSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(
    cuisines.filter(c => c.pre).map(c => c.name)
  );
  const [dietSelected, setDietSelected] = useState<string[]>(["Vegetarian"]);
  const [mixSlider, setMixSlider] = useState(30);

  const toggleCuisine = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter(s => s !== name));
    } else if (selected.length >= 5) {
      toast.error("Max 5 cuisines selected");
    } else {
      setSelected([...selected, name]);
    }
  };

  const toggleDiet = (d: string) => {
    setDietSelected(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={3} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy">What cuisines do you love?</h2>
            <p className="text-[13px] text-mm-gray mt-1">Pick up to 5. Mira™ builds your plan around these.</p>
          </div>
          <span className="text-[12px] font-bold text-mira-purple bg-mira-purple-light px-2 py-1 rounded-full whitespace-nowrap">
            {selected.length} of 5
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
          {cuisines.map((c) => {
            const isSel = selected.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => toggleCuisine(c.name)}
                className={`relative rounded-lg h-[88px] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  isSel ? "bg-saffron-light border-2 border-saffron" : "bg-light-gray border-2 border-transparent"
                }`}
              >
                {isSel && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-saffron rounded-full flex items-center justify-center text-cream text-[8px] font-bold">✓</span>
                )}
                <span className="text-[26px]">{c.emoji}</span>
                <span className="text-[10px] font-medium text-foreground leading-tight text-center px-1">{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Diet style */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Diet Style Overlay</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dietStyles.map(d => (
              <button
                key={d}
                onClick={() => toggleDiet(d)}
                className={`h-[34px] px-4 rounded-full text-[13px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                  dietSelected.includes(d) ? "bg-mm-green text-cream" : "bg-card border border-light-gray text-foreground"
                }`}
              >
                {dietSelected.includes(d) ? "✅ " : "☐ "}{d}
              </button>
            ))}
          </div>
        </div>

        {/* Mix slider */}
        <div className="bg-card rounded-xl p-4 shadow-card">
          <p className="text-[13px] font-bold text-foreground mb-3">Cuisine mix preference</p>
          <input
            type="range"
            min={0}
            max={100}
            value={mixSlider}
            onChange={(e) => setMixSlider(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(var(--saffron)), hsl(var(--teal)))`,
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-mm-gray">🇮🇳 Mostly Indian</span>
            <span className="text-[11px] text-mm-gray">🌍 Mostly Global</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button
          onClick={() => navigate("/onboarding/dietary")}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default CuisineSelector;
