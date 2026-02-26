"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Stepper } from "@/components/ui/stepper"
import { toast } from "@/components/ui/use-toast"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import api from "@/services/api"
import { useRouter } from "next/navigation"

// Define the form schemas for each step
const dateTimeSchema = z.object({
  eventDate: z.date({
    required_error: "Please select a date",
  }),
  eventType: z.string().min(1, { message: "Please select an event type" }),
  startTime: z.string().min(1, { message: "Please select a start time" }),
  endTime: z.string().min(1, { message: "Please select an end time" }),
})

const guestDetailsSchema = z.object({
  guestCount: z.coerce
    .number()
    .min(10, { message: "Minimum 10 guests required" })
    .max(1000, { message: "Maximum 1000 guests allowed" }),
  specialRequests: z.string().optional(),
})

const contactInfoSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
})

// Define the steps
const steps = [
  { id: "date-time", label: "Date & Time", description: "Select event date and time" },
  { id: "guest-details", label: "Guest Details", description: "Number of guests and special requests" },
  { id: "contact-info", label: "Contact Info", description: "Your contact information" },
]

interface BookingFormProps {
  hallId: string
  hallName: string
  price: number
  capacity: number
  priceType: string
}

export function BookingForm({ hallId, hallName, price, capacity, priceType }: BookingFormProps) {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    eventDate: undefined as Date | undefined,
    eventType: "wedding",
    startTime: "18:00",
    endTime: "23:00",
    guestCount: 100,
    specialRequests: "",
    name: "",
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Create form instances for each step
  const dateTimeForm = useForm<z.infer<typeof dateTimeSchema>>({
    resolver: zodResolver(dateTimeSchema),
    defaultValues: {
      eventDate: formData.eventDate,
      eventType: formData.eventType,
      startTime: formData.startTime,
      endTime: formData.endTime,
    },
  })

  const guestDetailsForm = useForm<z.infer<typeof guestDetailsSchema>>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      guestCount: formData.guestCount,
      specialRequests: formData.specialRequests,
    },
  })

  const contactInfoForm = useForm<z.infer<typeof contactInfoSchema>>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    },
  })

  const handleNext = async () => {
    let isValid = false

    // Validate current step
    switch (activeStep) {
      case 0:
        isValid = await dateTimeForm.trigger()
        if (isValid) {
          const data = dateTimeForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 1:
        isValid = await guestDetailsForm.trigger()
        if (isValid) {
          const data = guestDetailsForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 2:
        isValid = await contactInfoForm.trigger()
        if (isValid) {
          const data = contactInfoForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
          handleSubmit()
          return
        }
        break
    }

    if (isValid) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (!formData.eventDate) return

    try {
      setIsSubmitting(true)

      // Calculate total amount based on price type
      let totalAmount = price
      if (priceType === "per_hour") {
        const startHour = Number.parseInt(formData.startTime.split(":")[0])
        const endHour = Number.parseInt(formData.endTime.split(":")[0])
        const hours = endHour - startHour
        totalAmount = price * hours
      }

      // Prepare booking data
      const bookingData = {
        hallId,
        eventType: formData.eventType,
        eventDate: formData.eventDate.toISOString(),
        startTime: formData.startTime,
        endTime: formData.endTime,
        guestCount: formData.guestCount,
        specialRequests: formData.specialRequests,
        totalAmount,
        advanceAmount: totalAmount * 0.3, // 30% advance
        contactName: formData.name,
        contactPhone: formData.phone,
        contactEmail: formData.email,
      }

      // Submit booking
      await api.createBooking(bookingData)

      toast({
        title: "Booking Successful",
        description: "Your booking request has been submitted successfully",
      })

      // Redirect to bookings page
      router.push("/dashboard/bookings")
    } catch (error) {
      console.error("Booking error:", error)
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Book {hallName}</h2>
          <p className="text-muted-foreground">
            ₹{price.toLocaleString()} {priceType === "per_day" ? "per day" : priceType === "per_hour" ? "per hour" : ""}
          </p>
        </div>

        <div className="mb-6">
          <Stepper steps={steps} activeStep={activeStep} />
        </div>

        {/* Step 1: Date & Time */}
        {activeStep === 0 && (
          <Form {...dateTimeForm}>
            <form className="space-y-4">
              <FormField
                control={dateTimeForm.control}
                name="eventDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={dateTimeForm.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="reception">Reception</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={dateTimeForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Start time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 13 }).map((_, i) => {
                            const hour = i + 10 // Start from 10 AM
                            const time = `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`
                            const value = `${hour.toString().padStart(2, "0")}:00`
                            return (
                              <SelectItem key={value} value={value}>
                                {time}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={dateTimeForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="End time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 13 }).map((_, i) => {
                            const hour = i + 12 // Start from 12 PM
                            const time = `${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`
                            const value = `${hour.toString().padStart(2, "0")}:00`
                            return (
                              <SelectItem key={value} value={value}>
                                {time}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}

        {/* Step 2: Guest Details */}
        {activeStep === 1 && (
          <Form {...guestDetailsForm}>
            <form className="space-y-4">
              <FormField
                control={guestDetailsForm.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter number of guests" {...field} min={10} max={capacity} />
                    </FormControl>
                    <FormDescription>Maximum capacity: {capacity} guests</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={guestDetailsForm.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any special arrangements or requests..." className="min-h-24" {...field} />
                    </FormControl>
                    <FormDescription>Let us know if you have any special requirements for your event.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}

        {/* Step 3: Contact Info */}
        {activeStep === 2 && (
          <Form {...contactInfoForm}>
            <form className="space-y-4">
              <FormField
                control={contactInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contactInfoForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={contactInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 mt-6">
                <div className="flex justify-between">
                  <span>Hall Rent</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Advance Payment (30%)</span>
                  <span>₹{Math.round(price * 0.3).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{price.toLocaleString()}</span>
                </div>
              </div>
            </form>
          </Form>
        )}

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isSubmitting}>
            {activeStep === steps.length - 1 ? (isSubmitting ? "Processing..." : "Confirm Booking") : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
