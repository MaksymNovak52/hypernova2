import { LogoLottie } from "@/components/ui/logo-lottie";
import { CONTENT_CONFIG, MODAL_CONFIG } from "@/constanst";
import { AccessIcon } from "../icon";
import { RocketIcon } from "../icon/rocket";

export const ModalHeader: React.FC<{
  step: "email" | "username" | "access";
}> = ({ step }) => {
  let icon, title, subtitle;

  switch (step) {
    case "email":
      icon = <LogoLottie size={400} />;
      title = CONTENT_CONFIG.email.title;
      subtitle = CONTENT_CONFIG.email.subtitle;
      break;
    case "username":
      icon = <RocketIcon />;
      title = CONTENT_CONFIG.username.title;
      subtitle = CONTENT_CONFIG.username.subtitle;
      break;
    case "access":
      icon = <AccessIcon />;
      title = CONTENT_CONFIG.access.title;
      subtitle = CONTENT_CONFIG.access.subtitle;
      break;
    default:
      break;
  }

  return (
    <div className="mb-[40px] flex flex-col items-center justify-center w-[300 px] mx-auto ">
      <div className={`${step === "email" && "absolute top-[-180px]"}`}>
        {icon}
      </div>
      <div
        className={`flex flex-col items-center text-center  ${
          step === "access" && "w-[300px]"
        }`}
      >
        <h1
          className={`${MODAL_CONFIG.colors.text.primary} text-[26px] font-light mb-1 line-clamp-2`}
        >
          {title}
        </h1>
        <p
          className={`${MODAL_CONFIG.colors.text.secondary} text-[14px] text-center`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
};
