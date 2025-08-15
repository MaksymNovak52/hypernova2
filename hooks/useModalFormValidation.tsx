import { FORM_CONFIG } from "@/constanst";
import { ValidationResult } from "@/interface";

const useFormValidation = () => {
  const validateEmail = (email: string): ValidationResult => {
    if (!email) {
      return {
        isValid: false,
        error: FORM_CONFIG.messages.errors.requiredEmail,
      };
    }

    if (!FORM_CONFIG.validation.emailRegex.test(email)) {
      return {
        isValid: false,
        error: FORM_CONFIG.messages.errors.invalidEmail,
      };
    }

    return { isValid: true, error: "" };
  };

  const validateUsername = (username: string): ValidationResult => {
    if (!username) {
      return {
        isValid: false,
        error: FORM_CONFIG.messages.errors.requiredUsername,
      };
    }

    return { isValid: true, error: "" };
  };

  return { validateEmail, validateUsername };
};

export { useFormValidation };
