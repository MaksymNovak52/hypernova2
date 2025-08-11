interface ModalContainerProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface FormState {
  email: string;
  username: string;
  error: string;
  isFocused: boolean;
  step: "email" | "username" | "access";
}

interface ValidationResult {
  isValid: boolean;
  error: string;
}

export type { FormState, ModalContainerProps, ValidationResult };
