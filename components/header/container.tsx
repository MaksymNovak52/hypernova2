import { UnderLineText } from "../ui";
import { LogoLottie } from "../ui/logo-lottie";
import { PixelTrailWithOverlay } from "../ui/trail-ovetlay";

export function HeaderContainer() {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-center z-10 h-[57px] pt-[30px] z-10000">
      <section className="flex flex-row items-center justify-end sm:justify-between w-[1340px] py-2 rounded-full ">
        <video
          className="object-contain hidden sm:block"
          src="https://etzdcequxtapvhzpdyfk.supabase.co/storage/v1/object/public/test/logo_test.webm"
          autoPlay
          loop
          muted
          playsInline
          width={287}
          height={21}
        />
        <div className="absolute top-[-14vh] left-[-14vh] sm:hidden">
          <LogoLottie size={400} />
        </div>{" "}
        <div className="flex items-center space-x-6 pr-4 sm:pr-0">
          <UnderLineText className="text-base">About Us</UnderLineText>

          <div className="">
            <PixelTrailWithOverlay
              width={130}
              height={40}
              fontSize={14}
              label="Launch App"
              circleSize={12}
              circleColor="#080605"
              backgroundColor="white"
              textColor="#080605"
            />
          </div>
        </div>
      </section>
    </header>
  );
}
