import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedPage from "./AnimatedPage";

import PhoneHomeScreen from "@/pages/PhoneHomeScreen";
import SplashScreen from "@/pages/SplashScreen";
import SignUp from "@/pages/onboarding/SignUp";
import RegionSelector from "@/pages/onboarding/RegionSelector";
import CuisineSelector from "@/pages/onboarding/CuisineSelector";
import DietaryProfile from "@/pages/onboarding/DietaryProfile";
import CookingTime from "@/pages/onboarding/CookingTime";
import PantrySetup from "@/pages/onboarding/PantrySetup";
import LoadingTransition from "@/pages/onboarding/LoadingTransition";
import Home from "@/pages/Home";
import Pantry from "@/pages/Pantry";
import MiraChat from "@/pages/MiraChat";
import Shopping from "@/pages/Shopping";
import Profile from "@/pages/Profile";
import BrowseCuisines from "@/pages/BrowseCuisines";
import MealPlanner from "@/pages/MealPlanner";
import NotFound from "@/pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage variant="scale"><PhoneHomeScreen /></AnimatedPage>} />
        <Route path="/splash" element={<AnimatedPage variant="scale"><SplashScreen /></AnimatedPage>} />
        <Route path="/onboarding/signup" element={<AnimatedPage variant="fade"><SignUp /></AnimatedPage>} />
        <Route path="/onboarding/region" element={<AnimatedPage><RegionSelector /></AnimatedPage>} />
        <Route path="/onboarding/cuisines" element={<AnimatedPage><CuisineSelector /></AnimatedPage>} />
        <Route path="/onboarding/dietary" element={<AnimatedPage><DietaryProfile /></AnimatedPage>} />
        <Route path="/onboarding/time" element={<AnimatedPage><CookingTime /></AnimatedPage>} />
        <Route path="/onboarding/pantry" element={<AnimatedPage><PantrySetup /></AnimatedPage>} />
        <Route path="/onboarding/loading" element={<AnimatedPage variant="fade"><LoadingTransition /></AnimatedPage>} />
        <Route path="/home" element={<AnimatedPage variant="fade"><Home /></AnimatedPage>} />
        <Route path="/browse-cuisines" element={<AnimatedPage><BrowseCuisines /></AnimatedPage>} />
        <Route path="/meal-planner" element={<AnimatedPage><MealPlanner /></AnimatedPage>} />
        <Route path="/pantry" element={<AnimatedPage variant="fade"><Pantry /></AnimatedPage>} />
        <Route path="/mira" element={<AnimatedPage><MiraChat /></AnimatedPage>} />
        <Route path="/shopping" element={<AnimatedPage variant="fade"><Shopping /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage variant="fade"><Profile /></AnimatedPage>} />
        <Route path="*" element={<AnimatedPage variant="fade"><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
