import express, { json, Router } from "express";
import "reflect-metadata";
import "./src/identity/infrastructure/container/index.ts";
import { authRouter } from "./src/identity/presentation/routers/auth-router.ts";
import { errorHandler } from "./src/identity/presentation/middlewares/error-handler.ts";

const app = express();
export const PORT = process.env.PORT || 3000;
const apiRouter = Router();

app.use(json());
app.use("/api", apiRouter);
app.use(errorHandler);

apiRouter.get("/up", (req, res) => {
    res.status(200).json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});
