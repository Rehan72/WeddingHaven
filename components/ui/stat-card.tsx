import type * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cva, type VariantProps } from "class-variance-authority"

const statCardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      primary: "border-primary/20 dark:border-primary/30",
      accent: "border-accent/20 dark:border-accent/30",
      secondary: "border-secondary-foreground/20 dark:border-secondary-foreground/30",
    },
    iconVariant: {
      default: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
      secondary: "text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
    iconVariant: "default",
  },
})

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function StatCard({
  className,
  variant,
  iconVariant,
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn(statCardVariants({ variant }), className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className={cn(statCardVariants({ iconVariant }))}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && trendValue && (
          <div
            className={cn("mt-1 text-xs", {
              "text-green-600 dark:text-green-400": trend === "up",
              "text-red-600 dark:text-red-400": trend === "down",
              "text-muted-foreground": trend === "neutral",
            })}
          >
            <span
              className={cn("mr-1", {
                "inline-block rotate-45": trend === "up",
                "inline-block -rotate-45": trend === "down",
              })}
            >
              {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
            </span>
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
