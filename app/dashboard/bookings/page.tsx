import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Search } from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  const bookings = [
    {
      id: "B001",
      hallName: "Grand Celebration Palace",
      location: "Downtown, City Center",
      date: "June 15, 2025",
      time: "6:00 PM - 11:00 PM",
      eventType: "Wedding",
      status: "confirmed",
      guestCount: 350,
      amount: "₹45,000",
    },
    {
      id: "B002",
      hallName: "Royal Wedding Manor",
      location: "Westside, Garden Area",
      date: "July 10, 2025",
      time: "5:00 PM - 10:00 PM",
      eventType: "Reception",
      status: "pending",
      guestCount: 250,
      amount: "₹35,000",
    },
    {
      id: "B003",
      hallName: "Elegant Celebration Center",
      location: "Riverside, Lake View",
      date: "August 5, 2025",
      time: "7:00 PM - 12:00 AM",
      eventType: "Engagement",
      status: "confirmed",
      guestCount: 150,
      amount: "₹25,000",
    },
    {
      id: "B004",
      hallName: "Majestic Event Hall",
      location: "North Hills, Mountain View",
      date: "May 20, 2025",
      time: "6:30 PM - 11:30 PM",
      eventType: "Birthday",
      status: "completed",
      guestCount: 200,
      amount: "₹30,000",
    },
    {
      id: "B005",
      hallName: "Silver Jubilee Hall",
      location: "East End, River Road",
      date: "April 5, 2025",
      time: "5:00 PM - 10:00 PM",
      eventType: "Corporate",
      status: "cancelled",
      guestCount: 100,
      amount: "₹20,000",
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <Button asChild>
          <Link href="/search-halls">Book New Hall</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search bookings..."
              className="h-9"
              startIcon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
            <Button size="sm" variant="secondary">
              Search
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="upcoming">Upcoming Events</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4 space-y-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </TabsContent>
          <TabsContent value="confirmed" className="mt-4 space-y-4">
            {bookings
              .filter((booking) => booking.status === "confirmed")
              .map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
          </TabsContent>
          <TabsContent value="pending" className="mt-4 space-y-4">
            {bookings
              .filter((booking) => booking.status === "pending")
              .map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
          </TabsContent>
          <TabsContent value="completed" className="mt-4 space-y-4">
            {bookings
              .filter((booking) => booking.status === "completed")
              .map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-4 space-y-4">
            {bookings
              .filter((booking) => booking.status === "cancelled")
              .map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingCard({ booking }: { booking: any }) {
  return (
    <div className="flex flex-col space-y-3 rounded-lg border p-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
        <Calendar className="h-8 w-8 text-primary" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{booking.hallName}</h3>
          <Badge
            variant={
              booking.status === "confirmed"
                ? "default"
                : booking.status === "pending"
                  ? "outline"
                  : booking.status === "completed"
                    ? "secondary"
                    : "destructive"
            }
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-3 w-3" />
          {booking.location}
        </div>
        <div className="text-sm">
          <span className="font-medium">{booking.date}</span> • {booking.time}
        </div>
        <div className="text-sm">
          <span className="font-medium">{booking.eventType}</span> • {booking.guestCount} Guests
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm font-medium">Amount: {booking.amount}</div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" asChild>
              <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
            </Button>
            {booking.status === "pending" && (
              <Button size="sm" variant="outline">
                Cancel Request
              </Button>
            )}
            {booking.status === "confirmed" && (
              <Button size="sm" variant="outline">
                Modify Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
