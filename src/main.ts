import express from "express";
import dbInit from "./database";
import mainRouter from "./App/routers";
import {
  blockedIpStatus,
  globalRateLimiter,
} from "./Middleware/RateLimiterMiddleware";
import {
  GLOBAL_MAXIMUM_REQUESTS,
  GLOBAL_RATE_LIMIT_DURATION,
} from "./libs/Constants/Constants";
import dotenv from "dotenv";
import { AuthMiddleware } from "./Middleware/AuthMiddleware";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb" }));
app.use(blockedIpStatus);
app.use(globalRateLimiter(GLOBAL_RATE_LIMIT_DURATION, GLOBAL_MAXIMUM_REQUESTS));
app.use(AuthMiddleware);
app.use("/", mainRouter);

dbInit();
app.listen(PORT, () => {
  console.log("server started @ ", PORT);
});
