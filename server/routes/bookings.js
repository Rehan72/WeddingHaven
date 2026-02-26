const express = require("express")
const router = express.Router()
const Booking = require("../models/Booking")
const Hall = require("../models/Hall")
const { authenticateToken, authorizeRoles } = require("../middleware/auth")

// Create a new booking (authenticated users)
router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      hallId,
      eventType,
      eventDate,
      startTime,
      endTime,
      guestCount,
      totalAmount,
      advanceAmount,
      specialRequests,
    } = req.body

    // Check if hall exists
    const hall = await Hall.findById(hallId)
    if (!hall) {
      return res.status(404).json({ message: "Hall not found" })
    }

    // Check if hall is active
    if (hall.status !== "active") {
      return res.status(400).json({ message: "Hall is not available for booking" })
    }

    // Check if date is already booked
    const existingBooking = await Booking.findOne({
      hall: hallId,
      eventDate: new Date(eventDate),
      bookingStatus: { $in: ["pending", "confirmed"] },
    })

    if (existingBooking) {
      return res.status(400).json({ message: "Hall is already booked for this date" })
    }

    // Calculate balance amount
    const balanceAmount = totalAmount - (advanceAmount || 0)

    // Create booking
    const booking = new Booking({
      hall: hallId,
      user: req.user.userId,
      eventType,
      eventDate: new Date(eventDate),
      startTime,
      endTime,
      guestCount,
      totalAmount,
      advanceAmount: advanceAmount || 0,
      balanceAmount,
      paymentStatus: advanceAmount > 0 ? "partial" : "pending",
      specialRequests,
    })

    await booking.save()

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get user's bookings (authenticated users)
router.get("/my-bookings", authenticateToken, async (req, res) => {
  try {
    const { status, sort = "newest", page = 1, limit = 10 } = req.query

    // Build query
    const query = { user: req.user.userId }

    // Filter by status
    if (status && status !== "all") {
      query.bookingStatus = status
    }

    // Sorting
    let sortOption = {}
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "upcoming":
        sortOption = { eventDate: 1 }
        break
      case "price-high":
        sortOption = { totalAmount: -1 }
        break
      case "price-low":
        sortOption = { totalAmount: 1 }
        break
      default:
        sortOption = { createdAt: -1 } // newest
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Execute query
    const bookings = await Booking.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate("hall", "name location images price")
      .populate("user", "firstName lastName email")

    // Get total count
    const total = await Booking.countDocuments(query)

    res.json({
      bookings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Get bookings error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get hall owner's bookings (hall owners)
router.get("/hall-bookings", authenticateToken, authorizeRoles(["hall-owner"]), async (req, res) => {
  try {
    const { status, sort = "newest", page = 1, limit = 10 } = req.query

    // Get halls owned by the user
    const halls = await Hall.find({ owner: req.user.userId }).select("_id")
    const hallIds = halls.map((hall) => hall._id)

    // Build query
    const query = { hall: { $in: hallIds } }

    // Filter by status
    if (status && status !== "all") {
      query.bookingStatus = status
    }

    // Sorting
    let sortOption = {}
    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 }
        break
      case "upcoming":
        sortOption = { eventDate: 1 }
        break
      case "price-high":
        sortOption = { totalAmount: -1 }
        break
      case "price-low":
        sortOption = { totalAmount: 1 }
        break
      default:
        sortOption = { createdAt: -1 } // newest
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Execute query
    const bookings = await Booking.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate("hall", "name location images price")
      .populate("user", "firstName lastName email phone")

    // Get total count
    const total = await Booking.countDocuments(query)

    res.json({
      bookings,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    })
  } catch (error) {
    console.error("Get hall bookings error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get booking by ID (authenticated users, hall owners, admins)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("hall", "name location images price amenities")
      .populate("user", "firstName lastName email phone")

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user is authorized to view
    const hall = await Hall.findById(booking.hall._id)

    if (
      booking.user._id.toString() !== req.user.userId &&
      hall.owner.toString() !== req.user.userId &&
      !["admin", "super-admin"].includes(req.user.role)
    ) {
      return res.status(403).json({ message: "Not authorized to view this booking" })
    }

    res.json(booking)
  } catch (error) {
    console.error("Get booking error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update booking status (hall owners for their halls, admins)
router.put("/:id/status", authenticateToken, async (req, res) => {
  try {
    const { status } = req.body

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user is authorized to update
    const hall = await Hall.findById(booking.hall)

    if (hall.owner.toString() !== req.user.userId && !["admin", "super-admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to update this booking" })
    }

    booking.bookingStatus = status

    if (status === "cancelled") {
      booking.cancellationReason = req.body.cancellationReason || "Cancelled by hall owner"
    }

    await booking.save()

    res.json({
      message: "Booking status updated successfully",
      booking,
    })
  } catch (error) {
    console.error("Update booking status error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Cancel booking (user who made the booking)
router.put("/:id/cancel", authenticateToken, async (req, res) => {
  try {
    const { cancellationReason } = req.body

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    // Check if user is authorized to cancel
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" })
    }

    // Check if booking can be cancelled
    if (booking.bookingStatus === "completed" || booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: `Booking is already ${booking.bookingStatus}` })
    }

    booking.bookingStatus = "cancelled"
    booking.cancellationReason = cancellationReason || "Cancelled by user"

    await booking.save()

    res.json({
      message: "Booking cancelled successfully",
      booking,
    })
  } catch (error) {
    console.error("Cancel booking error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Update payment status (admin, super admin)
router.put("/:id/payment", authenticateToken, authorizeRoles(["admin", "super-admin"]), async (req, res) => {
  try {
    const { paymentStatus, advanceAmount, balanceAmount } = req.body

    if (!["pending", "partial", "paid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" })
    }

    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" })
    }

    booking.paymentStatus = paymentStatus

    if (advanceAmount !== undefined) {
      booking.advanceAmount = advanceAmount
    }

    if (balanceAmount !== undefined) {
      booking.balanceAmount = balanceAmount
    }

    await booking.save()

    res.json({
      message: "Payment status updated successfully",
      booking,
    })
  } catch (error) {
    console.error("Update payment status error:", error)
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
