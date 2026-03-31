const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String, enum: ['concert', 'tech', 'art', 'food'], default: 'concert' },
    image: { type: String, required: true },
    date: Date,
    time: String,
    location: String,
    base_price: { type: Number, required: true },
    pricing_rules: { threshold: { type: Number, default: 0.8 }, hike: { type: Number, default: 1.25 } },
    seating_config: { total_rows: { type: Number, default: 10 }, total_cols: { type: Number, default: 20 }, sections: [String] },
    view_points: [{ section: String, cam_pos: { x: Number, y: Number, z: Number } }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema)