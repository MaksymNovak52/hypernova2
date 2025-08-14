"use client";
import { StatusButton } from "@/components/ui";
import { ACCESS_STEP } from "@/constanst";
import React, { useState } from "react";

type AccessStepProps = {
  icon: JSX.Element;
  label: string;
  status: "Connected" | "Connect";
  isEditing: boolean;
  value: string;
  onStartEdit: () => void;
  onChangeValue: (v: string) => void;
  onCommit: () => void;
  onCancel: () => void;
};

export const AccessStep: React.FC<AccessStepProps> = ({
  icon,
  label,
  status,
  isEditing,
  value,
  onStartEdit,
  onChangeValue,
  onCommit,
  onCancel,
}) => (
  <div className="flex justify-between items-center w-[300px] px-4">
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 bg-[#3B3B3B] rounded-full flex items-center justify-center">
        {icon}
      </div>
      {!isEditing && <span className="text-[#BBBBBA] text-xs">{label}</span>}
    </div>

    <div>
      {isEditing ? (
        <div className="flex flex-row gap-1 h-[26px] items-center w-[240px] rounded-md  bg-[rgba(255,255,255,0.05)]  border border-[#BBBBBA] px-2 ">
          <input
            autoFocus
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onCommit();
              if (e.key === "Escape") onCancel();
            }}
            className="  text-[16px] sm:text-sm h-[16px] w-[95%] bg-transparent text-[#BBBBBA] outline-none"
            placeholder="Enter value"
          />
          {value.length > 0 ? (
            <span onClick={onCommit}>
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.3959 2.08887C9.0164 2.08887 8.7084 2.39641 8.7084 2.77637V6.21387H3.26386L4.34919 5.15649C4.61777 4.88837 4.61777 4.45249 4.34919 4.18437C4.08061 3.91578 3.64565 3.91578 3.37707 4.18437L1.11794 6.41553C0.849358 6.68366 0.849358 7.11908 1.11794 7.38766L3.39861 9.70958C3.5329 9.84387 3.7089 9.91079 3.8849 9.91079C4.0609 9.91079 4.2369 9.84387 4.37119 9.70958C4.63977 9.44099 4.63977 9.00603 4.37119 8.73745L3.26386 7.58887H9.3959C9.7754 7.58887 10.0834 7.28087 10.0834 6.90137V2.77637C10.0834 2.39641 9.7754 2.08887 9.3959 2.08887Z"
                  fill="#BBBBBA"
                />
              </svg>
            </span>
          ) : (
            <span onClick={onCancel}>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_208_386)">
                  <path
                    d="M10.9688 6.1875H7.71875C7.04681 6.1875 6.5 6.73431 6.5 7.40625V11.0625H2.03125C1.807 11.0625 1.625 10.8805 1.625 10.6562V2.53125C1.625 2.307 1.807 2.125 2.03125 2.125H3.25V2.53125C3.25 2.7555 3.432 2.9375 3.65625 2.9375H6.90625C7.1305 2.9375 7.3125 2.7555 7.3125 2.53125V2.125H8.53125C8.7555 2.125 8.9375 2.307 8.9375 2.53125V4.96875C8.9375 5.193 9.1195 5.375 9.34375 5.375C9.568 5.375 9.75 5.193 9.75 4.96875V2.53125C9.75 1.85931 9.20319 1.3125 8.53125 1.3125H7.3125V0.90625C7.3125 0.682 7.1305 0.5 6.90625 0.5H3.65625C3.432 0.5 3.25 0.682 3.25 0.90625V1.3125H2.03125C1.35931 1.3125 0.8125 1.85931 0.8125 2.53125V10.6562C0.8125 11.3282 1.35931 11.875 2.03125 11.875H6.5V12.2812C6.5 12.9532 7.04681 13.5 7.71875 13.5H10.9688C11.6407 13.5 12.1875 12.9532 12.1875 12.2812V7.40625C12.1875 6.73431 11.6407 6.1875 10.9688 6.1875ZM4.0625 1.3125H6.5V2.125H4.0625V1.3125ZM11.375 12.2812C11.375 12.5055 11.193 12.6875 10.9688 12.6875H7.71875C7.4945 12.6875 7.3125 12.5055 7.3125 12.2812V7.40625C7.3125 7.182 7.4945 7 7.71875 7H10.9688C11.193 7 11.375 7.182 11.375 7.40625V12.2812ZM10.5625 11.4688C10.5625 11.693 10.3805 11.875 10.1562 11.875H8.53125C8.307 11.875 8.125 11.693 8.125 11.4688C8.125 11.2445 8.307 11.0625 8.53125 11.0625H10.1562C10.3805 11.0625 10.5625 11.2445 10.5625 11.4688ZM10.5625 9.84375C10.5625 10.068 10.3805 10.25 10.1562 10.25H8.53125C8.307 10.25 8.125 10.068 8.125 9.84375C8.125 9.6195 8.307 9.4375 8.53125 9.4375H10.1562C10.3805 9.4375 10.5625 9.6195 10.5625 9.84375ZM10.5625 8.21875C10.5625 8.443 10.3805 8.625 10.1562 8.625H8.53125C8.307 8.625 8.125 8.443 8.125 8.21875C8.125 7.9945 8.307 7.8125 8.53125 7.8125H10.1562C10.3805 7.8125 10.5625 7.9945 10.5625 8.21875Z"
                    fill="#BBBBBA"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_208_386">
                    <rect
                      width="13"
                      height="13"
                      fill="white"
                      transform="translate(0 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          )}
        </div>
      ) : (
        <StatusButton
          status={status}
          onClick={() => {
            if (status === "Connect") onStartEdit();
          }}
        />
      )}
    </div>
  </div>
);

type StepItem = {
  icon: JSX.Element;
  label: string;
  status: "Connected" | "Connect";
  value: string;
};

const PriorityAccess: React.FC = () => {
  const [steps, setSteps] = useState<StepItem[]>(
    ACCESS_STEP.map((s: any) => ({
      icon: s.icon,
      label: s.label,
      status: (s.status as "Connected" | "Connect") ?? "Connect",
      value: "",
    }))
  );

  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const startEdit = (idx: number) => {
    setEditingIdx(idx);
  };

  const changeValue = (idx: number, v: string) => {
    setSteps((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], value: v };
      return next;
    });
  };

  const commit = (idx: number) => {
    setSteps((prev) => {
      const next = [...prev];
      const v = next[idx].value.trim();
      if (v.length > 0) {
        next[idx] = { ...next[idx], status: "Connected" };
      }
      return next;
    });
    setEditingIdx(null);
  };

  const cancel = (idx: number) => {
    setEditingIdx(null);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#FFFFFF0D]/[0.05] py-4 rounded-xl w-[300px] border border-[#494848] mx-auto h-[190px]">
      <div className="flex flex-col gap-1 mb-4 items-center justify-center">
        <h3 className="text-[#BBBBBA] text-[12px] pb-2">
          Steps for priority access
        </h3>
        <span className="w-[270px] h-[1px] bg-[#30302F]" />
      </div>

      <div className="flex flex-col space-y-4">
        {steps.map((step, idx) => (
          <AccessStep
            key={idx}
            icon={step.icon}
            label={step.label}
            status={step.status}
            isEditing={editingIdx === idx}
            value={step.value}
            onStartEdit={() => {
              setEditingIdx((prev) => (prev === idx ? prev : idx));
            }}
            onChangeValue={(v) => changeValue(idx, v)}
            onCommit={() => commit(idx)}
            onCancel={() => cancel(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export { PriorityAccess };
