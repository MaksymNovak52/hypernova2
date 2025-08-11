"use client";
import {
  HeaderContainer,
  HeroContainer,
  LightBeam,
  LoaderOverlay,
  StarField,
} from "@/components";
import { useSceneLoader, useThreeJSBackground } from "@/hooks";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Scene } from "three";
const ModalContainer = dynamic(
  () => import("@/components/hero/modal/container")
);

export default function HypernovaLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, markStepLoaded } = useSceneLoader(1);

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
    // if (disposeScene) {
    //   disposeScene();
    // }
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
    <div className="relative w-full h-screen  overflow-hidden   text-white">
      {isLoading && <LoaderOverlay />}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={closeModal}
        />
      )}
      <div
        ref={mountRef}
        className={`absolute inset-0 z-10 transition-opacity duration-300 ${
          isModalOpen ? "opacity-30" : "opacity-100"
        }`}
      />

      <HeaderContainer />
      <HeroContainer onAsciiReady={markStepLoaded} onLaunch={openModal} />

      {isModalOpen && (
        <ModalContainer isOpen={isModalOpen} closeModal={closeModal} />
      )}
    </div>
  );
}
