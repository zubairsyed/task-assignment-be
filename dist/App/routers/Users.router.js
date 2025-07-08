"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controller_1 = require("../controllers/Users/Users.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/sign-up", Users_controller_1.signUp);
userRouter.post("/sign-in", Users_controller_1.signIn);
userRouter.get("/test", Users_controller_1.testApi);
exports.default = userRouter;
