import express from 'express';
import cors from 'cors';
import listingController from './controllers/listingController';
import userController from './controllers/userController'
import bookingController from './controllers/bookingController'

const app = express();

//  Middleware
app.use(cors())
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
//  Controllers
app.use('/api/listings', listingController);
app.use('/api/users', userController);
app.use('/api/bookings', bookingController);

export default app;   //exports app