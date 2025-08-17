import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const startValue = direction === "down" ? to : from;
  const endValue = direction === "down" ? from : to;

  const mv = useMotionValue<number>(startValue);
  const damping = 20 + 40 * (1 / Math.max(0.001, duration));
  const stiffness = 100 * (1 / Math.max(0.001, duration));

  const spring = useSpring(mv, { damping, stiffness });

  const getDecimals = (n: number) => {
    const s = n.toString();
    if (!s.includes(".")) return 0;
    const dec = s.split(".")[1];
    return parseInt(dec, 10) !== 0 ? dec.length : 0;
  };

  const maxDecimals = Math.max(getDecimals(from), getDecimals(to));

  const formatNumber = (value: number) => {
    const opts: Intl.NumberFormatOptions = {
      useGrouping: !!separator,
      minimumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
      maximumFractionDigits: maxDecimals > 0 ? maxDecimals : 0,
    };
    const formatted = new Intl.NumberFormat("en-US", opts).format(value);
    return separator ? formatted.replace(/,/g, separator) : formatted;
  };

  const text = useTransform(spring, (latest) => formatNumber(latest));

  const isInView = useInView(ref, { amount: 0.01, once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView || !startWhen) return;

    onStart?.();

    const startTimer = window.setTimeout(() => {
      mv.set(endValue);
    }, delay * 1000);

    const endTimer = window.setTimeout(() => {
      onEnd?.();
    }, (delay + duration) * 1000);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
    };
  }, [isInView, startWhen, endValue, delay, duration]);

  useEffect(() => {
    mv.set(startValue);
  }, [startValue, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
