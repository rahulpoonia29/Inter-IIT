import { Router } from "express";
import { searchItems } from "../controllers/item.controller";

const router = Router();

router.get("/search", searchItems);

export default router;
