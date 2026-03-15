import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";
import { toast } from "sonner";

interface CuisineItem {
  emoji: string;
  name: string;
  pre?: boolean;
}

const cuisinesByRegion: Record<string, CuisineItem[]> = {
  "South Asia": [
    { emoji: "🍛", name: "North Indian" },
    { emoji: "🥘", name: "South Indian" },
    { emoji: "🐟", name: "Bengali" },
    { emoji: "🫓", name: "Gujarati" },
    { emoji: "🫔", name: "Punjabi" },
    { emoji: "🥘", name: "Mughlai" },
    { emoji: "🫙", name: "Biryani Special" },
    { emoji: "🌯", name: "Street Food" },
    { emoji: "🇱🇰", name: "Sri Lankan" },
    { emoji: "🇵🇰", name: "Pakistani" },
    { emoji: "🇧🇩", name: "Bangladeshi" },
    { emoji: "🇳🇵", name: "Nepali" },
  ],
  "East & SE Asia": [
    { emoji: "🍜", name: "Chinese" },
    { emoji: "🍱", name: "Japanese" },
    { emoji: "🇰🇷", name: "Korean" },
    { emoji: "🍲", name: "Thai" },
    { emoji: "🍜", name: "Vietnamese" },
    { emoji: "🥡", name: "Singaporean" },
    { emoji: "🍛", name: "Malaysian" },
    { emoji: "🥘", name: "Indonesian" },
    { emoji: "🥢", name: "Filipino" },
    { emoji: "🥟", name: "Dim Sum" },
    { emoji: "🍣", name: "Sushi & Sashimi" },
    { emoji: "🍜", name: "Ramen" },
  ],
  "Middle East": [
    { emoji: "🥙", name: "Middle Eastern" },
    { emoji: "🧆", name: "Lebanese" },
    { emoji: "🇹🇷", name: "Turkish" },
    { emoji: "🥘", name: "Persian" },
    { emoji: "🫓", name: "Arabic" },
    { emoji: "🧆", name: "Israeli" },
    { emoji: "🥙", name: "Shawarma" },
    { emoji: "🫕", name: "Mezze" },
    { emoji: "🍢", name: "Kebabs" },
  ],
  "Europe": [
    { emoji: "🍕", name: "Italian" },
    { emoji: "🥐", name: "French" },
    { emoji: "🇪🇸", name: "Spanish" },
    { emoji: "🇬🇷", name: "Greek" },
    { emoji: "🥗", name: "Mediterranean" },
    { emoji: "🇩🇪", name: "German" },
    { emoji: "🇬🇧", name: "British" },
    { emoji: "🍝", name: "Pasta" },
    { emoji: "🫕", name: "Fondue" },
  ],
  "Americas": [
    { emoji: "🌮", name: "Mexican" },
    { emoji: "🍔", name: "American" },
    { emoji: "🇧🇷", name: "Brazilian" },
    { emoji: "🇵🇪", name: "Peruvian" },
    { emoji: "🌯", name: "Tex-Mex" },
    { emoji: "🥩", name: "BBQ / Grill" },
    { emoji: "🇦🇷", name: "Argentinian" },
    { emoji: "🫔", name: "Latin Fusion" },
    { emoji: "🥗", name: "California" },
  ],
  "Africa": [
    { emoji: "🇳🇬", name: "Nigerian" },
    { emoji: "🇪🇹", name: "Ethiopian" },
    { emoji: "🫕", name: "Moroccan" },
    { emoji: "🇿🇦", name: "South African" },
    { emoji: "🇰🇪", name: "Kenyan" },
    { emoji: "🇪🇬", name: "Egyptian" },
    { emoji: "🍲", name: "West African" },
    { emoji: "🥘", name: "North African" },
    { emoji: "🍛", name: "East African" },
  ],
};

// Country-specific cuisine highlights
const countryHighlights: Record<string, string[]> = {
  "India": ["North Indian", "South Indian", "Bengali", "Gujarati", "Punjabi", "Mughlai", "Biryani Special", "Street Food"],
  "Pakistan": ["Pakistani", "Mughlai", "Biryani Special", "Kebabs"],
  "Sri Lanka": ["Sri Lankan", "South Indian"],
  "Bangladesh": ["Bangladeshi", "Bengali"],
  "Nepal": ["Nepali", "North Indian"],
  "China": ["Chinese", "Dim Sum", "Ramen"],
  "Japan": ["Japanese", "Sushi & Sashimi", "Ramen"],
  "South Korea": ["Korean"],
  "Thailand": ["Thai"],
  "Singapore": ["Singaporean", "Malaysian", "Chinese"],
  "Vietnam": ["Vietnamese"],
  "Malaysia": ["Malaysian", "Singaporean", "Indonesian"],
  "Indonesia": ["Indonesian", "Malaysian"],
  "Philippines": ["Filipino"],
  "UAE": ["Middle Eastern", "Arabic", "Lebanese", "Shawarma"],
  "Saudi Arabia": ["Arabic", "Middle Eastern", "Kebabs"],
  "Lebanon": ["Lebanese", "Mezze", "Shawarma"],
  "Turkey": ["Turkish", "Kebabs", "Mezze"],
  "Iran": ["Persian", "Kebabs"],
  "Israel": ["Israeli", "Mezze", "Middle Eastern"],
  "UK": ["British", "Italian", "Mediterranean"],
  "Germany": ["German", "Italian"],
  "France": ["French", "Mediterranean", "Italian"],
  "Italy": ["Italian", "Pasta", "Mediterranean"],
  "Spain": ["Spanish", "Mediterranean"],
  "Greece": ["Greek", "Mediterranean"],
  "USA": ["American", "Mexican", "Tex-Mex", "BBQ / Grill"],
  "Canada": ["American", "French", "California"],
  "Mexico": ["Mexican", "Tex-Mex", "Latin Fusion"],
  "Brazil": ["Brazilian", "Argentinian", "Latin Fusion"],
  "Argentina": ["Argentinian", "BBQ / Grill"],
  "Peru": ["Peruvian", "Latin Fusion"],
  "Nigeria": ["Nigerian", "West African"],
  "Kenya": ["Kenyan", "East African"],
  "Ethiopia": ["Ethiopian", "East African"],
  "South Africa": ["South African"],
  "Morocco": ["Moroccan", "North African"],
  "Egypt": ["Egyptian", "North African", "Middle Eastern"],
};

const globalCuisines: CuisineItem[] = [
  { emoji: "🍛", name: "North Indian" },
  { emoji: "🍜", name: "Chinese" },
  { emoji: "🍕", name: "Italian" },
  { emoji: "🍱", name: "Japanese" },
  { emoji: "🌮", name: "Mexican" },
  { emoji: "🥗", name: "Mediterranean" },
];

const dietStyles = ["Vegetarian", "Vegan", "Keto", "High-Protein", "Low-Carb"];

const CuisineSelector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { country, region } = (location.state as { country?: string; region?: string }) || {};

  // Get region-specific cuisines
  const regionCuisines = region && cuisinesByRegion[region] ? cuisinesByRegion[region] : [];
  
  // Get country-highlighted cuisines
  const highlighted = country && countryHighlights[country] ? countryHighlights[country] : [];

  // Build the display: country cuisines first (pre-highlighted), then "more from region", then global
  const getDisplayCuisines = () => {
    const seen = new Set<string>();
    const result: (CuisineItem & { section: string })[] = [];

    // Country-specific picks
    if (highlighted.length > 0) {
      regionCuisines
        .filter(c => highlighted.includes(c.name))
        .forEach(c => {
          if (!seen.has(c.name)) {
            seen.add(c.name);
            result.push({ ...c, section: `Popular in ${country}` });
          }
        });
    }

    // More from region
    regionCuisines.forEach(c => {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push({ ...c, section: `More from ${region}` });
      }
    });

    // Global additions
    globalCuisines.forEach(c => {
      if (!seen.has(c.name)) {
        seen.add(c.name);
        result.push({ ...c, section: "Global Favourites" });
      }
    });

    return result;
  };

  const displayCuisines = getDisplayCuisines();

  // Group by section
  const sections: { title: string; items: CuisineItem[] }[] = [];
  displayCuisines.forEach(c => {
    const existing = sections.find(s => s.title === c.section);
    if (existing) existing.items.push(c);
    else sections.push({ title: c.section, items: [c] });
  });

  const [selected, setSelected] = useState<string[]>(() => {
    // Pre-select first 4 country cuisines
    return highlighted.slice(0, 4);
  });
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

  const regionLabel = country || region || "Your Region";
  const globalLabel = "Global";

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={3} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy">What cuisines do you love?</h2>
            <p className="text-[13px] text-mm-gray mt-1">
              {country ? `Showing cuisines for ${country} (${region})` : "Pick up to 5. Mira™ builds your plan around these."}
            </p>
          </div>
          <span className="text-[12px] font-bold text-mira-purple bg-mira-purple-light px-2 py-1 rounded-full whitespace-nowrap">
            {selected.length} of 5
          </span>
        </div>

        {/* Cuisine sections */}
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">{section.title}</p>
            <div className="grid grid-cols-3 gap-2">
              {section.items.map((c) => {
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
          </div>
        ))}

        {/* Diet style */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Diet Style Overlay</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
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
            <span className="text-[11px] text-mm-gray">🏠 Mostly {regionLabel}</span>
            <span className="text-[11px] text-mm-gray">🌍 Mostly {globalLabel}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button
          onClick={() => navigate("/onboarding/dietary", { state: { country, region, cuisines: selected } })}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default CuisineSelector;
