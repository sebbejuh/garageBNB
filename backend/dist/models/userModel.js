"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../authentication/auth");
// REGISTER USER
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'You need to enter all the fields'
        });
    }
    // Check if email already exists
    const existingUser = await userSchema_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }
    const salt = bcryptjs_1.default.genSaltSync(10);
    bcryptjs_1.default.hash(password, salt, (err, hash) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed when encrypting the password'
            });
        }
        userSchema_1.default.create({
            email,
            passwordHash: hash
        })
            .then(user => {
            res.status(201).json({
                token: (0, auth_1.generateToken)(user)
            });
        });
    });
};
// END
// LOGIN USER
const loginUser = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'You need to enter all the fields'
        });
    }
    userSchema_1.default.findOne({ email }) //finds email and sends it on
        .then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Incorrect credentials'
            });
        }
        bcryptjs_1.default.compare(password, user.passwordHash, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: 'Something went wrong when decrypting the password'
                });
            }
            if (!result) {
                return res.status(401).json({
                    message: 'Incorrect credentials'
                });
            }
            res.status(200).json({ token: (0, auth_1.generateToken)(user) }); //sends token
        });
    });
};
// END
// GET USER DATA
const getUserData = (req, res, next) => {
    if (req.userData) {
        const { _id, email } = req.userData;
        userSchema_1.default.findById(_id).select('-passwordHash') //excludes the passwordHash from the response
            .then(user => {
            res.status(200).json(user);
        })
            .catch(err => {
            next(err);
        });
    }
    else {
        res.status(401).json({
            message: 'User data not found'
        });
    }
};
// END
// EXPORTS
exports.default = {
    registerUser,
    loginUser,
    getUserData
};
