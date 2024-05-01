"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controllers/payment");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const paymentRoutes = (0, express_1.Router)();
paymentRoutes.post("/create-checkout-session", authMiddleware_1.authMiddleware, payment_1.checkout);
exports.default = paymentRoutes;
