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
  glowIntensity = 50,
}: DotBadgeProps) {
  const shadowStyle = isShadow
    ? {
        boxShadow: `0 -3px 4px rgba(255, 255, 255, 0.1) inset, -5px -5px 250px rgba(255, 255, 255, 0.02) inset`,
        backdropFilter: "blur(23.8px)",
      }
    : {};

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

    if (color.startsWith("rgba(")) {
      return color;
    }

    const namedColors: { [key: string]: string } = {
      white: "255, 255, 255",
      black: "0, 0, 0",
      red: "255, 0, 0",
      green: "0, 128, 0",
      blue: "0, 0, 255",
      yellow: "255, 255, 0",
      purple: "128, 0, 128",
      orange: "255, 165, 0",
      pink: "255, 192, 203",
      gray: "128, 128, 128",
      grey: "128, 128, 128",
    };

    const colorValues = namedColors[color.toLowerCase()] || "255, 255, 255";
    return `rgba(${colorValues}, ${alpha})`;
  };

  const glowColor = getRgbaFromColor(backgroundColor, 0.8);
  const glowColorLight = getRgbaFromColor(backgroundColor, 0.4);

  const intensity = Math.min(Math.max(glowIntensity, 0), 100) / 100;

  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-[12px] border flex items-center gap-2 justify-center transition-all duration-300 ease-out",
        {
          "hover:shadow-2xl": isHover,
        }
      )}
      style={{
        backgroundColor,
        color: textColor,
        width,
        height,
        fontSize,

        ...shadowStyle,
        border: borderStyle,
        transition: "ease-in-out",
      }}
      onMouseEnter={(e) => {
        if (isHover) {
          e.currentTarget.style.transition = "ease-in-out";

          e.currentTarget.style.boxShadow = `
            0 0 ${30 * intensity}px ${glowColor},
            0 0 ${60 * intensity}px ${glowColorLight},
            0 0 ${100 * intensity}px ${getRgbaFromColor(backgroundColor, 0.2)}
          `;
        }
      }}
      onMouseLeave={(e) => {
        if (isHover) {
          e.currentTarget.style.transition = "ease-in-out";
          e.currentTarget.style.boxShadow = isShadow
            ? `0 -3px 4px rgba(255, 255, 255, 0.1) inset, -5px -5px 250px rgba(255, 255, 255, 0.02) inset`
            : "none";
        }
      }}
    >
      <span
        style={{
          width: circleSize,
          height: circleSize,
          backgroundColor: circleColor,
          borderRadius: "9999px",
          lineHeight: lineHeight,
        }}
      />
      <span
        className={`flex items-center justify-center ${
          typeof label !== "string" && "mr-2 "
        }`}
      >
        {" "}
        {label}
      </span>
    </button>
  );
}
