import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";
import { toast } from "sonner";
import { navigateBackOrTo } from "@/lib/navigation";

type ShopItem = {
  name: string;
  qty: string;
  status: "buy" | "low" | "pantry";
  price?: string;
  online?: boolean;
  category: string;
  checked: boolean;
};

const initialItems: ShopItem[] = [
  { name: "Baby spinach", qty: "200g", status: "buy", price: "₹35", category: "Produce", checked: false },
  { name: "Tomatoes", qty: "4 pcs", status: "pantry", category: "Produce", checked: false },
  { name: "Coriander bunch", qty: "1", status: "buy", price: "₹15", category: "Produce", checked: false },
  { name: "Curd", qty: "400g", status: "low", price: "₹45", category: "Dairy", checked: false },
  { name: "Paneer", qty: "200g", status: "buy", price: "₹80", category: "Dairy", checked: false },
  { name: "Miso paste", qty: "1 tbsp", status: "buy", price: "₹120", online: true, category: "Grains & Speciality", checked: false },
  { name: "Ramen noodles", qty: "200g", status: "buy", price: "₹95", online: true, category: "Grains & Speciality", checked: false },
];

const catMeta: Record<string, { emoji: string; color: string }> = {
  "Produce": { emoji: "🥬", color: "bg-mm-green" },
  "Dairy": { emoji: "🥛", color: "bg-teal" },
  "Grains & Speciality": { emoji: "🌾", color: "bg-mira-purple" },
};

const Shopping = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<"category" | "meal">("category");

  const toggleCheck = (idx: number) => {
    setItems(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  };

  const categories = [...new Set(items.map(i => i.category))];
  const needToBuy = items.filter(i => i.status === "buy" && !i.checked);
  const totalPrice = needToBuy.reduce((s, i) => s + parseInt((i.price || "₹0").replace("₹", "")), 0);
  const onlineTotal = needToBuy.filter(i => i.online).reduce((s, i) => s + parseInt((i.price || "₹0").replace("₹", "")), 0);

  return (
    <div className="mobile-container bg-cream min-h-screen pb-20">
      <div className="sticky top-0 z-20 bg-card shadow-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-light-gray flex items-center justify-center active:scale-90 transition-transform">
            <span className="text-navy text-sm">←</span>
          </button>
          <div>
            <p className="text-lg font-bold text-navy">🛒 Shopping List</p>
            <p className="text-[12px] text-mm-gray">{items.filter(i => i.status === "buy").length} items needed · Updated just now</p>
          </div>
        </div>
        <button className="text-lg">↗</button>
      </div>

      {/* Toggle */}
      <div className="px-4 mt-3">
        <div className="flex bg-light-gray rounded-lg p-1">
          <button onClick={() => setView("category")}
            className={`flex-1 h-8 rounded-md text-[13px] font-semibold transition-all ${view === "category" ? "bg-saffron text-cream" : "text-mm-gray"}`}>
            By Category
          </button>
          <button onClick={() => setView("meal")}
            className={`flex-1 h-8 rounded-md text-[13px] font-semibold transition-all ${view === "meal" ? "bg-saffron text-cream" : "text-mm-gray"}`}>
            By Meal
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 mt-3 space-y-4">
        {categories.map(cat => {
          const meta = catMeta[cat];
          const catItems = items.filter(i => i.category === cat);
          return (
            <div key={cat}>
              <span className={`inline-flex items-center gap-1 text-[12px] font-bold text-cream px-2.5 py-1 rounded-full ${meta.color} mb-2`}>
                {meta.emoji} {cat}
              </span>
              <div className="space-y-2">
                {catItems.map((item, _i) => {
                  const globalIdx = items.indexOf(item);
                  return (
                    <button key={item.name} onClick={() => toggleCheck(globalIdx)}
                      className={`w-full bg-card rounded-lg shadow-card p-3 flex items-center gap-3 text-left transition-all active:scale-[0.98] ${item.checked ? "opacity-50" : ""}`}>
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        item.status === "buy" ? "bg-coral" : item.status === "low" ? "bg-gold" : "bg-mm-green"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold text-foreground ${item.checked ? "line-through" : ""}`}>{item.name}</p>
                        <p className="text-[12px] text-mm-gray">{item.qty}</p>
                      </div>
                      {item.price && <span className="text-[13px] font-bold text-saffron">{item.price}</span>}
                      {item.status === "pantry" && <span className="text-[11px] text-mm-green">✓ In pantry</span>}
                      {item.online && (
                        <span className="text-[10px] bg-mira-purple-light text-mira-purple px-2 py-0.5 rounded-full font-semibold">📦 Online</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-[11px] text-mm-gray">
        <span><span className="inline-block w-2 h-2 rounded-full bg-coral mr-1" />Need to buy</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-gold mr-1" />Running low</span>
        <span><span className="inline-block w-2 h-2 rounded-full bg-mm-green mr-1" />In pantry</span>
      </div>

      {/* Mira order banner */}
      <div className="mx-4 mt-4 rounded-xl p-4"
        style={{ background: "linear-gradient(135deg, hsl(var(--mira-purple)), hsl(var(--mira-purple-dark)))" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm">✨</span>
          <span className="text-[11px] font-bold text-[#E9D5FF]">Mira™ · Smart suggestion</span>
        </div>
        <p className="text-[13px] text-cream">3 urgent items can be ordered from BigBasket by Friday — ₹275 total</p>
        <button onClick={() => toast.success("Opening BigBasket... 3 items pre-filled in your cart 🛒")}
          className="w-full h-11 bg-card text-mira-purple font-bold text-sm rounded-lg mt-3">
          📦 Order All Urgent →
        </button>
      </div>

      {/* Total */}
      <div className="mx-4 mt-3 bg-card rounded-xl shadow-card p-3">
        <div className="flex justify-between items-center">
          <span className="text-[15px] font-bold text-foreground">Total to buy: ₹{totalPrice}</span>
          <span className="text-[13px] text-mm-gray">{needToBuy.length} items</span>
        </div>
        {onlineTotal > 0 && <p className="text-[12px] text-mira-purple mt-1">₹{onlineTotal} can be ordered online</p>}
      </div>

      {/* Action row */}
      <div className="mx-4 mt-3 flex gap-2 mb-4">
        {["📤 Export", "📋 Copy", "💬 WhatsApp"].map(a => (
          <button key={a} className="flex-1 h-10 rounded-lg border border-light-gray text-[13px] font-semibold text-foreground bg-card">
            {a}
          </button>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
};

export default Shopping;
