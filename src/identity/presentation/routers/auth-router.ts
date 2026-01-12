import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import { container } from "tsyringe";
import { CanAccessMiddleware } from "../middlewares/can-access-middleware";
import { RoleName } from "../../domain/entities/role";
const router = Router();

const authController = container.resolve(AuthController);

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

export { router as authRouter };
