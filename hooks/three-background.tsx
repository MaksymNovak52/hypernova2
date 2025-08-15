"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UseThreeJSSceneProps {
  onAnimate?: (elapsed: number) => void;
  onSceneCreated?: (scene: THREE.Scene) => void;
}

export const useThreeJSBackground = ({
  onAnimate,
  onSceneCreated,
}: UseThreeJSSceneProps = {}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.setClearColor(0x0d0b0a, 1);

    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "-1";

    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    scene.add(new THREE.AmbientLight(0xffffff, 1));

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    onSceneCreated?.(scene);

    let frameId: number;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;

      onAnimate?.(elapsed);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onAnimate, onSceneCreated]);

  return {
    mountRef,
    scene: sceneRef.current,
    renderer: rendererRef.current,
    camera: cameraRef.current,
  };
};
