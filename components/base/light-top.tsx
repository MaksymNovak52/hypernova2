import React from "react";

interface GlowProps {
  className?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  rotation?: string;
  width?: string;
  height?: string;
  opacity?: number;
  blur?: string;
  zIndex?: number;
  pulseSpeed?: string;
  pulseIntensity?: number;
  enablePulse?: boolean;
}

export const BackgroundGlow = ({
  className = "",
  position = { top: "-500px", left: "-350px" },
  rotation = "-200deg",
  width = "800px",
  height,
  opacity = 0.35,
  blur = "80px",
  zIndex = 10,
  pulseSpeed = "4s",
  pulseIntensity = 1.3,
  enablePulse = true,
}: GlowProps) => {
  const style: React.CSSProperties = {
    position: "absolute",
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom,
    transform: `rotate(${rotation})`,
    width,
    height: height ?? width,
    opacity,
    zIndex,
    pointerEvents: "none",
  };

  const pulseKeyframes = `
    @keyframes glowPulse {
      0%, 100% {
        transform: scale(1);
        opacity: ${opacity};
      }
      50% {
        transform: scale(${pulseIntensity});
        opacity: ${opacity * 0.7};
      }
    }
  `;

  const glowStyle: React.CSSProperties = {
    background:
      "radial-gradient(ellipse at center, rgba(250,204,21,0.02) 0%, rgba(250,204,21,0.08) 35%, rgba(250,204,21,0.09) 60%, rgba(250,204,21,0.08) 75%, transparent 100%)",
    filter: `blur(${blur})`,
    animation: enablePulse
      ? `glowPulse ${pulseSpeed} ease-in-out infinite`
      : undefined,
  };

  return (
    <>
      <style>{pulseKeyframes}</style>
      <div style={style} className={className}>
        <div className="absolute inset-0 rounded-full" style={glowStyle} />
      </div>
    </>
  );
};
