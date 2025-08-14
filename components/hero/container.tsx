"use client";
import { useIsMobile } from "@/hooks";
import { DotBadge } from "../ui";
import { PixelTrailWithOverlay } from "../ui/trail-ovetlay";
import { HeroDescription } from "./description";
import { AsciiCanvas } from "./new-ascii";
import { SocialContainer } from "./social";

export function HeroContainer({
  onAsciiReady,
  onLaunch,
}: {
  onLaunch: () => void;
  onAsciiReady: () => void;
}) {
  const isMobile = useIsMobile(800);

  const sceneWidth = isMobile ? 450 : 1200;
  const sceneHeight = isMobile ? 500 : 1000;

  return (
    <>
      <style jsx>
        {`
          .box {
            border-radius: 15px;
            border: 1px solid transparent;
            background: linear-gradient(
                220deg,
                rgba(73, 72, 72, 0),
                rgba(73, 72, 72, 0.8),
                rgba(73, 72, 72, 1)
              )
              border-box; /*3*/
            mask: /*4*/ linear-gradient(#000 0 0) padding-box,
              linear-gradient(#000 0 0);
            mask-composite: exclude; /*5*/
          }
        `}
      </style>

      <main className="relative z-10 rounded-xl h-[85vh] bg-transparent sm:bg-[#494848]/10 overflow-hidden items-center justify-between text-start max-w-[343px] sm:max-w-[96%] text-[#B7B7B7] mx-auto mt-[72px] sm:mt-[90px]">
        <div className="box w-full h-full absolute"></div>
        <div className="px-4 flex max-h-[600px] sm:h-[85vh] overflow-hidden items-center justify-between text-start max-w-[1340px] text-[#B7B7B7] mx-auto">
          <SocialContainer />
          <HeroDescription />

          <div className="mb-10 animate-fade-in-up flex flex-col mx-auto justify-start h-full text-center pt-[30px] sm:pt-[65px]">
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

            <h4
              className="text-[34px] md:text-6xl font-mono mt-[28px] font-normal mb-6 max-w-[550px] line-clamp-2"
              style={{
                color: "rgba(228 228 228 / 100%)",
              }}
            >
              Your Gateway to Funded Trading
            </h4>

            <div className="flex flex-row justify-center items-center gap-6 z-100">
              <PixelTrailWithOverlay
                width={130}
                height={36}
                fontSize={14}
                isShadow={false}
                label="Learn More"
                circleSize={0}
                backgroundColor="#151313"
                textColor="#BBBBBA"
                borderStyle=" 1px solid #494848"
              />

              <div className="pb-2">
                <DotBadge
                  borderStyle="none"
                  width={130}
                  height={36}
                  isHover
                  fontSize={14}
                  label="Launch App"
                  isShadow={true}
                  circleSize={8}
                  circleColor="#080605"
                  backgroundColor="linear-gradient(107deg, #FFF 10%, #BBBBBA 100%)"
                  textColor="#080605"
                  onClick={onLaunch}
                />
              </div>
            </div>
          </div>

          <AsciiCanvas
            scale={isMobile ? 10 : 20}
            position={{ x: isMobile ? 1 : 8, y: isMobile ? 5 : 5, z: 1 }}
            rotation={{ x: 0.6, y: 0.1, z: -0.4 }}
            pivotRotation={{ x: -0.05, y: 0, z: 0 }}
            rotationSpeed={0.01}
            cellSize={5.0}
            onReady={() => console.log("Fully configured scene ready!")}
          />
        </div>
      </main>
    </>
  );
}
