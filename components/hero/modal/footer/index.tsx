import Users from "@/assets/users.png";
import Image from "next/image";
export const Footer: React.FC = () => (
  <div className="flex flex-row  items-center gap-2  w-[213px] h-[24px] mx-auto mt-10">
    <div className="">
      <Image src={Users} alt="users" />
    </div>
    <p className="text-[10px] text-[#BBBBBA] text-center leading-relaxed ">
      <span className="text-[#02BD7E]">4,242</span> traders in the queue
    </p>
  </div>
);
