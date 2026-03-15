import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import { navigateBackOrTo } from "@/lib/navigation";

const pantryItems = [
  { emoji: "🌾", name: "Toor Dal", qty: "500g", status: "good" },
  { emoji: "🧀", name: "Paneer", qty: "200g", status: "expiring", note: "Expires in 2 days" },
  { emoji: "🥬", name: "Spinach", qty: "150g", status: "low" },
  { emoji: "🍚", name: "Rice", qty: "1kg", status: "good" },
  { emoji: "🍅", name: "Tomatoes", qty: "4 pcs", status: "good" },
  { emoji: "🧅", name: "Onions", qty: "6 pcs", status: "good" },
  { emoji: "🌿", name: "Coriander", qty: "1 bunch", status: "low" },
  { emoji: "🧈", name: "Butter", qty: "100g", status: "good" },
  { emoji: "🧂", name: "Turmeric", qty: "50g", status: "good" },
  { emoji: "🫙", name: "Cumin seeds", qty: "30g", status: "good" },
];

const filters = ["All", "Grains", "Vegetables", "Dairy", "Proteins", "Spices"];

const statusBadge = (status: string) => {
  switch (status) {
    case "good": return <span className="text-[10px] bg-green-light text-mm-green px-2 py-0.5 rounded-full font-semibold">Good</span>;
    case "low": return <span className="text-[10px] bg-saffron-light text-saffron px-2 py-0.5 rounded-full font-semibold">Running Low</span>;
    case "expiring": return <span className="text-[10px] bg-coral/10 text-coral px-2 py-0.5 rounded-full font-semibold">Expires Soon</span>;
    default: return null;
  }
};

const Pantry = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="mobile-container bg-cream min-h-screen pb-24">
      <div className="sticky top-0 z-20 bg-card shadow-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigateBackOrTo(navigate)} className="w-8 h-8 rounded-full bg-light-gray flex items-center justify-center active:scale-90 transition-transform">
            <span className="text-navy text-sm">←</span>
          </button>
          <div>
            <p className="text-lg font-bold text-navy">🧺 My Pantry</p>
            <p className="text-[12px] text-mm-gray">Last updated: Today</p>
          </div>
        </div>
        <button className="text-sm font-bold text-saffron border border-saffron rounded-lg px-3 py-1.5">+ Add</button>
      </div>

      {/* Mira tip */}
      <div className="mx-4 mt-3 bg-mira-purple-light border-l-[3px] border-mira-purple rounded-xl p-3">
        <p className="text-[13px] text-mira-purple">✨ <strong>Mira™ tip:</strong> Paneer expires in 2 days — already in 3 this week's meals ✓</p>
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mm-gray">🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-light-gray text-sm outline-none" />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mt-3 overflow-x-auto no-scrollbar">
        <div className="flex gap-2">
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`h-8 px-3 rounded-full text-[12px] font-semibold whitespace-nowrap transition-all ${
                activeFilter === f ? "bg-saffron text-cream" : "bg-card border border-light-gray text-foreground"
              }`}
            >{f}{activeFilter === f ? " ●" : ""}</button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 mt-3 grid grid-cols-2 gap-2.5">
        {pantryItems.filter(i => search === "" || i.name.toLowerCase().includes(search.toLowerCase())).map(item => (
          <div key={item.name} className={`bg-card rounded-xl shadow-card p-3 ${item.status === "expiring" ? "border border-coral" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-[13px] font-bold text-foreground">{item.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[12px] text-mm-gray">{item.qty}</span>
              {statusBadge(item.status)}
            </div>
            {item.note && <p className="text-[11px] text-coral mt-1">{item.note}</p>}
          </div>
        ))}
      </div>

      {/* Scan */}
      <div className="px-4 mt-4">
        <button className="w-full h-[52px] rounded-xl border-[1.5px] border-dashed border-teal text-teal font-bold text-sm flex items-center justify-center gap-2">
          📸 Scan barcode or ingredient
        </button>
      </div>

      {/* FAB */}
      <button className="fixed bottom-24 right-6 w-13 h-13 bg-saffron text-cream shadow-elevated rounded-full flex items-center justify-center text-2xl z-30">+</button>

      <BottomTabBar />
    </div>
  );
};

export default Pantry;
