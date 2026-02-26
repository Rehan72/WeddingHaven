const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require("path")

// Load models
const Hall = require("./models/Hall")
const User = require("./models/User")

dotenv.config()

const halls = [
  {
    name: "Grand Celebration Palace",
    description: "A luxury wedding hall with state-of-the-art facilities and beautiful decor. Ideal for large weddings and corporate events. Our palace features a grand ballroom, premium lighting, and a professional sound system.",
    location: {
      address: "123 Royale Road, Downtown",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001"
    },
    capacity: 500,
    price: 150000,
    priceType: "per_day",
    amenities: ["AC", "Parking", "Catering", "Decoration", "DJ & Sound", "WiFi"],
    images: [
      { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop", caption: "Main Hall" },
      { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=1000&auto=format&fit=crop", caption: "Entrance" }
    ],
    rating: 4.8,
    reviewCount: 324,
    status: "active"
  },
  {
    name: "Royal Wedding Manor",
    description: "Experience royal elegance at our manor. We provide a traditional yet sophisticated atmosphere for your special day. The manor includes a lush green lawn and an ornate indoor hall.",
    location: {
      address: "45 Garden Lane, Westside",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001"
    },
    capacity: 800,
    price: 250000,
    priceType: "per_day",
    amenities: ["AC", "Parking", "Decoration", "Lawn", "Power Backup"],
    images: [
      { url: "https://images.unsplash.com/photo-1544161442-e3dbca649f99?q=80&w=1000&auto=format&fit=crop", caption: "Grand Entrance" }
    ],
    rating: 4.9,
    reviewCount: 512,
    status: "active"
  },
  {
    name: "Elegant Celebration Center",
    description: "Modern and versatile event space perfect for weddings, receptions, and parties. We offer flexible arrangements and personalized services.",
    location: {
      address: "88 Riverside Drive, Lake View",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    capacity: 300,
    price: 75000,
    priceType: "per_day",
    amenities: ["AC", "Catering", "DJ & Sound", "WiFi", "Stage"],
    images: [
      { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop", caption: "Interior Decor" }
    ],
    rating: 4.7,
    reviewCount: 287,
    status: "active"
  }
]

async function seedHalls() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB for seeding...")

    // Find or create a system user to own the halls
    let admin = await User.findOne({ role: "super-admin" })
    if (!admin) {
      console.log("No super-admin found, please run seeding after creating a user or registration.")
      // For seeding purposes, we'll try to find any first user
      admin = await User.findOne()
      if (!admin) {
        console.log("No users found at all. Please register a user first.")
        process.exit(1)
      }
    }

    console.log(`Using user ${admin.email} (Role: ${admin.role}) as hall owner.`)

    // Clear existing halls (optional but helpful for testing)
    await Hall.deleteMany({ status: "active" })
    console.log("Cleared existing active halls.")

    const hallsWithOptions = halls.map(hall => ({
      ...hall,
      owner: admin._id
    }))

    await Hall.insertMany(hallsWithOptions)
    console.log("Seeded 3 halls successfully!")

  } catch (err) {
    console.error("Seeding error:", err)
  } finally {
    mongoose.connection.close()
  }
}

seedHalls()
