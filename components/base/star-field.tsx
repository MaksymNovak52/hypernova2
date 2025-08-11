"use client";
import { createSmallAsciiStar } from "@/helper";
import { useRef } from "react";
import * as THREE from "three";

interface StarFieldProps {
  starCount?: number;
  textureSize?: number;
}

export const StarField = ({
  starCount = 800,
  textureSize = 20,
}: StarFieldProps) => {
  const starGroupRef = useRef<THREE.Group | null>(null);
  const starTexturesRef = useRef<THREE.Texture[]>([]);

  const createStarField = (scene: THREE.Scene) => {
    const starGroup = new THREE.Group();
    const starTextures: THREE.Texture[] = [];

    for (let i = 0; i < starCount; i++) {
      const starTexture = createSmallAsciiStar(textureSize);
      starTextures.push(starTexture);

      const material = new THREE.SpriteMaterial({
        map: starTexture,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.6,
      });

      const sprite = new THREE.Sprite(material);

      sprite.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 60
      );

      const scale = 0.1 + Math.random() * 0.2;
      sprite.scale.set(scale, scale, scale);

      sprite.userData = {
        originalScale: scale,
        twinkleSpeed: 0.5 + Math.random() * 3,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      };

      starGroup.add(sprite);
    }

    scene.add(starGroup);
    starGroupRef.current = starGroup;
    starTexturesRef.current = starTextures;

    return starGroup;
  };

  const animateStars = (elapsed: number) => {
    const starGroup = starGroupRef.current;
    if (!starGroup) return;

    starGroup.rotation.y += 0.0003;

    starGroup.children.forEach((sprite) => {
      if (sprite instanceof THREE.Sprite) {
        const userData = sprite.userData;
        const twinkle = Math.sin(elapsed * userData.twinkleSpeed) * 0.4 + 0.6;
        sprite.material.opacity = twinkle;

        const scaleMultiplier =
          0.8 + Math.sin(elapsed * userData.twinkleSpeed * 0.5) * 0.3;
        sprite.scale.setScalar(userData.originalScale * scaleMultiplier);
      }
    });
  };

  const dispose = () => {
    starTexturesRef.current.forEach((t) => t.dispose());
    starGroupRef.current?.children.forEach((sprite) => {
      const mat = (sprite as THREE.Sprite).material as THREE.Material;
      mat.dispose();
    });
  };

  return {
    createStarField,
    animateStars,
    dispose,
  };
};
