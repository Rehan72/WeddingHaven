import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UpcomingBookings } from "@/components/dashboard/upcoming-bookings"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link href="/search-halls">Book New Hall</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next event in 5 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting hall owner confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Halls</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Halls saved for future reference</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your next 3 scheduled events</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingBookings />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Booking Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Confirmed</div>
                <div className="w-3/4 flex items-center gap-2">
                  <Progress value={67} className="h-2" />
                  <span className="text-sm text-muted-foreground">8</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Pending</div>
                <div className="w-3/4 flex items-center gap-2">
                  <Progress value={17} className="h-2" />
                  <span className="text-sm text-muted-foreground">2</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Completed</div>
                <div className="w-3/4 flex items-center gap-2">
                  <Progress value={8} className="h-2" />
                  <span className="text-sm text-muted-foreground">1</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-1/4 text-sm font-medium">Cancelled</div>
                <div className="w-3/4 flex items-center gap-2">
                  <Progress value={8} className="h-2" />
                  <span className="text-sm text-muted-foreground">1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Amount Paid</span>
                <span className="font-medium">₹85,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending Payments</span>
                <span className="font-medium">₹45,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Upcoming Payment</span>
                <span className="font-medium">₹25,000</span>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/payments">View Payment History</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
