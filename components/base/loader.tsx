import BgImage from "@/assets/bckg.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { memo, useEffect, useMemo, useState } from "react";
import { LogoLottie } from "../ui/logo-lottie";

type LoaderPhase = "logo" | "zoomIn" | "end";

type LoaderOverlayProps = {
  logoDisplayMs?: number;
  zoomTransitionMs?: number;
  scaleTransitionMs?: number;
  onComplete?: () => void;
  phase?: LoaderPhase;
};

function Load({
  logoDisplayMs = 1800,
  zoomTransitionMs = 400,
  scaleTransitionMs = 600,
  onComplete,
}: LoaderOverlayProps) {
  const [phase, setPhase] = useState<"logo" | "zoomIn" | "end">("logo");
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isBgVisible, setIsBgVisible] = useState(false);
  const [startBgScaling, setStartBgScaling] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isImageVisible, setIsImageVisible] = useState(false);

  // Memoize the background animation duration to avoid unnecessary re-calculations
  const bgAnimationDuration = useMemo(
    () => (zoomTransitionMs + scaleTransitionMs) / 1000,
    [zoomTransitionMs, scaleTransitionMs]
  );

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;

    if (phase === "logo") {
      phaseTimer = setTimeout(() => {
        setPhase("zoomIn");
      }, logoDisplayMs);
    } else if (phase === "zoomIn") {
      setTimeout(() => {
        setIsLogoVisible(false);
        setIsImageVisible(true);
        setIsBgVisible(true);
        setStartBgScaling(true);
      }, 100);

      const totalBgDuration = (zoomTransitionMs + scaleTransitionMs) / 1000;
      phaseTimer = setTimeout(() => {
        setIsLoaderVisible(false);
        onComplete?.();
      }, zoomTransitionMs + scaleTransitionMs);
    }

    return () => {
      clearTimeout(phaseTimer);
    };
  }, [phase, logoDisplayMs, zoomTransitionMs, scaleTransitionMs]);

  return (
    <AnimatePresence>
      {isLoaderVisible && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {isImageVisible && (
              <motion.div
                key="scaling-background"
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={startBgScaling ? { scale: 550 } : { scale: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: [0.77, 0, 0.18, 1],
                  }}
                >
                  <div
                    className="relative h-full w-full"
                    style={{ transform: "translateY(-3.4px)" }}
                  >
                    <Image
                      src={BgImage}
                      alt="Background transition"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      quality={100}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLogoVisible && (
              <motion.div
                key="logo"
                className="absolute inset-0 flex items-center justify-center bg-black"
                exit={{ scale: 2 }}
                transition={{
                  duration: 0.1,
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

export const LoaderOverlay = memo(Load);
