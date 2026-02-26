const mongoose = require("mongoose")

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceType: {
      type: String,
      enum: ["per_day", "per_hour", "fixed"],
      default: "per_day",
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    availability: {
      monday: { isAvailable: Boolean, startTime: String, endTime: String },
      tuesday: { isAvailable: Boolean, startTime: String, endTime: String },
      wednesday: { isAvailable: Boolean, startTime: String, endTime: String },
      thursday: { isAvailable: Boolean, startTime: String, endTime: String },
      friday: { isAvailable: Boolean, startTime: String, endTime: String },
      saturday: { isAvailable: Boolean, startTime: String, endTime: String },
      sunday: { isAvailable: Boolean, startTime: String, endTime: String },
    },
    blockedDates: [
      {
        startDate: Date,
        endDate: Date,
        reason: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

// Add text index for search
hallSchema.index({
  name: "text",
  "location.address": "text",
  "location.city": "text",
  description: "text",
})

const Hall = mongoose.model("Hall", hallSchema)

module.exports = Hall
