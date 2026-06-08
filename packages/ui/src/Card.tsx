import type { HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children, className, ...rest }: CardProps) {
  return (
    <div className={["htt-card", className].filter(Boolean).join(" ")} {...rest}>
      {title ? <h3 className="htt-card__title">{title}</h3> : null}
      <div className="htt-card__body">{children}</div>
    </div>
  );
}
