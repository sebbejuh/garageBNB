"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listingModel_1 = __importDefault(require("../models/listingModel"));
const router = (0, express_1.Router)();
//router.post('/', listingModel.addListing);   //POST - Creates new product /api/products/
router.get('/', listingModel_1.default.getAllListings); //GET - Gets all products /api/products/
router.get('/:id', listingModel_1.default.getOneListing); //GET - Gets one product with the correct id /api/products/id
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
exports.default = router;
