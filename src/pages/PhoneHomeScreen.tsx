import { useState } from "react";
import { useNavigate } from "react-router-dom";
import wallpaper from "@/assets/phone-wallpaper.jpg";
import mealmateIcon from "@/assets/mealmate-icon.png";

const genericApps = [
  { name: "Messages", emoji: "💬", bg: "hsl(var(--green))" },
  { name: "Camera", emoji: "📷", bg: "hsl(var(--gray))" },
  { name: "Photos", emoji: "🖼️", bg: "hsl(var(--mira-purple))" },
  { name: "Weather", emoji: "🌤️", bg: "hsl(var(--teal))" },
  { name: "Music", emoji: "🎵", bg: "hsl(var(--coral))" },
  { name: "Maps", emoji: "🗺️", bg: "hsl(var(--navy))" },
  { name: "Calendar", emoji: "📅", bg: "hsl(var(--gold))" },
  { name: "Settings", emoji: "⚙️", bg: "hsl(var(--gray))" },
];

const PhoneHomeScreen = () => {
  const navigate = useNavigate();
  const [launching, setLaunching] = useState(false);
  const [iconRect, setIconRect] = useState<{ x: number; y: number } | null>(null);

  const handleLaunch = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setIconRect({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setLaunching(true);
    setTimeout(() => navigate("/splash"), 600);
  };

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="mobile-container min-h-screen relative overflow-hidden select-none">
      {/* Wallpaper */}
      <img
        src={wallpaper}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Status bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-3 text-[12px] font-semibold text-white/90">
        <span>{timeStr}</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Clock & date */}
      <div className="relative z-10 text-center mt-8 mb-8">
        <p className="text-5xl font-bold text-white drop-shadow-lg tracking-tight">
          {timeStr}
        </p>
        <p className="text-sm text-white/80 mt-1 drop-shadow">{dateStr}</p>
      </div>

      {/* App grid */}
      <div className="relative z-10 px-6 grid grid-cols-4 gap-y-6 gap-x-4">
        {genericApps.map((app) => (
          <div key={app.name} className="flex flex-col items-center gap-1">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              style={{ background: app.bg }}
            >
              {app.emoji}
            </div>
            <span className="text-[10px] text-white drop-shadow font-medium">
              {app.name}
            </span>
          </div>
        ))}

        {/* Meal Mate icon — prominent */}
        <div className="flex flex-col items-center gap-1 col-span-4 mt-4">
          <button
            onClick={handleLaunch}
            className="w-[72px] h-[72px] rounded-2xl overflow-hidden shadow-elevated active:scale-95 transition-transform duration-150 ring-2 ring-white/30"
          >
            <img src={mealmateIcon} alt="Meal Mate" className="w-full h-full object-cover" />
          </button>
          <span className="text-xs text-white drop-shadow font-bold">
            Meal Mate
          </span>
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-5 bg-white/15 backdrop-blur-xl rounded-3xl px-6 py-3">
        {[
          { emoji: "📞", label: "Phone" },
          { emoji: "✉️", label: "Mail" },
          { emoji: "🌐", label: "Browser" },
        ].map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-0.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-xl">
              {d.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* Launch overlay */}
      {launching && (
        <div
          className="fixed inset-0 z-[100] bg-white"
          style={{
            animation: "app-launch 0.6s ease-in-out forwards",
            transformOrigin: iconRect
              ? `${iconRect.x}px ${iconRect.y}px`
              : "center center",
          }}
        />
      )}
    </div>
  );
};

export default PhoneHomeScreen;
