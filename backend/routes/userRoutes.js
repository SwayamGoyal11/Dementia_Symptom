const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { readStore, writeStore, withoutPassword } = require('../utils/dataStore');

const router = express.Router();

router.get('/profile', protect, async (req, res) => {
    try {
        res.status(200).json({ success: true, data: req.user });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put('/profile', protect, async (req, res) => {
    try {
        const { name, email } = req.body;
        const store = readStore();
        const userIndex = store.users.findIndex((user) => user.id === req.user.id);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const normalizedEmail = email ? email.toLowerCase().trim() : store.users[userIndex].email;
        const emailTaken = store.users.some((user) => user.id !== req.user.id && user.email === normalizedEmail);

        if (emailTaken) {
            return res.status(400).json({ success: false, message: 'Email is already in use' });
        }

        store.users[userIndex] = {
            ...store.users[userIndex],
            name: name ? name.trim() : store.users[userIndex].name,
            email: normalizedEmail,
        };

        writeStore(store);
        res.status(200).json({ success: true, data: withoutPassword(store.users[userIndex]) });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
