const express = require('express');
const { scanUrl, scanEmail, getHistory } = require('../controllers/scanController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/url', protect, scanUrl);
router.post('/email', protect, scanEmail);
router.get('/history', protect, getHistory);

module.exports = router;
