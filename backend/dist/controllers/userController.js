"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userModel_1 = __importDefault(require("../models/userModel"));
const auth_1 = require("../authentication/auth");
const router = (0, express_1.Router)();
router.post('/register', userModel_1.default.registerUser); //POST - Register a new user & recieve a token- /api/users/register
router.post('/login', userModel_1.default.loginUser); //POST - Login a user & recieve a token- /api/users/login
router.get('/me', auth_1.verifyToken, userModel_1.default.getUserData); //GET - gives userinfo - /api/users/me
// POST example
// {
//   "email": "apa@apa.se",
//   "password": "apa123"
// }
exports.default = router;
