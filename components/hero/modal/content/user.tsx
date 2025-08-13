import { FORM_CONFIG, MODAL_CONFIG } from "@/constanst";
import { FormState } from "@/interface";
import { BackButton } from "../back-btn";
import { UsernameInput } from "../inputs";
interface IProps {
  formState: FormState;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleUsernameSubmit: () => void;
  handleBack: () => void;
}
export function UserContainer({
  formState,
  handleUsernameChange,
  handleFocus,
  handleBlur,
  handleUsernameSubmit,
  handleBack,
}: IProps) {
  return (
    <>
      <UsernameInput
        formState={formState}
        onUsernameChange={handleUsernameChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="">
        <button
          onClick={handleUsernameSubmit}
          style={{
            background: "linear-gradient(107deg, #FFF 0%, #BBBBBA 100%)",
          }}
          className={`w-[310px] text-black ${MODAL_CONFIG.colors.button.primary} h-[40px] sm:h-[32px] flex items-center justify-center text-sm font-medium py-2 px-2 rounded-lg transition-all duration-300 ease-in-out hover:scale-10 hover:animate-glow`}
        >
          {FORM_CONFIG.buttons.reserve}
        </button>
      </div>
      <div className="flex justify-center">
        <BackButton onClick={handleBack} />
      </div>
    </>
  );
}
