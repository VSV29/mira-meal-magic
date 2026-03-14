export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  cuisineCode: string;
  region: string;
  country: string;
  time: string;
  timeMinutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  diet: ("Vegetarian" | "Vegan" | "Non-Vegetarian" | "Pescatarian")[];
  calories: number;
  protein: string;
  carbs: string;
  ingredients: string[];
  description: string;
}

// Comprehensive country-specific recipe database
export const recipes: Recipe[] = [
  // ===== INDIA =====
  // North Indian
  { id: "in-n-1", name: "Dal Tadka", emoji: "🍛", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 280, protein: "12g", carbs: "38g", ingredients: ["Toor Dal", "Tomatoes", "Onions", "Cumin seeds", "Turmeric", "Ghee", "Coriander"], description: "Classic lentil dish tempered with cumin and garlic" },
  { id: "in-n-2", name: "Palak Paneer", emoji: "🥘", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Vegetarian"], calories: 340, protein: "16g", carbs: "18g", ingredients: ["Paneer", "Spinach", "Onions", "Tomatoes", "Cream", "Garam Masala", "Garlic"], description: "Creamy spinach curry with soft paneer cubes" },
  { id: "in-n-3", name: "Chole Bhature", emoji: "🍛", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 450, protein: "14g", carbs: "55g", ingredients: ["Chickpeas", "Onions", "Tomatoes", "Garam Masala", "Atta / Wheat flour", "Oil"], description: "Spiced chickpea curry with fluffy fried bread" },
  { id: "in-n-4", name: "Rajma Chawal", emoji: "🍛", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "30m", timeMinutes: 30, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 380, protein: "15g", carbs: "60g", ingredients: ["Rajma", "Rice", "Onions", "Tomatoes", "Garam Masala", "Cumin seeds"], description: "Kidney bean curry served over steamed rice" },
  { id: "in-n-5", name: "Butter Chicken", emoji: "🍗", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "45m", timeMinutes: 45, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 490, protein: "32g", carbs: "18g", ingredients: ["Chicken", "Tomatoes", "Butter", "Cream", "Garam Masala", "Kasuri Methi"], description: "Rich tomato-butter curry with tender chicken" },
  { id: "in-n-6", name: "Aloo Paratha", emoji: "🫓", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian"], calories: 320, protein: "8g", carbs: "45g", ingredients: ["Atta / Wheat flour", "Potatoes", "Green Chilli", "Coriander", "Cumin seeds", "Butter"], description: "Stuffed potato flatbread served with yogurt" },
  { id: "in-n-7", name: "Dal Makhani", emoji: "🍛", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 360, protein: "14g", carbs: "40g", ingredients: ["Black Dal", "Butter", "Cream", "Tomatoes", "Ginger", "Garlic"], description: "Slow-cooked black lentils in butter and cream" },
  { id: "in-n-8", name: "Paneer Tikka", emoji: "🧀", cuisine: "North Indian", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian"], calories: 280, protein: "18g", carbs: "12g", ingredients: ["Paneer", "Curd / Yoghurt", "Capsicum", "Onions", "Red Chilli", "Cumin seeds"], description: "Grilled marinated paneer with vegetables" },

  // South Indian
  { id: "in-s-1", name: "Masala Dosa", emoji: "🍚", cuisine: "South Indian", cuisineCode: "IN-S", region: "South Asia", country: "India", time: "20m", timeMinutes: 20, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 260, protein: "6g", carbs: "42g", ingredients: ["Rice", "Urad Dal", "Potatoes", "Mustard seeds", "Curry leaves", "Onions"], description: "Crispy rice crepe filled with spiced potatoes" },
  { id: "in-s-2", name: "Idli + Sambar", emoji: "🍚", cuisine: "South Indian", cuisineCode: "IN-S", region: "South Asia", country: "India", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 220, protein: "8g", carbs: "40g", ingredients: ["Rice", "Urad Dal", "Toor Dal", "Tomatoes", "Mustard seeds", "Curry leaves"], description: "Steamed rice cakes with spiced lentil soup" },
  { id: "in-s-3", name: "Upma", emoji: "🍚", cuisine: "South Indian", cuisineCode: "IN-S", region: "South Asia", country: "India", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian"], calories: 210, protein: "5g", carbs: "35g", ingredients: ["Semolina / Rava", "Onions", "Mustard seeds", "Curry leaves", "Green Peas", "Cashews"], description: "Savory semolina porridge with vegetables" },
  { id: "in-s-4", name: "Coconut Chutney", emoji: "🥥", cuisine: "South Indian", cuisineCode: "IN-S", region: "South Asia", country: "India", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 80, protein: "2g", carbs: "6g", ingredients: ["Coconut milk", "Green Chilli", "Ginger", "Mustard seeds", "Curry leaves"], description: "Fresh coconut chutney with tempered spices" },
  { id: "in-s-5", name: "Rasam", emoji: "🍲", cuisine: "South Indian", cuisineCode: "IN-S", region: "South Asia", country: "India", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 90, protein: "3g", carbs: "12g", ingredients: ["Tomatoes", "Tamarind paste", "Pepper", "Cumin seeds", "Curry leaves", "Coriander"], description: "Tangy tomato-tamarind soup with pepper" },

  // Bengali
  { id: "in-b-1", name: "Mishti Doi", emoji: "🍮", cuisine: "Bengali", cuisineCode: "IN", region: "South Asia", country: "India", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian"], calories: 180, protein: "5g", carbs: "28g", ingredients: ["Milk", "Curd / Yoghurt", "Sugar", "Cardamom"], description: "Sweet caramelized yogurt dessert" },
  { id: "in-b-2", name: "Aloo Posto", emoji: "🥔", cuisine: "Bengali", cuisineCode: "IN", region: "South Asia", country: "India", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 240, protein: "5g", carbs: "30g", ingredients: ["Potatoes", "Poppy seeds", "Mustard seeds", "Green Chilli", "Turmeric", "Oil"], description: "Potatoes in poppy seed paste" },

  // Gujarati
  { id: "in-g-1", name: "Dhokla", emoji: "🟡", cuisine: "Gujarati", cuisineCode: "IN", region: "South Asia", country: "India", time: "20m", timeMinutes: 20, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 180, protein: "7g", carbs: "28g", ingredients: ["Besan / Chickpea flour", "Curd / Yoghurt", "Mustard seeds", "Green Chilli", "Curry leaves", "Sugar"], description: "Steamed chickpea flour cake with tempering" },
  { id: "in-g-2", name: "Undhiyu", emoji: "🥘", cuisine: "Gujarati", cuisineCode: "IN", region: "South Asia", country: "India", time: "45m", timeMinutes: 45, difficulty: "Hard", diet: ["Vegetarian"], calories: 350, protein: "10g", carbs: "42g", ingredients: ["Potatoes", "Brinjal", "Green Peas", "Besan / Chickpea flour", "Coconut milk", "Coriander"], description: "Mixed vegetable casserole with spices" },

  // Punjabi
  { id: "in-p-1", name: "Sarson Ka Saag", emoji: "🥬", cuisine: "Punjabi", cuisineCode: "IN-N", region: "South Asia", country: "India", time: "40m", timeMinutes: 40, difficulty: "Medium", diet: ["Vegetarian"], calories: 280, protein: "8g", carbs: "22g", ingredients: ["Spinach", "Mustard leaves", "Butter", "Cornmeal", "Ginger", "Garlic"], description: "Mustard greens with cornmeal bread" },

  // Biryani
  { id: "in-br-1", name: "Hyderabadi Biryani", emoji: "🍛", cuisine: "Biryani Special", cuisineCode: "IN", region: "South Asia", country: "India", time: "55m", timeMinutes: 55, difficulty: "Hard", diet: ["Non-Vegetarian"], calories: 520, protein: "28g", carbs: "62g", ingredients: ["Rice", "Chicken", "Onions", "Curd / Yoghurt", "Saffron", "Garam Masala", "Mint"], description: "Layered aromatic rice with spiced chicken" },
  { id: "in-br-2", name: "Veg Biryani", emoji: "🍛", cuisine: "Biryani Special", cuisineCode: "IN", region: "South Asia", country: "India", time: "40m", timeMinutes: 40, difficulty: "Medium", diet: ["Vegetarian"], calories: 420, protein: "10g", carbs: "65g", ingredients: ["Rice", "Potatoes", "Cauliflower", "Green Peas", "Curd / Yoghurt", "Saffron", "Garam Masala"], description: "Aromatic layered rice with mixed vegetables" },

  // Street Food
  { id: "in-sf-1", name: "Pav Bhaji", emoji: "🍛", cuisine: "Street Food", cuisineCode: "IN-W", region: "South Asia", country: "India", time: "30m", timeMinutes: 30, difficulty: "Easy", diet: ["Vegetarian"], calories: 380, protein: "10g", carbs: "52g", ingredients: ["Potatoes", "Cauliflower", "Green Peas", "Butter", "Bread / Pav", "Onions"], description: "Mashed vegetable curry with buttered buns" },
  { id: "in-sf-2", name: "Poha", emoji: "🍛", cuisine: "Street Food", cuisineCode: "IN", region: "South Asia", country: "India", time: "12m", timeMinutes: 12, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 220, protein: "4g", carbs: "38g", ingredients: ["Poha", "Onions", "Mustard seeds", "Turmeric", "Green Chilli", "Coriander"], description: "Flattened rice with onions and peanuts" },
  { id: "in-sf-3", name: "Moong Dal Chilla", emoji: "🫓", cuisine: "Street Food", cuisineCode: "IN", region: "South Asia", country: "India", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 180, protein: "10g", carbs: "22g", ingredients: ["Moong Dal", "Onions", "Green Chilli", "Coriander", "Turmeric"], description: "Crispy lentil pancakes with fresh toppings" },

  // ===== PAKISTAN =====
  { id: "pk-1", name: "Nihari", emoji: "🍖", cuisine: "Pakistani", cuisineCode: "PK", region: "South Asia", country: "Pakistan", time: "60m", timeMinutes: 60, difficulty: "Hard", diet: ["Non-Vegetarian"], calories: 520, protein: "35g", carbs: "28g", ingredients: ["Beef", "Onions", "Ginger", "Garlic", "Garam Masala", "Atta / Wheat flour"], description: "Slow-cooked beef stew with aromatic spices" },
  { id: "pk-2", name: "Chicken Karahi", emoji: "🍗", cuisine: "Pakistani", cuisineCode: "PK", region: "South Asia", country: "Pakistan", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 420, protein: "30g", carbs: "12g", ingredients: ["Chicken", "Tomatoes", "Ginger", "Green Chilli", "Coriander", "Cumin seeds"], description: "Wok-tossed chicken with tomatoes and spices" },
  { id: "pk-3", name: "Haleem", emoji: "🍲", cuisine: "Pakistani", cuisineCode: "PK", region: "South Asia", country: "Pakistan", time: "50m", timeMinutes: 50, difficulty: "Hard", diet: ["Non-Vegetarian"], calories: 380, protein: "22g", carbs: "42g", ingredients: ["Beef", "Dal (Toor/Chana/Moong)", "Atta / Wheat flour", "Ginger", "Garam Masala", "Onions"], description: "Slow-cooked lentil and meat stew" },

  // ===== SRI LANKA =====
  { id: "lk-1", name: "Rice and Curry", emoji: "🍛", cuisine: "Sri Lankan", cuisineCode: "LK", region: "South Asia", country: "Sri Lanka", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 380, protein: "10g", carbs: "55g", ingredients: ["Rice", "Coconut milk", "Curry leaves", "Turmeric", "Mustard seeds", "Vegetables"], description: "Classic Sri Lankan rice with multiple curries" },
  { id: "lk-2", name: "Kottu Roti", emoji: "🫓", cuisine: "Sri Lankan", cuisineCode: "LK", region: "South Asia", country: "Sri Lanka", time: "20m", timeMinutes: 20, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 440, protein: "18g", carbs: "48g", ingredients: ["Flatbread", "Eggs", "Onions", "Green Chilli", "Curry leaves", "Chicken"], description: "Chopped flatbread stir-fried with vegetables" },

  // ===== JAPAN =====
  { id: "jp-1", name: "Miso Ramen", emoji: "🍜", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 420, protein: "15g", carbs: "55g", ingredients: ["Ramen Noodles", "Miso Paste", "Tofu", "Scallions", "Nori / Seaweed", "Mushrooms (Shiitake)", "Ginger"], description: "Rich miso broth ramen with silky noodles" },
  { id: "jp-2", name: "Vegetable Tempura", emoji: "🍤", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 300, protein: "5g", carbs: "38g", ingredients: ["Sweet Potato", "Zucchini", "Mushrooms (Shiitake)", "Flour", "Rice Vinegar", "Soy Sauce"], description: "Light crispy battered vegetables" },
  { id: "jp-3", name: "Teriyaki Tofu Bowl", emoji: "🍱", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 350, protein: "18g", carbs: "45g", ingredients: ["Tofu", "Soy Sauce", "Rice", "Edamame", "Scallions", "Sesame Oil", "Ginger"], description: "Glazed tofu over rice with vegetables" },
  { id: "jp-4", name: "Sushi Rolls", emoji: "🍣", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Pescatarian"], calories: 280, protein: "12g", carbs: "42g", ingredients: ["Sticky Rice", "Nori / Seaweed", "Fish", "Cucumber", "Rice Vinegar", "Soy Sauce"], description: "Fresh rolled sushi with fish and vegetables" },
  { id: "jp-5", name: "Gyoza", emoji: "🥟", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 320, protein: "14g", carbs: "35g", ingredients: ["Wonton Wrappers", "Pork", "Napa Cabbage", "Ginger", "Garlic", "Soy Sauce", "Sesame Oil"], description: "Pan-fried dumplings with savory filling" },
  { id: "jp-6", name: "Miso Soup", emoji: "🍵", cuisine: "Japanese", cuisineCode: "JP", region: "East & SE Asia", country: "Japan", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 60, protein: "4g", carbs: "6g", ingredients: ["Miso Paste", "Tofu", "Scallions", "Nori / Seaweed", "Mushrooms (Shiitake)"], description: "Classic Japanese soybean soup" },

  // ===== CHINA =====
  { id: "cn-1", name: "Kung Pao Tofu", emoji: "🍜", cuisine: "Chinese", cuisineCode: "CN", region: "East & SE Asia", country: "China", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 310, protein: "16g", carbs: "22g", ingredients: ["Tofu", "Peanuts", "Szechuan Pepper", "Soy Sauce", "Scallions", "Ginger", "Garlic"], description: "Spicy stir-fried tofu with peanuts" },
  { id: "cn-2", name: "Fried Rice", emoji: "🍚", cuisine: "Chinese", cuisineCode: "CN", region: "East & SE Asia", country: "China", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian"], calories: 340, protein: "10g", carbs: "52g", ingredients: ["Rice", "Eggs", "Scallions", "Soy Sauce", "Sesame Oil", "Bean Sprouts", "Carrots"], description: "Classic wok-fried rice with eggs and vegetables" },
  { id: "cn-3", name: "Mapo Tofu", emoji: "🌶️", cuisine: "Chinese", cuisineCode: "CN", region: "East & SE Asia", country: "China", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 280, protein: "18g", carbs: "15g", ingredients: ["Tofu", "Szechuan Pepper", "Chilli Oil", "Soy Sauce", "Scallions", "Garlic"], description: "Spicy Sichuan silken tofu in chili sauce" },
  { id: "cn-4", name: "Dim Sum Platter", emoji: "🥟", cuisine: "Chinese", cuisineCode: "CN", region: "East & SE Asia", country: "China", time: "40m", timeMinutes: 40, difficulty: "Hard", diet: ["Non-Vegetarian"], calories: 380, protein: "16g", carbs: "42g", ingredients: ["Wonton Wrappers", "Shrimp", "Pork", "Ginger", "Soy Sauce", "Sesame Oil"], description: "Assorted steamed and fried dumplings" },
  { id: "cn-5", name: "Stir-fry Noodles", emoji: "🍜", cuisine: "Chinese", cuisineCode: "CN", region: "East & SE Asia", country: "China", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian"], calories: 320, protein: "8g", carbs: "48g", ingredients: ["Rice Noodles", "Bok Choy", "Bean Sprouts", "Soy Sauce", "Sesame Oil", "Garlic"], description: "Wok-fried noodles with crisp vegetables" },

  // ===== SOUTH KOREA =====
  { id: "kr-1", name: "Bibimbap", emoji: "🍚", cuisine: "Korean", cuisineCode: "KR", region: "East & SE Asia", country: "South Korea", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian"], calories: 410, protein: "14g", carbs: "58g", ingredients: ["Rice", "Spinach", "Bean Sprouts", "Carrots", "Eggs", "Gochujang", "Sesame Oil"], description: "Mixed rice bowl with vegetables and chili paste" },
  { id: "kr-2", name: "Kimchi Jjigae", emoji: "🍲", cuisine: "Korean", cuisineCode: "KR", region: "East & SE Asia", country: "South Korea", time: "30m", timeMinutes: 30, difficulty: "Easy", diet: ["Vegetarian"], calories: 280, protein: "12g", carbs: "30g", ingredients: ["Kimchi", "Tofu", "Scallions", "Gochujang", "Sesame Oil", "Garlic"], description: "Spicy fermented cabbage stew with tofu" },
  { id: "kr-3", name: "Japchae", emoji: "🍜", cuisine: "Korean", cuisineCode: "KR", region: "East & SE Asia", country: "South Korea", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian"], calories: 300, protein: "8g", carbs: "45g", ingredients: ["Glass Noodles", "Spinach", "Mushrooms (Shiitake)", "Carrots", "Soy Sauce", "Sesame Oil"], description: "Sweet potato glass noodles with vegetables" },

  // ===== THAILAND =====
  { id: "th-1", name: "Pad Thai", emoji: "🍜", cuisine: "Thai", cuisineCode: "TH", region: "East & SE Asia", country: "Thailand", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian"], calories: 380, protein: "12g", carbs: "50g", ingredients: ["Rice Noodles", "Tofu", "Bean Sprouts", "Peanuts", "Lime", "Fish Sauce", "Scallions"], description: "Stir-fried rice noodles with tamarind sauce" },
  { id: "th-2", name: "Green Curry", emoji: "🍛", cuisine: "Thai", cuisineCode: "TH", region: "East & SE Asia", country: "Thailand", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian"], calories: 350, protein: "10g", carbs: "35g", ingredients: ["Coconut Milk", "Green Curry Paste", "Tofu", "Bamboo Shoots", "Thai Basil", "Rice"], description: "Aromatic coconut curry with Thai basil" },
  { id: "th-3", name: "Tom Yum Soup", emoji: "🍲", cuisine: "Thai", cuisineCode: "TH", region: "East & SE Asia", country: "Thailand", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Pescatarian"], calories: 180, protein: "14g", carbs: "12g", ingredients: ["Shrimp", "Lemongrass", "Galangal", "Kaffir Lime Leaves", "Mushrooms (Shiitake)", "Lime"], description: "Spicy and sour Thai soup" },

  // ===== VIETNAM =====
  { id: "vn-1", name: "Pho", emoji: "🍜", cuisine: "Vietnamese", cuisineCode: "VN", region: "East & SE Asia", country: "Vietnam", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 350, protein: "20g", carbs: "45g", ingredients: ["Rice Noodles", "Beef", "Bean Sprouts", "Thai Basil", "Star Anise", "Ginger", "Scallions"], description: "Vietnamese aromatic noodle soup" },
  { id: "vn-2", name: "Banh Mi Bowl", emoji: "🥖", cuisine: "Vietnamese", cuisineCode: "VN", region: "East & SE Asia", country: "Vietnam", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian"], calories: 310, protein: "10g", carbs: "42g", ingredients: ["Rice", "Tofu", "Pickled Carrots", "Cucumber", "Cilantro", "Soy Sauce", "Sriracha"], description: "Deconstructed banh mi in a bowl" },

  // ===== ITALY =====
  { id: "it-1", name: "Pasta Primavera", emoji: "🍝", cuisine: "Italian", cuisineCode: "IT", region: "Europe", country: "Italy", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian"], calories: 380, protein: "12g", carbs: "55g", ingredients: ["Pasta (various)", "Zucchini", "Tomatoes", "Basil", "Parmesan", "Olive Oil", "Garlic"], description: "Fresh pasta with seasonal vegetables" },
  { id: "it-2", name: "Margherita Pizza", emoji: "🍕", cuisine: "Italian", cuisineCode: "IT", region: "Europe", country: "Italy", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Vegetarian"], calories: 450, protein: "18g", carbs: "52g", ingredients: ["Flour", "Mozzarella", "Tomatoes", "Basil", "Olive Oil"], description: "Classic Neapolitan pizza with fresh basil" },
  { id: "it-3", name: "Risotto ai Funghi", emoji: "🍚", cuisine: "Italian", cuisineCode: "IT", region: "Europe", country: "Italy", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 400, protein: "10g", carbs: "58g", ingredients: ["Risotto Rice", "Mushrooms", "Parmesan", "Butter", "Onions", "White Wine"], description: "Creamy mushroom risotto" },
  { id: "it-4", name: "Bruschetta", emoji: "🍞", cuisine: "Italian", cuisineCode: "IT", region: "Europe", country: "Italy", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 180, protein: "4g", carbs: "25g", ingredients: ["Bread", "Tomatoes", "Basil", "Garlic", "Olive Oil", "Balsamic Vinegar"], description: "Toasted bread with fresh tomato topping" },

  // ===== FRANCE =====
  { id: "fr-1", name: "Ratatouille", emoji: "🍲", cuisine: "French", cuisineCode: "FR", region: "Europe", country: "France", time: "40m", timeMinutes: 40, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 220, protein: "5g", carbs: "28g", ingredients: ["Zucchini", "Tomatoes", "Eggplant", "Peppers", "Onions", "Garlic", "Basil"], description: "Provençal layered vegetable dish" },
  { id: "fr-2", name: "French Onion Soup", emoji: "🧅", cuisine: "French", cuisineCode: "FR", region: "Europe", country: "France", time: "45m", timeMinutes: 45, difficulty: "Medium", diet: ["Vegetarian"], calories: 320, protein: "12g", carbs: "35g", ingredients: ["Onions", "Butter", "Bread", "Gruyère", "Thyme", "Bay Leaves"], description: "Caramelized onion soup with cheesy crouton" },

  // ===== MEXICO =====
  { id: "mx-1", name: "Tacos al Pastor", emoji: "🌮", cuisine: "Mexican", cuisineCode: "MX", region: "Americas", country: "Mexico", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 380, protein: "22g", carbs: "35g", ingredients: ["Pork", "Tortillas (Corn/Flour)", "Pineapple", "Onions", "Cilantro", "Chili Powder", "Lime"], description: "Marinated pork tacos with pineapple" },
  { id: "mx-2", name: "Veggie Burrito Bowl", emoji: "🌯", cuisine: "Mexican", cuisineCode: "MX", region: "Americas", country: "Mexico", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 420, protein: "14g", carbs: "60g", ingredients: ["Rice", "Black Beans", "Corn", "Avocado", "Tomatoes", "Lime", "Cilantro"], description: "Loaded burrito bowl with fresh toppings" },
  { id: "mx-3", name: "Enchiladas", emoji: "🫔", cuisine: "Mexican", cuisineCode: "MX", region: "Americas", country: "Mexico", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 440, protein: "16g", carbs: "48g", ingredients: ["Tortillas (Corn/Flour)", "Black Beans", "Cheese (Cheddar/Jack)", "Salsa", "Sour Cream", "Onions"], description: "Rolled tortillas in chili sauce with cheese" },

  // ===== USA =====
  { id: "us-1", name: "Classic Veggie Burger", emoji: "🍔", cuisine: "American", cuisineCode: "US", region: "Americas", country: "USA", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian"], calories: 450, protein: "18g", carbs: "48g", ingredients: ["Black Beans", "Bread", "Avocado", "Tomatoes", "Onions", "Lettuce"], description: "Hearty black bean burger with all the fixings" },

  // ===== LEBANON =====
  { id: "lb-1", name: "Falafel Plate", emoji: "🧆", cuisine: "Lebanese", cuisineCode: "LB", region: "Middle East", country: "Lebanon", time: "25m", timeMinutes: 25, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 380, protein: "14g", carbs: "42g", ingredients: ["Chickpeas", "Parsley", "Cumin", "Garlic", "Tahini", "Pita Bread"], description: "Crispy chickpea fritters with tahini sauce" },
  { id: "lb-2", name: "Hummus & Pita", emoji: "🫕", cuisine: "Lebanese", cuisineCode: "LB", region: "Middle East", country: "Lebanon", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 280, protein: "10g", carbs: "35g", ingredients: ["Chickpeas", "Tahini", "Lemon juice", "Garlic", "Olive Oil", "Pita Bread"], description: "Creamy chickpea dip with warm pita" },
  { id: "lb-3", name: "Tabbouleh", emoji: "🥗", cuisine: "Lebanese", cuisineCode: "LB", region: "Middle East", country: "Lebanon", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 160, protein: "4g", carbs: "22g", ingredients: ["Bulgur Wheat", "Parsley", "Tomatoes", "Mint", "Lemon juice", "Olive Oil"], description: "Fresh herb and bulgur salad" },

  // ===== TURKEY =====
  { id: "tr-1", name: "Lahmacun", emoji: "🫓", cuisine: "Turkish", cuisineCode: "TR", region: "Middle East", country: "Turkey", time: "30m", timeMinutes: 30, difficulty: "Medium", diet: ["Non-Vegetarian"], calories: 350, protein: "18g", carbs: "40g", ingredients: ["Flatbread", "Ground Beef", "Onions", "Tomatoes", "Peppers", "Parsley", "Sumac"], description: "Turkish flatbread with spiced meat topping" },
  { id: "tr-2", name: "Mercimek Çorbası", emoji: "🍲", cuisine: "Turkish", cuisineCode: "TR", region: "Middle East", country: "Turkey", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 220, protein: "12g", carbs: "35g", ingredients: ["Lentils", "Onions", "Carrots", "Cumin", "Paprika", "Lemon juice"], description: "Red lentil soup with cumin and lemon" },

  // ===== MOROCCO =====
  { id: "ma-1", name: "Vegetable Tagine", emoji: "🫕", cuisine: "Moroccan", cuisineCode: "MA", region: "Africa", country: "Morocco", time: "40m", timeMinutes: 40, difficulty: "Medium", diet: ["Vegetarian", "Vegan"], calories: 320, protein: "8g", carbs: "45g", ingredients: ["Chickpeas", "Sweet Potato", "Tomatoes", "Ras el Hanout", "Coriander", "Couscous"], description: "Slow-cooked spiced vegetable stew" },

  // ===== ETHIOPIA =====
  { id: "et-1", name: "Misir Wot", emoji: "🍛", cuisine: "Ethiopian", cuisineCode: "ET", region: "Africa", country: "Ethiopia", time: "30m", timeMinutes: 30, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 290, protein: "14g", carbs: "42g", ingredients: ["Lentils", "Berbere", "Onions", "Garlic", "Ginger", "Injera"], description: "Spiced red lentil stew on injera bread" },

  // ===== NIGERIA =====
  { id: "ng-1", name: "Jollof Rice", emoji: "🍚", cuisine: "Nigerian", cuisineCode: "NG", region: "Africa", country: "Nigeria", time: "40m", timeMinutes: 40, difficulty: "Medium", diet: ["Vegetarian"], calories: 400, protein: "8g", carbs: "62g", ingredients: ["Rice", "Tomatoes", "Onions", "Peppers", "Tomato Paste", "Thyme", "Bay Leaves"], description: "West African tomato-spiced rice" },

  // ===== GREECE =====
  { id: "gr-1", name: "Greek Salad", emoji: "🥗", cuisine: "Greek", cuisineCode: "GR", region: "Europe", country: "Greece", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian"], calories: 220, protein: "8g", carbs: "12g", ingredients: ["Tomatoes", "Cucumber", "Feta", "Olives", "Onions", "Olive Oil", "Oregano"], description: "Classic Mediterranean salad with feta" },
  { id: "gr-2", name: "Spanakopita", emoji: "🥧", cuisine: "Greek", cuisineCode: "GR", region: "Europe", country: "Greece", time: "35m", timeMinutes: 35, difficulty: "Medium", diet: ["Vegetarian"], calories: 340, protein: "12g", carbs: "30g", ingredients: ["Spinach", "Feta", "Filo Pastry", "Onions", "Eggs", "Olive Oil"], description: "Spinach and feta wrapped in crispy phyllo" },

  // ===== SPAIN =====
  { id: "es-1", name: "Patatas Bravas", emoji: "🥔", cuisine: "Spanish", cuisineCode: "ES", region: "Europe", country: "Spain", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 280, protein: "4g", carbs: "38g", ingredients: ["Potatoes", "Tomatoes", "Paprika", "Garlic", "Olive Oil", "Cayenne"], description: "Crispy potatoes with spicy bravas sauce" },
  { id: "es-2", name: "Gazpacho", emoji: "🍅", cuisine: "Spanish", cuisineCode: "ES", region: "Europe", country: "Spain", time: "15m", timeMinutes: 15, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 120, protein: "3g", carbs: "15g", ingredients: ["Tomatoes", "Cucumber", "Peppers", "Garlic", "Olive Oil", "Bread"], description: "Chilled tomato soup for hot days" },

  // ===== BRAZIL =====
  { id: "br-1", name: "Açaí Bowl", emoji: "🫐", cuisine: "Brazilian", cuisineCode: "BR", region: "Americas", country: "Brazil", time: "10m", timeMinutes: 10, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 280, protein: "5g", carbs: "45g", ingredients: ["Açaí", "Banana", "Granola", "Honey", "Berries"], description: "Frozen açaí smoothie bowl with toppings" },

  // ===== PERU =====
  { id: "pe-1", name: "Quinoa Salad", emoji: "🥗", cuisine: "Peruvian", cuisineCode: "PE", region: "Americas", country: "Peru", time: "20m", timeMinutes: 20, difficulty: "Easy", diet: ["Vegetarian", "Vegan"], calories: 290, protein: "10g", carbs: "42g", ingredients: ["Quinoa", "Avocado", "Corn", "Tomatoes", "Lime", "Cilantro"], description: "Fresh Andean grain salad with lime dressing" },

  // ===== MEDITERRANEAN =====
  { id: "med-1", name: "Mezze Platter", emoji: "🥙", cuisine: "Mediterranean", cuisineCode: "ME", region: "Middle East", country: "Lebanon", time: "25m", timeMinutes: 25, difficulty: "Easy", diet: ["Vegetarian"], calories: 380, protein: "12g", carbs: "40g", ingredients: ["Chickpeas", "Tahini", "Pita Bread", "Tomatoes", "Cucumber", "Olive Oil", "Feta"], description: "Assorted Middle Eastern dips and bread" },
];

// Get all unique cuisines
export const getAllCuisines = (): string[] => {
  return [...new Set(recipes.map(r => r.cuisine))].sort();
};

// Get all unique countries
export const getAllCountries = (): string[] => {
  return [...new Set(recipes.map(r => r.country))].sort();
};

// Get cuisines by region
export const getCuisinesByRegion = (region: string): string[] => {
  return [...new Set(recipes.filter(r => r.region === region).map(r => r.cuisine))];
};

// Get cuisines by country
export const getCuisinesByCountry = (country: string): string[] => {
  return [...new Set(recipes.filter(r => r.country === country).map(r => r.cuisine))];
};

// Get recipes filtered by various criteria
export const getRecipes = (filters: {
  cuisine?: string;
  country?: string;
  region?: string;
  diet?: string;
  maxTime?: number;
  ingredients?: string[];
}): Recipe[] => {
  return recipes.filter(r => {
    if (filters.cuisine && r.cuisine !== filters.cuisine) return false;
    if (filters.country && r.country !== filters.country) return false;
    if (filters.region && r.region !== filters.region) return false;
    if (filters.diet && !r.diet.includes(filters.diet as any)) return false;
    if (filters.maxTime && r.timeMinutes > filters.maxTime) return false;
    if (filters.ingredients && filters.ingredients.length > 0) {
      const matchCount = r.ingredients.filter(i =>
        filters.ingredients!.some(fi => i.toLowerCase().includes(fi.toLowerCase()) || fi.toLowerCase().includes(i.toLowerCase()))
      ).length;
      if (matchCount === 0) return false;
    }
    return true;
  });
};

// Score recipes by ingredient match
export const getRecipesByIngredients = (ingredients: string[], diet?: string, maxTime?: number): (Recipe & { matchCount: number; matchPercent: number })[] => {
  const filtered = recipes.filter(r => {
    if (diet && !r.diet.includes(diet as any)) return false;
    if (maxTime && r.timeMinutes > maxTime) return false;
    return true;
  });

  return filtered.map(r => {
    const matchCount = r.ingredients.filter(i =>
      ingredients.some(fi => i.toLowerCase().includes(fi.toLowerCase()) || fi.toLowerCase().includes(i.toLowerCase()))
    ).length;
    const matchPercent = Math.round((matchCount / r.ingredients.length) * 100);
    return { ...r, matchCount, matchPercent };
  })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchPercent - a.matchPercent || b.matchCount - a.matchCount);
};
