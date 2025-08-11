"use client";

import { useEffect, useState } from "react";
import { LogoLottie } from "../ui/logo-lottie";

export function LoaderOverlay() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <LogoLottie size={800} autoplay={true} loop={true} />
    </div>
  );
}
