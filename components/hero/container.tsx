"use client";
import { PixelTrailWithOverlay } from "../ui/trail-ovetlay";
import { ASCIIGalaxy3D } from "./ascii-galaxy";
import { HeroDescription } from "./description";
import { SocialContainer } from "./social";

export function HeroContainer({
  onAsciiReady,
  onLaunch,
}: {
  onLaunch: () => void;
  onAsciiReady: () => void;
}) {
  return (
    <main className="relative z-10 rounded-xl flex  h-[85vh] overflow-hidden items-center justify-between text-start px-4 border border-[#252323] max-w-[1340px] text-[#B7B7B7] mx-auto mt-24">
      <SocialContainer />

      <HeroDescription />
      <div className="mb-10 animate-fade-in-up flex flex-col mx-auto justify-start h-full text-center pt-[50px] bg-re d-400">
        <div className="flex flex-row justify-center items-center gap-4 uppercase">
          <span className="text-[12px]">early access</span>
          <div className="flex flex-row gap-2 items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="text-[#B7B7B7] bg-[#BBBBBA] w-1 h-1 rounded-full"
              ></span>
            ))}
          </div>
          <span className="text-[12px]">COMING SOON</span>
        </div>
        <h4 className="text-[40px] md:text-6xl font-mono mt-[28px] font-normal mb-6 max-w-[550px]">
          Your Gateway to Funded Trading
        </h4>
        <div className="flex flex-row justify-center items-center  gap-6  z-100">
          <PixelTrailWithOverlay
            width={130}
            height={36}
            fontSize={14}
            label="Learn More"
            circleSize={0}
            backgroundColor="#151313"
            textColor="#BBBBBA"
            borderStyle=" 1px solid #494848"
          />{" "}
          <PixelTrailWithOverlay
            borderStyle=" 1px solid #494848"
            width={130}
            height={36}
            fontSize={14}
            label="Launch App"
            circleSize={8}
            circleColor="#080605"
            backgroundColor="white"
            textColor="#080605"
            onClick={onLaunch}
          />{" "}
        </div>
      </div>
      <ASCIIGalaxy3D />
    </main>
  );
}
