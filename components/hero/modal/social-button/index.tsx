import { MODAL_CONFIG, SOCIAL_PROVIDERS } from "@/constanst";

const SocialButton: React.FC<{
  provider: (typeof SOCIAL_PROVIDERS)[number];
  onClick: (providerId: string) => void;
}> = ({ provider, onClick }) => (
  <button
    onClick={() => onClick(provider.id)}
    className={`flex-1 ${MODAL_CONFIG.colors.button.social} w-[71.5px] h-[32px] border rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center`}
    style={{ background: "rgba(255, 255, 255, 0.05)" }}
  >
    {provider.icon}
  </button>
);

export const SocialLogin: React.FC<{
  onSocialLogin: (providerId: string) => void;
}> = ({ onSocialLogin }) => (
  <div className="flex gap-4 mb-4 max-w-[310px]">
    {SOCIAL_PROVIDERS.map((provider) => (
      <SocialButton
        key={provider.id}
        provider={provider}
        onClick={onSocialLogin}
      />
    ))}
  </div>
);
