import { useNavigate } from "react-router-dom";

interface OnboardingHeaderProps {
  step: number;
  totalSteps?: number;
}

const OnboardingHeader = ({ step, totalSteps = 7 }: OnboardingHeaderProps) => {
  const navigate = useNavigate();
  const progress = (step / totalSteps) * 100;

  return (
    <div className="sticky top-0 z-30 bg-navy">
      <div className="flex items-center h-12 px-4">
        <button onClick={() => navigate(-1)} className="text-cream text-lg">←</button>
        <span className="flex-1 text-center text-cream text-[13px] font-medium">
          Step {step} of {totalSteps}
        </span>
        <div className="w-6" />
      </div>
      <div className="h-1.5 bg-light-gray/20">
        <div
          className="h-full bg-saffron transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default OnboardingHeader;
