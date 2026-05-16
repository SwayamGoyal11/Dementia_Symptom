exports.calculateRisk = (data) => {
    // Helper to calculate average of an object's values
    const average = (obj) => {
        const values = Object.values(obj || {}).filter(val => typeof val === 'number' && Number.isFinite(val));
        if (values.length === 0) return 0;
        const sum = values.reduce((a, b) => a + b, 0);
        return (sum / values.length);
    };

    const normalize = (value, max) => Math.min(Math.max((Number(value) || 0) / max, 0), 1) * 100;

    const digitalMetrics = [
        normalize(data.digitalUsage.screenTime, 16),
        normalize(data.digitalUsage.longestSession, 8),
        normalize(data.digitalUsage.appsUsed, 20),
        normalize(data.digitalUsage.appSwitching, 5),
        normalize(data.digitalUsage.notificationFreq, 5),
        normalize(data.digitalUsage.nightUsage, 5),
        normalize(data.digitalUsage.socialMedia, 5),
        normalize(data.digitalUsage.compulsiveChecking, 5)
    ];

    const digitalOverloadIndex = Math.round(digitalMetrics.reduce((sum, score) => sum + score, 0) / digitalMetrics.length);
    const stressIndex = Math.round((average(data.stress) / 5) * 100);
    const cognitiveImpactIndex = Math.round((average(data.cognitive) / 5) * 100);

    // Weighted Overall Risk Score
    const overallRiskScore = Math.round((digitalOverloadIndex * 0.3) + (stressIndex * 0.3) + (cognitiveImpactIndex * 0.4));

    let riskCategory = 'Low Risk';
    if (overallRiskScore >= 70) {
        riskCategory = 'High Risk';
    } else if (overallRiskScore >= 40) {
        riskCategory = 'Moderate Risk';
    }

    return {
        digitalOverloadIndex,
        stressIndex,
        cognitiveImpactIndex,
        overallRiskScore,
        riskCategory
    };
};

exports.generateRecommendations = (results, data) => {
    const recs = [];

    if (results.overallRiskScore >= 70) {
        recs.push({
            category: 'Urgent Wellness',
            title: 'Structured Digital Detox',
            description: 'Your scores indicate a high level of digital cognitive overload. We highly recommend consulting a wellness professional and implementing a strict 24-hour digital detox protocol this weekend.',
            priority: 'High'
        });
    }

    if (data.digitalUsage.nightUsage >= 4) {
        recs.push({
            category: 'Sleep Hygiene',
            title: 'Implement Screen Curfew',
            description: 'Late-night screen exposure may impact memory consolidation and REM sleep. Disconnect from devices 90 minutes before bedtime.',
            priority: 'High'
        });
    }

    if (data.digitalUsage.notificationFreq >= 4 || data.stress.notificationAnxiety >= 4) {
        recs.push({
            category: 'Focus Recovery',
            title: 'Notification Fasting',
            description: 'Your notification frequency is associated with elevated cognitive fatigue. Disable all non-essential push notifications for the next 7 days.',
            priority: 'Medium'
        });
    }

    if (data.cognitive.focusFragmentation >= 4) {
        recs.push({
            category: 'Cognitive Rest',
            title: 'Pomodoro Focus Blocks',
            description: 'To rebuild sustained attention span, use 25-minute focus blocks (Pomodoro technique) with devices physically removed from your workspace.',
            priority: 'Medium'
        });
    }

    // Default recommendation if none trigger
    if (recs.length === 0) {
        recs.push({
            category: 'General Wellness',
            title: 'Maintain Healthy Boundaries',
            description: 'You are showing healthy digital habits. Continue to monitor your screen time and take regular breaks using the 20-20-20 rule.',
            priority: 'Low'
        });
    }

    return recs;
};
