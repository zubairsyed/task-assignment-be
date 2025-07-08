"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const Jwt_1 = require("../libs/service-utils/Jwt");
const startsWithAny = (string, prefixes) => prefixes.some((prefix) => string.startsWith(prefix));
const isAuthRoute = (path) => path.startsWith("/auth");
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (isAuthRoute(req === null || req === void 0 ? void 0 : req.path)) {
            return next();
        }
        const authHeader = req.headers.authorization;
        // Check if Authorization header is present
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
                .status(401)
                .json({ message: "Authorization token missing or malformed" });
            return;
        }
        const token = authHeader.split(" ")[1];
        // Validate token
        const decoded = yield (0, Jwt_1.verifyToken)(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.status(401).json({ message: "Invalid or expired token" });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.AuthMiddleware = AuthMiddleware;
