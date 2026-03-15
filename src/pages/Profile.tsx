import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "@/components/BottomTabBar";

const Profile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors relative ${on ? "bg-teal" : "bg-light-gray"}`}>
      <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-1 transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );

  const SectionItem = ({ label, value, onClick }: { label: string; value?: string; onClick?: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between h-12 px-1">
      <span className="text-sm text-foreground">{label}</span>
      {value ? <span className="text-[13px] text-mm-gray">{value} ›</span> : <span className="text-mm-gray">›</span>}
    </button>
  );

  return (
    <div className="mobile-container bg-cream min-h-screen pb-20">
      <div className="sticky top-0 z-20 bg-card shadow-card px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-light-gray flex items-center justify-center active:scale-90 transition-transform">
          <span className="text-navy text-sm">←</span>
        </button>
        <p className="text-lg font-bold text-navy">👤 Profile</p>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-4 bg-card rounded-2xl shadow-card p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-saffron flex items-center justify-center text-cream text-2xl font-bold">P</div>
          <div>
            <p className="text-lg font-bold text-foreground">Priya Sharma</p>
            <p className="text-[13px] text-mm-gray">Mumbai, India 🇮🇳 · Vegetarian · Jain-friendly</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
          <div className="text-center"><span className="text-lg">🔥</span><p className="text-sm font-bold text-foreground">3 Streak</p></div>
          <div className="text-center"><span className="text-lg">🍳</span><p className="text-sm font-bold text-foreground">8 Cooked</p></div>
          <div className="text-center"><span className="text-lg">💰</span><p className="text-sm font-bold text-foreground">₹2,450 saved</p></div>
        </div>
      </div>

      {/* Settings sections */}
      <div className="px-4 mt-4 space-y-4">
        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-1 px-1">Preferences</p>
          <div className="bg-card rounded-xl shadow-card px-3 divide-y divide-light-gray">
            <SectionItem label="My Cuisines" value="North Indian, South Indian, Japanese" />
            <SectionItem label="Dietary Rules" value="Strict Veg, Jain" />
            <SectionItem label="Cooking Time" value="30m weekday, 60m weekend" />
            <SectionItem label="Budget per meal" value="₹200" />
          </div>
        </div>

        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-1 px-1">Mira™ Engine</p>
          <div className="bg-card rounded-xl shadow-card px-3 divide-y divide-light-gray">
            <SectionItem label="Taste Profile & Learnings" />
            <SectionItem label="Disliked meals (blacklist)" />
            <SectionItem label="Plan history" />
          </div>
        </div>

        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-1 px-1">App Settings</p>
          <div className="bg-card rounded-xl shadow-card px-3 divide-y divide-light-gray">
            <SectionItem label="Language" value="English" />
            <div className="flex items-center justify-between h-12 px-1">
              <span className="text-sm text-foreground">Dark Mode</span>
              <Toggle on={darkMode} onToggle={toggleDark} />
            </div>
            <div className="flex items-center justify-between h-12 px-1">
              <span className="text-sm text-foreground">Notifications</span>
              <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
            </div>
            <SectionItem label="Grocery partner" value="BigBasket" />
          </div>
        </div>

        <div>
          <p className="text-[11px] text-mm-gray uppercase font-semibold mb-1 px-1">Account</p>
          <div className="bg-card rounded-xl shadow-card px-3 divide-y divide-light-gray">
            <SectionItem label="Help & Support" />
            <SectionItem label="Privacy Policy" />
            <button className="w-full text-left h-12 px-1 text-sm text-coral font-semibold">Log out</button>
          </div>
        </div>

        {/* Mira learning card */}
        <div className="bg-mira-purple-light rounded-xl p-4">
          <p className="text-sm font-bold text-mira-purple mb-2">✨ Mira™ has learned from you:</p>
          <div className="space-y-1.5 text-[13px] text-foreground">
            <p>🚫 You dislike: Bitter gourd, Karela dishes</p>
            <p>❤️ You love: Any paneer dish, Biryani</p>
            <p>⚡ Your quick go-to: Poha, Dal Tadka</p>
            <p>📈 Plan quality improving: Week 3 of 4</p>
          </div>
        </div>
      </div>

      <div className="h-8" />
      <BottomTabBar />
    </div>
  );
};

export default Profile;
