import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CalendarIcon, MapPin, Search } from "lucide-react"
import { HallCard } from "@/components/hall-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SearchHalls() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Location</h3>
                  <div className="flex items-center rounded-md border px-3 py-2">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="City or area"
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
                        <span>Select date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Event Type</h3>
                  <Select>
                    <SelectTrigger>
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
                  <h3 className="font-medium">Guest Count</h3>
                  <Select>
                    <SelectTrigger>
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

                <div className="space-y-2">
                  <h3 className="font-medium">Price Range (₹)</h3>
                  <div className="pt-4 pb-2">
                    <Slider defaultValue={[20000]} max={100000} step={1000} />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹5,000</span>
                    <span>₹100,000</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    {["AC", "Parking", "Catering", "Decoration", "DJ & Sound", "WiFi"].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={`amenity-${amenity}`} />
                        <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Marriage Halls</h1>
            <Select defaultValue="recommended">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HallCard
              name="Grand Celebration Palace"
              location="Downtown, City Center"
              image="/placeholder.svg?height=400&width=600"
              price={25000}
              rating={4.8}
              reviewCount={324}
              capacity={500}
              tags={["AC", "Parking", "Catering"]}
            />
            <HallCard
              name="Royal Wedding Manor"
              location="Westside, Garden Area"
              image="/placeholder.svg?height=400&width=600"
              price={35000}
              rating={4.9}
              reviewCount={512}
              capacity={800}
              tags={["AC", "Parking", "Decoration"]}
            />
            <HallCard
              name="Elegant Celebration Center"
              location="Riverside, Lake View"
              image="/placeholder.svg?height=400&width=600"
              price={18000}
              rating={4.7}
              reviewCount={287}
              capacity={300}
              tags={["AC", "Catering", "DJ"]}
            />
            <HallCard
              name="Majestic Event Hall"
              location="North Hills, Mountain View"
              image="/placeholder.svg?height=400&width=600"
              price={22000}
              rating={4.6}
              reviewCount={198}
              capacity={400}
              tags={["AC", "Parking", "WiFi"]}
            />
            <HallCard
              name="Golden Moments Banquet"
              location="South Side, Park Avenue"
              image="/placeholder.svg?height=400&width=600"
              price={28000}
              rating={4.5}
              reviewCount={256}
              capacity={600}
              tags={["AC", "Decoration", "Catering"]}
            />
            <HallCard
              name="Silver Jubilee Hall"
              location="East End, River Road"
              image="/placeholder.svg?height=400&width=600"
              price={15000}
              rating={4.4}
              reviewCount={175}
              capacity={250}
              tags={["Parking", "DJ", "WiFi"]}
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-1">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
