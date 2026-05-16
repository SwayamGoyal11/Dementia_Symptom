const mongoose = require('mongoose');

const AssessmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    digitalUsage: {
        screenTime: Number, // hours
        appsUsed: Number,
        appSwitching: Number, // 1-5
        notificationFreq: Number, // 1-5
        longestSession: Number, // hours
        nightUsage: Number, // 1-5
        socialMedia: Number, // 1-5
        compulsiveChecking: Number, // 1-5
    },
    stress: {
        mentalFatigue: Number, // 1-5
        notificationAnxiety: Number, // 1-5
        taskOverwhelm: Number, // 1-5
        difficultyRelaxing: Number, // 1-5
        sleepDisturbance: Number, // 1-5
        physicalSymptoms: Number, // 1-5
        irritability: Number, // 1-5
        productivityAnxiety: Number, // 1-5
    },
    cognitive: {
        generalForgetfulness: Number, // 1-5
        shortTermMemory: Number, // 1-5
        informationRetention: Number, // 1-5
        focusFragmentation: Number, // 1-5
        attentionSpan: Number, // 1-5
        spatialAwareness: Number, // 1-5
        slowerThinking: Number, // 1-5
        problemSolving: Number, // 1-5
        creativeThinking: Number, // 1-5
    },
    results: {
        digitalOverloadIndex: Number,
        stressIndex: Number,
        cognitiveImpactIndex: Number,
        overallRiskScore: Number,
        riskCategory: {
            type: String,
            enum: ['Low Risk', 'Moderate Risk', 'High Risk']
        }
    },
    recommendations: [{
        category: String,
        title: String,
        description: String,
        priority: String
    }],
    completedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', AssessmentSchema);
