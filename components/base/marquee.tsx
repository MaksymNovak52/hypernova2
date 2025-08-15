"use client";

interface AnimatedMarqueeProps {
  text: string;
  repeatCount?: number;
  className?: string;
}

export const AnimatedMarquee = ({
  text,
  repeatCount = 37,
  className = "",
}: AnimatedMarqueeProps) => {
  return (
    <footer
      className={`absolute bottom-0 w-full py-2 overflow-hidden z-20 ${className}`}
    >
      <div className="animate-marquee whitespace-nowrap text-center text-[10px] text-gray-500">
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span key={i}>{text}&nbsp;</span>
        ))}
      </div>
    </footer>
  );
};
