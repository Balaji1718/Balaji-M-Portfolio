import { Router } from "express";
import { getHealth } from "../controllers/healthController.js";
import { sendContactEmail } from "../controllers/contactController.js";

const router = Router();

router.get("/health", getHealth);
router.post("/contact", sendContactEmail);

export default router;
