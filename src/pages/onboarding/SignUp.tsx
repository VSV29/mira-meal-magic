import { useNavigate } from "react-router-dom";
import ProgressDots from "@/components/ProgressDots";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container bg-cream flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center px-6">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="self-start mt-4 w-9 h-9 rounded-full bg-light-gray flex items-center justify-center active:scale-90 transition-transform">
          <span className="text-navy text-sm">←</span>
        </button>
        {/* Logo */}
        <div className="pt-20 text-center">
          <h1 className="text-[32px] font-extrabold text-navy">MealMate</h1>
          <p className="text-[15px] text-mm-gray italic mt-1">Plan smarter. Eat better.</p>
          <div className="mt-3 inline-flex items-center gap-1 bg-mira-purple text-cream text-[10px] font-semibold px-3 py-1 rounded-full">
            ✨ Powered by Mira™
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-12 h-40 flex items-center justify-center relative">
          <div className="text-6xl">🍲</div>
          <span className="absolute top-2 left-8 text-2xl animate-pulse-gentle" style={{ animationDelay: '0s' }}>🍛</span>
          <span className="absolute top-0 right-10 text-xl animate-pulse-gentle" style={{ animationDelay: '0.5s' }}>🥗</span>
          <span className="absolute bottom-4 right-6 text-2xl animate-pulse-gentle" style={{ animationDelay: '1s' }}>🍜</span>
          {/* Steam */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-2 opacity-40">
            <div className="w-1 h-6 bg-mm-gray/30 rounded-full animate-pulse-gentle" />
            <div className="w-1 h-8 bg-mm-gray/30 rounded-full animate-pulse-gentle" style={{ animationDelay: '0.3s' }} />
            <div className="w-1 h-5 bg-mm-gray/30 rounded-full animate-pulse-gentle" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>

        {/* Auth buttons */}
        <div className="w-full mt-12 space-y-4">
          <button
            onClick={() => navigate("/onboarding/region")}
            className="w-full h-[52px] rounded-xl border border-light-gray bg-card text-foreground font-medium text-base flex items-center justify-center gap-3 shadow-card active:scale-[0.98] transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <button
            onClick={() => navigate("/onboarding/region")}
            className="w-full h-[52px] rounded-xl bg-saffron text-cream font-bold text-base active:scale-[0.98] transition-transform"
          >
            Continue with Email
          </button>

          <button
            onClick={() => navigate("/onboarding/region")}
            className="w-full h-[52px] rounded-xl bg-mm-dark text-cream font-medium text-base flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.65-2.2.46-3.06-.4C3.79 16.17 4.36 9.02 8.73 8.78c1.28.06 2.17.72 2.91.76.98-.2 1.92-.77 2.98-.7 1.27.1 2.22.59 2.84 1.51-2.6 1.54-1.98 4.92.35 5.87-.47 1.24-1.1 2.46-2.1 3.43-.36.34-.5.47-.66.63zM12.05 8.69c-.13-2.32 1.74-4.3 3.95-4.49.31 2.65-2.35 4.65-3.95 4.49z"/></svg>
            Continue with Apple
          </button>
        </div>

        <p className="mt-6 text-[13px] text-mm-gray text-center">
          Already have an account? <span className="text-saffron font-semibold cursor-pointer">Log in</span>
        </p>
      </div>

      <div className="pb-8 pt-4">
        <ProgressDots total={7} current={1} />
      </div>
    </div>
  );
};

export default SignUp;
