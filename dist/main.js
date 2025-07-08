"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const routers_1 = __importDefault(require("./App/routers"));
const RateLimiterMiddleware_1 = require("./Middleware/RateLimiterMiddleware");
const Constants_1 = require("./libs/Constants/Constants");
const dotenv_1 = __importDefault(require("dotenv"));
const AuthMiddleware_1 = require("./Middleware/AuthMiddleware");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb" }));
app.use(RateLimiterMiddleware_1.blockedIpStatus);
app.use((0, RateLimiterMiddleware_1.globalRateLimiter)(Constants_1.GLOBAL_RATE_LIMIT_DURATION, Constants_1.GLOBAL_MAXIMUM_REQUESTS));
app.use(AuthMiddleware_1.AuthMiddleware);
app.use("/", routers_1.default);
(0, database_1.default)();
app.listen(PORT, () => {
    console.log("server started @ ", PORT);
});
