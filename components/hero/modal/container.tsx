import { FORM_CONFIG, MODAL_CONFIG } from "@/constanst";
import { useFormValidation } from "@/hooks";
import { FormState, ModalContainerProps } from "@/interface";
import React, { useState } from "react";
import { ASCIIGalaxy3D } from "../ascii-galaxy";
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
    console.log("Registration complete:", {
      email: formState.email,
      username: formState.username,
    });
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div
        className={`relative backdrop-blur-md rounded-2xl shadow-2xl border border-[#4A4A49] w-full h-[650px] max-w-5xl  ${MODAL_CONFIG.animations.transition} scale-100`}
        onClick={modalClickHandler}
        style={{
          backgroundColor: MODAL_CONFIG.colors.background,
          backdropFilter: "blur(50px)",
        }}
      >
        <div className="flex h-full justify-center gap-10 items-center">
          <div className="flex-1 flex flex-col justify-center py-8 max-h-[80%] w-[310px]">
            <ModalHeader step={formState.step} />

            <div className="flex flex-col justify-center items-center">
              {formState.step !== "access" && (
                <label
                  className={`${MODAL_CONFIG.colors.text.label} text-xs mb-3  bg--400 w-[310px]`}
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

            {formState.step === "email" && <Footer />}
          </div>

          <div className=" justify-end items-center pr-4  hidden sm:flex">
            <div className="w-[470px] h-[600px] border border-[#252323] ">
              <ASCIIGalaxy3D width={450} height={500} left="left-[70%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
