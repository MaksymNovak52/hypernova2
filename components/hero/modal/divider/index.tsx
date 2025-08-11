import { FORM_CONFIG, MODAL_CONFIG } from "@/constanst";

export const Divider: React.FC = () => (
  <div className="flex items-center my-4 w-[310px]">
    <div className="flex-1 h-px bg-gray-600"></div>
    <span className={`px-4 ${MODAL_CONFIG.colors.text.secondary} text-sm`}>
      {FORM_CONFIG.buttons.divider}
    </span>
    <div className="flex-1 h-px bg-gray-600"></div>
  </div>
);
