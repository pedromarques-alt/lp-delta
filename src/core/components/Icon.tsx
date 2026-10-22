import type { IconName } from "../types";

const paths: Record<IconName, React.ReactNode> = {
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  profile: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M4 19c0-3 2.5-5 5-5M20 19c0-3-2.5-5-5-5M9 19h6" />
    </>
  ),
  bank: (
    <>
      <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M3 9.5h18" />
    </>
  ),
  docs: (
    <>
      <path d="M7 3h8l4 4v14H7z" />
      <path d="M10 11h6M10 14h6M10 17h4" />
    </>
  ),
  house: <path d="M3 11l9-7 9 7v9h-6v-6H9v6H3z" fill="currentColor" stroke="none" />,
  build: (
    <>
      <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
    </>
  ),
  transfer: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
