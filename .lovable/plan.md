

# Plan: Fix Back Navigation Gaps and Test Full 10-Step Flow

## Issue Found

**LoadingTransition** (step 9, `/onboarding/loading`) is missing a back button entirely. All other screens have proper back navigation using `navigateBackOrTo`.

## Changes Required

### 1. Add back button to LoadingTransition (`src/pages/onboarding/LoadingTransition.tsx`)
- Import `navigateBackOrTo` from `@/lib/navigation`
- Add a back arrow button (matching the style used on SplashScreen -- circular, semi-transparent) positioned at the top-left
- Only show the back button during `phase === 0` (loading phase), since phase 1 shows the summary card with a forward action

### 2. No other changes needed
All other screens already use `navigateBackOrTo`:
- **Phone Home Screen (/)**: Entry point, no back needed
- **Splash Screen (/splash)**: Has back button
- **Sign Up (/onboarding/signup)**: Has back button
- **Steps 4-8** (Region, Cuisines, Dietary, Time, Pantry): All use `OnboardingHeader` which has `navigateBackOrTo`
- **Home (/home)**: Has back button
- **Sub-screens** (Pantry, Shopping, Profile, MiraChat, BrowseCuisines, MealPlanner): All have back buttons

### Summary of the 10-step flow after fix

| Step | Screen | Back Button |
|------|--------|------------|
| 1 | Phone Home Screen `/` | N/A (entry) |
| 2 | Splash `/splash` | Goes to `/` |
| 3 | Sign Up `/onboarding/signup` | Goes to `/splash` |
| 4 | Region `/onboarding/region` | Goes to signup |
| 5 | Cuisines `/onboarding/cuisines` | Goes to region |
| 6 | Dietary `/onboarding/dietary` | Goes to cuisines |
| 7 | Cooking Time `/onboarding/time` | Goes to dietary |
| 8 | Pantry Setup `/onboarding/pantry` | Goes to time |
| 9 | Loading `/onboarding/loading` | **NEW: Goes to pantry** |
| 10 | Home `/home` | Goes to loading |

