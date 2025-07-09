import rateLimit from "express-rate-limit";
import { getIP } from "../Utils/Network.Utils";
import { BlockedIPsModel } from "../App/controllers/BlockedIps/BlockedIps.model";
import {
  BLOCKEDIPS_EXPIRES_AT,
  GLOBAL_MAXIMUM_REQUESTS,
} from "../libs/Constants/Constants";
import { Request, Response, NextFunction } from "express";

let apiCount: number = 0;

// To exit user, if ip is in blocked state
export const blockedIpStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ip = getIP(req);
  apiCount += 1;
  const ipTracker: any = await BlockedIPsModel.findOne({ ip: ip });
  if (apiCount >= GLOBAL_MAXIMUM_REQUESTS || ipTracker?.isBlocked) {
    res.status(429).send({
      message: `IP temporarily blocked! gets unblocked at , ${
        ipTracker?.expiresAt ||
        new Date(Date.now() + BLOCKEDIPS_EXPIRES_AT * 60 * 1000)
      }`,
    });
    return;
  }
  next();
};

// To handle bruteforce attacks from an IP
export const globalRateLimiter = (windowMs: any, max: any) => {
  return rateLimit({
    windowMs, //x minutes
    max, // limit each IP to y requests per windowMs
    message: "Too many requests from this IP, please try again after some time",
    handler: async (req, res, next, options) => {
      //Info: This gets triggered every time an api gets called by the blocked ip, we need to log the event only once per GLOBAL_RATE_LIMIT_DURATION time
      const ip = getIP(req);
      const unblockAt: any = await BlockedIPsModel.findOne({ ip: ip });
      if (!unblockAt) {
        await BlockedIPsModel.findOneAndUpdate(
          { ip: ip },
          {
            expiresAt: new Date(Date.now() + BLOCKEDIPS_EXPIRES_AT * 60 * 1000),
            isBlocked: true,
          },
          { new: true, upsert: true }
        );
      }
      return res.status(429).send({
        message: `IP temporarily blocked due to excessive failed login attempts, ${
          unblockAt?.expiresAt ||
          new Date(Date.now() + BLOCKEDIPS_EXPIRES_AT * 60 * 1000)
        }`,
      });
    },
  });
};
