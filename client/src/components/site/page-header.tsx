"use client";

import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  badge?: ReactNode;
  badgeLabel?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
  className?: string;
};

export function PageHeader({
  badge,
  badgeLabel,
  title,
  description,
  align = "left",
  children,
  className,
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <section className={cn("clinical-band", className)}>
      <div
        className={cn(
          "container py-11 md:py-14",
          centered && "text-center"
        )}
      >
        <div className={cn(centered && "mx-auto max-w-3xl")}>
          {(badge || badgeLabel) && (
            <Badge variant="secondary" className="mb-4">
              {badge}
              {badgeLabel}
            </Badge>
          )}

          <h1 className="text-3xl font-medium leading-snug text-foreground md:text-[2.5rem] md:leading-tight">
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-4 text-base leading-7 text-muted-foreground",
                centered ? "mx-auto max-w-2xl" : "max-w-2xl"
              )}
            >
              {description}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
