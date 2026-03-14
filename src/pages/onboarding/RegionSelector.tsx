import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

const popularCountries = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇸🇬", name: "SG" },
  { flag: "🇨🇦", name: "CA" },
  { flag: "🇦🇺", name: "AU" },
  { flag: "🇲🇾", name: "MY" },
];

const regions = [
  { flag: "🇮🇳", name: "South Asia", sub: "India, Pakistan, Sri Lanka, Bangladesh" },
  { flag: "🌏", name: "East & SE Asia", sub: "China, Japan, Korea, Thailand, SG" },
  { flag: "🌍", name: "Middle East", sub: "UAE, Saudi Arabia, Lebanon, Turkey" },
  { flag: "🇪🇺", name: "Europe", sub: "UK, Germany, France, Italy, Spain" },
  { flag: "🌎", name: "Americas", sub: "USA, Canada, Mexico, Brazil" },
  { flag: "🌍", name: "Africa", sub: "Nigeria, Kenya, Ethiopia, South Africa" },
];

const RegionSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("India");
  const [selectedRegion, setSelectedRegion] = useState("South Asia");
  const [diaspora, setDiaspora] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={2} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        {/* Auto-detect */}
        <div className="bg-green-light rounded-xl p-3 border-l-[3px] border-mm-green flex items-center gap-3">
          <span className="text-lg">📍</span>
          <div className="flex-1">
            <p className="text-sm text-foreground">We detected: <strong>India</strong> — is that right?</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-mm-green text-cream text-xs font-bold">✓ Yes, India</button>
            <button className="px-3 py-1.5 rounded-lg border border-mm-green text-mm-green text-xs font-bold">✗ Change</button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mm-gray">🔍</span>
          <input
            type="text"
            placeholder="Search country or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-light-gray text-sm outline-none"
          />
        </div>

        {/* Popular */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Popular</p>
          <div className="grid grid-cols-4 gap-2">
            {popularCountries.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelected(c.name)}
                className={`relative w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-1 shadow-card transition-all active:scale-95 ${
                  selected === c.name
                    ? "bg-saffron-light border-2 border-saffron"
                    : "bg-card border border-transparent"
                }`}
              >
                {selected === c.name && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-saffron rounded-full flex items-center justify-center text-cream text-[8px] font-bold">✓</span>
                )}
                <span className="text-[28px]">{c.flag}</span>
                <span className="text-[10px] text-mm-gray">{c.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Browse by region */}
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Browse by Region</p>
          <div className="rounded-xl overflow-hidden bg-card shadow-card">
            {regions.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setSelectedRegion(r.name)}
                className={`w-full flex items-center h-14 px-3 gap-3 transition-colors ${
                  selectedRegion === r.name ? "bg-saffron-light" : ""
                } ${i < regions.length - 1 ? "border-b border-light-gray" : ""}`}
              >
                <span className="text-2xl">{r.flag}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-foreground">{r.name}</p>
                  <p className="text-[12px] text-mm-gray">{r.sub}</p>
                </div>
                <span className="text-mm-gray">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diaspora toggle */}
        <div className="bg-card rounded-xl shadow-card p-4 flex items-center gap-3">
          <span className="text-lg">🌐</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">I'm living outside my home country</p>
            <p className="text-[13px] text-mm-gray">Mira™ blends home + local cuisine recommendations</p>
          </div>
          <button
            onClick={() => setDiaspora(!diaspora)}
            className={`w-12 h-7 rounded-full transition-colors relative ${diaspora ? "bg-teal" : "bg-light-gray"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-1 transition-transform ${diaspora ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button
          onClick={() => navigate("/onboarding/cuisines")}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default RegionSelector;
