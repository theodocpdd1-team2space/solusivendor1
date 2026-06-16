import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] hover:border-white hover:bg-white hover:text-black",
  secondary:
    "border border-white/14 bg-white/[0.035] text-white hover:border-white/30 hover:bg-white hover:text-black",
  ghost:
    "border border-transparent text-[var(--muted-foreground)] hover:border-white/14 hover:text-white",
};

export function SiteButton({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`;

  if (href.startsWith("http") || href.startsWith("https://wa.me")) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
