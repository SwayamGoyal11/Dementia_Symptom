const ThreatScan = require('../models/ThreatScan');
const aiSimulator = require('../utils/aiSimulator');

exports.scanUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: 'URL is required' });

        const result = aiSimulator.analyzeUrl(url);

        const scan = await ThreatScan.create({
            user: req.user.id,
            scanType: 'url',
            target: url,
            ...result
        });

        res.status(200).json({ success: true, data: scan });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.scanEmail = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ success: false, message: 'Email text is required' });

        const result = aiSimulator.analyzeEmail(text);

        const scan = await ThreatScan.create({
            user: req.user.id,
            scanType: 'email',
            target: text.substring(0, 50) + '...',
            ...result
        });

        res.status(200).json({ success: true, data: scan });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const scans = await ThreatScan.find({ user: req.user.id }).sort('-scannedAt');
        res.status(200).json({ success: true, data: scans });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
