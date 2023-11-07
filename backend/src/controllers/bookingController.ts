import { Router } from 'express';
import bookingModel from '../models/bookingModel';
import { verifyToken } from '../authentication/auth';

const router = Router();

router.post('/', verifyToken, bookingModel.createNewBooking);   //POST - Creates new booking at /api/bookings/
router.get('/', verifyToken, bookingModel.getAllUserBookings);   //GET - Gets all the users bookings /api/bookings/

// POST example
// {
//   "dates": ["2023-12-01", "2023-12-02", "2023-12-03"],
//   "listingId": "6542ae521d59dda87cd5afa8"
// }

export default router;