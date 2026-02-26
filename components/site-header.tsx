import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Link href="/">
            <span className="text-primary">Wedding</span>
            <span className="text-accent">Haven</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/search-halls" className="text-sm font-medium hover:text-primary">
            Search Halls
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="/list-your-hall" className="text-sm font-medium hover:text-primary">
            List Your Hall
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
