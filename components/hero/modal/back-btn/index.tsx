import { FORM_CONFIG } from "@/constanst";

export const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`text-[#BBBBBA] hover:text-white text-sm underline transition-colors mt-4 cursor-target`}
  >
    {FORM_CONFIG.buttons.back}
  </button>
);
