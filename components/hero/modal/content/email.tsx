import { FORM_CONFIG, MODAL_CONFIG } from "@/constanst";
import { ClickSpark } from "@appletosolutions/reactbits";
import { Divider } from "../divider";
import { EmailInput } from "../inputs";
import { SocialLogin } from "../social-button";
interface IProps {
  formState: any;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleEmailSubmit: () => void;
  handleSocialLogin: (providerId: string) => void;
}
export function EmailContent({
  formState,
  handleEmailChange,
  handleFocus,
  handleBlur,
  handleEmailSubmit,
  handleSocialLogin,
}: IProps) {
  return (
    <>
      <EmailInput
        formState={formState}
        onEmailChange={handleEmailChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="">
        <ClickSpark>
          <button
            onClick={handleEmailSubmit}
            style={{
              background: "linear-gradient(107deg, #FFF 0%, #BBBBBA 100%)",
            }}
            className={`w-[310px] text-black ${MODAL_CONFIG.colors.button.primary} h-[32px] flex items-center justify-center text-sm font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-10 hover:animate-glow`}
          >
            {FORM_CONFIG.buttons.continue}
          </button>
        </ClickSpark>
      </div>
      <Divider />
      <SocialLogin onSocialLogin={handleSocialLogin} />
    </>
  );
}
