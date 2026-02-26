"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarIcon,
  CheckCircle,
  ChevronRight,
  MapPin,
  Search,
  Users,
  Utensils,
  Music,
  Camera,
  Gift,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HallCard } from "@/components/hall-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { FeatureCard } from "@/components/feature-card"
import { HowItWorksCard } from "@/components/how-it-works-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function Home() {
  const router = useRouter()
  const [city, setCity] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [eventType, setEventType] = useState("wedding")
  const [guestCount, setGuestCount] = useState("100")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.append("city", city)
    if (date) params.append("date", date.toISOString())
    if (eventType) params.append("eventType", eventType)
    if (guestCount) params.append("minCapacity", guestCount)
    
    router.push(`/search-halls?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1920"
              alt="Luxury wedding hall"
              fill
              className="object-cover brightness-[0.6]"
              priority
            />
          </div>
          <div className="container relative z-10 py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl space-y-5 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Find Your Perfect Wedding Venue
              </h1>
              <p className="text-lg md:text-xl">
                Discover and book the ideal marriage hall for your special day with our comprehensive booking platform
              </p>
            </div>
            <div className="mt-8 md:mt-12">
              <Card className="w-full max-w-4xl shadow-2xl">
                <CardContent className="p-4 md:p-6">
                  <Tabs defaultValue="halls" className="w-full">
                    <TabsList className="mb-4 grid w-full grid-cols-3">
                      <TabsTrigger value="halls">Marriage Halls</TabsTrigger>
                      <TabsTrigger value="banquets">Banquet Halls</TabsTrigger>
                      <TabsTrigger value="venues">Event Venues</TabsTrigger>
                    </TabsList>
                    <TabsContent value="halls" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <div className="flex items-center rounded-md border px-3 py-2 bg-background">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="text"
                              placeholder="City or area"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Event Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal bg-background">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                <span>{date ? format(date, "PPP") : "Select date"}</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Event Type</label>
                          <Select value={eventType} onValueChange={setEventType}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select event type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="reception">Reception</SelectItem>
                              <SelectItem value="engagement">Engagement</SelectItem>
                              <SelectItem value="birthday">Birthday</SelectItem>
                              <SelectItem value="corporate">Corporate Event</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Guests</label>
                          <Select value={guestCount} onValueChange={setGuestCount}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Guest count" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="50">Up to 50</SelectItem>
                              <SelectItem value="100">50-100</SelectItem>
                              <SelectItem value="200">100-200</SelectItem>
                              <SelectItem value="300">200-300</SelectItem>
                              <SelectItem value="500">300-500</SelectItem>
                              <SelectItem value="1000">500+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full md:w-auto h-11 px-8" onClick={handleSearch}>
                        <Search className="mr-2 h-4 w-4" />
                        Search Halls
                      </Button>
                    </TabsContent>
                    <TabsContent value="banquets">
                      <div className="flex items-center justify-center py-12">
                        <p className="text-center text-muted-foreground">Banquet hall search coming soon</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="venues">
                      <div className="flex items-center justify-center py-12">
                        <p className="text-center text-muted-foreground">Event venue search coming soon</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Featured Marriage Halls</h2>
              <p className="text-muted-foreground">
                Explore our handpicked selection of premium marriage halls for your special occasion
              </p>
            </div>

            <FeaturedHalls />

            <div className="mt-10 flex justify-center">
              <Button variant="outline" className="flex items-center" asChild>
                <Link href="/search-halls">
                  View All Halls
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="text-muted-foreground">
                Our simple process makes booking a marriage hall quick and hassle-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <HowItWorksCard
                step={1}
                title="Search & Compare"
                description="Browse through our extensive collection of marriage halls and filter based on your preferences"
                icon="search"
              />
              <HowItWorksCard
                step={2}
                title="Book Your Slot"
                description="Select your preferred date and time, and submit your booking request"
                icon="calendar"
              />
              <HowItWorksCard
                step={3}
                title="Confirm & Celebrate"
                description="Receive confirmation from the hall owner and get ready for your special day"
                icon="check"
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Platform Features</h2>
              <p className="text-muted-foreground">
                Our comprehensive platform offers benefits for both hall owners and users
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                title="Real-time Availability"
                description="Check hall availability in real-time and book instantly"
                icon="calendar"
              />
              <FeatureCard
                title="Detailed Hall Information"
                description="View comprehensive details including amenities, capacity, and pricing"
                icon="info"
              />
              <FeatureCard
                title="Location Mapping"
                description="Find halls with precise Google Maps integration"
                icon="map"
              />
              <FeatureCard
                title="Secure Booking"
                description="Book with confidence through our secure platform"
                icon="shield"
              />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted/30 rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">For Hall Owners</h3>
                <ul className="space-y-3">
                  {[
                    "Manage hall details and availability",
                    "Receive and respond to booking requests",
                    "Update pricing and amenities information",
                    "Track bookings and manage schedule",
                    "Communicate with customers directly",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4">For Users</h3>
                <ul className="space-y-3">
                  {[
                    "Search for halls based on preferences",
                    "View detailed hall information and photos",
                    "Check real-time availability of slots",
                    "Submit booking requests easily",
                    "Track booking status and history",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Popular Amenities</h2>
              <p className="text-muted-foreground">Find halls with all the amenities you need for your perfect event</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: <Users className="h-6 w-6" />, name: "Large Capacity" },
                { icon: <Utensils className="h-6 w-6" />, name: "Catering Services" },
                { icon: <Music className="h-6 w-6" />, name: "DJ & Sound" },
                { icon: <Camera className="h-6 w-6" />, name: "Photography" },
                { icon: <Gift className="h-6 w-6" />, name: "Decoration" },
                { icon: <Heart className="h-6 w-6" />, name: "Wedding Planning" },
              ].map((amenity, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">{amenity.icon}</div>
                    <h3 className="font-medium">{amenity.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
              <p className="text-muted-foreground">
                Read testimonials from people who have used our platform to book their perfect venue
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialCard
                name="Priya Sharma"
                role="Bride"
                image="/placeholder.svg?height=100&width=100"
                rating={5}
                text="Finding the perfect wedding hall was so easy with this platform. We booked Grand Celebration Palace and everything was exactly as described. Highly recommend!"
              />
              <TestimonialCard
                name="Rahul Verma"
                role="Event Organizer"
                image="/placeholder.svg?height=100&width=100"
                rating={5}
                text="As an event organizer, this platform has made my job so much easier. The detailed information about each hall helps me make the right recommendations to my clients."
              />
              <TestimonialCard
                name="Anita Patel"
                role="Hall Owner"
                image="/placeholder.svg?height=100&width=100"
                rating={4}
                text="Since listing my marriage hall on this platform, my bookings have increased significantly. The system is easy to use and helps me manage my schedule efficiently."
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-accent text-accent-foreground">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Find Your Perfect Venue?</h2>
              <p className="text-accent-foreground/90">
                Join thousands of satisfied users who have found their ideal marriage hall through our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Register as User
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-accent-foreground border-accent-foreground/20 hover:bg-accent-foreground/10"
                >
                  List Your Hall
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeaturedHalls() {
  const [halls, setHalls] = useState<Hall[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await api.getHalls({ limit: 3, sort: "rating" })
        setHalls(response.halls)
      } catch (error) {
        console.error("Failed to fetch featured halls:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  if (halls.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
        <p className="text-muted-foreground">No featured halls available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {halls.map((hall) => (
        <HallCard
          key={hall._id}
          id={hall._id}
          name={hall.name}
          location={`${hall.location.city}, ${hall.location.state}`}
          image={hall.images[0]?.url}
          price={hall.price}
          rating={hall.rating}
          reviewCount={hall.reviewCount}
          capacity={hall.capacity}
          tags={hall.amenities}
        />
      ))}
    </div>
  )
}

