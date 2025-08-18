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
      style={{
        position: "relative",
        width: width,
        height: height,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          position: "absolute",
          top: "-8px",
          left: "-1px",
          width: "100%",
          height: "100%",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0s ease-in-out",
        }}
      >
        <StarBorder
          as="button"
          className={starBorderClassName}
          color={starBorderColor}
          speed={starBorderSpeed}
        >
          {dotBadge}
        </StarBorder>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: isHovered ? 0 : 1,

          transition: "opacity 0s ease-in-out",
        }}
        className="mb-[1px] "
      >
        {dotBadge}
      </div>
    </div>
  );
}
