import Users from "@/assets/users.png";
import Image from "next/image";
export const Footer = ({ step }: { step: "email" | "username" | "access" }) => (
  <div
    className={`flex flex-row  fixed inset-0 top-[470px] sm:top-[564px]  left-[190px] sm:-left-[196px] transform -translate-x-1/2  -translate-y-1/2 items-center gap-2  w-[303px] h-[24px] mx-auto pt-10`}
  >
    <div className="">
      <Image src={Users} alt="users" />
    </div>
    <p className="text-[14px] text-[#BBBBBA] text-center leading-relaxed ">
      <span className="text-[#02BD7E]">4,242</span> traders in the queue
    </p>
  </div>
);
