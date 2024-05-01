import { Router } from "express"
import { addInnovativeProd, getAllInnovativeProds, innovativeProd } from "../controllers/innovativeProducts"
import { authMiddleware } from "../middlewares/authMiddleware"

const innovativeProductRoutes : Router = Router();

innovativeProductRoutes.post('/addInnovativeProd', authMiddleware, addInnovativeProd);
innovativeProductRoutes.get('/getAllInnovativeProds', authMiddleware, getAllInnovativeProds);
innovativeProductRoutes.get('/product/:id', authMiddleware, innovativeProd)

export default innovativeProductRoutes;