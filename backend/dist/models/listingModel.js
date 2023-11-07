"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listingSchema_1 = __importDefault(require("../schemas/listingSchema"));
// ADD LISTING START
// const addListing = (req: Request, res: Response) => {
//     const { category, host, hostImgURL, imageURL, city, address, description, price } = req.body;
//     if(!category || !host || !hostImgURL || !imageURL || !city || !address || !description || !price) {
//         res.status(400).json({
//             message: 'You need to enter all the fields.'
//         })
//         return
//     }
//     Listing.create({ category, host, hostImgURL, imageURL, city, address, description, price })
//         .then(data => {
//             res.status(201).json(data)
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: 'Something went wrong when creating the listing.',
//                 err: err.message
//             })
//         })
// }
// END
// GET ALL LISTINGS START
const getAllListings = (req, res) => {
    listingSchema_1.default.find()
        .then(data => {
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when fetching all products.'
        });
    });
};
// END
// GET ONE LISTING START
const getOneListing = (req, res) => {
    listingSchema_1.default.findById(req.params.id)
        .then(data => {
        if (!data) {
            res.status(404).json({
                message: 'Could not find listing with that id.'
            });
            return;
        }
        res.status(200).json(data);
    })
        .catch(err => {
        res.status(500).json({
            message: 'Something went wrong when fetching the listing.',
            err: err.message
        });
    });
};
// END
// EXPORTS
exports.default = {
    // addListing,
    getAllListings,
    getOneListing
};
