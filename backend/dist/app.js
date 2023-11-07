"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const listingController_1 = __importDefault(require("./controllers/listingController"));
const userController_1 = __importDefault(require("./controllers/userController"));
const bookingController_1 = __importDefault(require("./controllers/bookingController"));
const app = (0, express_1.default)();
//  Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//  Controllers
app.use('/api/listings', listingController_1.default);
app.use('/api/users', userController_1.default);
app.use('/api/bookings', bookingController_1.default);
exports.default = app; //exports app
