const express = require('express');
const { submitAssessment, getHistory, getLatestAssessment, getAnalytics } = require('../controllers/assessmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', protect, submitAssessment);
router.get('/history', protect, getHistory);
router.get('/latest', protect, getLatestAssessment);
router.get('/analytics', protect, authorize('admin', 'researcher'), getAnalytics);

module.exports = router;
