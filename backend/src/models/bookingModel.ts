import Booking from '../schemas/bookingSchema';
import { Response } from 'express';
import { RequestWithUserData } from '../types/types';

// CREATE NEW BOOKING
const createNewBooking = async (req: RequestWithUserData, res: Response) => {
  const { dates, listingId } = req.body;

  if(!dates || !listingId || !req.userData) {
    return res.status(400).json({
      message: 'You need to enter all fields'
    })
  }
  try {
    const booking = await Booking.create({
      dates,
      listing: listingId,
      user: req.userData._id
    })
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when creating the booking',
      err: (err as Error).message
    })
  }
}
// END
// GET ALL USER BOOKINGS START
const getAllUserBookings = async (req: RequestWithUserData, res: Response) => {
  if (!req.userData) {
    return res.status(400).json({
      message: 'User data not found'
    })
  }

  try {
    const bookings = await Booking.find({ user: req.userData._id }).populate('listing');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong when fetching the bookings',
      err: (err as Error).message
    })
  }
}
// END
// EXPORTS
export default {
  createNewBooking,
  getAllUserBookings
};