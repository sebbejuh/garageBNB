"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const generateToken = (user) => {
    if (!secretKey) {
        console.error('SECRET_KEY not defined in environment');
        process.exit(1);
    }
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, secretKey, { expiresIn: '365d' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    try {
        if (!secretKey) {
            console.error('SECRET_KEY not defined in environment');
            process.exit(1);
        }
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header missing!'
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decoded === 'string') {
            return res.status(401).json({
                message: 'Invalid token!'
            });
        }
        req.userData = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            message: 'Access restricted! Please Login!'
        });
    }
};
exports.verifyToken = verifyToken;
