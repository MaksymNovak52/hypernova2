import { useState } from "react";
import { DotBadge } from "../dot-badge";
import StarBorder from "../star-btn";

export function PixelTrailWithOverlay({
  starBorderColor = "white",
  starBorderSpeed = "1s",
  starBorderClassName = "custom-class pointer-events-auto",

  sparkColor = "#828282",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  sparkDuration = 400,

  isShadow = true,
  circleSize = 12,
  circleColor = "white",
  backgroundColor = "",
  textColor = "white",
  label = "Register",
  width = 157,
  fontSize = 20,
  lineHeight = "150%",
  height = 40,
  borderStyle = "1px solid black",
  isHover = false,
  onClick = () => {},
}) {
  const [isHovered, setIsHovered] = useState(false);

  const dotBadge = (
    <DotBadge
      onClick={onClick}
      isShadow={isShadow}
      circleSize={circleSize}
      circleColor={circleColor}
      backgroundColor={backgroundColor}
      textColor={textColor}
      label={label}
      width={width}
      fontSize={fontSize}
      lineHeight={lineHeight}
      height={height}
      borderStyle={borderStyle}
      isHover={isHover}
    />
  );

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <StarBorder
          as="button"
          className={starBorderClassName}
          color={starBorderColor}
          speed={starBorderSpeed}
        >
          {dotBadge}
        </StarBorder>
      ) : (
        <div style={{ position: "relative" }} className="1">
          {dotBadge}
        </div>
      )}
    </div>
  );
}
