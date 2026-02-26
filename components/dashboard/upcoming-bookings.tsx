import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function UpcomingBookings() {
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
    },
  ]

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex flex-col space-y-3 rounded-lg border p-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
            <Calendar className="h-8 w-8 text-accent" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{booking.hallName}</h3>
              <Badge
                variant={
                  booking.status === "confirmed" ? "default" : booking.status === "pending" ? "outline" : "secondary"
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
            <div className="flex flex-wrap gap-2 pt-2">
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
      ))}
      <div className="text-center">
        <Button variant="link" asChild>
          <Link href="/dashboard/bookings">View All Bookings</Link>
        </Button>
      </div>
    </div>
  )
}
