import React from "react";

interface GlowProps {
  className?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  rotation?: string; // напр. "-200deg"
  width?: string; // напр. "800px"
  height?: string; // якщо не вкажеш — буде = width
  opacity?: number; // 0..1
  blur?: string; // напр. "80px"
  zIndex?: number;
}

export const BackgroundGlow = ({
  className = "",
  position = { top: "-400px", left: "-350px" },
  rotation = "-200deg",
  width = "800px",
  height,
  opacity = 0.35,
  blur = "80px",
  zIndex = 10,
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

  return (
    <div style={style} className={className}>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(250,204,21,0.02) 0%, rgba(250,204,21,0.08) 35%, rgba(250,204,21,0.09) 60%, rgba(250,204,21,0.08) 75%, transparent 100%)",
          filter: `blur(${blur})`,
        }}
      />
    </div>
  );
};
