"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingSchema_1 = __importDefault(require("../schemas/bookingSchema"));
// CREATE NEW BOOKING
const createNewBooking = async (req, res) => {
    const { dates, listingId } = req.body;
    if (!dates || !listingId || !req.userData) {
        return res.status(400).json({
            message: 'You need to enter all fields'
        });
    }
    try {
        const booking = await bookingSchema_1.default.create({
            dates,
            listing: listingId,
            user: req.userData._id
        });
        res.status(201).json(booking);
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong when creating the booking',
            err: err.message
        });
    }
};
// END
// GET ALL USER BOOKINGS START
const getAllUserBookings = async (req, res) => {
    if (!req.userData) {
        return res.status(400).json({
            message: 'User data not found'
        });
    }
    try {
        const bookings = await bookingSchema_1.default.find({ user: req.userData._id }).populate('listing');
        res.status(200).json(bookings);
    }
    catch (err) {
        res.status(500).json({
            message: 'Something went wrong when fetching the bookings',
            err: err.message
        });
    }
};
// END
// EXPORTS
exports.default = {
    createNewBooking,
    getAllUserBookings
};
