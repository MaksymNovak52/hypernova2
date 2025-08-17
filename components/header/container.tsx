import { useState } from "react";
import { DotBadge, UnderLineText } from "../ui";
import { LogoLottie } from "../ui/logo-lottie";

export function HeaderContainer({ onLaunch }: { onLaunch: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="absolute top-0 left-0  w-full flex items-center justify-center z-10 h-[57px] pt-[30px] z-10000">
      <section className="flex flex-row items-center justify-end sm:justify-between sm:w-[96%] w-[1340px] py-2 rounded-full relative ">
        <video
          className="object-contain hidden sm:block cursor-target"
          src="https://etzdcequxtapvhzpdyfk.supabase.co/storage/v1/object/public/test/logo_test.webm"
          autoPlay
          loop
          muted
          playsInline
          width={287}
          height={21}
        />
        <div className="absolute top-[-170px] left-[-160px] sm:hidden">
          <LogoLottie size={400} />
        </div>{" "}
        <div className="flex items-center space-x-6 pr-4 sm:pr-0">
          <UnderLineText className="text-[14px] sm:text-base cursor-target">
            About Us
          </UnderLineText>

          <div
            className="pb-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <DotBadge
              borderStyle="none"
              width={130}
              height={36}
              isHover
              showSwapX={50}
              fontSize={14}
              label={isHovered ? "Soon" : "Launch App"}
              isShadow={true}
              circleSize={8}
              circleColor="#080605"
              backgroundColor="white"
              textColor="#080605"
              onClick={onLaunch}
            />{" "}
          </div>
        </div>
      </section>
    </header>
  );
}
