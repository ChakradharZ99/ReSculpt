import { Router } from "express"
import { addWasteRequirement, getWasteRequirements, getAllWasteRequirements, getAllSatisfiedRequirements, wasteReq } from "../controllers/wasteRequirements"
import { authMiddleware } from "../middlewares/authMiddleware"

const wasteRequirementsRoutes : Router = Router();

wasteRequirementsRoutes.post('/addWasteRequirement', authMiddleware, addWasteRequirement);
wasteRequirementsRoutes.get('/getWasteRequirements', authMiddleware, getWasteRequirements);
wasteRequirementsRoutes.get('/getAllWasteRequirements', authMiddleware, getAllWasteRequirements);
wasteRequirementsRoutes.get('/getAllSatisfiedRequirements', authMiddleware, getAllSatisfiedRequirements);
wasteRequirementsRoutes.get('/requirement/:id', authMiddleware, wasteReq);

export default wasteRequirementsRoutes;