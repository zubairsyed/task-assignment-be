import { Router } from "express";
import { signIn, signUp, testApi } from "../controllers/Users/Users.controller";
import {
  signInValidation,
  signUpValidation,
} from "../controllers/Users/Users.dto";
import { validate } from "../../Middleware/ValidateMiddleware";
const userRouter = Router();

userRouter.post("/sign-up", validate(signUpValidation), signUp);
userRouter.post("/sign-in", validate(signInValidation), signIn);
userRouter.get("/test", testApi);

export default userRouter;
