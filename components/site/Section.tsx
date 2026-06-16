import type { ReactNode } from "react";
import { SiteContainer } from "@/components/site/SiteContainer";

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "dark",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section-pad ${tone === "light" ? "bg-[var(--foreground)] text-black" : ""} ${className}`}
    >
      <SiteContainer>
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section-title mt-4">{title}</h2> : null}
            {description ? (
              <p className={`mt-5 text-lg leading-8 ${tone === "light" ? "text-black/62" : "text-white/62"}`}>
                {description}
              </p>
            ) : null}
          </div>
        )}
        {children}
      </SiteContainer>
    </section>
  );
}
