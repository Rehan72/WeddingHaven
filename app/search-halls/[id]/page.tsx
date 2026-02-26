"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Star, Calendar, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import api, { type Hall } from "@/services/api"
import Link from "next/link"

export default function HallDetails() {
  const { id } = useParams()
  const [hall, setHall] = useState<Hall | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchHall = async () => {
      try {
        setLoading(true)
        const data = await api.getHallById(id as string)
        setHall(data)
      } catch (error) {
        console.error("Failed to fetch hall details:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchHall()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading hall details...</p>
      </div>
    )
  }

  if (!hall) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold">Hall not found</h2>
        <p className="text-muted-foreground mt-2">The hall you are looking for does not exist or has been removed.</p>
        <Link href="/search-halls" className="text-primary hover:underline mt-4 inline-block">
          Back to search
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Link href="/search-halls" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Images and Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
              <Image
                src={hall.images[activeImage]?.url || "/placeholder.svg?height=600&width=1000"}
                alt={hall.name}
                fill
                className="object-cover"
              />
            </div>
            {hall.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {hall.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={`${hall.name} - ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title and Rating */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{hall.name}</h1>
              <div className="flex items-center text-muted-foreground mt-2">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                <span>{hall.location.address}, {hall.location.city}, {hall.location.state}</span>
              </div>
            </div>
            <div className="flex items-center bg-primary/5 px-4 py-2 rounded-lg border border-primary/20">
              <div className="flex items-center mr-3">
                <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                <span className="text-xl font-bold">{hall.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm border-l pl-3 border-primary/20">
                {hall.reviewCount} Reviews
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Users className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Capacity</span>
                <span className="font-bold">{hall.capacity} Guests</span>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Badge variant="secondary" className="mb-2">Available</Badge>
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-bold capitalize">{hall.status}</span>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm text-muted-foreground">Price Type</span>
                <span className="font-bold capitalize">{hall.priceType.replace("_", " ")}</span>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-6 w-6 flex items-center justify-center mb-2">
                  <span className="font-bold text-primary">₹</span>
                </div>
                <span className="text-sm text-muted-foreground">Starting Price</span>
                <span className="font-bold text-lg">₹{hall.price.toLocaleString()}</span>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4">
              <h3 className="text-xl font-bold">About this Hall</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {hall.description}
              </p>
            </TabsContent>
            <TabsContent value="amenities" className="space-y-4">
              <h3 className="text-xl font-bold">What this place offers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hall.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg border">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="location" className="space-y-4">
              <h3 className="text-xl font-bold">Where you'll be</h3>
              <div className="bg-muted/30 aspect-video rounded-lg flex items-center justify-center border border-dashed border-primary/30">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="font-medium">{hall.location.address}</p>
                  <p className="text-muted-foreground">{hall.location.city}, {hall.location.state} - {hall.location.pincode}</p>
                  <Badge variant="outline" className="mt-4">Google Maps Integration Coming Soon</Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
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
    </div>
  )
}
