import { useState } from "react";

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  textColor?: string;
  lineColor?: string;
  lineHeight?: string;
  animationDuration?: string;
  onClick?: () => void;
}

export function UnderLineText({
  children,
  className = "",
  textColor = "text-white",
  lineColor = "bg-white",
  lineHeight = "h-0.5",
  animationDuration = "duration-300",
  onClick,
}: AnimatedTextProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <div
      className={`relative inline-block cursor-pointer group ${className}`}
      onClick={handleClick}
    >
      <span
        className={`${textColor} relative z-10 transition-colors ${animationDuration}`}
      >
        {children}
      </span>
      {/* Анімована полоска */}
      <div
        className={`
        absolute bottom-0 left-0 ${lineHeight} ${lineColor}
        transition-all ${animationDuration} ease-out origin-left
        ${
          isClicked
            ? "w-full animate-[slideFromLeft_0.4s_ease-out]"
            : "w-0 group-hover:w-full"
        }
      `}
      ></div>

      <style jsx>{`
        @keyframes slideFromLeft {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
