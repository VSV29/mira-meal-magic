import type { NavigateFunction, To } from "react-router-dom";

export const navigateBackOrTo = (
  navigate: NavigateFunction,
  fallback: To = "/",
) => {
  const historyIndex = window.history.state?.idx ?? 0;

  if (historyIndex > 0) {
    navigate(-1);
    return;
  }

  navigate(fallback, { replace: true });
};
