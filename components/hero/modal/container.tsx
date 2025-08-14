import { BuiltOnBadge } from "@/components/ui";
import ClickSpark from "@/components/ui/click-spark";
import { FORM_CONFIG, MODAL_CONFIG } from "@/constanst";
import { useFormValidation, useIsMobile } from "@/hooks";
import { FormState, ModalContainerProps } from "@/interface";
import React, { useMemo, useState } from "react";
import { AsciiCanvas } from "../new-ascii";
import { EmailContent, PriorityAccess, UserContainer } from "./content";
import { Footer, ModalHeader } from "./index";

export default function ModalContainer({
  isOpen,
  closeModal,
}: ModalContainerProps) {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    username: "",
    error: "",
    isFocused: false,
    step: "email",
  });

  const { validateEmail, validateUsername } = useFormValidation();
  const isPhone = useIsMobile(800);
  const asciiConfig = useMemo(
    () => ({
      scale: 14,
      position: { x: -45, y: -4, z: -7 },
      rotation: { x: -2, y: 0.1, z: -2 },
      pivotRotation: { x: -0.05, y: 0, z: 1 },
      rotationSpeed: 0,
      cellSize: 4.5,

      onReady: () => console.log("Fully configured scene ready!"),
    }),
    []
  );

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      email: value,
      error: value ? validateEmail(value).error : "",
    }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      username: value,
      error: value ? validateUsername(value).error : "",
    }));
  };

  const handleEmailSubmit = () => {
    const validation = validateEmail(formState.email);

    if (!validation.isValid) {
      setFormState((prev) => ({ ...prev, error: validation.error }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      step: "username",
      error: "",
      isFocused: false,
    }));
  };

  const handleUsernameSubmit = () => {
    const validation = validateUsername(formState.username);

    if (!validation.isValid) {
      setFormState((prev) => ({
        ...prev,
        step: "access",
        error: validation.error,
      }));
      return;
    }
    setFormState((prev) => ({
      ...prev,
      step: "access",
      error: "",
      isFocused: false,
    }));
  };

  const handleBack = () => {
    setFormState((prev) => ({
      ...prev,
      step: "email",
      error: "",
      isFocused: false,
    }));
  };

  const handleSocialLogin = (providerId: string) => {
    console.log("Social login with:", providerId);
  };

  const handleFocus = () =>
    setFormState((prev) => ({ ...prev, isFocused: true }));
  const handleBlur = () =>
    setFormState((prev) => ({ ...prev, isFocused: false }));

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (formState.step) {
      case "email":
        return (
          <EmailContent
            formState={formState}
            handleEmailChange={handleEmailChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleEmailSubmit={handleEmailSubmit}
            handleSocialLogin={handleSocialLogin}
          />
        );
      case "username":
        return (
          <UserContainer
            formState={formState}
            handleUsernameChange={handleUsernameChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleUsernameSubmit={handleUsernameSubmit}
            handleBack={handleBack}
          />
        );
      case "access":
        return <PriorityAccess />;
      default:
        return null;
    }
  };

  const modalClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const shouldHideAscii =
    formState.isFocused ||
    (formState.step !== "access" &&
      (formState.email.length > 0 || formState.username.length > 0));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className={`relative backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-[#4A4A49] w-full h-[541px] sm:h-[650px] max-w-5xl  ${MODAL_CONFIG.animations.transition} scale-100`}
        onClick={modalClickHandler}
        style={{
          backgroundColor: MODAL_CONFIG.colors.background,
          backdropFilter: "blur(50px)",
        }}
      >
        <ClickSpark
          sparkColor="#BBBBBA"
          sparkSize={12}
          sparkRadius={25}
          sparkCount={8}
          duration={600}
          easing="ease-out"
          extraScale={1.2}
        >
          <div className="flex h-full justify-center gap-10 items-center ">
            <div className="flex-1 flex flex-col justify-center py-8 max-h-[80%] w-[310px] relative">
              <ModalHeader step={formState.step} />

              <div className="flex flex-col justify-center items-center ">
                {formState.step !== "access" && (
                  <label
                    className={`${MODAL_CONFIG.colors.text.label} text-xs mb-3    flex flex-row justify-between w-[310px]`}
                  >
                    {formState.step === "email"
                      ? FORM_CONFIG.messages.labels.emailAddress
                      : FORM_CONFIG.messages.labels.username}
                    {formState.error && (
                      <span className={`text-[#AC3A3A] ml-10`}>
                        {formState.error}
                      </span>
                    )}
                  </label>
                )}
                {renderStepContent()}
              </div>

              <Footer step={formState.step} />
            </div>

            <div className=" justify-end items-center pr-4  hidden sm:flex overflow-hidden ">
              <div
                className="w-[470px] h-[600px] rounded-[15px] border border-[#252323] overflow-hidden relative"
                style={{
                  backgroundColor: "rgb(18, 17, 17,0.2)",
                  boxShadow:
                    "rgb(18, 17, 17,0.2) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                }}
              >
                {!isPhone && (
                  <>
                    <BuiltOnBadge
                      label="Powered by"
                      brand="Hyperliquid"
                      isDimmed={false}
                      responsiveClassName="s"
                      containerClassName="  z-999999 fixed top-[544px] left-[262px] bg-transparent "
                      labelClassName="text-[10px] text-[#BBBBBA]"
                      brandClassName="text-[10px]  text-white"
                      iconClassName="mx-1 text-white/60"
                    />
                    <AsciiCanvas
                      className="rotate-[-90deg] will-change-transform [image-rendering:pixelated] [-webkit-font-smoothing:antialiased] [text-rendering:optimizeSpeed]"
                      scale={14}
                      position={{ x: -45, y: -4, z: -7 }}
                      rotation={{ x: -2, y: 0.1, z: -1.8 }}
                      pivotRotation={{ x: -0.05, y: 0, z: 1 }}
                      rotationSpeed={0}
                      cellSize={3.2}
                      onReady={asciiConfig.onReady}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </ClickSpark>
      </div>
    </div>
  );
}
