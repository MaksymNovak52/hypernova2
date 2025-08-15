"use client";
import {
  HeaderContainer,
  LightBeam,
  LoaderOverlay,
  StarField,
} from "@/components";
import { BuiltOnBadge } from "@/components/ui";
import { TargetCursor } from "@/components/ui/cursor-target";
import { useSceneLoader, useThreeJSBackground } from "@/hooks";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Scene } from "three";
const ModalContainer = dynamic(
  () => import("@/components/hero/modal/container")
);
const HeroContainer = dynamic(() => import("@/components/hero/container"));

export default function HypernovaLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { markStepLoaded } = useSceneLoader(1);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const starCount = isMobile ? 50 : 800;
  const textureSize = isMobile ? 8 : 20;
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);
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
    <>
      <div className="relative w-full  h-screen overflow-hidden text-white bg-black">
        <LoaderOverlay onComplete={handleLoadingComplete} />
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
        {!isMobile && !isLoading && <TargetCursor spinDuration={2} />}

        <HeaderContainer onLaunch={openModal} />
        <HeroContainer onAsciiReady={markStepLoaded} onLaunch={openModal} />

        {isModalOpen && (
          <ModalContainer isOpen={isModalOpen} closeModal={closeModal} />
        )}
        <BuiltOnBadge
          label="Powered by"
          brand="Hyperliquid"
          isDimmed={isModalOpen ? true : false}
          width="240px"
          responsiveClassName="md:hidden"
          containerClassName="rounded-full px-3 py-1 "
          labelClassName="text-sm text-white/60"
          brandClassName="text-sm font-semibold text-white"
          iconClassName="mx-1 text-white/60"
        />
      </div>
    </>
  );
}
