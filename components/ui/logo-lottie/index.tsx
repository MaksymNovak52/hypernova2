"use client";

import animationData from "@/lottie/Logo.json";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export function LogoLottie({
  size = 48,
  autoplay = true,
  loop = false,
  onComplete,
}: {
  size?: number;
  onComplete?: () => void;
  loop?: boolean;
  autoplay?: boolean;
}) {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (autoplay && lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={loop}
      autoplay={true}
      onComplete={onComplete}
      style={{ width: size, height: size }}
    />
  );
}
