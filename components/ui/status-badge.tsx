import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      variant: {
        confirmed:
          "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/20",
        pending:
          "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-500/20",
        cancelled: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/20",
        completed:
          "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-500/20",
        active: "bg-primary/10 text-primary ring-primary/20 dark:bg-primary/20 dark:text-primary dark:ring-primary/30",
        inactive: "bg-muted text-muted-foreground ring-muted-foreground/20",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  },
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  withDot?: boolean
}

export function StatusBadge({ className, variant, withDot = false, children, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {withDot && (
        <div
          className={cn("mr-1 h-1.5 w-1.5 rounded-full", {
            "bg-green-500": variant === "confirmed",
            "bg-yellow-500": variant === "pending",
            "bg-red-500": variant === "cancelled",
            "bg-blue-500": variant === "completed",
            "bg-primary": variant === "active",
            "bg-muted-foreground": variant === "inactive",
          })}
        />
      )}
      {children}
    </div>
  )
}
