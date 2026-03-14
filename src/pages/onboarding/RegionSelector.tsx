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
  { flag: "🇦🇺", name: "AU", region: "East & SE Asia" },
  { flag: "🇲🇾", name: "MY", region: "East & SE Asia" },
];

const regionData = [
  {
    flag: "🇮🇳", name: "South Asia", sub: "India, Pakistan, Sri Lanka, Bangladesh",
    countries: [
      { flag: "🇮🇳", name: "India" },
      { flag: "🇵🇰", name: "Pakistan" },
      { flag: "🇱🇰", name: "Sri Lanka" },
      { flag: "🇧🇩", name: "Bangladesh" },
      { flag: "🇳🇵", name: "Nepal" },
    ],
  },
  {
    flag: "🌏", name: "East & SE Asia", sub: "China, Japan, Korea, Thailand, SG",
    countries: [
      { flag: "🇨🇳", name: "China" },
      { flag: "🇯🇵", name: "Japan" },
      { flag: "🇰🇷", name: "South Korea" },
      { flag: "🇹🇭", name: "Thailand" },
      { flag: "🇸🇬", name: "Singapore" },
      { flag: "🇻🇳", name: "Vietnam" },
      { flag: "🇮🇩", name: "Indonesia" },
      { flag: "🇲🇾", name: "Malaysia" },
      { flag: "🇵🇭", name: "Philippines" },
    ],
  },
  {
    flag: "🌍", name: "Middle East", sub: "UAE, Saudi Arabia, Lebanon, Turkey",
    countries: [
      { flag: "🇦🇪", name: "UAE" },
      { flag: "🇸🇦", name: "Saudi Arabia" },
      { flag: "🇱🇧", name: "Lebanon" },
      { flag: "🇹🇷", name: "Turkey" },
      { flag: "🇮🇷", name: "Iran" },
      { flag: "🇮🇱", name: "Israel" },
    ],
  },
  {
    flag: "🇪🇺", name: "Europe", sub: "UK, Germany, France, Italy, Spain",
    countries: [
      { flag: "🇬🇧", name: "UK" },
      { flag: "🇩🇪", name: "Germany" },
      { flag: "🇫🇷", name: "France" },
      { flag: "🇮🇹", name: "Italy" },
      { flag: "🇪🇸", name: "Spain" },
      { flag: "🇬🇷", name: "Greece" },
    ],
  },
  {
    flag: "🌎", name: "Americas", sub: "USA, Canada, Mexico, Brazil",
    countries: [
      { flag: "🇺🇸", name: "USA" },
      { flag: "🇨🇦", name: "Canada" },
      { flag: "🇲🇽", name: "Mexico" },
      { flag: "🇧🇷", name: "Brazil" },
      { flag: "🇦🇷", name: "Argentina" },
      { flag: "🇵🇪", name: "Peru" },
    ],
  },
  {
    flag: "🌍", name: "Africa", sub: "Nigeria, Kenya, Ethiopia, South Africa",
    countries: [
      { flag: "🇳🇬", name: "Nigeria" },
      { flag: "🇰🇪", name: "Kenya" },
      { flag: "🇪🇹", name: "Ethiopia" },
      { flag: "🇿🇦", name: "South Africa" },
      { flag: "🇲🇦", name: "Morocco" },
      { flag: "🇪🇬", name: "Egypt" },
    ],
  },
];

const RegionSelector = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [diaspora, setDiaspora] = useState(false);
  const [search, setSearch] = useState("");
  const [showDetectPopup, setShowDetectPopup] = useState(true);

  const handleAcceptDetected = () => {
    setSelectedCountry("India");
    setSelectedRegion("South Asia");
    setShowDetectPopup(false);
  };

  const handleDismissPopup = () => {
    setShowDetectPopup(false);
  };

  const handleCountrySelect = (countryName: string, regionName?: string) => {
    setSelectedCountry(countryName);
    if (regionName) setSelectedRegion(regionName);
    else {
      const found = popularCountries.find(c => c.name === countryName);
      if (found) setSelectedRegion(found.region);
    }
  };

  const handleRegionToggle = (regionName: string) => {
    if (expandedRegion === regionName) {
      setExpandedRegion(null);
    } else {
      setExpandedRegion(regionName);
      setSelectedRegion(regionName);
    }
  };

  const filteredCountries = search
    ? popularCountries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : popularCountries;

  const filteredRegions = search
    ? regionData.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.sub.toLowerCase().includes(search.toLowerCase()) ||
        r.countries.some(c => c.name.toLowerCase().includes(search.toLowerCase()))
      )
    : regionData;

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-20 relative">
      <OnboardingHeader step={2} />

      {/* Auto-detect popup */}
      {showDetectPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-elevated mx-6 p-5 w-full max-w-[340px]">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-green-light flex items-center justify-center text-2xl">📍</div>
              <h3 className="text-lg font-bold text-foreground">We detected your location</h3>
              <p className="text-sm text-mm-gray">It looks like you're in <strong className="text-foreground">India</strong>. Is that correct?</p>
              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={handleDismissPopup}
                  className="flex-1 h-11 rounded-xl border border-mm-gray/30 text-mm-gray text-sm font-semibold active:scale-95 transition-transform"
                >
                  No, let me pick
                </button>
                <button
                  onClick={handleAcceptDetected}
                  className="flex-1 h-11 rounded-xl bg-mm-green text-cream text-sm font-bold active:scale-95 transition-transform"
                >
                  ✓ Yes, India
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
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
                  onClick={() => handleCountrySelect(c.name)}
                  className={`relative w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-1 shadow-card transition-all active:scale-95 ${
                    selectedCountry === c.name
                      ? "bg-saffron-light border-2 border-saffron"
                      : "bg-card border border-transparent"
                  }`}
                >
                  {selectedCountry === c.name && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-saffron rounded-full flex items-center justify-center text-cream text-[8px] font-bold">✓</span>
                  )}
                  <span className="text-[28px]">{c.flag}</span>
                  <span className="text-[10px] text-mm-gray">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Browse by region - expandable */}
        {filteredRegions.length > 0 && (
          <div>
            <p className="text-[11px] text-mm-gray uppercase font-semibold mb-2">Browse by Region</p>
            <div className="rounded-xl overflow-hidden bg-card shadow-card">
              {filteredRegions.map((r, i) => (
                <div key={r.name}>
                  <button
                    onClick={() => handleRegionToggle(r.name)}
                    className={`w-full flex items-center h-14 px-3 gap-3 transition-colors cursor-pointer ${
                      selectedRegion === r.name ? "bg-saffron-light" : "hover:bg-muted"
                    } ${i < filteredRegions.length - 1 && expandedRegion !== r.name ? "border-b border-light-gray" : ""}`}
                  >
                    <span className="text-2xl">{r.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-foreground">{r.name}</p>
                      <p className="text-[12px] text-mm-gray">{r.sub}</p>
                    </div>
                    {selectedRegion === r.name && (
                      <span className="w-5 h-5 bg-saffron rounded-full flex items-center justify-center text-cream text-[10px] font-bold">✓</span>
                    )}
                    <span className={`text-mm-gray transition-transform ${expandedRegion === r.name ? "rotate-90" : ""}`}>›</span>
                  </button>

                  {/* Expanded country list */}
                  {expandedRegion === r.name && (
                    <div className="bg-muted/50 border-t border-b border-light-gray px-3 py-2">
                      <div className="grid grid-cols-3 gap-2">
                        {r.countries.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => handleCountrySelect(c.name, r.name)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all active:scale-95 ${
                              selectedCountry === c.name
                                ? "bg-saffron-light border border-saffron"
                                : "bg-card border border-transparent shadow-sm"
                            }`}
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="text-[11px] font-medium text-foreground truncate">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
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
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-4 bg-cream">
        <button
          onClick={() => navigate("/onboarding/cuisines", { state: { country: selectedCountry, region: selectedRegion } })}
          disabled={!selectedCountry}
          className={`w-full h-[52px] rounded-xl font-bold text-base active:scale-[0.98] transition-all ${
            selectedCountry ? "bg-saffron text-cream" : "bg-light-gray text-mm-gray cursor-not-allowed"
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default RegionSelector;
