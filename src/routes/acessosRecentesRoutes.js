import express from "express";
import { AcessosRecentesController } from "../controllers/acessosRecentesController.js";

const router = express.Router();

router.get("/:userId", AcessosRecentesController.getAllAcessosRecentesByUser);

export default router;