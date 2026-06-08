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
  label = "Analyze scan",
}: CtaBannerProps) {
  return (
    <section className="container pb-16 md:pb-20">
      <div className="clinical-card-accent flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h2 className="text-xl font-medium leading-snug text-foreground md:text-2xl">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground md:text-[15px]">
              {description}
            </p>
          )}
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href={href}>
            {label}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
