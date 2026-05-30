const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const emptyStore = {
    users: [],
    assessments: [],
    threatScans: [],
};

const ensureStore = () => {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(emptyStore, null, 2));
    }
};

const readStore = () => {
    ensureStore();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return raw ? { ...emptyStore, ...JSON.parse(raw) } : { ...emptyStore };
};

const writeStore = (store) => {
    ensureStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
};

const createId = () => crypto.randomUUID();

const withoutPassword = (user) => {
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
};

module.exports = {
    createId,
    readStore,
    writeStore,
    withoutPassword,
};
