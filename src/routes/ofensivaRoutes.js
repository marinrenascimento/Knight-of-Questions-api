import express from "express";
import { OfensivaController } from "../controllers/ofensivaController.js";

const router = express.Router();

router.get("/:userId", OfensivaController.getOfensivaByUser);

router.post("/update/:userId", OfensivaController.updateOfensiva);

export default router;
