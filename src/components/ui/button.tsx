import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-moss text-moss-fg hover:bg-moss-2",
        ink: "bg-ink text-paper hover:bg-ink-2",
        ghost:
          "bg-transparent text-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-ink)_16%,transparent)] hover:bg-paper-2",
        paper:
          "bg-paper text-ink hover:bg-paper-2",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
