import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  tone?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
};

const toneClassName: Record<NonNullable<ButtonProps["tone"]>, string> = {
  primary:
    "bg-ink text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#3a2232] focus-visible:outline-blush",
  secondary:
    "bg-white/85 text-berry ring-1 ring-rose/80 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-blush",
  ghost:
    "bg-transparent text-berry ring-1 ring-transparent hover:bg-white/50 focus-visible:outline-blush",
};

export function Button({
  children,
  className = "",
  fullWidth = true,
  tone = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex min-h-14 items-center justify-center rounded-full px-6 text-base font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        toneClassName[tone],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
