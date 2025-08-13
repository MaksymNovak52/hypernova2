"use client";
import {
  HeaderContainer,
  HeroContainer,
  LightBeam,
  LoaderOverlay,
  StarField,
} from "@/components";
import ClickSpark from "@/components/ui/click-spark";
import { useSceneLoader, useThreeJSBackground } from "@/hooks";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Scene } from "three";
const ModalContainer = dynamic(
  () => import("@/components/hero/modal/container")
);

export default function HypernovaLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { markStepLoaded } = useSceneLoader(1);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const starCount = isMobile ? 300 : 800;
  const textureSize = isMobile ? 16 : 20;

  const starField = StarField({
    starCount,
    textureSize,
  });

  const lightBeam = LightBeam({
    position: [-10, 5, 2],
    size: [60, 20],
    opacity: 0.4,
  });

  const handleAnimate = useCallback(
    (elapsed: number) => {
      if (!isModalOpen) {
        starField.animateStars(elapsed);
        lightBeam.animateBeam(elapsed);
      }
    },
    [starField, lightBeam, isModalOpen]
  );

  const handleSceneCreated = useCallback(
    (scene: Scene) => {
      starField.createStarField(scene);
      lightBeam.createLightBeam(scene);
    },
    [starField, lightBeam]
  );

  const { mountRef } = useThreeJSBackground({
    onAnimate: handleAnimate,
    onSceneCreated: handleSceneCreated,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <ClickSpark
      sparkColor="#BBBBBA"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={8}
      duration={600}
      easing="ease-out"
      extraScale={1.2}
    >
      <div className="relative w-full h-screen overflow-hidden text-white bg-black">
        <div
          className={`sm:hidden flex flex-row items-center w-[200px] text-center gap-2 fixed left-1/2 -translate-x-1/2 bottom-4 backdrop-blur-3xl z-[999] ${
            isModalOpen && "opacity-5"
          }`}
        >
          <span className="text-base text-[#494848] leading-[150%]">
            Built on
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
          >
            <path
              d="M14 4.935C14 9.39317 11.17 10.8239 9.66922 9.55906C8.44717 8.52227 8.0827 6.32429 6.2389 6.0962C3.90199 5.82664 3.6876 8.83331 2.14395 8.83331C0.343032 8.83331 0 6.32429 0 5.01795C0 3.69087 0.385911 1.88686 1.90812 1.88686C3.6876 1.88686 3.79479 4.47882 6.0245 4.33367C8.23277 4.18852 8.27565 1.49288 9.73354 0.352416C10.9985 -0.663631 14 0.414623 14 4.935Z"
              fill="#BBBBBA"
            />
          </svg>
          <span className="text-base text-[#BBBBBA] leading-[150%] font-bold">
            Hyperliquid
          </span>
        </div>

        {isLoading && <LoaderOverlay />}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-40 transition-all duration-300"
            onClick={closeModal}
          />
        )}
        <div
          ref={mountRef}
          className={`absolute inset-0 z-10 transition-opacity duration-300 ${
            isModalOpen ? "opacity-30" : "opacity-100"
          }`}
        />

        <HeaderContainer onLaunch={openModal} />
        <HeroContainer onAsciiReady={markStepLoaded} onLaunch={openModal} />

        {isModalOpen && (
          <ModalContainer isOpen={isModalOpen} closeModal={closeModal} />
        )}
      </div>
    </ClickSpark>
  );
}
