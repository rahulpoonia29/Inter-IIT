import { Router } from "express";
import {
	getAllGodowns,
	getParentGodowns,
	getGodownById,
	searchGodowns,
} from "../controllers/godown.controller";

const router = Router();

router.get("/all", getAllGodowns);
router.get("/parent", getParentGodowns);
router.get("/id", getGodownById);
router.get("/search", searchGodowns);

export default router;
