const jwt = require('jsonwebtoken');
const { readStore, withoutPassword } = require('../utils/dataStore');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const store = readStore();
        const user = store.users.find((item) => item.id === decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        req.user = withoutPassword(user);
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'User role is not authorized to access this route' });
        }
        next();
    };
};
