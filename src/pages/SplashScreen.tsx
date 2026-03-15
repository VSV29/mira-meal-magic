import { useNavigate } from "react-router-dom";
import logo from "@/assets/mealmate-logo.png";
import { navigateBackOrTo } from "@/lib/navigation";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mobile-container min-h-screen flex flex-col items-center justify-center relative"
      style={{
        background: "linear-gradient(160deg, hsl(var(--navy)) 0%, hsl(var(--mira-purple-dark)) 60%, hsl(var(--saffron)) 100%)",
      }}
    >
      {/* Back button */}
      <button onClick={() => navigateBackOrTo(navigate)} className="absolute top-12 left-5 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform">
        <span className="text-cream text-sm">←</span>
      </button>

      {/* Decorative glow */}
      <div className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "hsl(var(--saffron))", top: "20%", left: "10%" }} />
      <div className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: "hsl(var(--mira-purple))", bottom: "25%", right: "5%" }} />

      {/* Logo */}
      <div className="animate-scale-bounce">
        <img src={logo} alt="MealMate" className="w-56 h-auto drop-shadow-2xl" />
      </div>

      {/* Tagline */}
      <p className="text-white/80 text-sm mt-3 animate-fade-in tracking-wide">
        Smart Meal Planning with Mira™
      </p>

      {/* Sparkle */}
      <div className="mt-2 text-3xl animate-pulse-gentle">✨</div>

      {/* Get Started button */}
      <button
        onClick={() => navigate("/onboarding/signup")}
        className="mt-12 w-64 h-14 rounded-2xl font-bold text-lg tracking-wide shadow-elevated active:scale-[0.97] transition-transform duration-150 animate-slide-up"
        style={{
          background: "hsl(var(--saffron))",
          color: "hsl(var(--navy))",
        }}
      >
        Get Started →
      </button>

      <p className="absolute bottom-8 text-[11px] text-white/40">
        v1.0 • Powered by Mira™ AI
      </p>
    </div>
  );
};

export default SplashScreen;
