const express = require("express")
const router = express.Router()
const Hall = require("../models/Hall")
const { authenticateToken, authorizeRoles } = require("../middleware/auth")

// Get all halls (public)
router.get("/", async (req, res) => {
  try {
    const { search, city, minPrice, maxPrice, minCapacity, amenities, sort, page = 1, limit = 10 } = req.query

    // Build query
    const query = { status: "active" }

    // Search
    if (search) {
      query.$text = { $search: search }
    }

    // Filter by city
    if (city) {
      query["location.city"] = { $regex: city, $options: "i" }
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    // Filter by capacity
    if (minCapacity) {
      query.capacity = { $gte: Number(minCapacity) }
    }

    // Filter by amenities
    if (amenities) {
      const amenitiesList = amenities.split(",")
      query.amenities = { $all: amenitiesList }
    }

    // Sorting
    let sortOption = {}
    if (sort) {
      switch (sort) {
        case "price_asc":
          sortOption = { price: 1 }
          break
        case "price_desc":
          sortOption = { price: -1 }
          break
        case "rating":
          sortOption = { rating: -1 }
          break
        case "capacity":
          sortOption = { capacity: -1 }
          break
        default:
          sortOption = { createdAt: -1 }
      }
    } else {
      sortOption = { createdAt: -1 }
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Execute query
    const halls = await Hall.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate("owner", "firstName lastName email")

    // Get total count
    const total = await Hall.countDocuments(query)

    res.json({
      halls,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Get halls error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get hall by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id).populate("owner", "firstName lastName email phone")

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" })
    }

    res.json(hall)
  } catch (error) {
    console.error("Get hall error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Create a new hall (hall owner, admin, super admin)
router.post("/", authenticateToken, authorizeRoles(["hall-owner", "admin", "super-admin"]), async (req, res) => {
  try {
    const { name, description, location, capacity, price, priceType, amenities, images, availability } = req.body

    const hall = new Hall({
      name,
      description,
      owner: req.user.userId,
      location,
      capacity,
      price,
      priceType,
      amenities,
      images,
      availability,
    })

    await hall.save()

    res.status(201).json({
      message: "Hall created successfully",
      hall,
    })
  } catch (error) {
    console.error("Create hall error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update hall (owner of the hall, admin, super admin)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id)

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" })
    }

    // Check if user is authorized to update
    if (hall.owner.toString() !== req.user.userId && !["admin", "super-admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to update this hall" })
    }

    const { name, description, location, capacity, price, priceType, amenities, images, availability, status } =
      req.body

    // Update fields
    if (name) hall.name = name
    if (description) hall.description = description
    if (location) hall.location = location
    if (capacity) hall.capacity = capacity
    if (price) hall.price = price
    if (priceType) hall.priceType = priceType
    if (amenities) hall.amenities = amenities
    if (images) hall.images = images
    if (availability) hall.availability = availability

    // Only admin and super admin can change status
    if (status && ["admin", "super-admin"].includes(req.user.role)) {
      hall.status = status
    }

    await hall.save()

    res.json({
      message: "Hall updated successfully",
      hall,
    })
  } catch (error) {
    console.error("Update hall error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete hall (owner of the hall, admin, super admin)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const hall = await Hall.findById(req.params.id)

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" })
    }

    // Check if user is authorized to delete
    if (hall.owner.toString() !== req.user.userId && !["admin", "super-admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to delete this hall" })
    }

    await Hall.findByIdAndDelete(req.params.id)

    res.json({ message: "Hall deleted successfully" })
  } catch (error) {
    console.error("Delete hall error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get halls by owner (for hall owners)
router.get("/owner/my-halls", authenticateToken, authorizeRoles(["hall-owner"]), async (req, res) => {
  try {
    const halls = await Hall.find({ owner: req.user.userId })

    res.json(halls)
  } catch (error) {
    console.error("Get owner halls error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
