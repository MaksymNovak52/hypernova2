import Image, { StaticImageData } from "next/image";

interface BackgroundImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  rotation?: string;
  width?: string;
  opacity?: string;
  zIndex?: string;
}

export const BackgroundImage = ({
  src,
  alt,
  className = "",
  position = { top: "-80vh", left: "-15vw" },
  rotation = "-200deg",
  width = "80px",
  opacity = "80",
  zIndex = "0",
}: BackgroundImageProps) => {
  const positionStyles = Object.entries(position)
    .map(([key, value]) => `${key}-[${value}]`)
    .join(" ");

  return (
    <>
      <Image
        src={src}
        alt={alt}
        className={`fixed w-[800px] rotate-[-200deg] left-[-5vw] top-[-80vh] ${className}   opacity-50`}
      />
    </>
  );
};
