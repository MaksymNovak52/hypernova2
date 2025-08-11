import { StatusButton } from "@/components/ui";
import { ACCESS_STEP } from "@/constanst";
import React from "react";

type AccessStepProps = {
  icon: JSX.Element;
  label: string;
  status: "Connected" | "Connect";
};

const AccessStep: React.FC<AccessStepProps> = ({ icon, label, status }) => (
  <div className="flex justify-between items-center w-[300px] px-4">
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 bg-[#3B3B3B] rounded-full flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[#BBBBBA] text-xs">{label}</span>
    </div>
    <div className="">
      <StatusButton status={status} />
    </div>
  </div>
);

const PriorityAccess: React.FC = () => (
  <div className="flex flex-col justify-center items-center bg-[#FFFFFF0D]/[0.05] py-4 rounded-xl  w-[300px] border border-[#494848] rounded-md] mx-auto">
    <div className="flex flex-col gap-1 mb-4 items-center justify-center">
      <h3 className="text-[#BBBBBA] text-[12px] ">Steps for priority access</h3>
      <span className="w-[270px] h-[1px] bg-[#30302F] "></span>
    </div>
    <div className="flex flex-col space-y-4  ">
      {ACCESS_STEP.map((step, index) => (
        <AccessStep
          key={index}
          icon={step.icon}
          label={step.label}
          status={step.status as "Connected" | "Connect"}
        />
      ))}
    </div>
  </div>
);

export { PriorityAccess };
