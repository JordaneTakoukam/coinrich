import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8", className)}
    >
      <div className={cn("mx-auto", fullWidth ? "max-w-full" : "max-w-7xl")}>
        {children}
      </div>
    </section>
  );
}
