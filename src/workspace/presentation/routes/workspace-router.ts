import { Router } from "express";
import { AuthJwtMiddleware } from "../../../shared/auth/auth-jwt-middleware";
import { container } from "tsyringe";
import { WorkspaceController } from "../controller/workspace-controller";

const router = Router();
const authMiddleware = container.resolve(AuthJwtMiddleware);
const workspaceController = container.resolve(WorkspaceController);

router.use(authMiddleware.handle);

router.post("/", workspaceController.save);
export { router as workspaceRouter };
