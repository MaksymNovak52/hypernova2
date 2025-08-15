"use client";
import BgImage from "@/assets/bckg.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogoLottie } from "../ui/logo-lottie";

type LoaderPhase = "logo" | "zoomIn" | "end";

type LoaderOverlayProps = {
  logoDisplayMs?: number;
  zoomTransitionMs?: number;
  scaleTransitionMs?: number;
  onComplete?: () => void;
};

export function LoaderOverlay({
  logoDisplayMs = 2000,
  zoomTransitionMs = 400,
  scaleTransitionMs = 600,
  onComplete,
}: LoaderOverlayProps) {
  const [phase, setPhase] = useState<LoaderPhase>("logo");
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [startBgScaling, setStartBgScaling] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  const [bgAnimationDuration, setBgAnimationDuration] = useState(0);

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;

    if (phase === "logo") {
      phaseTimer = setTimeout(() => {
        setPhase("zoomIn");
      }, logoDisplayMs);
    } else if (phase === "zoomIn") {
      setIsLogoVisible(false);

      setIsBgVisible(true);
      setStartBgScaling(true);

      const totalBgDuration = (zoomTransitionMs + scaleTransitionMs) / 1100;
      setBgAnimationDuration(totalBgDuration);

      phaseTimer = setTimeout(() => {
        setPhase("end");
      }, zoomTransitionMs);
    } else if (phase === "end") {
      phaseTimer = setTimeout(() => {
        setIsLoaderVisible(false);
        onComplete?.();
      }, scaleTransitionMs);
    }

    return () => {
      clearTimeout(phaseTimer);
    };
  }, [phase, logoDisplayMs, zoomTransitionMs, scaleTransitionMs, onComplete]);

  return (
    <AnimatePresence>
      {isLoaderVisible && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            key="scaling-background"
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isBgVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={startBgScaling ? { scale: 100 } : { scale: 1 }}
              transition={{
                duration: bgAnimationDuration,
                ease: [0.02, 0.05, 0.855, 0.06],
              }}
            >
              <Image
                src={BgImage}
                alt="Background transition"
                fill
                style={{ objectFit: "cover" }}
                priority
                quality={90}
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {isLogoVisible && (
              <motion.div
                key="logo"
                className="absolute inset-0 flex items-center justify-center bg-black"
                exit={{
                  scale: 2,
                  opacity: 0,
                }}
                transition={{
                  duration: zoomTransitionMs / 1000,
                  ease: "easeIn",
                }}
              >
                <LogoLottie size={800} autoplay loop={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
