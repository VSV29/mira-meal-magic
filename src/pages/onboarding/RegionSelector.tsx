import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

const popularCountries = [
  { flag: "🇮🇳", name: "India", region: "South Asia" },
  { flag: "🇺🇸", name: "USA", region: "Americas" },
  { flag: "🇬🇧", name: "UK", region: "Europe" },
  { flag: "🇦🇪", name: "UAE", region: "Middle East" },
  { flag: "🇸🇬", name: "SG", region: "East & SE Asia" },
  { flag: "🇨🇦", name: "CA", region: "Americas" },
  { flag: "🇦🇺", name: "AU", region: "Europe" },
  { flag: "🇲🇾", name: "MY", region: "East & SE Asia" },
];

const regions = [
  { flag: "🇮🇳", name: "South Asia", sub: "India, Pakistan, Sri Lanka, Bangladesh" },
  { flag: "🌏", name: "East & SE Asia", sub: "China, Japan, Korea, Thailand, SG" },
  { flag: "🌍", name: "Middle East", sub: "UAE, Saudi Arabia, Lebanon, Turkey" },
  { flag: "🇪🇺", name: "Europe", sub: "UK, Germany, France, Italy, Spain" },
  { flag: "🌎", name: "Americas", sub: "USA, Canada, Mexico, Brazil" },
  { flag: "🌍", name: "Africa", sub: "Nigeria, Kenya, Ethiopia, South Africa" },
];

type ViewMode = "auto-detect" | "full-selection";

const RegionSelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("India");
  const [selectedRegion, setSelectedRegion] = useState("South Asia");
  const [diaspora, setDiaspora] = useState(false);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("auto-detect");
  const [confirmed, setConfirmed] = useState(false);

  const handleYesIndia = () => {
    setSelected("India");
    setSelectedRegion("South Asia");
    setConfirmed(true);
    // Auto-advance after brief confirmation
    setTimeout(() => navigate("/onboarding/cuisines"), 400);
  };

  const handleChange = () => {
    setViewMode("full-selection");
    setConfirmed(false);
  };

  const handleCountrySelect = (country: typeof popularCountries[0]) => {
    setSelected(country.name);
    setSelectedRegion(country.region);
  };

  const handleRegionSelect = (region: typeof regions[0]) => {
    setSelectedRegion(region.name);
    // Auto-select a representative country for the region
    const countryInRegion = popularCountries.find(c => c.region === region.name);
    if (countryInRegion) {
      setSelected(countryInRegion.name);
    }
  };

  const filteredCountries = search
    ? popularCountries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : popularCountries;

  const filteredRegions = search
    ? regions.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.sub.toLowerCase().includes(search.toLowerCase())
      )
    : regions;

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20">
      <OnboardingHeader step={2} />

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        {/* Auto-detect banner */}
        {viewMode === "auto-detect" && !confirmed && (
          <div className="bg-green-light rounded-xl p-3 border-l-[3px] border-mm-green flex items-center gap-3">
            <span className="text-lg">📍</span>
            <div className="flex-1">
              <p className="text-sm text-foreground">We detected: <strong>India</strong> — is that right?</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleYesIndia}
                className="px-3 py-1.5 rounded-lg bg-mm-green text-cream text-xs font-bold active:scale-95 transition-transform"
              >
                ✓ Yes, India
              </button>
              <button
                onClick={handleChange}
                className="px-3 py-1.5 rounded-lg border border-mm-green text-mm-green text-xs font-bold active:scale-95 transition-transform"
              >
                ✗ Change
              </button>
            </div>
          </div>
        )}

        {confirmed && (
          <div className="bg-green-light rounded-xl p-3 border-l-[3px] border-mm-green flex items-center gap-3 animate-pulse">
            <span className="text-lg">✅</span>
            <p className="text-sm text-foreground font-bold">India confirmed! Taking you to cuisines...</p>
          </div>
        )}

        {/* Show full selection only after "Change" is tapped or always in full-selection mode */}
        {viewMode === "full-selection" && (
          <>
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

            {/* Popular countries */}
            {filteredCountries.length > 0 && (
              <div>
                <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Popular</p>
                <div className="grid grid-cols-4 gap-2">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleCountrySelect(c)}
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
            )}

            {/* Browse by region */}
            {filteredRegions.length > 0 && (
              <div>
                <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Browse by Region</p>
                <div className="rounded-xl overflow-hidden bg-card shadow-card">
                  {filteredRegions.map((r, i) => (
                    <button
                      key={r.name}
                      onClick={() => handleRegionSelect(r)}
                      className={`w-full flex items-center h-14 px-3 gap-3 transition-colors cursor-pointer ${
                        selectedRegion === r.name ? "bg-saffron-light" : "hover:bg-muted"
                      } ${i < filteredRegions.length - 1 ? "border-b border-light-gray" : ""}`}
                    >
                      <span className="text-2xl">{r.flag}</span>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold text-foreground">{r.name}</p>
                        <p className="text-[12px] text-mm-gray">{r.sub}</p>
                      </div>
                      {selectedRegion === r.name && (
                        <span className="w-5 h-5 bg-saffron rounded-full flex items-center justify-center text-cream text-[10px] font-bold">✓</span>
                      )}
                      <span className="text-mm-gray">›</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            {/* CTA */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
              <button
                onClick={() => navigate("/onboarding/cuisines")}
                className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform"
              >
                Continue →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
