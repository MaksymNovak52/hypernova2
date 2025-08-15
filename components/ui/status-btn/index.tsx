import React from "react";

type StatusButtonProps = {
  status: "Connected" | "Connect";
  onClick?: () => void;
};

export const StatusButton: React.FC<StatusButtonProps> = ({
  status,
  onClick,
}) => (
  <span
    onClick={onClick}
    className={`gap-2 border cursor-target border-[#4D4D4D] text-xs w-[85px] h-[26px] cursor-pointer rounded-lg flex items-center justify-center transition-all transform hover:scale-105 ease-in-out ${
      status === "Connected"
        ? "bg-gradient-to-r from-[#FFF] to-[#BBBBBA] text-[#080605]"
        : "bg-[rgba(255,255,255,0.05)] text-[#BBBBBA]"
    }`}
  >
    {status === "Connect" && (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
      >
        <g clipPath="url(#clip0_87_734)">
          <path
            d="M5.60481 9.01611H6.37891C6.37891 10.5161 6.37884 12.1124 6.37884 12.1124C6.37884 12.3264 6.20557 12.4995 5.99176 12.4995C5.77795 12.4995 5.60467 12.3264 5.60467 12.1124C5.60467 12.1124 5.60474 12.1124 5.60481 9.01611Z"
            fill="#BBBBBA"
          />
          <path
            d="M9.08844 3.59677H7.92719V0.887085C7.92719 0.673126 7.75388 0.5 7.5401 0.5C7.32632 0.5 7.15302 0.673126 7.15302 0.887085V3.59677H4.83041V0.887085C4.83041 0.673126 4.6571 0.5 4.44333 0.5C4.22955 0.5 4.05624 0.673126 4.05624 0.887085V3.59677H2.8949C2.68112 3.59677 2.50781 3.7699 2.50781 3.98386V6.30646C2.50781 8.2276 4.0708 9.79031 5.99167 9.79031C7.91263 9.79031 9.47552 8.2276 9.47552 6.30646V3.98386C9.47552 3.7699 9.30222 3.59677 9.08844 3.59677ZM8.70135 6.30646C8.70135 7.80042 7.48581 9.01614 5.99167 9.01614C4.49753 9.01614 3.28198 7.80042 3.28198 6.30646V4.37094H8.70135V6.30646Z"
            fill="#BBBBBA"
          />
        </g>
        <defs>
          <clipPath id="clip0_87_734">
            <rect
              width="12"
              height="12"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    )}
    {status}
  </span>
);
