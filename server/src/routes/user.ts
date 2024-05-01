import { Router } from "express";
import { profile, 
    contribute, 
    uploadedInnovativeProducts, 
    uploadedWasteRequirements, 
    satisfiedWasteRequirements, 
    contributions,
    orders,
    getOrders,
} from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRoutes : Router = Router();

userRoutes.get("/profile", authMiddleware, profile);
userRoutes.post("/contribution/:id", authMiddleware, contribute);
userRoutes.get("/getUploadedProducts", authMiddleware, uploadedInnovativeProducts);
userRoutes.get("/getUploadedWasteRequirements", authMiddleware, uploadedWasteRequirements);
userRoutes.get("/getSatisfiedWasterequirements", authMiddleware, satisfiedWasteRequirements);
userRoutes.get("/getContributions" , authMiddleware, contributions); 
userRoutes.post("/order/:productId", authMiddleware, orders);
userRoutes.get("/getOrders", authMiddleware, getOrders);

export default userRoutes;