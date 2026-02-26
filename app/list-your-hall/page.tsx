"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Stepper } from "@/components/ui/stepper"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import api from "@/services/api"

// Define the form schemas for each step
const basicInfoSchema = z.object({
  name: z.string().min(3, { message: "Hall name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  hallType: z.enum(["banquet", "wedding", "conference", "party", "multipurpose"]),
})

const locationSchema = z.object({
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  pincode: z.string().min(5, { message: "Pincode must be at least 5 characters" }),
})

const capacityPricingSchema = z.object({
  capacity: z.coerce.number().min(10, { message: "Capacity must be at least 10" }),
  price: z.coerce.number().min(1000, { message: "Price must be at least 1000" }),
  priceType: z.enum(["per_day", "per_hour", "fixed"]),
})

const amenitiesSchema = z.object({
  amenities: z.array(z.string()).min(1, { message: "Select at least one amenity" }),
})

const imagesSchema = z.object({
  images: z.array(z.string()).min(1, { message: "Add at least one image" }),
})

const termsSchema = z.object({
  terms: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
})

// Combine all schemas for the final submission
const hallSchema = z.object({
  ...basicInfoSchema.shape,
  ...locationSchema.shape,
  ...capacityPricingSchema.shape,
  ...amenitiesSchema.shape,
  images: z.array(
    z.object({
      url: z.string(),
      caption: z.string().optional(),
    }),
  ),
  ...termsSchema.shape,
})

// Define the steps
const steps = [
  { id: "basic-info", label: "Basic Info", description: "Hall name and description" },
  { id: "location", label: "Location", description: "Address and location details" },
  { id: "capacity-pricing", label: "Capacity & Pricing", description: "Guest capacity and pricing" },
  { id: "amenities", label: "Amenities", description: "Available facilities" },
  { id: "images", label: "Images", description: "Upload hall photos" },
  { id: "review", label: "Review", description: "Review and submit" },
]

// Available amenities
const availableAmenities = [
  { id: "parking", label: "Parking" },
  { id: "ac", label: "Air Conditioning" },
  { id: "wifi", label: "WiFi" },
  { id: "catering", label: "Catering Service" },
  { id: "decoration", label: "Decoration" },
  { id: "sound", label: "Sound System" },
  { id: "stage", label: "Stage" },
  { id: "dj", label: "DJ" },
  { id: "power_backup", label: "Power Backup" },
  { id: "bridal_room", label: "Bridal Room" },
  { id: "valet", label: "Valet Parking" },
  { id: "security", label: "Security" },
]

export default function ListYourHallPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    hallType: "wedding",
    address: "",
    city: "",
    state: "",
    pincode: "",
    capacity: 100,
    price: 10000,
    priceType: "per_day",
    amenities: [] as string[],
    images: [] as { url: string; caption?: string }[],
    terms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Create form instances for each step
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: formData.name,
      description: formData.description,
      hallType: formData.hallType,
    },
  })

  const locationForm = useForm<z.infer<typeof locationSchema>>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    },
  })

  const capacityPricingForm = useForm<z.infer<typeof capacityPricingSchema>>({
    resolver: zodResolver(capacityPricingSchema),
    defaultValues: {
      capacity: formData.capacity,
      price: formData.price,
      priceType: formData.priceType,
    },
  })

  const amenitiesForm = useForm<z.infer<typeof amenitiesSchema>>({
    resolver: zodResolver(amenitiesSchema),
    defaultValues: {
      amenities: formData.amenities,
    },
  })

  const imagesForm = useForm<z.infer<typeof imagesSchema>>({
    resolver: zodResolver(imagesSchema),
    defaultValues: {
      images: formData.images.map((img) => img.url),
    },
  })

  const termsForm = useForm<z.infer<typeof termsSchema>>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      terms: formData.terms,
    },
  })

  // Update form values when formData changes
  useEffect(() => {
    basicInfoForm.reset({
      name: formData.name,
      description: formData.description,
      hallType: formData.hallType,
    })
    locationForm.reset({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    })
    capacityPricingForm.reset({
      capacity: formData.capacity,
      price: formData.price,
      priceType: formData.priceType,
    })
    amenitiesForm.reset({
      amenities: formData.amenities,
    })
    imagesForm.reset({
      images: formData.images.map((img) => img.url),
    })
    termsForm.reset({
      terms: formData.terms,
    })
  }, [formData])

  // Check if user is authenticated and is a hall owner
  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to list your hall",
        variant: "destructive",
      })
      router.push("/sign-in")
    } else if (!authLoading && user && user.role !== "hall-owner") {
      toast({
        title: "Permission Denied",
        description: "Only hall owners can list halls",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  const handleNext = async () => {
    let isValid = false

    // Validate current step
    switch (activeStep) {
      case 0:
        isValid = await basicInfoForm.trigger()
        if (isValid) {
          const data = basicInfoForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 1:
        isValid = await locationForm.trigger()
        if (isValid) {
          const data = locationForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 2:
        isValid = await capacityPricingForm.trigger()
        if (isValid) {
          const data = capacityPricingForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 3:
        isValid = await amenitiesForm.trigger()
        if (isValid) {
          const data = amenitiesForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 4:
        isValid = await imagesForm.trigger()
        if (isValid) {
          const data = imagesForm.getValues()
          // Convert string array to object array
          const imageObjects = data.images.map((url) => ({ url }))
          setFormData((prev) => ({ ...prev, images: imageObjects }))
        }
        break
      case 5:
        isValid = await termsForm.trigger()
        if (isValid) {
          const data = termsForm.getValues()
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
    try {
      setIsSubmitting(true)

      // Prepare data for API
      const hallData = {
        name: formData.name,
        description: formData.description,
        hallType: formData.hallType,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        capacity: formData.capacity,
        price: formData.price,
        priceType: formData.priceType,
        amenities: formData.amenities,
        images: formData.images,
      }

      // Submit to API
      await api.createHall(hallData)

      toast({
        title: "Success",
        description: "Your hall has been submitted for review",
      })

      // Redirect to hall owner dashboard
      router.push("/hall-owner")
    } catch (error) {
      console.error("Submit error:", error)
      toast({
        title: "Error",
        description: "Failed to submit hall. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Mock image upload function
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // In a real app, you would upload these to a storage service
    // For this example, we'll create fake URLs
    const newImages = Array.from(files).map((file, index) => ({
      url: URL.createObjectURL(file),
      caption: `Image ${formData.images.length + index + 1}`,
    }))

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }))

    // Update the form value
    const updatedUrls = [...formData.images, ...newImages].map((img) => img.url)
    imagesForm.setValue("images", updatedUrls)
  }

  const removeImage = (index: number) => {
    const updatedImages = [...formData.images]
    updatedImages.splice(index, 1)

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }))

    // Update the form value
    const updatedUrls = updatedImages.map((img) => img.url)
    imagesForm.setValue("images", updatedUrls)
  }

  if (authLoading) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">List Your Hall</h1>
          <p className="text-muted-foreground mt-2">
            Complete the form below to list your marriage hall on our platform.
          </p>
        </div>

        <div className="mb-8">
          <Stepper steps={steps} activeStep={activeStep} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[activeStep].label}</CardTitle>
            <CardDescription>{steps[activeStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Info */}
            {activeStep === 0 && (
              <Form {...basicInfoForm}>
                <form className="space-y-6">
                  <FormField
                    control={basicInfoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hall Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hall name" {...field} />
                        </FormControl>
                        <FormDescription>This is how your hall will appear on our platform.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={basicInfoForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your hall, its features, and what makes it special"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your hall to attract customers.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={basicInfoForm.control}
                    name="hallType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hall Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select hall type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="banquet">Banquet Hall</SelectItem>
                            <SelectItem value="wedding">Wedding Hall</SelectItem>
                            <SelectItem value="conference">Conference Hall</SelectItem>
                            <SelectItem value="party">Party Hall</SelectItem>
                            <SelectItem value="multipurpose">Multipurpose Hall</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Select the primary purpose of your hall.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 2: Location */}
            {activeStep === 1 && (
              <Form {...locationForm}>
                <form className="space-y-6">
                  <FormField
                    control={locationForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter full address" className="min-h-20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={locationForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={locationForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={locationForm.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 3: Capacity & Pricing */}
            {activeStep === 2 && (
              <Form {...capacityPricingForm}>
                <form className="space-y-6">
                  <FormField
                    control={capacityPricingForm.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Capacity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter maximum guest capacity" min={10} {...field} />
                        </FormControl>
                        <FormDescription>The maximum number of guests your hall can accommodate.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={capacityPricingForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter price" min={1000} {...field} />
                        </FormControl>
                        <FormDescription>The rental price for your hall.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={capacityPricingForm.control}
                    name="priceType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Price Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="per_day" />
                              </FormControl>
                              <FormLabel className="font-normal">Per Day</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="per_hour" />
                              </FormControl>
                              <FormLabel className="font-normal">Per Hour</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="fixed" />
                              </FormControl>
                              <FormLabel className="font-normal">Fixed Price</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 4: Amenities */}
            {activeStep === 3 && (
              <Form {...amenitiesForm}>
                <form className="space-y-6">
                  <FormField
                    control={amenitiesForm.control}
                    name="amenities"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Amenities</FormLabel>
                          <FormDescription>Select all amenities available at your hall.</FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {availableAmenities.map((amenity) => (
                            <FormField
                              key={amenity.id}
                              control={amenitiesForm.control}
                              name="amenities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={amenity.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(amenity.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, amenity.id])
                                            : field.onChange(field.value?.filter((value) => value !== amenity.id))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{amenity.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 5: Images */}
            {activeStep === 4 && (
              <Form {...imagesForm}>
                <form className="space-y-6">
                  <FormField
                    control={imagesForm.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hall Images</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {formData.images.map((image, index) => (
                                <div key={index} className="relative group">
                                  <div className="aspect-video bg-muted rounded-md overflow-hidden">
                                    <img
                                      src={image.url || "/placeholder.svg"}
                                      alt={image.caption || `Hall image ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeImage(index)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <div className="aspect-video bg-muted rounded-md flex flex-col items-center justify-center p-4 border-2 border-dashed border-muted-foreground/30">
                                <input
                                  type="file"
                                  id="image-upload"
                                  className="hidden"
                                  accept="image/*"
                                  multiple
                                  onChange={handleImageUpload}
                                />
                                <label htmlFor="image-upload" className="cursor-pointer text-center">
                                  <div className="text-2xl mb-2">+</div>
                                  <div className="text-sm text-muted-foreground">Add Image</div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload high-quality images of your hall. You can add multiple images.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}

            {/* Step 6: Review & Submit */}
            {activeStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Hall Name</div>
                      <div>{formData.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Hall Type</div>
                      <div className="capitalize">{formData.hallType.replace("_", " ")}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-medium text-muted-foreground">Description</div>
                    <div className="mt-1">{formData.description}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-muted-foreground">Address</div>
                    <div>{formData.address}</div>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">City</div>
                      <div>{formData.city}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">State</div>
                      <div>{formData.state}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Pincode</div>
                      <div>{formData.pincode}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Capacity & Pricing</h3>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Capacity</div>
                      <div>{formData.capacity} guests</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Price</div>
                      <div>₹{formData.price.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Price Type</div>
                      <div className="capitalize">{formData.priceType.replace("_", " ")}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Amenities</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.amenities.map((amenity) => (
                      <div key={amenity} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {availableAmenities.find((a) => a.id === amenity)?.label || amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Images</h3>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-muted rounded-md overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.caption || `Hall image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Form {...termsForm}>
                  <form>
                    <FormField
                      control={termsForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>I agree to the terms and conditions</FormLabel>
                            <FormDescription>
                              By submitting this form, you agree to our{" "}
                              <a href="#" className="text-primary underline">
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a href="#" className="text-primary underline">
                                Privacy Policy
                              </a>
                              .
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {activeStep === steps.length - 1 ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
