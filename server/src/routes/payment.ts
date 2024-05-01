import {Router} from "express";
import { checkout } from "../controllers/payment";
import { authMiddleware } from "../middlewares/authMiddleware";

const paymentRoutes: Router = Router();

paymentRoutes.post("/create-checkout-session", authMiddleware, checkout);

export default paymentRoutes;