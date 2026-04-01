/**
 * IFR Data Model
 * Defines the schema for Instrument Flight Rules (IFR) data
 */

const mongoose = require('mongoose');

const ifrDataSchema = new mongoose.Schema(
  {
    flightNumber: {
      type: String,
      required: [true, 'Flight number is required'],
      index: true,
    },
    aircraft: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
    altitude: {
      type: Number,
      required: true,
      min: 0,
    },
    speed: {
      type: Number,
      required: true,
      min: 0,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    heading: {
      type: Number,
      min: 0,
      max: 360,
    },
    verticalSpeed: {
      type: Number,
    },
    windSpeed: {
      type: Number,
    },
    windDirection: {
      type: Number,
    },
    visibility: {
      type: Number,
    },
    cloudCeiling: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
ifrDataSchema.index({ flightNumber: 1, timestamp: -1 });

// Geospatial index for location-based queries
ifrDataSchema.index({ latitude: '2d', longitude: '2d' });

module.exports = mongoose.model('IFRData', ifrDataSchema);