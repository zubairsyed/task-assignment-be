import { Router } from "express";
import { signIn, signUp, testApi } from "../controllers/Users/Users.controller";
import { signUpValidation } from "../controllers/Users/Users.dto";
import { validate } from "../../Middleware/ValidateMiddleware";
const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.get("/test", testApi);

export default userRouter;
