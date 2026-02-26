import type * as React from "react"
import { cn } from "@/lib/utils"

interface GradientCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: "primary" | "accent" | "secondary" | "custom"
  customGradient?: string
  children: React.ReactNode
}

export function GradientCard({
  gradient = "primary",
  customGradient,
  className,
  children,
  ...props
}: GradientCardProps) {
  const gradientStyles = {
    primary: "from-primary/50 to-secondary/50",
    accent: "from-accent/50 to-primary/50",
    secondary: "from-secondary/50 to-accent/50",
    custom: customGradient || "from-primary/50 to-secondary/50",
  }

  return (
    <div
      className={cn(
        "relative rounded-lg p-[1px] overflow-hidden",
        `bg-gradient-to-br ${gradientStyles[gradient]}`,
        className,
      )}
      {...props}
    >
      <div className="rounded-[calc(0.5rem-1px)] bg-background p-5 h-full">{children}</div>
    </div>
  )
}
