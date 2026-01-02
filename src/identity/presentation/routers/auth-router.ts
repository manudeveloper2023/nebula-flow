import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { container } from "tsyringe";
const router = Router();
const authController = container.resolve(AuthController);
router.post("/register", authController.register.bind(authController));

export { router as authRouter };
