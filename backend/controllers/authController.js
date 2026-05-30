const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createId, readStore, writeStore, withoutPassword } = require('../utils/dataStore');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, ageRange, academicStatus } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }

        const store = readStore();
        const normalizedEmail = email.toLowerCase().trim();
        const userExists = store.users.some((user) => user.email === normalizedEmail);

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = {
            id: createId(),
            name: name.trim(),
            email: normalizedEmail,
            password: await bcrypt.hash(password, 10),
            ageRange: ageRange || '',
            academicStatus: academicStatus || '',
            role: store.users.length === 0 ? 'admin' : 'user',
            riskScore: 0,
            createdAt: new Date().toISOString(),
        };

        store.users.push(user);
        writeStore(store);

        res.status(201).json({
            success: true,
            token: generateToken(user.id),
            user: withoutPassword(user)
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const store = readStore();
        const normalizedEmail = email.toLowerCase().trim();
        const user = store.users.find((item) => item.email === normalizedEmail);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.status(200).json({
            success: true,
            token: generateToken(user.id),
            user: withoutPassword(user)
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        res.status(200).json({ success: true, data: withoutPassword(req.user) });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
