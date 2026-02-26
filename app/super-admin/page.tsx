import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { GradientCard } from "@/components/ui/gradient-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building2, CreditCard, Users, ShieldAlert } from "lucide-react"
import Link from "next/link"

export default function SuperAdminDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/super-admin/logs">System Logs</Link>
          </Button>
          <Button asChild>
            <Link href="/super-admin/settings">System Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value="2,486"
          description="+15% from last month"
          icon={<Users className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
          trend="up"
          trendValue="+324 users"
        />
        <StatCard
          title="Total Halls"
          value="156"
          description="+8% from last month"
          icon={<Building2 className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
          trend="up"
          trendValue="+12 halls"
        />
        <StatCard
          title="Total Admins"
          value="24"
          description="+2 new admins"
          icon={<ShieldAlert className="h-4 w-4" />}
          iconVariant="primary"
          variant="primary"
        />
        <StatCard
          title="Total Revenue"
          value="₹8.6M"
          description="+22% from last month"
          icon={<CreditCard className="h-4 w-4" />}
          iconVariant="accent"
          variant="accent"
          trend="up"
          trendValue="+₹1.5M"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <GradientCard className="col-span-4" gradient="primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Platform Overview</h2>
            <Tabs defaultValue="monthly">
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-md">
            <BarChart3 className="h-16 w-16 text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Platform metrics chart will appear here</span>
          </div>
        </GradientCard>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Database</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">API</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Storage</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="font-medium">Authentication</span>
              </div>
              <span className="text-sm text-muted-foreground">Operational</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <span className="font-medium">Payment Gateway</span>
              </div>
              <span className="text-sm text-muted-foreground">Degraded Performance</span>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/super-admin/logs">View System Logs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Admin Activity</CardTitle>
            <CardDescription>Recent admin actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { admin: "Rajesh Kumar", action: "Approved new hall", time: "10 minutes ago" },
                { admin: "Priya Sharma", action: "Updated system settings", time: "2 hours ago" },
                { admin: "Amit Patel", action: "Deleted user account", time: "5 hours ago" },
                { admin: "Neha Singh", action: "Modified payment gateway", time: "1 day ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-0.5 text-primary">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.admin}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Analytics</CardTitle>
            <CardDescription>User distribution by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { location: "Mumbai", users: 856, percentage: 34 },
                { location: "Delhi", users: 642, percentage: 26 },
                { location: "Bangalore", users: 425, percentage: 17 },
                { location: "Hyderabad", users: 312, percentage: 13 },
                { location: "Other Cities", users: 251, percentage: 10 },
              ].map((location, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{location.location}</span>
                    <span className="text-sm text-muted-foreground">{location.users} users</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${location.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Stats</CardTitle>
            <CardDescription>Current database metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm">4.2 GB / 10 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "42%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Query Performance</span>
                <span className="text-sm">85 ms avg</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Connections</span>
                <span className="text-sm">124 / 500</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: "25%" }}></div>
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/super-admin/database">Database Management</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
