const MODAL_CONFIG = {
  dimensions: {
    height: 650,
    maxWidth: "max-w-5xl",
    borderRadius: "rounded-2xl",
  },
  colors: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "#353535",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      muted: "text-gray-500",
      label: "text-gray-300",
    },
    error: "text-red-400",
    button: {
      primary: "bg-gray-200 hover:bg-white text-black",
      social:
        "bg-[rgba(255, 255, 255, 0.05)] hover:bg-[#222222] ease-in border-[#494848]",
    },
  },
  animations: {
    transition: "transition-all duration-300",
    focusGlow: "0 0 20px rgba(255, 255, 255, 0.15)",
    errorGlow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
  },
} as const;

const FORM_CONFIG = {
  validation: {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  messages: {
    errors: {
      invalidEmail: "You entered the wrong email",
      requiredEmail: "Email is required",
      requiredUsername: "Username is required",
    },
    placeholders: {
      email: "Your email address",
      username: "Enter unique username",
    },
    labels: {
      emailAddress: "Email Address",
      username: "Username",
    },
  },
  buttons: {
    continue: "Continue",
    reserve: "Reserve",
    back: "Back",
    divider: "OR",
  },
} as const;

const CONTENT_CONFIG = {
  email: {
    title: "Welcome to Hypernova",
    subtitle: "Pre-register for early access",
  },
  username: {
    title: "Choose Your Username",
    subtitle: "Set a unique username for your Hypernova profile",
  },
  access: {
    title: "You’re #42 in the Queue!",
    subtitle: "Check back soon for access",
  },
  footer:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit,\nsed do eiusmod tempor incididunt ut labore.",
} as const;

const SOCIAL_PROVIDERS = [
  {
    id: "telegram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
      >
        <path
          d="M5.74349 8.5338L5.5119 11.8842C5.84324 11.8842 5.98674 11.7378 6.15883 11.562L7.71228 10.035L10.9312 12.4596C11.5215 12.798 11.9375 12.6198 12.0967 11.901L14.2096 1.71784L14.2102 1.71724C14.3974 0.819642 13.8946 0.468644 13.3194 0.688843L0.899953 5.57942C0.052349 5.91782 0.0651826 6.40381 0.755866 6.62401L3.93103 7.63981L11.3063 2.89323C11.6534 2.65683 11.969 2.78763 11.7094 3.02403L5.74349 8.5338Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: "google",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
      >
        <g clipPath="url(#clip0_87_470)">
          <path
            d="M7.54092 10.5357H8.25009L8.4777 11.5932H7.43213"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.2429 9.53142L9.61555 9.59738L8.25019 10.5363L8.37058 4.89044L9.12019 3.05288L12.7611 1.625L13.3502 3.39661L12.8147 5.48562L12.8683 6.54313L12.5203 7.05037L13.2429 9.53142ZM13.2429 9.53142L12.5871 12.1624L9.90994 11.3427L8.4778 12.625H7.54102"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.5201 7.05095L9.96338 6.30583"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.8145 5.48516L13.2829 5.40585"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.2832 5.98746L12.8428 6.04026"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.31494 7.5101L10.807 7.45547"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.2017 9.56858L9.90997 11.3427L9.61558 9.59738L10.8069 7.45541L9.96358 6.30531L8.37061 4.89044L12.7611 1.625"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.25 10.5357L9.90985 11.3422"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.63184 8.8784L9.6307 8.51144L8.91776 8.14449L8.63184 8.8784Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.12029 3.05238H7.54102"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.55886 10.5357H6.84968L6.62207 11.5932H7.43188"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.85722 9.53142L5.4846 9.59738L6.84996 10.5363L6.72957 4.89044L5.97996 3.05288L2.3391 1.625L1.75 3.39661L2.28549 5.48562L2.23187 6.54313L2.57988 7.05037L1.85722 9.53142ZM1.85722 9.53142L2.5131 12.1624L5.19021 11.3427L6.62235 12.625H7.55914"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.58008 7.05095L5.13677 6.30583"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.28538 5.48516L1.81689 5.40585"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.81689 5.98746L2.25729 6.04026"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.78507 7.5101L4.29297 7.45547"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.89829 9.56858L5.18998 11.3427L5.48437 9.59738L4.29301 7.45541L5.13637 6.30531L6.72934 4.89044L2.33887 1.625"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.84979 10.5357L5.18994 11.3422"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.4681 8.8784L5.46924 8.51144L6.18217 8.14449L6.4681 8.8784Z"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.97998 3.05238H7.55925"
            stroke="white"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_87_470">
            <rect
              width="14"
              height="12"
              fill="white"
              transform="translate(0.75 0.625)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "github",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
      >
        <g clipPath="url(#clip0_87_493)">
          <path
            d="M3.81959 2.57456C6.26289 -0.0262781 10.2255 -0.0262781 12.6688 2.57456L12.9626 2.88549C13.0863 3.01574 13.0863 3.22582 12.9626 3.35607L11.9575 4.4275C11.8956 4.49053 11.799 4.49053 11.7371 4.4275L11.3312 3.99473C9.62629 2.1796 6.86211 2.1796 5.15722 3.99473L4.72423 4.45691C4.66237 4.51994 4.56572 4.51994 4.50387 4.45691L3.49485 3.38969C3.37113 3.25944 3.37113 3.04935 3.49485 2.9191L3.81959 2.57456ZM14.7487 4.78885L15.6456 5.74263C15.7693 5.87288 15.7693 6.08296 15.6456 6.21322L11.6057 10.5115C11.482 10.6418 11.2848 10.6418 11.1649 10.5115L8.30026 7.46112C8.26933 7.4275 8.21907 7.4275 8.18814 7.46112L5.32345 10.5115C5.19974 10.6418 5.00258 10.6418 4.88273 10.5115L0.842784 6.21322C0.719072 6.08296 0.719072 5.87288 0.842784 5.74263L1.73969 4.78885C1.8634 4.6586 2.06057 4.6586 2.18041 4.78885L5.0451 7.83927C5.07603 7.87288 5.12629 7.87288 5.15722 7.83927L8.02191 4.78885C8.14562 4.6586 8.34278 4.6586 8.46263 4.78885L11.3273 7.83927C11.3582 7.87288 11.4085 7.87288 11.4394 7.83927L14.3041 4.78885C14.4278 4.6586 14.625 4.6586 14.7487 4.78885Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_87_493">
            <rect
              width="15"
              height="10"
              fill="white"
              transform="translate(0.75 0.625)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "apple",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
      >
        <g clipPath="url(#clip0_87_498)">
          <path
            d="M7.06667 0.625C10.4182 0.625 13.1333 3.31033 13.1333 6.625C13.1333 9.93967 10.4182 12.625 7.06667 12.625C3.71517 12.625 1 9.93967 1 6.625C1 3.31033 3.71517 0.625 7.06667 0.625Z"
            fill="white"
          />
          <path
            d="M7.06925 8.73463C5.89097 8.73463 4.93648 7.79063 4.93648 6.6253C4.93648 5.45996 5.89097 4.51596 7.06925 4.51596C8.1262 4.51596 9.0025 5.27596 9.16967 6.2733H11.3186C11.138 4.10796 9.30448 2.40663 7.06925 2.40663C4.71539 2.40663 2.80371 4.2973 2.80371 6.6253C2.80371 8.9533 4.71539 10.844 7.06925 10.844C9.30448 10.844 11.138 9.14263 11.3186 6.9773H9.16697C8.9998 7.97463 8.1235 8.73463 7.06925 8.73463Z"
            fill="#1A1A1A"
          />
        </g>
        <defs>
          <clipPath id="clip0_87_498">
            <rect
              width="13"
              height="12"
              fill="white"
              transform="translate(0.25 0.625)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
] as const;
export { CONTENT_CONFIG, FORM_CONFIG, MODAL_CONFIG, SOCIAL_PROVIDERS };
