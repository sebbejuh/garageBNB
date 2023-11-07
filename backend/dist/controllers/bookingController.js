"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const auth_1 = require("../authentication/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.verifyToken, bookingModel_1.default.createNewBooking); //POST - Creates new booking at /api/bookings/
router.get('/', auth_1.verifyToken, bookingModel_1.default.getAllUserBookings); //GET - Gets all the users bookings /api/bookings/
// POST example
// {
//   "dates": ["2023-12-01", "2023-12-02", "2023-12-03"],
//   "listingId": "6542ae521d59dda87cd5afa8"
// }
exports.default = router;
