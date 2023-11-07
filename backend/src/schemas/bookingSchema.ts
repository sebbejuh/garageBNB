import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
    listing:        {type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true},
    user:           {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    dates:          [{type: String, required: true}]
});

export default mongoose.model('Booking', bookingSchema);