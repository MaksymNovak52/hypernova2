import Users from "@/assets/users.png";
import Image from "next/image";
export const Footer = ({ step }: { step: "email" | "username" | "access" }) => (
  <div
    className={`flex flex-row  absolute  ${
      step === "access" ? "-bottom-[50px]" : " -bottom-[100px]"
    }  left-1/2 transform -translate-x-1/2 items-center gap-2  w-[213px] h-[24px] mx-auto pt-10`}
  >
    <div className="">
      <Image src={Users} alt="users" />
    </div>
    <p className="text-[10px] text-[#BBBBBA] text-center leading-relaxed ">
      <span className="text-[#02BD7E]">4,242</span> traders in the queue
    </p>
  </div>
);
