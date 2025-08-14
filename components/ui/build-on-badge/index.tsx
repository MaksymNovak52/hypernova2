"use client";
import clsx from "clsx";
import React from "react";

type BuiltOnBadgeProps = {
  label?: string;
  brand?: string;
  icon?: React.ReactNode;
  width?: number | string;
  isDimmed?: boolean;

  iconWidth?: number;
  iconHeight?: number;
  iconTitle?: string;

  containerClassName?: string;
  labelClassName?: string;
  brandClassName?: string;
  iconClassName?: string;

  responsiveClassName?: string;

  centerX?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function BuiltOnBadge({
  label = "Built on",
  brand = "Hyperliquid",
  icon,
  width = 200,
  isDimmed = false,

  iconWidth = 14,
  iconHeight = 10,
  iconTitle = "Decorative icon",

  containerClassName,
  labelClassName,
  brandClassName,
  iconClassName,

  responsiveClassName = "sm:hidden",
  centerX = true,

  ...rest
}: BuiltOnBadgeProps) {
  const styleWidth =
    typeof width === "number" ? { width: `${width}px` } : { width };

  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconWidth}
      height={iconHeight}
      viewBox="0 0 14 10"
      aria-hidden={iconTitle ? undefined : true}
      role={iconTitle ? "img" : "presentation"}
    >
      {iconTitle ? <title>{iconTitle}</title> : null}
      <path
        d="M14 4.935C14 9.39317 11.17 10.8239 9.66922 9.55906C8.44717 8.52227 8.0827 6.32429 6.2389 6.0962C3.90199 5.82664 3.6876 8.83331 2.14395 8.83331C0.343032 8.83331 0 6.32429 0 5.01795C0 3.69087 0.385911 1.88686 1.90812 1.88686C3.6876 1.88686 3.79479 4.47882 6.0245 4.33367C8.23277 4.18852 8.27565 1.49288 9.73354 0.352416C10.9985 -0.663631 14 0.414623 14 4.935Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div
      {...rest}
      style={styleWidth}
      className={clsx(
        "flex flex-row items-center text-center gap-2 relative pt-2",
        " z-[999] whitespace-nowrap",
        responsiveClassName,
        centerX && "left-1/2 -translate-x-1/2",
        isDimmed && "opacity-5",
        containerClassName
      )}
    >
      <span className={clsx(" leading-[150%] text-[#494848]", labelClassName)}>
        {label}
      </span>

      <span
        className={clsx("inline-flex", "text-[#BBBBBA]", iconClassName)}
        aria-hidden="true"
      >
        {icon ?? defaultIcon}
      </span>

      <span
        className={clsx(
          " leading-[150%] font-bold text-[#BBBBBA]",
          brandClassName
        )}
      >
        {brand}
      </span>
    </div>
  );
}
