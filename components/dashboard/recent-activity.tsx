import { CheckCircle, AlertCircle, XCircle, Calendar, CreditCard } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "booking_confirmed",
      message: "Your booking at Grand Celebration Palace has been confirmed",
      date: "2 days ago",
      icon: CheckCircle,
      iconColor: "text-green-500",
    },
    {
      id: 2,
      type: "payment_due",
      message: "Payment reminder for Royal Wedding Manor booking",
      date: "3 days ago",
      icon: AlertCircle,
      iconColor: "text-amber-500",
    },
    {
      id: 3,
      type: "booking_cancelled",
      message: "Your booking at Silver Jubilee Hall has been cancelled",
      date: "1 week ago",
      icon: XCircle,
      iconColor: "text-red-500",
    },
    {
      id: 4,
      type: "booking_request",
      message: "You requested a booking at Elegant Celebration Center",
      date: "1 week ago",
      icon: Calendar,
      iconColor: "text-accent",
    },
    {
      id: 5,
      type: "payment_success",
      message: "Payment of ₹25,000 processed successfully",
      date: "2 weeks ago",
      icon: CreditCard,
      iconColor: "text-green-500",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className={`mt-0.5 ${activity.iconColor}`}>
            <activity.icon className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm">{activity.message}</p>
            <p className="text-xs text-muted-foreground">{activity.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
