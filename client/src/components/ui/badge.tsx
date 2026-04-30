import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary/10 text-primary shadow-[0_0_28px_-16px_hsl(var(--primary)_/_0.8)]",
        secondary:
          "border-border bg-secondary text-secondary-foreground",
        success:
          "border-success/40 bg-success/10 text-success",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
