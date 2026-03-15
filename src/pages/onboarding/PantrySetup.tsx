import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingHeader from "@/components/OnboardingHeader";

// Region/country-specific pantry items per category
const pantryData: Record<string, Record<string, string[]>> = {
  "South Asia": {
    Grains: ["Rice", "Atta / Wheat flour", "Poha", "Dal (Toor/Chana/Moong)", "Bread / Pav", "Oats", "Semolina / Rava", "Besan / Chickpea flour", "Idli Rava", "Ragi flour"],
    Vegetables: ["Tomatoes", "Onions", "Potatoes", "Spinach", "Cauliflower", "Okra / Bhindi", "Brinjal", "Capsicum", "Green Peas", "Coriander"],
    Proteins: ["Paneer", "Tofu", "Chicken", "Eggs", "Fish", "Mutton", "Prawns", "Soya chunks", "Rajma", "Chana"],
    Dairy: ["Milk", "Curd / Yoghurt", "Ghee", "Butter", "Cream", "Paneer", "Cheese"],
    Spices: ["Turmeric", "Red Chilli", "Cumin seeds", "Coriander powder", "Garam Masala", "Mustard seeds", "Asafoetida / Hing", "Curry leaves", "Bay leaves", "Cardamom"],
    Condiments: ["Salt", "Sugar", "Oil (Mustard/Sunflower)", "Tamarind paste", "Pickle (Achar)", "Tomato ketchup", "Green chutney", "Coconut milk", "Soy sauce", "Vinegar"],
  },
  "East & SE Asia": {
    Grains: ["Jasmine Rice", "Sticky Rice", "Rice Noodles", "Udon Noodles", "Ramen Noodles", "Glass Noodles", "Soba Noodles", "Wonton Wrappers"],
    Vegetables: ["Bok Choy", "Bean Sprouts", "Edamame", "Mushrooms (Shiitake)", "Bamboo Shoots", "Water Chestnuts", "Napa Cabbage", "Scallions", "Ginger", "Garlic"],
    Proteins: ["Tofu", "Chicken", "Pork", "Shrimp", "Fish", "Eggs", "Tempeh", "Seitan", "Duck", "Crab"],
    Dairy: ["Coconut Milk", "Coconut Cream", "Condensed Milk"],
    Spices: ["Ginger", "Star Anise", "Five Spice", "Lemongrass", "Galangal", "Kaffir Lime Leaves", "Thai Basil", "Szechuan Pepper", "White Pepper", "Turmeric"],
    Condiments: ["Soy Sauce", "Fish Sauce", "Oyster Sauce", "Sesame Oil", "Rice Vinegar", "Miso Paste", "Sriracha", "Hoisin Sauce", "Chilli Oil", "Nori / Seaweed"],
  },
  "Middle East": {
    Grains: ["Basmati Rice", "Pita Bread", "Couscous", "Bulgur Wheat", "Flatbread", "Filo Pastry", "Freekeh", "Vermicelli"],
    Vegetables: ["Tomatoes", "Cucumber", "Eggplant", "Zucchini", "Peppers", "Onions", "Parsley", "Mint", "Lettuce", "Pomegranate"],
    Proteins: ["Lamb", "Chicken", "Chickpeas", "Lentils", "Feta", "Eggs", "Fish", "Beef", "Halloumi"],
    Dairy: ["Yoghurt / Labneh", "Feta Cheese", "Halloumi", "Butter", "Cream"],
    Spices: ["Sumac", "Za'atar", "Cumin", "Coriander", "Saffron", "Cardamom", "Cinnamon", "Turmeric", "Paprika", "Baharat"],
    Condiments: ["Tahini", "Olive Oil", "Pomegranate Molasses", "Harissa", "Rose Water", "Hummus", "Pickled Turnips", "Lemon juice", "Date Syrup"],
  },
  "Europe": {
    Grains: ["Pasta (various)", "Bread", "Flour", "Risotto Rice", "Polenta", "Couscous", "Oats", "Crackers"],
    Vegetables: ["Tomatoes", "Onions", "Garlic", "Peppers", "Zucchini", "Mushrooms", "Spinach", "Potatoes", "Carrots", "Basil"],
    Proteins: ["Chicken", "Beef", "Pork", "Salmon", "Eggs", "Beans", "Lentils", "Mozzarella", "Parmesan"],
    Dairy: ["Milk", "Butter", "Cream", "Parmesan", "Mozzarella", "Cheddar", "Yoghurt", "Ricotta"],
    Spices: ["Oregano", "Basil", "Thyme", "Rosemary", "Paprika", "Black Pepper", "Nutmeg", "Bay Leaves", "Sage", "Parsley"],
    Condiments: ["Olive Oil", "Balsamic Vinegar", "Dijon Mustard", "Tomato Paste", "Pesto", "Worcestershire Sauce", "Capers", "Sun-dried Tomatoes"],
  },
  "Americas": {
    Grains: ["Tortillas (Corn/Flour)", "Rice", "Bread", "Cornmeal", "Quinoa", "Pasta", "Oats", "Taco Shells"],
    Vegetables: ["Avocado", "Tomatoes", "Corn", "Jalapeños", "Bell Peppers", "Onions", "Cilantro", "Lime", "Black Beans", "Sweet Potato"],
    Proteins: ["Chicken", "Ground Beef", "Pork", "Black Beans", "Pinto Beans", "Eggs", "Shrimp", "Tofu", "Chorizo"],
    Dairy: ["Cheese (Cheddar/Jack)", "Sour Cream", "Butter", "Cream Cheese", "Milk", "Queso Fresco"],
    Spices: ["Chili Powder", "Cumin", "Paprika", "Garlic Powder", "Oregano", "Cayenne", "Onion Powder", "Cinnamon", "Black Pepper"],
    Condiments: ["Salsa", "Hot Sauce", "BBQ Sauce", "Ketchup", "Mustard", "Mayo", "Lime Juice", "Guacamole", "Ranch Dressing"],
  },
  "Africa": {
    Grains: ["Rice", "Injera", "Couscous", "Millet", "Sorghum", "Fufu flour", "Cassava flour", "Pita Bread"],
    Vegetables: ["Tomatoes", "Onions", "Okra", "Spinach", "Plantains", "Sweet Potato", "Peppers", "Cassava", "Yam", "Collard Greens"],
    Proteins: ["Chicken", "Goat", "Beef", "Fish", "Lentils", "Black-eyed Peas", "Eggs", "Groundnuts / Peanuts"],
    Dairy: ["Yoghurt", "Butter", "Milk"],
    Spices: ["Berbere", "Ras el Hanout", "Suya Spice", "Cayenne", "Ginger", "Garlic", "Cumin", "Coriander", "Cardamom", "Cinnamon"],
    Condiments: ["Palm Oil", "Shea Butter", "Groundnut Paste", "Harissa", "Tomato Paste", "Tamarind", "Coconut Milk", "Scotch Bonnet Sauce"],
  },
};

// Items to exclude based on dietary preferences
const dietaryExclusions: Record<string, string[]> = {
  Vegetarian: ["Chicken", "Pork", "Beef", "Lamb", "Mutton", "Fish", "Prawns", "Shrimp", "Duck", "Crab", "Salmon", "Goat", "Ground Beef", "Chorizo"],
  Vegan: ["Chicken", "Pork", "Beef", "Lamb", "Mutton", "Fish", "Prawns", "Shrimp", "Duck", "Crab", "Salmon", "Goat", "Ground Beef", "Chorizo", "Eggs", "Milk", "Butter", "Cream", "Ghee", "Curd / Yoghurt", "Yoghurt", "Yoghurt / Labneh", "Paneer", "Cheese", "Cheese (Cheddar/Jack)", "Cheddar", "Mozzarella", "Parmesan", "Feta", "Feta Cheese", "Halloumi", "Ricotta", "Sour Cream", "Cream Cheese", "Queso Fresco", "Condensed Milk", "Coconut Cream"],
  Pescatarian: ["Chicken", "Pork", "Beef", "Lamb", "Mutton", "Duck", "Goat", "Ground Beef", "Chorizo"],
  "Non-Vegetarian": [],
};

const religiousExclusions: Record<string, string[]> = {
  "Jain-friendly": ["Onions", "Garlic", "Potatoes", "Ginger", "Scallions", "Root vegetables"],
  Halal: ["Pork", "Chorizo"],
  Kosher: ["Pork", "Shellfish", "Prawns", "Shrimp", "Crab", "Chorizo"],
  "No pork": ["Pork", "Chorizo"],
  "No beef": ["Beef", "Ground Beef"],
};

const allergyExclusions: Record<string, string[]> = {
  "Tree Nuts": ["Groundnuts / Peanuts", "Groundnut Paste"],
  Dairy: ["Milk", "Butter", "Cream", "Ghee", "Curd / Yoghurt", "Yoghurt", "Yoghurt / Labneh", "Paneer", "Cheese", "Cheese (Cheddar/Jack)", "Mozzarella", "Parmesan", "Feta", "Feta Cheese", "Halloumi", "Ricotta", "Sour Cream", "Cream Cheese", "Queso Fresco", "Condensed Milk"],
  Gluten: ["Atta / Wheat flour", "Bread", "Bread / Pav", "Pasta (various)", "Pasta", "Flour", "Udon Noodles", "Ramen Noodles", "Soba Noodles", "Wonton Wrappers", "Tortillas (Corn/Flour)", "Pita Bread", "Couscous", "Bulgur Wheat", "Filo Pastry", "Crackers", "Taco Shells"],
  Soy: ["Soy Sauce", "Tofu", "Tempeh", "Soya chunks", "Miso Paste", "Edamame"],
  Shellfish: ["Prawns", "Shrimp", "Crab"],
  Eggs: ["Eggs"],
};

const categories = [
  { emoji: "🌾", name: "Grains", label: "Grains & Staples" },
  { emoji: "🥦", name: "Vegetables", label: "Fresh Vegetables" },
  { emoji: "🥩", name: "Proteins", label: "Proteins & Pulses" },
  { emoji: "🥛", name: "Dairy", label: "Dairy & Eggs" },
  { emoji: "🧂", name: "Spices", label: "Spices & Herbs" },
  { emoji: "🫙", name: "Condiments", label: "Condiments & Oils" },
];

const currencyByRegion: Record<string, string> = {
  "South Asia": "₹",
  "East & SE Asia": "$",
  "Middle East": "AED",
  "Europe": "€",
  "Americas": "$",
  "Africa": "$",
};

const PantrySetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any) || {};
  const { region, country, diet, religious, allergies } = state;

  const resolvedRegion = region || "South Asia";
  const currency = currencyByRegion[resolvedRegion] || "₹";

  // Build exclusion set from dietary choices
  const exclusionSet = useMemo(() => {
    const excluded = new Set<string>();
    if (diet && dietaryExclusions[diet]) {
      dietaryExclusions[diet].forEach(e => excluded.add(e));
    }
    if (religious) {
      (religious as string[]).forEach(r => {
        if (religiousExclusions[r]) religiousExclusions[r].forEach(e => excluded.add(e));
      });
    }
    if (allergies) {
      (allergies as string[]).forEach(a => {
        if (allergyExclusions[a]) allergyExclusions[a].forEach(e => excluded.add(e));
      });
    }
    return excluded;
  }, [diet, religious, allergies]);

  // Get filtered items per category
  const getItems = (category: string): string[] => {
    const regionItems = pantryData[resolvedRegion]?.[category] || pantryData["South Asia"][category] || [];
    return regionItems.filter(item => !exclusionSet.has(item));
  };

  const [selCats, setSelCats] = useState<string[]>(["Grains", "Vegetables", "Spices"]);
  const [selItems, setSelItems] = useState<Record<string, string[]>>({});
  const [customItems, setCustomItems] = useState<Record<string, string[]>>({});
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [newItem, setNewItem] = useState("");
  const [budget, setBudget] = useState("200");

  const toggleCat = (name: string) => {
    setSelCats(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);
  };

  const toggleItem = (category: string, item: string) => {
    setSelItems(prev => {
      const current = prev[category] || [];
      const updated = current.includes(item) ? current.filter(x => x !== item) : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const addCustomItem = (category: string) => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    setCustomItems(prev => {
      const existing = prev[category] || [];
      if (existing.includes(trimmed)) return prev;
      return { ...prev, [category]: [...existing, trimmed] };
    });
    // Auto-select the new item
    setSelItems(prev => {
      const current = prev[category] || [];
      if (current.includes(trimmed)) return prev;
      return { ...prev, [category]: [...current, trimmed] };
    });
    setNewItem("");
    setAddingTo(null);
  };

  const isItemSelected = (category: string, item: string) => {
    return (selItems[category] || []).includes(item);
  };

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen pb-24">
      <OnboardingHeader step={6} />
      <div className="flex-1 overflow-y-auto px-4 pt-4 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-navy">What's already in your kitchen?</h2>
          <p className="text-[13px] text-mm-gray mt-1">
            {country
              ? `Showing common ${country} / ${resolvedRegion} ingredients${diet ? ` · ${diet} friendly` : ""}`
              : "Mira™ uses this to minimise what you need to buy"}
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {categories.map(c => {
            const items = getItems(c.name);
            // Hide Dairy for vegans, Proteins visibility based on diet
            if (c.name === "Dairy" && diet === "Vegan") return null;
            return (
              <button key={c.name} onClick={() => toggleCat(c.name)}
                className={`h-[78px] rounded-xl flex flex-col items-center justify-center gap-0.5 shadow-card transition-all active:scale-95 overflow-hidden px-1 ${
                  selCats.includes(c.name) ? "bg-saffron-light border-2 border-saffron" : "bg-card border-2 border-transparent"
                }`}
              >
                <span className="text-[24px] leading-none">{c.emoji}</span>
                <span className="text-[11px] font-bold text-foreground leading-tight text-center">{c.label}</span>
                <span className="text-[9px] text-mm-gray leading-tight">{items.length} items</span>
              </button>
            );
          })}
        </div>

        {/* Expanded panels for each selected category */}
        {selCats.map(cat => {
          const items = getItems(cat);
          const custom = customItems[cat] || [];
          const allItems = [...items, ...custom.filter(c => !items.includes(c))];
          if (allItems.length === 0 && addingTo !== cat) return null;
          return (
            <div key={cat} className="bg-card rounded-xl p-3 border-t-2 border-saffron shadow-card">
              <p className="text-[12px] text-mm-gray mb-2">
                {categories.find(c => c.name === cat)?.emoji} {categories.find(c => c.name === cat)?.label || cat} common in {country || resolvedRegion}:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {allItems.map(item => (
                  <button key={item} onClick={() => toggleItem(cat, item)}
                    className={`h-9 px-2 rounded-lg text-[12px] text-left flex items-center gap-2 transition-all ${
                      isItemSelected(cat, item) ? "text-mm-green font-bold" : "text-mm-gray"
                    }`}
                  >
                    {isItemSelected(cat, item) ? "✅" : "☐"} {item}
                  </button>
                ))}
              </div>
              {addingTo === cat ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    autoFocus
                    type="text"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addCustomItem(cat)}
                    placeholder="Item name"
                    className="flex-1 h-9 px-3 rounded-lg border border-light-gray bg-cream text-[12px] text-foreground outline-none focus:border-saffron"
                  />
                  <button onClick={() => addCustomItem(cat)} className="h-9 px-3 rounded-lg bg-saffron text-cream text-[12px] font-bold">Add</button>
                  <button onClick={() => { setAddingTo(null); setNewItem(""); }} className="h-9 px-2 text-mm-gray text-[12px]">✕</button>
                </div>
              ) : (
                <button onClick={() => setAddingTo(cat)}
                  className="mt-2 h-9 px-3 rounded-lg border border-dashed border-saffron text-saffron text-[12px] font-semibold flex items-center gap-1"
                >
                  ＋ Add item
                </button>
              )}
            </div>
          );
        })}

        {/* Scan */}
        <button className="w-full h-[52px] rounded-xl border-[1.5px] border-dashed border-teal text-teal font-bold text-sm flex items-center justify-center gap-2">
          📸 Scan ingredients with camera
        </button>

        {/* Budget */}
        <div className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">{currency} Budget per meal</p>
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
        <button onClick={() => navigate("/onboarding/loading", { state: { ...state, pantryItems: selItems, budget } })}
          className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform">
          ✨ Generate My Plan →
        </button>
        <button onClick={() => navigate("/onboarding/loading", { state: { ...state, pantryItems: selItems, budget } })}
          className="w-full text-center text-mm-gray text-sm">
          Skip for now — I'll add later
        </button>
      </div>
    </div>
  );
};

export default PantrySetup;
