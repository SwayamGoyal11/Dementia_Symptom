const { calculateRisk, generateRecommendations } = require('../utils/scoringEngine');
const { createId, readStore, writeStore } = require('../utils/dataStore');

exports.submitAssessment = async (req, res) => {
    try {
        const { digitalUsage, stress, cognitive } = req.body;

        if (!digitalUsage || !stress || !cognitive) {
            return res.status(400).json({ success: false, message: 'Incomplete assessment data' });
        }

        const data = { digitalUsage, stress, cognitive };
        const results = calculateRisk(data);
        const recommendations = generateRecommendations(results, data);

        const store = readStore();
        const assessment = {
            id: createId(),
            user: req.user.id,
            digitalUsage,
            stress,
            cognitive,
            results,
            recommendations,
            completedAt: new Date().toISOString(),
        };

        store.assessments.push(assessment);
        store.users = store.users.map((user) => (
            user.id === req.user.id ? { ...user, riskScore: results.overallRiskScore } : user
        ));
        writeStore(store);

        res.status(201).json({ success: true, data: assessment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const assessments = readStore().assessments
            .filter((assessment) => assessment.user === req.user.id)
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
        res.status(200).json({ success: true, data: assessments });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getLatestAssessment = async (req, res) => {
    try {
        const assessment = readStore().assessments
            .filter((item) => item.user === req.user.id)
            .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0] || null;
        res.status(200).json({ success: true, data: assessment });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const assessments = readStore().assessments;
        const totalAssessments = assessments.length;
        
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
