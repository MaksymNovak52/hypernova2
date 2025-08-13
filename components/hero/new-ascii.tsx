"use client";
import AsciiScene from "@/helper/script-class";
import { memo, useEffect, useId, useMemo, useRef } from "react";

type Props = {
  className?: string;
  onReady?: () => void;
  scale?: number;
  position?: { x?: number; y?: number; z?: number };
  rotation?: { x?: number; y?: number; z?: number };
  pivotRotation?: { x?: number; y?: number; z?: number };
  rotationSpeed?: number;
  cellSize?: number;
  usePortal?: boolean;
};

function AsciiCanvasComponent({
  className,
  onReady,
  scale,
  position,
  rotation,
  pivotRotation,
  rotationSpeed,
  cellSize = 6.5,
  usePortal = false,
}: Props) {
  const reactId = useId().replace(/[:]/g, "");
  const containerId = `ascii-${reactId}`;
  const sceneRef = useRef<AsciiScene | null>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  // Memoize object props to prevent unnecessary re-renders
  const memoizedPosition = useMemo(
    () => position,
    [position?.x, position?.y, position?.z]
  );

  const memoizedRotation = useMemo(
    () => rotation,
    [rotation?.x, rotation?.y, rotation?.z]
  );

  const memoizedPivotRotation = useMemo(
    () => pivotRotation,
    [pivotRotation?.x, pivotRotation?.y, pivotRotation?.z]
  );

  // Memoize the callback to prevent re-renders
  const memoizedCallback = useMemo(() => {
    return () => {
      onReady?.();
      // @ts-ignore
      if (sceneRef.current?.asciiPass) {
        // @ts-ignore
        sceneRef.current.asciiPass.uniforms.cellSize.value = cellSize;
      }
    };
  }, [onReady, cellSize]);

  useEffect(() => {
    let actualContainerId = containerId;

    if (usePortal && typeof window !== "undefined") {
      const portalDiv = document.createElement("div");
      portalDiv.id = containerId;
      portalDiv.className =
        className ?? "fixed inset-0 w-screen h-screen overflow-hidden -z-10";
      document.body.appendChild(portalDiv);
      portalContainerRef.current = portalDiv;
    }

    const scene = new AsciiScene(actualContainerId, {
      callback: memoizedCallback,
      scale,
      position: memoizedPosition,
      rotation: memoizedRotation,
      pivotRotation: memoizedPivotRotation,
      rotationSpeed,
    });

    sceneRef.current = scene;
    scene.init();

    return () => {
      const el = document.getElementById(containerId);
      if (el && !usePortal) {
        while (el.firstChild) el.removeChild(el.firstChild);
      }

      if (portalContainerRef.current) {
        while (portalContainerRef.current.firstChild) {
          portalContainerRef.current.removeChild(
            portalContainerRef.current.firstChild
          );
        }
        document.body.removeChild(portalContainerRef.current);
        portalContainerRef.current = null;
      }

      sceneRef.current = null;
    };
  }, [
    containerId,
    memoizedCallback,
    scale,
    memoizedPosition,
    memoizedRotation,
    memoizedPivotRotation,
    rotationSpeed,
    usePortal,
    className,
  ]);

  if (usePortal) {
    return null;
  }

  return (
    <div
      id={containerId}
      className={className ?? "absolute inset-0 w-full h-full -z-10"}
      style={{
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
}

export const AsciiCanvas = memo(AsciiCanvasComponent);
