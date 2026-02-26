import { HowItWorksCard } from "@/components/how-it-works-card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HowItWorks() {
  return (
    <div>
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">How Wedding Haven Works</h1>
            <p className="text-xl text-muted-foreground">
              Our simple process makes booking a marriage hall quick and hassle-free
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard
              step={1}
              title="Search & Compare"
              description="Browse through our extensive collection of marriage halls and filter based on your preferences"
              icon="search"
            />
            <HowItWorksCard
              step={2}
              title="Book Your Slot"
              description="Select your preferred date and time, and submit your booking request"
              icon="calendar"
            />
            <HowItWorksCard
              step={3}
              title="Confirm & Celebrate"
              description="Receive confirmation from the hall owner and get ready for your special day"
              icon="check"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">For Users</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Create an Account</h3>
                    <p className="text-muted-foreground">
                      Register on our platform to access all features and manage your bookings in one place.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Search for Halls</h3>
                    <p className="text-muted-foreground">
                      Use our advanced search filters to find halls based on location, capacity, price, and amenities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Check Availability</h3>
                    <p className="text-muted-foreground">
                      View real-time availability of halls for your preferred dates to plan accordingly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Submit Booking Request</h3>
                    <p className="text-muted-foreground">
                      Fill out the booking form with your event details and submit your request to the hall owner.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Track Booking Status</h3>
                    <p className="text-muted-foreground">
                      Monitor the status of your booking request and receive notifications about approvals or changes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/register">Register as User</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="User booking process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Hall owner dashboard"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">For Hall Owners</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Register Your Hall</h3>
                    <p className="text-muted-foreground">
                      Create an account and list your marriage hall with detailed information and photos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Manage Hall Details</h3>
                    <p className="text-muted-foreground">
                      Update your hall information, pricing, amenities, and availability calendar as needed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Receive Booking Requests</h3>
                    <p className="text-muted-foreground">
                      Get notified when users submit booking requests for your hall.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Accept or Reject Bookings</h3>
                    <p className="text-muted-foreground">
                      Review booking requests and accept or reject them based on your availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-lg">Update Billing Details</h3>
                    <p className="text-muted-foreground">
                      Manage payment information, including total amount, advance payment, and balance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/list-your-hall">List Your Hall</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
            <p className="text-primary-foreground/90">
              Join our platform today and experience the easiest way to book or list marriage halls
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Register as User</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/list-your-hall">List Your Hall</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
