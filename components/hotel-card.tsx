import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"

interface HotelCardProps {
  name: string
  location: string
  image: string
  price: number
  rating: number
  reviewCount: number
}

export function HotelCard({ name, location, image, price, rating, reviewCount }: HotelCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          {rating}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          <span>{reviewCount} reviews</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">${price}</span>
          <span className="text-muted-foreground text-sm"> / night</span>
        </div>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  )
}
