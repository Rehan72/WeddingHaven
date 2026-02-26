import React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: {
    id: string
    label: string
    description?: string
  }[]
  activeStep: number
  orientation?: "horizontal" | "vertical"
}

export function Stepper({ steps, activeStep, orientation = "horizontal", className, ...props }: StepperProps) {
  return (
    <div
      className={cn("w-full", orientation === "vertical" ? "flex flex-col space-y-2" : "flex flex-row", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep
        const isCurrent = index === activeStep
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={step.id}>
            <div className={cn("flex", orientation === "vertical" ? "flex-row items-start" : "flex-col items-center")}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold",
                    isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {orientation === "vertical" && (
                  <div className={cn("ml-4 mt-1", isLast ? "hidden" : "flex h-6 w-0.5 bg-muted-foreground/30")} />
                )}
              </div>
              <div
                className={cn(
                  "mt-2 text-center",
                  orientation === "vertical" ? "ml-4" : "",
                  isCompleted ? "text-foreground" : isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                <div className="text-sm font-medium">{step.label}</div>
                {step.description && <div className="text-xs hidden md:block">{step.description}</div>}
              </div>
            </div>
            {!isLast && orientation === "horizontal" && (
              <div
                className={cn(
                  "flex-1 border-t-2 transition-colors duration-200 ease-in-out mt-4",
                  isCompleted ? "border-primary" : "border-muted-foreground/30",
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
