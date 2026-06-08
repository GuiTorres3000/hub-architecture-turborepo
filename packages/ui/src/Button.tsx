import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "htt-btn htt-btn--primary",
  secondary: "htt-btn htt-btn--secondary",
  ghost: "htt-btn htt-btn--ghost",
};

export function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {
  return (
    <button className={[VARIANT_CLASS[variant], className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </button>
  );
}
