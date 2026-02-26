import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { GradientCard } from "@/components/ui/gradient-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/reports">View Reports</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/settings">Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,248"
          description="+12% from last month"
          icon={<Users className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
          trend="up"
          trendValue="+156 new users"
        />
        <StatCard
          title="Total Halls"
          value="86"
          description="+5% from last month"
          icon={<Building2 className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
          trend="up"
          trendValue="+4 new halls"
        />
        <StatCard
          title="Active Bookings"
          value="324"
          description="+18% from last month"
          icon={<Calendar className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
          trend="up"
          trendValue="+58 bookings"
        />
        <StatCard
          title="Revenue"
          value="₹4.2M"
          description="+22% from last month"
          icon={<CreditCard className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
          trend="up"
          trendValue="+₹780K"
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-green-500">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">New hall approved: Grand Palace</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">New user registered: Rahul Sharma</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-amber-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">Payment issue reported: Booking #B1234</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-red-500">
                <XCircle className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">Booking cancelled: Royal Wedding Manor</p>
                <p className="text-xs text-muted-foreground">8 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-0.5 text-accent">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm">New booking confirmed: Elegant Celebration Center</p>
                <p className="text-xs text-muted-foreground">12 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Halls waiting for approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Luxury Wedding Palace", owner: "Rajesh Kumar", time: "2 days ago" },
                { name: "Royal Celebration Hall", owner: "Priya Sharma", time: "1 day ago" },
                { name: "Grand Festivity Center", owner: "Amit Patel", time: "5 hours ago" },
              ].map((hall, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{hall.name}</p>
                    <p className="text-sm text-muted-foreground">Owner: {hall.owner}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {hall.time}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "B1234", hall: "Grand Celebration Palace", status: "confirmed", time: "2 hours ago" },
                { id: "B1235", hall: "Royal Wedding Manor", status: "pending", time: "5 hours ago" },
                { id: "B1236", hall: "Elegant Celebration Center", status: "cancelled", time: "1 day ago" },
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.hall}</p>
                    <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                    <p className="text-xs text-muted-foreground">{booking.time}</p>
                  </div>
                  <StatusBadge variant={booking.status as any} withDot>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>User growth and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">New Users</span>
                <div className="flex items-center">
                  <span className="font-medium">156</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Users</span>
                <div className="flex items-center">
                  <span className="font-medium">892</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Inactive Users</span>
                <div className="flex items-center">
                  <span className="font-medium">356</span>
                  <ArrowDownRight className="ml-1 h-4 w-4 text-red-500" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hall Owners</span>
                <div className="flex items-center">
                  <span className="font-medium">68</span>
                  <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/users">View All Users</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
