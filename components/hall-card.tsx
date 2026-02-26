import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HallCardProps {
  id: string
  name: string
  location: string
  image: string
  price: number
  rating: number
  reviewCount: number
  capacity: number
  tags: string[]
}

export function HallCard({ id, name, location, image, price, rating, reviewCount, capacity, tags }: HallCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link href={`/search-halls/${id}`} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center shadow-sm">
          <Star className="h-3 w-3 fill-primary text-primary mr-1" />
          {rating}
        </div>
      </Link>
      <CardContent className="p-4 flex-1">
        <Link href={`/search-halls/${id}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
        </Link>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center text-muted-foreground mt-1">
          <Users className="h-3 w-3 mr-1" />
          <span className="text-sm">Up to {capacity} guests</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          <span>{reviewCount} reviews</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="font-bold text-lg">₹{price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm"> / day</span>
        </div>
        <Button size="sm" asChild>
          <Link href={`/search-halls/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
