const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { authenticateToken, authorizeRoles } = require("../middleware/auth")

// Get all users (admin, super admin)
router.get("/", authenticateToken, authorizeRoles(["admin", "super-admin"]), async (req, res) => {
  try {
    const { role, search, sort = "newest", page = 1, limit = 10 } = req.query

    // Build query
    const query = {}

    // Filter by role
    if (role && role !== "all") {
      query.role = role
    }

    // Search
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }

    // Sorting
    let sortOption = {}
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "name":
        sortOption = { firstName: 1, lastName: 1 }
        break
      default:
        sortOption = { createdAt: -1 } // newest
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Execute query
    const users = await User.find(query).select("-password").sort(sortOption).skip(skip).limit(Number(limit))

    // Get total count
    const total = await User.countDocuments(query)

    res.json({
      users,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user by ID (admin, super admin)
router.get("/:id", authenticateToken, authorizeRoles(["admin", "super-admin"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    console.error("Get user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update user (self, admin, super admin)
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    // Check if user is authorized to update
    if (req.params.id !== req.user.userId && !["admin", "super-admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to update this user" })
    }

    const { firstName, lastName, phone, address } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update fields
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (phone) user.phone = phone
    if (address) user.address = address

    // Only admin and super admin can change role
    if (req.body.role && ["admin", "super-admin"].includes(req.user.role)) {
      user.role = req.body.role
    }

    await user.save()

    res.json({
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Delete user (admin, super admin)
router.delete("/:id", authenticateToken, authorizeRoles(["admin", "super-admin"]), async (req, res) => {
  try {
    // Super admin can delete any user, admin can't delete super admin
    if (req.user.role === "admin") {
      const userToDelete = await User.findById(req.params.id)
      if (userToDelete && userToDelete.role === "super-admin") {
        return res.status(403).json({ message: "Not authorized to delete a super admin" })
      }
    }

    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Add hall to favorites
router.post("/favorites/:hallId", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if hall is already in favorites
    if (user.favorites.includes(req.params.hallId)) {
      return res.status(400).json({ message: "Hall is already in favorites" })
    }

    user.favorites.push(req.params.hallId)
    await user.save()

    res.json({ message: "Hall added to favorites" })
  } catch (error) {
    console.error("Add to favorites error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Remove hall from favorites
router.delete("/favorites/:hallId", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if hall is in favorites
    if (!user.favorites.includes(req.params.hallId)) {
      return res.status(400).json({ message: "Hall is not in favorites" })
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== req.params.hallId)
    await user.save()

    res.json({ message: "Hall removed from favorites" })
  } catch (error) {
    console.error("Remove from favorites error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user's favorite halls
router.get("/favorites", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("favorites")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user.favorites)
  } catch (error) {
    console.error("Get favorites error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
