"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { MapPin, Users, Star, Heart, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import api, { type Hall } from "@/services/api"
import { BookingForm } from "@/components/booking-form"

export default function HallDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hall, setHall] = useState<Hall | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchHall = async () => {
      try {
        setLoading(true)
        const data = await api.getHallById(params.id as string)
        setHall(data)

        // Check if hall is in favorites
        try {
          const favorites = await api.getFavorites()
          setIsFavorite(favorites.some((fav: any) => fav._id === data._id))
        } catch (error) {
          // User might not be logged in, ignore
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load hall details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHall()
  }, [params.id])

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.removeFromFavorites(hall?._id as string)
        setIsFavorite(false)
        toast({
          title: "Success",
          description: "Removed from favorites",
        })
      } else {
        await api.addToFavorites(hall?._id as string)
        setIsFavorite(true)
        toast({
          title: "Success",
          description: "Added to favorites",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "You need to be logged in to manage favorites",
        variant: "destructive",
      })
    }
  }

  const shareHall = () => {
    if (navigator.share) {
      navigator
        .share({
          title: hall?.name,
          text: `Check out this amazing venue: ${hall?.name}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Hall link copied to clipboard",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/halls">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="aspect-video bg-muted animate-pulse rounded-lg"></div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 w-32 bg-muted animate-pulse rounded-md flex-shrink-0"></div>
              ))}
            </div>
            <div className="h-8 w-48 bg-muted animate-pulse rounded-md"></div>
            <div className="h-32 w-full bg-muted animate-pulse rounded-md"></div>
          </div>

          <div>
            <div className="h-96 w-full bg-muted animate-pulse rounded-md"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!hall) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">Hall Not Found</h2>
        <p className="text-muted-foreground mb-6">The hall you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/dashboard/halls">Back to All Halls</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/halls">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{hall.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleFavorite}>
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" onClick={shareHall}>
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {/* Main image */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={selectedImage || hall.images[0]?.url || "/placeholder.svg?height=600&width=1200"}
              alt={hall.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 right-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">View All Photos</Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>All Photos</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {hall.images.map((image, index) => (
                      <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                        <Image
                          src={image.url || "/placeholder.svg?height=300&width=500"}
                          alt={image.caption || `${hall.name} image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {hall.images.slice(0, 5).map((image, index) => (
              <div
                key={index}
                className="relative h-20 w-32 rounded-md overflow-hidden cursor-pointer flex-shrink-0"
                onClick={() => setSelectedImage(image.url)}
              >
                <Image
                  src={image.url || "/placeholder.svg?height=80&width=128"}
                  alt={image.caption || `${hall.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">
                {hall.location.address}, {hall.location.city}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-muted-foreground">Up to {hall.capacity} guests</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-muted-foreground">
                {hall.rating} ({hall.reviewCount} reviews)
              </span>
            </div>
            <div>
              <Badge variant="outline">₹{hall.price.toLocaleString()} / day</Badge>
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <div className="prose max-w-none">
                <p>{hall.description}</p>
              </div>
            </TabsContent>
            <TabsContent value="amenities" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hall.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="location" className="mt-4">
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map will be displayed here</span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground">
                  {hall.location.address}, {hall.location.city}, {hall.location.state} - {hall.location.pincode}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <div className="text-3xl font-bold">{hall.rating}</div>
                    <div className="text-sm text-muted-foreground">out of 5</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{hall.reviewCount} reviews</div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(hall.rating) ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews will be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <BookingForm
            hallId={hall._id}
            hallName={hall.name}
            price={hall.price}
            capacity={hall.capacity}
            priceType={hall.priceType}
          />
        </div>
      </div>
    </div>
  )
}
