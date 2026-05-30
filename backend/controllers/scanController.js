const aiSimulator = require('../utils/aiSimulator');
const { createId, readStore, writeStore } = require('../utils/dataStore');

exports.scanUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ success: false, message: 'URL is required' });

        const result = aiSimulator.analyzeUrl(url);

        const store = readStore();
        const scan = {
            id: createId(),
            user: req.user.id,
            scanType: 'url',
            target: url,
            ...result,
            scannedAt: new Date().toISOString(),
        };

        store.threatScans.push(scan);
        writeStore(store);

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

        const store = readStore();
        const scan = {
            id: createId(),
            user: req.user.id,
            scanType: 'email',
            target: text.substring(0, 50) + '...',
            ...result,
            scannedAt: new Date().toISOString(),
        };

        store.threatScans.push(scan);
        writeStore(store);

        res.status(200).json({ success: true, data: scan });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const scans = readStore().threatScans
            .filter((scan) => scan.user === req.user.id)
            .sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));
        res.status(200).json({ success: true, data: scans });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
