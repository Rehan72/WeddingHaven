import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { GradientCard } from "@/components/ui/gradient-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building2, Calendar, CreditCard, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hall Owner Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/hall-owner/analytics">View Analytics</Link>
          </Button>
          <Button asChild>
            <Link href="/hall-owner/halls/add">Add New Hall</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Halls"
          value="3"
          description="2 active, 1 pending approval"
          icon={<Building2 className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
        />
        <StatCard
          title="Total Bookings"
          value="48"
          description="+15% from last month"
          icon={<Calendar className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
          trend="up"
          trendValue="+6 bookings"
        />
        <StatCard
          title="Revenue"
          value="₹3.2L"
          description="+22% from last month"
          icon={<CreditCard className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
          trend="up"
          trendValue="+₹58K"
        />
        <StatCard
          title="Average Rating"
          value="4.8"
          description="Based on 124 reviews"
          icon={<Star className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <GradientCard className="col-span-4" gradient="primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Booking Overview</h2>
            <Tabs defaultValue="weekly">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
            <BarChart3 className="h-16 w-16 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Booking chart will appear here</span>
          </div>
        </GradientCard>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Rahul & Priya Wedding",
                hall: "Grand Celebration Palace",
                date: "June 15, 2025",
                status: "confirmed",
              },
              {
                name: "Sharma Family Reception",
                hall: "Royal Wedding Manor",
                date: "July 10, 2025",
                status: "pending",
              },
              {
                name: "Kumar Engagement",
                hall: "Elegant Celebration Center",
                date: "August 5, 2025",
                status: "confirmed",
              },
            ].map((booking, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{booking.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.hall}</p>
                  <p className="text-xs text-muted-foreground">{booking.date}</p>
                </div>
                <StatusBadge variant={booking.status as any} withDot>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </StatusBadge>
              </div>
            ))}
            <div className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/hall-owner/bookings">View All Bookings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>My Halls</CardTitle>
            <CardDescription>Your listed marriage halls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  name: "Grand Celebration Palace",
                  location: "Downtown, City Center",
                  image: "/placeholder.svg?height=200&width=300",
                  status: "active",
                  bookings: 28,
                },
                {
                  name: "Royal Wedding Manor",
                  location: "Westside, Garden Area",
                  image: "/placeholder.svg?height=200&width=300",
                  status: "active",
                  bookings: 16,
                },
                {
                  name: "Elegant Celebration Center",
                  location: "Riverside, Lake View",
                  image: "/placeholder.svg?height=200&width=300",
                  status: "pending",
                  bookings: 4,
                },
              ].map((hall, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <div className="relative h-40">
                    <Image src={hall.image || "/placeholder.svg"} alt={hall.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <StatusBadge variant={hall.status === "active" ? "active" : "pending"} withDot>
                        {hall.status.charAt(0).toUpperCase() + hall.status.slice(1)}
                      </StatusBadge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{hall.name}</h3>
                    <p className="text-sm text-muted-foreground">{hall.location}</p>
                    <p className="text-sm mt-2">
                      <span className="font-medium">{hall.bookings}</span> bookings
                    </p>
                    <div className="mt-3">
                      <Button size="sm" className="w-full" asChild>
                        <Link href={`/hall-owner/halls/${index + 1}`}>Manage</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
