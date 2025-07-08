"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_router_1 = __importDefault(require("./Users.router"));
const Test_router_1 = __importDefault(require("./Test.router"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/auth", Users_router_1.default);
mainRouter.use("/test", Test_router_1.default);
exports.default = mainRouter;
