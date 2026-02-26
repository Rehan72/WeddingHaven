"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter } from "lucide-react"
import { HallCard } from "@/components/hall-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function ViewAllHalls() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([20000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Mock data - in a real app, this would come from an API
  const halls = [
    {
      id: 1,
      name: "Grand Celebration Palace",
      location: "Downtown, City Center",
      image: "/placeholder.svg?height=400&width=600",
      price: 25000,
      rating: 4.8,
      reviewCount: 324,
      capacity: 500,
      tags: ["AC", "Parking", "Catering"],
    },
    {
      id: 2,
      name: "Royal Wedding Manor",
      location: "Westside, Garden Area",
      image: "/placeholder.svg?height=400&width=600",
      price: 35000,
      rating: 4.9,
      reviewCount: 512,
      capacity: 800,
      tags: ["AC", "Parking", "Decoration"],
    },
    {
      id: 3,
      name: "Elegant Celebration Center",
      location: "Riverside, Lake View",
      image: "/placeholder.svg?height=400&width=600",
      price: 18000,
      rating: 4.7,
      reviewCount: 287,
      capacity: 300,
      tags: ["AC", "Catering", "DJ"],
    },
    {
      id: 4,
      name: "Majestic Event Hall",
      location: "North Hills, Mountain View",
      image: "/placeholder.svg?height=400&width=600",
      price: 22000,
      rating: 4.6,
      reviewCount: 198,
      capacity: 400,
      tags: ["AC", "Parking", "WiFi"],
    },
    {
      id: 5,
      name: "Golden Moments Banquet",
      location: "South Side, Park Avenue",
      image: "/placeholder.svg?height=400&width=600",
      price: 28000,
      rating: 4.5,
      reviewCount: 256,
      capacity: 600,
      tags: ["AC", "Decoration", "Catering"],
    },
    {
      id: 6,
      name: "Silver Jubilee Hall",
      location: "East End, River Road",
      image: "/placeholder.svg?height=400&width=600",
      price: 15000,
      rating: 4.4,
      reviewCount: 175,
      capacity: 250,
      tags: ["Parking", "DJ", "WiFi"],
    },
    {
      id: 7,
      name: "Crystal Garden Venue",
      location: "Garden District, Flower Road",
      image: "/placeholder.svg?height=400&width=600",
      price: 32000,
      rating: 4.7,
      reviewCount: 210,
      capacity: 450,
      tags: ["AC", "Decoration", "Catering", "Parking"],
    },
    {
      id: 8,
      name: "Sunset View Banquet",
      location: "Hilltop, Sunset Boulevard",
      image: "/placeholder.svg?height=400&width=600",
      price: 27000,
      rating: 4.6,
      reviewCount: 189,
      capacity: 350,
      tags: ["AC", "Parking", "DJ", "WiFi"],
    },
    {
      id: 9,
      name: "Heritage Celebration Hall",
      location: "Old Town, Heritage Street",
      image: "/placeholder.svg?height=400&width=600",
      price: 30000,
      rating: 4.8,
      reviewCount: 276,
      capacity: 550,
      tags: ["AC", "Catering", "Decoration", "Parking"],
    },
  ]

  // Filter and sort halls
  const filteredHalls = halls
    .filter((hall) => {
      // Filter by search query
      if (
        searchQuery &&
        !hall.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !hall.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by price
      if (hall.price > priceRange[0]) {
        return false
      }

      // Filter by amenities
      if (selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = selectedAmenities.every((amenity) => hall.tags.includes(amenity))
        if (!hasAllSelectedAmenities) {
          return false
        }
      }

      return true
    })
    .sort((a, b) => {
      // Sort based on selected option
      switch (sortOption) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "capacity":
          return b.capacity - a.capacity
        default:
          return 0 // recommended - keep original order
      }
    })

  // Pagination
  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredHalls.length / itemsPerPage)
  const paginatedHalls = filteredHalls.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([20000])
    setSelectedAmenities([])
    setSortOption("recommended")
    setCurrentPage(1)
  }

  const amenitiesList = ["AC", "Parking", "Catering", "Decoration", "DJ & Sound", "WiFi"]

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-medium">Price Range (₹)</h3>
        <div className="pt-4 pb-2">
          <Slider defaultValue={[20000]} max={100000} step={1000} value={priceRange} onValueChange={setPriceRange} />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹5,000</span>
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹100,000</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">Amenities</h3>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={`amenity-${amenity}`}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="w-full" onClick={() => setCurrentPage(1)}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">All Marriage Halls</h1>
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              <FiltersContent />
            </SheetContent>
          </Sheet>
        ) : null}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters sidebar - desktop */}
        {!isMobile && (
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                <FiltersContent />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="capacity">Capacity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paginatedHalls.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No halls found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedHalls.map((hall) => (
                  <HallCard
                    key={hall.id}
                    name={hall.name}
                    location={hall.location}
                    image={hall.image}
                    price={hall.price}
                    rating={hall.rating}
                    reviewCount={hall.reviewCount}
                    capacity={hall.capacity}
                    tags={hall.tags}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="mx-1"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className="mx-1"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="mx-1"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
