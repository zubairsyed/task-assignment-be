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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalRateLimiter = exports.blockedIpStatus = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Network_Utils_1 = require("../Utils/Network.Utils");
const BlockedIps_model_1 = require("../App/controllers/BlockedIps/BlockedIps.model");
const Constants_1 = require("../libs/Constants/Constants");
// To exit user, if ip is in blocked state
const blockedIpStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ip = (0, Network_Utils_1.getIP)(req);
    const ipTracker = yield BlockedIps_model_1.BlockedIPsModel.findOne({ ip: ip });
    if (ipTracker === null || ipTracker === void 0 ? void 0 : ipTracker.isBlocked) {
        res.status(429).send({
            message: `IP temporarily blocked! gets unblocked at , ${(ipTracker === null || ipTracker === void 0 ? void 0 : ipTracker.expiresAt) ||
                new Date(Date.now() + Constants_1.BLOCKEDIPS_EXPIRES_AT * 60 * 1000)}`,
        });
        return;
    }
    next();
});
exports.blockedIpStatus = blockedIpStatus;
// To handle bruteforce attacks from an IP
const globalRateLimiter = (windowMs, max) => {
    return (0, express_rate_limit_1.default)({
        windowMs, //x minutes
        max, // limit each IP to y requests per windowMs
        message: "Too many requests from this IP, please try again after some time",
        handler: (req, res, next, options) => __awaiter(void 0, void 0, void 0, function* () {
            //Info: This gets triggered every time an api gets called by the blocked ip, we need to log the event only once per GLOBAL_RATE_LIMIT_DURATION time
            const ip = (0, Network_Utils_1.getIP)(req);
            const unblockAt = yield BlockedIps_model_1.BlockedIPsModel.findOne({ ip: ip });
            if (!unblockAt) {
                yield BlockedIps_model_1.BlockedIPsModel.create({
                    ip: ip,
                    expiresAt: new Date(Date.now() + Constants_1.BLOCKEDIPS_EXPIRES_AT * 60 * 1000),
                    isBlocked: true,
                });
            }
            return res.status(429).send({
                message: `IP temporarily blocked due to excessive failed login attempts, ${(unblockAt === null || unblockAt === void 0 ? void 0 : unblockAt.expiresAt) ||
                    new Date(Date.now() + Constants_1.BLOCKEDIPS_EXPIRES_AT * 60 * 1000)}`,
            });
        }),
    });
};
exports.globalRateLimiter = globalRateLimiter;
