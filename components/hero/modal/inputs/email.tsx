import { FORM_CONFIG } from "@/constanst";
import { FormState } from "@/interface";
import { useMemo } from "react";

export const EmailInput: React.FC<{
  formState: FormState;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
}> = ({ formState, onEmailChange, onFocus, onBlur }) => {
  const inputStyles = useMemo(() => {
    const baseStyles =
      "w-[310px] px-4 py-3 bg-transparent rounded-lg text-white placeholder-gray-500 focus:outline-none transition-all duration-200";
    const errorStyles = "border-2 border-[#AC3A3A]";
    const normalStyles =
      "border border-gray-600 hover:border-gray-400 focus:border-white";

    return `${baseStyles} ${formState.error ? errorStyles : normalStyles}`;
  }, [formState.error]);

  const boxShadow = useMemo(() => {
    if (formState.error) {
      return "0 0 12px rgba(172, 58, 58, 0.6)";
    }
    if (formState.isFocused || formState.email) {
      return "0 0 12px rgba(255, 255, 255, 0.4)";
    }
    return undefined;
  }, [formState.error, formState.isFocused, formState.email]);

  return (
    <div className="relative mb-6">
      <input
        type="email"
        placeholder={FORM_CONFIG.messages.placeholders.email}
        value={formState.email}
        onChange={onEmailChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={inputStyles}
        style={{ boxShadow }}
      />
    </div>
  );
};
