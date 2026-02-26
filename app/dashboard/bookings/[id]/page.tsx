import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Phone, Mail, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the booking data based on the ID
  const booking = {
    id: params.id,
    hallName: "Grand Celebration Palace",
    location: "123 Wedding Street, Downtown, City Center",
    date: "June 15, 2025",
    time: "6:00 PM - 11:00 PM",
    eventType: "Wedding",
    status: "confirmed",
    guestCount: 350,
    amount: "₹45,000",
    advancePaid: "₹20,000",
    balanceDue: "₹25,000",
    paymentDueDate: "May 15, 2025",
    bookingDate: "January 10, 2025",
    amenities: ["AC", "Parking", "Catering", "DJ & Sound", "WiFi", "Decoration"],
    contactPerson: "Mr. Rajesh Kumar",
    contactPhone: "+91 98765 43210",
    contactEmail: "rajesh@grandcelebration.com",
    notes: "Special arrangement for stage decoration as discussed. Valet parking service confirmed.",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/bookings">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{booking.hallName}</CardTitle>
                  <CardDescription>Booking ID: {booking.id}</CardDescription>
                </div>
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
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Event Date & Time</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.date} • {booking.time}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">{booking.location}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Event Type & Guest Count</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.eventType} • {booking.guestCount} Guests
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Booking Date</div>
                  <div className="text-sm text-muted-foreground">{booking.bookingDate}</div>
                </div>
              </div>
              <Separator />
              <div>
                <div className="font-medium mb-2">Amenities Included</div>
                <div className="flex flex-wrap gap-2">
                  {booking.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              {booking.notes && (
                <>
                  <Separator />
                  <div>
                    <div className="font-medium mb-2">Special Notes</div>
                    <div className="text-sm text-muted-foreground">{booking.notes}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Amount</span>
                <span className="font-medium">{booking.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Advance Paid</span>
                <span className="font-medium text-green-600">{booking.advancePaid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Balance Due</span>
                <span className="font-medium text-red-600">{booking.balanceDue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Payment Due Date</span>
                <span className="font-medium">{booking.paymentDueDate}</span>
              </div>
              <Separator />
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
                <Button size="sm">Make Payment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hall Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {booking.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-md overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Hall image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Contact Person</div>
                  <div className="text-sm text-muted-foreground">{booking.contactPerson}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">{booking.contactPhone}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{booking.contactEmail}</div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm">
                  Send Message
                </Button>
                <Button size="sm">Call Now</Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            {booking.status === "confirmed" && (
              <>
                <Button className="flex-1" variant="outline">
                  Modify Booking
                </Button>
                <Button className="flex-1" variant="destructive">
                  Cancel Booking
                </Button>
              </>
            )}
            {booking.status === "pending" && (
              <Button className="flex-1" variant="destructive">
                Cancel Request
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
