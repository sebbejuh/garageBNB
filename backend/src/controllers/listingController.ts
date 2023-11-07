import { Router } from 'express';
import listingModel from '../models/listingModel';

const router = Router();

//router.post('/', listingModel.addListing);   //POST - Creates new product /api/products/
router.get('/', listingModel.getAllListings);  //GET - Gets all products /api/products/
router.get('/:id', listingModel.getOneListing); //GET - Gets one product with the correct id /api/products/id

// POST example
// {
//   "category": "Bil",
//   "host": "Anders Andersson",
//   "hostImgURL": "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
//   "imageURL": "https://gotenehus.se/app/uploads/2022/09/garage-och-carport-scaled.jpg",
//   "city": "Stockholm",
//   "address": "götgatan 122",
//   "description": "Ett väldigt fint garage som rymmer de största bilarna.",
//   "price": 300
// }

export default router;