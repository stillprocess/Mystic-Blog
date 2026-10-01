"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type SharedProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
};

type StarBorderProps = SharedProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export function StarBorder({
  children,
  className = "",
  color = "white",
  speed = "6s",
  thickness = 3,
  ...props
}: StarBorderProps) {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="star-border-orbit absolute inset-0 rounded-[1.25rem]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, ${color} 50%, transparent 100%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="relative z-10 block rounded-[1.2rem] bg-[var(--background)] px-6 py-3"
        style={{ margin: thickness }}
      >
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a
        href={href}
        className={`focus-ring relative inline-block overflow-hidden rounded-[1.25rem] ${className}`}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={`focus-ring relative inline-block overflow-hidden rounded-[1.25rem] ${className}`}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
