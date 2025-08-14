"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoLottie } from "../ui/logo-lottie";

type LoaderOverlayProps = {
  idleMs?: number;
  zoomMs?: number;
  flashMs?: number;
};

export function LoaderOverlay({
  idleMs = 2500,
  zoomMs = 900,
  flashMs = 180,
}: LoaderOverlayProps) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "zoom" | "done">("idle");

  useEffect(() => {
    if (prefersReduced) {
      const t = setTimeout(() => setPhase("done"), idleMs);
      return () => clearTimeout(t);
    }

    if (phase !== "idle") return;
    const t = setTimeout(() => setPhase("zoom"), idleMs);
    return () => clearTimeout(t);
  }, [phase, idleMs, prefersReduced]);

  useEffect(() => {
    if (phase !== "zoom") return;
    const total = zoomMs + flashMs + 200;
    const t = setTimeout(() => setPhase("done"), total);
    return () => clearTimeout(t);
  }, [phase, zoomMs, flashMs]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none bg-black з"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "zoom" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 1, opacity: 1 }}
            animate={
              phase === "zoom"
                ? { scale: 6, opacity: 0.8 }
                : { scale: 1, opacity: 1 }
            }
            transition={{
              duration: phase === "zoom" ? zoomMs / 1000 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AnimatePresence>
              {phase === "zoom" && (
                <motion.span
                  key="ring"
                  className="absolute inset-0 -z-10 rounded-full border border-white/40 blur-[0.5px]"
                  style={{
                    width: "120%",
                    height: "120%",
                    left: "-10%",
                    top: "-10%",
                  }}
                  initial={{ scale: 0.9, opacity: 0.0 }}
                  animate={{ scale: 1.6, opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: zoomMs / 1000,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
            </AnimatePresence>

            <LogoLottie size={800} autoplay loop={false} />
          </motion.div>

          <AnimatePresence>
            {phase === "zoom" && (
              <motion.div
                key="flash"
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: flashMs / 1000, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
