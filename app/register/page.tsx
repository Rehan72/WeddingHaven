"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Stepper } from "@/components/ui/stepper"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

// Define the form schemas for each step
const accountInfoSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
})

const accountTypeSchema = z.object({
  role: z.enum(["user", "hall-owner"], {
    required_error: "Please select an account type",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

// Define the steps
const steps = [
  { id: "account-info", label: "Account Info", description: "Email and password" },
  { id: "personal-info", label: "Personal Info", description: "Your personal details" },
  { id: "account-type", label: "Account Type", description: "Select account type" },
]

export default function RegisterPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "user" as "user" | "hall-owner",
    terms: false,
  })
  const { register, loading } = useAuth()

  // Create form instances for each step
  const accountInfoForm = useForm<z.infer<typeof accountInfoSchema>>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
  })

  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    },
  })

  const accountTypeForm = useForm<z.infer<typeof accountTypeSchema>>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: {
      role: formData.role,
      terms: formData.terms,
    },
  })

  const handleNext = async () => {
    let isValid = false

    // Validate current step
    switch (activeStep) {
      case 0:
        isValid = await accountInfoForm.trigger()
        if (isValid) {
          const data = accountInfoForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 1:
        isValid = await personalInfoForm.trigger()
        if (isValid) {
          const data = personalInfoForm.getValues()
          setFormData((prev) => ({ ...prev, ...data }))
        }
        break
      case 2:
        isValid = await accountTypeForm.trigger()
        if (isValid) {
          const data = accountTypeForm.getValues()
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
    // Remove confirmPassword from the data sent to the API
    const { confirmPassword, ...userData } = formData
    await register(userData)
  }

  return (
    <div className="container py-16 md:py-24 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Stepper steps={steps} activeStep={activeStep} />
          </div>

          {/* Step 1: Account Info */}
          {activeStep === 0 && (
            <Form {...accountInfoForm}>
              <form className="space-y-4">
                <FormField
                  control={accountInfoForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountInfoForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={accountInfoForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input placeholder="••••••••" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {/* Step 2: Personal Info */}
          {activeStep === 1 && (
            <Form {...personalInfoForm}>
              <form className="space-y-4">
                <FormField
                  control={personalInfoForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalInfoForm.control}
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
              </form>
            </Form>
          )}

          {/* Step 3: Account Type */}
          {activeStep === 2 && (
            <Form {...accountTypeForm}>
              <form className="space-y-4">
                <FormField
                  control={accountTypeForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Account Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="user" />
                            </FormControl>
                            <FormLabel className="font-normal">User (Book halls)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="hall-owner" />
                            </FormControl>
                            <FormLabel className="font-normal">Hall Owner (List halls)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={accountTypeForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the terms and conditions</FormLabel>
                        <FormDescription>
                          By creating an account, you agree to our{" "}
                          <Link href="#" className="text-primary underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-primary underline">
                            Privacy Policy
                          </Link>
                          .
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={loading}>
              {activeStep === steps.length - 1 ? (loading ? "Creating Account..." : "Create Account") : "Next"}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
