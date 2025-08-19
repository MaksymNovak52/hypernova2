"use client";
import AsciiScene from "@/helper/script-class";
import { useEffect, useId, useMemo, useRef } from "react";

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

export function AsciiCanvas({
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

  const memoizedCallback = useMemo(() => {
    return () => {
      onReady?.();
      if (sceneRef.current?.asciiPass) {
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

      if (sceneRef.current && sceneRef.current.destroy) {
        sceneRef.current.destroy();
      }
      sceneRef.current = null;
    };
  }, [
    containerId,
    className,
    scale,
    memoizedPosition,
    memoizedRotation,
    memoizedPivotRotation,
    rotationSpeed,
    usePortal,
    memoizedCallback,
  ]);

  useEffect(() => {
    if (sceneRef.current) {
      if (sceneRef.current.updatePosition && memoizedPosition) {
        sceneRef.current.updatePosition(memoizedPosition);
      }
      if (sceneRef.current.updateRotation && memoizedRotation) {
        sceneRef.current.updateRotation(memoizedRotation);
      }
      if (sceneRef.current.updatePivotRotation && memoizedPivotRotation) {
        sceneRef.current.updatePivotRotation(memoizedPivotRotation);
      }
      if (sceneRef.current.updateScale && scale) {
        sceneRef.current.updateScale(scale);
      }
    }
  }, [memoizedPosition, memoizedRotation, memoizedPivotRotation, scale]);

  if (usePortal) {
    return null;
  }

  return (
    <div
      id={containerId}
      className={`${className} absolute inset-0 w-full h-full -z-10`}
      style={{
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
}
