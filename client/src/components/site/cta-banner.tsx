import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CtaBannerProps = {
  title: string;
  description?: string;
  href?: string;
  label?: string;
};

export function CtaBanner({
  title,
  description,
  href = "/test",
  label = "Open analyzer",
}: CtaBannerProps) {
  return (
    <section className="container pb-16 md:pb-20">
      <div className="rounded-xl border border-border bg-card p-8 md:flex md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              {description}
            </p>
          )}
        </div>
        <Button asChild size="lg" className="mt-6 shrink-0 md:mt-0">
          <Link href={href}>
            {label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
