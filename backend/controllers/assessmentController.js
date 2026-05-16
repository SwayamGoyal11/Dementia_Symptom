const Assessment = require('../models/Assessment');
const { calculateRisk, generateRecommendations } = require('../utils/scoringEngine');

exports.submitAssessment = async (req, res) => {
    try {
        const { digitalUsage, stress, cognitive } = req.body;

        if (!digitalUsage || !stress || !cognitive) {
            return res.status(400).json({ success: false, message: 'Incomplete assessment data' });
        }

        const data = { digitalUsage, stress, cognitive };
        const results = calculateRisk(data);
        const recommendations = generateRecommendations(results, data);

        const assessment = await Assessment.create({
            user: req.user.id,
            digitalUsage,
            stress,
            cognitive,
            results,
            recommendations
        });

        // Update user risk score for quick access
        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user.id, { $set: { riskScore: results.overallRiskScore } });

        res.status(201).json({ success: true, data: assessment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const assessments = await Assessment.find({ user: req.user.id }).sort('-completedAt');
        res.status(200).json({ success: true, data: assessments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getLatestAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findOne({ user: req.user.id }).sort('-completedAt');
        res.status(200).json({ success: true, data: assessment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        // Admin route to get overall anonymized analytics
        const totalAssessments = await Assessment.countDocuments();
        const assessments = await Assessment.find();
        
        const avgRisk = assessments.reduce((acc, curr) => acc + curr.results.overallRiskScore, 0) / totalAssessments || 0;
        
        let highRiskCount = 0;
        assessments.forEach(a => {
            if(a.results.riskCategory === 'High Risk') highRiskCount++;
        });

        res.status(200).json({
            success: true,
            data: {
                totalAssessments,
                averageRiskScore: Math.round(avgRisk),
                highRiskPercentage: totalAssessments ? Math.round((highRiskCount / totalAssessments) * 100) : 0
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
