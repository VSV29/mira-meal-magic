import { motion } from "framer-motion";
import { ReactNode, forwardRef } from "react";

interface AnimatedPageProps {
  children: ReactNode;
  variant?: "slide" | "fade" | "scale";
}

const variants = {
  slide: {
    initial: { x: "30%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-30%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
};

const AnimatedPage = forwardRef<HTMLDivElement, AnimatedPageProps>(
  ({ children, variant = "slide" }, ref) => {
    const v = variants[variant];

    return (
      <motion.div
        ref={ref}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ width: "100%", minHeight: "100dvh" }}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedPage.displayName = "AnimatedPage";

export default AnimatedPage;
