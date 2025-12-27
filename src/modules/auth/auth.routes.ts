import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import * as authController from "./auth.controller";
import { AuthRequest } from "../../types/global";

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

export default router;
