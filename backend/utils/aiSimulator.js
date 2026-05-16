// Dummy AI logic for simulating threat detection

exports.analyzeUrl = (url) => {
    const suspiciousKeywords = ['login', 'verify', 'update', 'secure', 'account', 'banking', 'free', 'gift'];
    let score = 100;
    let indicators = [];

    // Simulate checks
    if (!url.startsWith('https://')) {
        score -= 20;
        indicators.push('No HTTPS encryption');
    }

    const lowerUrl = url.toLowerCase();
    let keywordCount = 0;
    suspiciousKeywords.forEach(kw => {
        if (lowerUrl.includes(kw)) {
            keywordCount++;
            indicators.push(`Suspicious keyword found: ${kw}`);
            score -= 10;
        }
    });

    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
        score -= 40;
        indicators.push('URL is IP-based (High Risk)');
    }

    if (lowerUrl.includes('bit.ly') || lowerUrl.includes('tinyurl')) {
        score -= 15;
        indicators.push('URL shortener detected');
    }

    let status = 'safe';
    if (score < 50) status = 'dangerous';
    else if (score < 80) status = 'suspicious';

    return {
        status,
        confidenceScore: Math.max(0, score),
        threatIndicators: indicators.length ? indicators : ['No immediate threats detected'],
        details: `The AI analyzed the URL structure and found ${status === 'safe' ? 'no significant' : 'several'} risk factors.`
    };
};

exports.analyzeEmail = (text) => {
    let score = 100;
    let indicators = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('urgent') || lowerText.includes('immediate action')) {
        score -= 20;
        indicators.push('Urgency language used');
    }
    if (lowerText.includes('password') || lowerText.includes('ssn') || lowerText.includes('credit card')) {
        score -= 30;
        indicators.push('Requesting sensitive credentials');
    }
    if (lowerText.includes('click here') || lowerText.includes('verify your account')) {
        score -= 15;
        indicators.push('Suspicious call to action');
    }
    if (lowerText.includes('dear customer') || lowerText.includes('dear user')) {
        score -= 10;
        indicators.push('Generic greeting');
    }

    let status = 'safe';
    if (score < 50) status = 'dangerous';
    else if (score < 80) status = 'suspicious';

    return {
        status,
        confidenceScore: Math.max(0, score),
        threatIndicators: indicators.length ? indicators : ['Email appears normal'],
        details: `Text analysis indicates a ${100 - Math.max(0, score)}% probability of social engineering or phishing.`
    };
};
