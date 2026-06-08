"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
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
    <section className={cn("border-b border-border bg-card", className)}>
      <div
        className={cn(
          "container py-12 md:py-16",
          centered && "text-center"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(centered && "mx-auto max-w-3xl")}
        >
          {(badge || badgeLabel) && (
            <Badge variant="secondary" className="mb-4">
              {badge}
              {badgeLabel}
            </Badge>
          )}

          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-tight">
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-4 text-base leading-7 text-muted-foreground md:text-lg",
                centered ? "mx-auto max-w-2xl" : "max-w-2xl"
              )}
            >
              {description}
            </p>
          )}

          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
