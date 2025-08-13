import clsx from "clsx";
import { ReactNode } from "react";

type DotBadgeProps = {
  label?: string | ReactNode;
  circleSize?: number;
  circleColor?: string;
  backgroundColor?: string;
  textColor?: string;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  lineHeight?: number | string;
  isShadow?: boolean;
  borderStyle?: string;
  isHover?: boolean;
  glowIntensity?: number;
  onClick?: () => void;
};

export function DotBadge({
  label = "Soon",
  onClick,
  circleSize = 12,
  circleColor = "black",
  backgroundColor = "white",
  textColor = "black",
  width,
  height,
  fontSize = 14,
  isShadow = false,
  lineHeight = "100%",
  borderStyle = "1px solid black",
  isHover = false,
  glowIntensity = 100,
}: DotBadgeProps) {
  const getRgbaFromColor = (color: string, alpha: number = 1) => {
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (color.startsWith("rgb(")) {
      return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
    }
    if (color.startsWith("rgba(")) return color;

    const named: Record<string, string> = {
      white: "255, 255, 255",
      black: "0, 0, 0",
      green: "0, 128, 0",
      blue: "0, 0, 255",
      yellow: "255, 255, 0",
      purple: "128, 0, 128",
      orange: "255, 165, 0",
      pink: "255, 192, 203",
      gray: "128, 128, 128",
      grey: "128, 128, 128",
    };
    const v = named[color.toLowerCase()] || "255, 255, 255";
    return `rgba(${v}, ${alpha})`;
  };

  const extractFirstStop = (bg: string) => {
    if (!bg.startsWith("linear-gradient") && !bg.startsWith("radial-gradient"))
      return bg;
    const m = bg.match(/gradient\([^,]+,\s*([^,\)]+)/i);
    return "white";
  };

  const isGradient =
    typeof backgroundColor === "string" &&
    (backgroundColor.startsWith("linear-gradient") ||
      backgroundColor.startsWith("radial-gradient"));

  const glowBase = extractFirstStop(backgroundColor);
  const intensity = Math.min(Math.max(glowIntensity, 0), 100) / 100;
  const glowColor = getRgbaFromColor(glowBase, 0.8);
  const glowColorLight = getRgbaFromColor(glowBase, 0.35);

  const baseInset = isShadow
    ? "0 -3px 4px rgba(255, 255, 255, 0.1) inset, -5px -5px 250px rgba(255, 255, 255, 0.02) inset"
    : "none";

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative group rounded-[12px] border flex items-center gap-2 justify-center",
        "transition-[box-shadow,transform,background-color,background] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isHover && "hover:animate-glow-hero"
      )}
      style={{
        ...(isGradient ? { background: backgroundColor } : { backgroundColor }),
        color: textColor,
        width,
        height,
        fontSize,
        lineHeight,
        border: borderStyle,
        boxShadow: baseInset,
        willChange: "transform, box-shadow",
      }}
    >
      {isHover && (
        <div
          aria-hidden
          className={clsx(
            "pointer-events-none absolute -inset-2 -z-10 rounded-[14px]",
            "opacity-0 scale-95 blur-md",
            "transition-[opacity,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:opacity-100 group-hover:scale-105"
          )}
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, ${glowColor} 0%, ${glowColorLight} 35%, rgba(0,0,0,0) 70%)`,
            filter: `drop-shadow(0 0 ${40 * intensity}px ${glowColorLight})`,
          }}
        />
      )}

      <span
        style={{
          width: circleSize,
          height: circleSize,
          backgroundColor: circleColor,
          borderRadius: "9999px",
          lineHeight,
          flex: "0 0 auto",
        }}
      />
      <span className={typeof label !== "string" ? "mr-2" : undefined}>
        {label}
      </span>
    </button>
  );
}
