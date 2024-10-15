import { Router } from "express";
import { uploadData } from "../controllers/upload.controller";

const router = Router();

router.get("/", uploadData);

export default router;
