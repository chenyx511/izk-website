import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--tpl-bg, #0A0A0F)" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center gap-3 mb-12">
            {["I", "Z", "K"].map((letter, i) => (
              <motion.span
                key={letter}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold font-mono tracking-wider"
                style={{
                  color: progress > (i + 1) * 30 ? "var(--tpl-text, #F8F9FA)" : "var(--tpl-primary, #3B82F6)",
                  textShadow: progress > (i + 1) * 30
                    ? "0 0 40px rgba(59, 130, 246, 0.5)"
                    : "0 0 20px rgba(59, 130, 246, 0.2)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          <div className="w-48 sm:w-64 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "var(--tpl-bg-secondary, #141419)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: "linear-gradient(to right, var(--tpl-primary, #3B82F6), var(--tpl-accent, #06B6D4))" }}
            />
          </div>
          <motion.p
            className="mt-6 text-xs sm:text-sm font-mono tracking-[0.3em] uppercase"
            style={{ color: "var(--tpl-text-muted, #6B7280)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 50 ? 1 : 0.3 }}
          >
            Izumi Machine Tools
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
