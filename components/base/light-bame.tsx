"use client";
import { createSoftBeamTexture } from "@/helper";
import { useRef } from "react";
import * as THREE from "three";

interface LightBeamProps {
  position?: [number, number, number];
  size?: [number, number];
  opacity?: number;
}

export const LightBeam = ({
  position = [-10, 5, 2],
  size = [60, 20],
  opacity = 0.4,
}: LightBeamProps) => {
  const beamMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const beamTextureRef = useRef<THREE.Texture | null>(null);

  const createLightBeam = (scene: THREE.Scene) => {
    const beamTexture = createSoftBeamTexture();
    const beamMaterial = new THREE.MeshBasicMaterial({
      map: beamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: opacity,
      side: THREE.DoubleSide,
    });

    const beamPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(size[0], size[1]),
      beamMaterial
    );

    beamPlane.position.set(...position);
    scene.add(beamPlane);

    beamMaterialRef.current = beamMaterial;
    beamTextureRef.current = beamTexture;

    return beamPlane;
  };

  const animateBeam = (elapsed: number) => {
    const beamMaterial = beamMaterialRef.current;
    if (!beamMaterial) return;

    beamMaterial.opacity = 0.35 + Math.sin(elapsed * 2) * 0.15;
  };

  const dispose = () => {
    beamTextureRef.current?.dispose();
    beamMaterialRef.current?.dispose();
  };

  return {
    createLightBeam,
    animateBeam,
    dispose,
  };
};
