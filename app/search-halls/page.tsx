"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, MapPin, Search, Loader2 } from "lucide-react"
import { HallCard } from "@/components/hall-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import api, { type Hall } from "@/services/api"
import { format } from "date-fns"

export default function SearchHalls() {
  const [halls, setHalls] = useState<Hall[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [eventType, setEventType] = useState("all")
  const [guestCount, setGuestCount] = useState("all")
  const [priceRange, setPriceRange] = useState([50000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 })

  const fetchHalls = useCallback(async () => {
    try {
      setLoading(true)
      const params: any = {
        page: pagination.page,
        limit: 12,
      }

      if (search) params.search = search
      if (city) params.city = city
      if (priceRange[0]) params.maxPrice = priceRange[0]
      if (eventType !== "all") params.eventType = eventType
      if (selectedAmenities.length > 0) params.amenities = selectedAmenities.join(",")
      
      if (sortBy !== "recommended") {
        params.sort = sortBy === "price-low" ? "price_asc" : 
                      sortBy === "price-high" ? "price_desc" : 
                      sortBy === "rating" ? "rating" : 
                      sortBy === "capacity" ? "capacity" : undefined
      }

      const response = await api.getHalls(params)
      setHalls(response.halls)
      setPagination(prev => ({ ...prev, totalPages: response.pagination.pages }))
    } catch (error) {
      console.error("Failed to fetch halls:", error)
    } finally {
      setLoading(false)
    }
  }, [pagination.page, search, city, eventType, priceRange, selectedAmenities, sortBy])

  useEffect(() => {
    fetchHalls()
  }, [fetchHalls])

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    )
  }

  const handleApplyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }))
    fetchHalls()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Search</h3>
                  <div className="flex items-center rounded-md border px-3 py-2">
                    <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Hall name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Location</h3>
                  <div className="flex items-center rounded-md border px-3 py-2">
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
                  <h3 className="font-medium">Event Date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{date ? format(date, "PPP") : "Select date"}</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Guest Count</h3>
                  <Select value={guestCount} onValueChange={setGuestCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Guest count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Capacity</SelectItem>
                      <SelectItem value="100">Up to 100</SelectItem>
                      <SelectItem value="200">Up to 200</SelectItem>
                      <SelectItem value="500">Up to 500</SelectItem>
                      <SelectItem value="1000">Up to 1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Max Price: ₹{priceRange[0].toLocaleString()}</h3>
                  <div className="pt-4 pb-2">
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange} 
                      max={200000} 
                      step={1000} 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    {["AC", "Parking", "Catering", "Decoration", "DJ & Sound", "WiFi"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`amenity-${amenity}`} 
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">
              {loading ? "Searching Halls..." : `${halls.length} Marriage Halls Found`}
            </h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="capacity">Largest Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground font-medium">Loading marriage halls...</p>
            </div>
          ) : halls.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {halls.map((hall) => (
                <HallCard
                  key={hall._id}
                  id={hall._id}
                  name={hall.name}
                  location={`${hall.location.address}, ${hall.location.city}`}
                  image={hall.images[0]?.url}
                  price={hall.price}
                  rating={hall.rating}
                  reviewCount={hall.reviewCount}
                  capacity={hall.capacity}
                  tags={hall.amenities}
                />
              ))}
            </div>
          ) : (
            <Card className="flex flex-col items-center justify-center py-24 border-dashed">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">No halls found</h3>
              <p className="text-muted-foreground max-w-xs text-center mt-2">
                We couldn't find any marriage halls matching your criteria. Try adjusting your filters.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setSearch("")
                  setCity("")
                  setPriceRange([200000])
                  setSelectedAmenities([])
                  setEventType("all")
                  setGuestCount("all")
                  setPagination(prev => ({ ...prev, page: 1 }))
                }}
              >
                Clear All Filters
              </Button>
            </Card>
          )}

          {pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <Button 
                variant="outline" 
                disabled={pagination.page === 1}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              >
                Previous
              </Button>
              {Array.from({ length: pagination.totalPages }).map((_, i) => (
                <Button 
                  key={i}
                  variant={pagination.page === i + 1 ? "default" : "outline"} 
                  onClick={() => setPagination(prev => ({ ...prev, page: i + 1 }))}
                >
                  {i + 1}
                </Button>
              ))}
              <Button 
                variant="outline" 
                disabled={pagination.page === pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
