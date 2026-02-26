import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, CheckCircle } from "lucide-react"

interface HowItWorksCardProps {
  step: number
  title: string
  description: string
  icon: "search" | "calendar" | "check"
}

export function HowItWorksCard({ step, title, description, icon }: HowItWorksCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "search":
        return <Search className="h-8 w-8 text-accent" />
      case "calendar":
        return <Calendar className="h-8 w-8 text-accent" />
      case "check":
        return <CheckCircle className="h-8 w-8 text-accent" />
      default:
        return <Search className="h-8 w-8 text-accent" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-secondary relative">
          <IconComponent />
          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {step}
          </div>
        </div>
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
