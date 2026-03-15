import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import PhoneHomeScreen from "./pages/PhoneHomeScreen";
import SplashScreen from "./pages/SplashScreen";
import SignUp from "./pages/onboarding/SignUp";
import RegionSelector from "./pages/onboarding/RegionSelector";
import CuisineSelector from "./pages/onboarding/CuisineSelector";
import DietaryProfile from "./pages/onboarding/DietaryProfile";
import CookingTime from "./pages/onboarding/CookingTime";
import PantrySetup from "./pages/onboarding/PantrySetup";
import LoadingTransition from "./pages/onboarding/LoadingTransition";
import Home from "./pages/Home";
import Pantry from "./pages/Pantry";
import MiraChat from "./pages/MiraChat";
import Shopping from "./pages/Shopping";
import Profile from "./pages/Profile";
import BrowseCuisines from "./pages/BrowseCuisines";
import MealPlanner from "./pages/MealPlanner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PhoneHomeScreen />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding/signup" element={<SignUp />} />
          <Route path="/onboarding/region" element={<RegionSelector />} />
          <Route path="/onboarding/cuisines" element={<CuisineSelector />} />
          <Route path="/onboarding/dietary" element={<DietaryProfile />} />
          <Route path="/onboarding/time" element={<CookingTime />} />
          <Route path="/onboarding/pantry" element={<PantrySetup />} />
          <Route path="/onboarding/loading" element={<LoadingTransition />} />
          <Route path="/home" element={<Home />} />
          <Route path="/browse-cuisines" element={<BrowseCuisines />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/mira" element={<MiraChat />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
