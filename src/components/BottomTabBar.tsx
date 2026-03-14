import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { id: "home", icon: "🏠", label: "Home", path: "/home" },
  { id: "pantry", icon: "🧺", label: "Pantry", path: "/pantry" },
  { id: "mira", icon: "✨", label: "Mira™", path: "/mira", special: true },
  { id: "shopping", icon: "🛒", label: "Shopping", path: "/shopping" },
  { id: "profile", icon: "👤", label: "Profile", path: "/profile" },
];

const BottomTabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabColor = (id: string) => {
    switch (id) {
      case "mira": return "text-mira-purple";
      case "home": return "text-saffron";
      case "pantry": return "text-teal";
      case "shopping": return "text-mm-green";
      case "profile": return "text-navy";
      default: return "text-navy";
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[72px] bg-card border-t border-light-gray flex items-center justify-around px-2 z-50">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 pt-1 transition-all duration-200 ${
              tab.special ? "relative -mt-3" : ""
            }`}
          >
            <span
              className={`${tab.special ? "w-14 h-14 rounded-full bg-card shadow-elevated flex items-center justify-center text-2xl" : "text-xl"} ${
                tab.special && active ? "glow-purple" : ""
              }`}
            >
              {tab.icon}
            </span>
            {active ? (
              <>
                <span className={`text-[10px] font-semibold ${getTabColor(tab.id)}`}>{tab.label}</span>
                <span className={`w-1 h-1 rounded-full ${tab.id === "mira" ? "bg-mira-purple" : "bg-saffron"}`} />
              </>
            ) : (
              <span className="text-[10px] text-mm-gray">{tab.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default BottomTabBar;
