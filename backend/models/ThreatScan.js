const mongoose = require('mongoose');

const ThreatScanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    scanType: {
        type: String,
        enum: ['url', 'email', 'qr', 'file'],
        required: true
    },
    target: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['safe', 'suspicious', 'dangerous'],
        required: true
    },
    confidenceScore: {
        type: Number,
        required: true
    },
    threatIndicators: [String],
    details: {
        type: String
    },
    scannedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ThreatScan', ThreatScanSchema);
