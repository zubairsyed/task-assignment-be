import { Router } from "express";
import userRouter from "./Users.router";
import testRouter from "./Test.router";

const mainRouter = Router();

mainRouter.use("/auth", userRouter);
mainRouter.use("/test", testRouter);

export default mainRouter;
