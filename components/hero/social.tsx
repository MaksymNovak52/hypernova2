import { PixelTrailWithOverlay } from "../ui/trail-ovetlay";

export function SocialContainer() {
  return (
    <section className="absolute sm:bottom-[50px]  bottom-[20px] right-0 sm:right-10   w-full flex flex-col  items-center sm:items-end gap-6 0 sm:max-w-[301px]">
      <div className="flex flex-row justify-center sm:justify-end items-center  h-[30px] gap-2 w-full    ml-1  ">
        <PixelTrailWithOverlay
          isShadow={false}
          width={70}
          height={32}
          fontSize={14}
          label={
            (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="12"
                viewBox="0 0 14 12"
                fill="none"
              >
                <path
                  d="M5.49349 7.9088L5.2619 11.2592C5.59324 11.2592 5.73674 11.1128 5.90883 10.937L7.46228 9.41L10.6812 11.8346C11.2715 12.173 11.6875 11.9948 11.8467 11.276L13.9596 1.09284L13.9602 1.09224C14.1474 0.194642 13.6446 -0.156356 13.0694 0.063843L0.649953 4.95442C-0.197651 5.29282 -0.184817 5.77881 0.505866 5.99901L3.68103 7.01481L11.0563 2.26823C11.4034 2.03183 11.719 2.16263 11.4594 2.39903L5.49349 7.9088Z"
                  fill="white"
                />
              </svg>
            ) as any
          }
          circleSize={0}
          backgroundColor="transparent"
          textColor="#BBBBBA"
          borderStyle=" 1px solid #494848"
        />{" "}
        <PixelTrailWithOverlay
          isShadow={false}
          borderStyle=" 1px solid #494848"
          width={70}
          height={32}
          fontSize={14}
          label={
            (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <g clipPath="url(#clip0_87_792)">
                  <path
                    d="M9.45 0.576477H11.291L7.27 5.17098L12 11.424H8.2975L5.3955 7.63248L2.0785 11.424H0.2345L4.5345 6.50848L0 0.576477H3.7965L6.417 4.04198L9.45 0.576477ZM8.8035 10.3235H9.823L3.241 1.61948H2.146L8.8035 10.3235Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_87_792">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) as any
          }
          circleSize={0}
          backgroundColor="transparent"
          textColor="#BBBBBA"
        />{" "}
      </div>
      <div className="sm:flex flex-row items-center hidden text-center  gap-2  max-sm:absolute max-sm:bottom-[-80px] max-sm:left-1/2 transform max-sm:-translate-x-1/2 ">
        <span className="text-base text-[#848484] leading-[150%]  ">
          Built on
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
        >
          <path
            d="M14 4.935C14 9.39317 11.17 10.8239 9.66922 9.55906C8.44717 8.52227 8.0827 6.32429 6.2389 6.0962C3.90199 5.82664 3.6876 8.83331 2.14395 8.83331C0.343032 8.83331 0 6.32429 0 5.01795C0 3.69087 0.385911 1.88686 1.90812 1.88686C3.6876 1.88686 3.79479 4.47882 6.0245 4.33367C8.23277 4.18852 8.27565 1.49288 9.73354 0.352416C10.9985 -0.663631 14 0.414623 14 4.935Z"
            fill="#BBBBBA"
          />
        </svg>
        <span className="text-base text-[#9d9d9d] leading-[150%] font-bold">
          Hyperliquid
        </span>
      </div>
    </section>
  );
}
