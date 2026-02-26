import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Info, Map, Shield } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: "calendar" | "info" | "map" | "shield"
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "calendar":
        return <Calendar className="h-10 w-10 text-primary" />
      case "info":
        return <Info className="h-10 w-10 text-primary" />
      case "map":
        return <Map className="h-10 w-10 text-primary" />
      case "shield":
        return <Shield className="h-10 w-10 text-primary" />
      default:
        return <Info className="h-10 w-10 text-primary" />
    }
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-secondary text-secondary-foreground">
          <IconComponent />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
