import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

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

  const shouldSwap = isHover && isHovered;

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={clsx(
        "relative rounded-[12px] border flex items-center gap-2 justify-center overflow-hidden hover:animate-glow-hero"
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
      }}
      whileHover={isHover ? { scale: 1.02 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    >
      <AnimatePresence>
        {isHover && isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[14px] blur-md h"
            style={{
              background: `radial-gradient(60% 60% at 50% 50%, ${glowColor} 0%, ${glowColorLight} 35%, rgba(0,0,0,0) 70%)`,
              filter: `drop-shadow(0 0 ${40 * intensity}px ${glowColorLight})`,
            }}
          />
        )}
      </AnimatePresence>

      <motion.span
        layout
        animate={shouldSwap ? { x: 80 } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        style={{
          width: circleSize,
          height: circleSize,
          backgroundColor: circleColor,
          borderRadius: "9999px",
          lineHeight,
          flex: "0 0 auto",
        }}
      />

      <motion.span
        layout
        animate={shouldSwap ? { x: -20 } : { x: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className={typeof label !== "string" ? "mr-2" : undefined}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}
