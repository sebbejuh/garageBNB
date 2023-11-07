import mongoose, { Schema } from 'mongoose';

const listingSchema = new Schema({
    category:       {type: String, required: true},
    host:           {type: String, required: true},
    hostImgURL:     {type: String, required: true},
    imageURL:       {type: String, required: true},
    city:           {type: String, required: true},
    address:        {type: String, required: true},
    description:    {type: String, required: true},
    price:          {type: Number, required: true}
})

export default mongoose.model('Listing', listingSchema);