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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testApi = exports.signIn = exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Users_model_1 = __importDefault(require("./Users.model"));
const InvalidPasswordHandler_1 = require("../../../Utils/InvalidPasswordHandler");
const Jwt_1 = require("../../../libs/service-utils/Jwt");
const Constants_1 = require("../../../libs/Constants/Constants");
const BlockedIps_model_1 = require("../BlockedIps/BlockedIps.model");
const Network_Utils_1 = require("../../../Utils/Network.Utils");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield Users_model_1.default.findOne({
        email: req.body.email,
    })
        .lean()
        .exec();
    if (isUserExists) {
        res.status(409).send("User already exists, please login!");
        return;
    }
    req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
    const newUser = yield Users_model_1.default.create(Object.assign(Object.assign({}, req.body), { passwordLastUpdated: new Date() }));
    res.status(200).send({ message: `Sign-Up Success!`, user: newUser });
    return;
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield Users_model_1.default.findOne({
        email: req.body.email,
    })
        .lean()
        .exec();
    if (!isUserExists) {
        return res.status(401).send("Email or Password are incorrect!");
    }
    const invalidPasswordCount = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.invalidPasswordTimestamps;
    if (invalidPasswordCount.length >= 5) {
        const unblockUser = (0, InvalidPasswordHandler_1.shouldUnblockUser)(invalidPasswordCount[invalidPasswordCount.length - 1], Constants_1.INVALID_PASSWORD_BLOCK_EXPIRY);
        if (!unblockUser.unblockUserTimeStamp) {
            return res.status(403).send({
                message: `You are temporarily blocked, due to too many invalid attempts!, ${new Date(unblockUser.validateLastTimestamp)}`,
            });
        }
        yield Users_model_1.default.findByIdAndUpdate({ _id: isUserExists._id }, { $set: { invalidPasswordTimestamps: [] } });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password);
    if (!isPasswordValid) {
        const updateInvalidPasswordCount = yield Users_model_1.default.findByIdAndUpdate({ _id: isUserExists._id }, { $push: { invalidPasswordTimestamps: new Date().toISOString() } });
        const ip = (0, Network_Utils_1.getIP)(req);
        const addIp = yield BlockedIps_model_1.BlockedIPsModel.findOneAndUpdate({ ip: ip }, {
            $inc: { count: 1 },
            $push: { invalidPasswordTimestamps: new Date().toISOString() },
            expiresAt: null,
        }, { upsert: true, new: true });
        if ((addIp === null || addIp === void 0 ? void 0 : addIp.count) >= 15) {
            const getCount = yield BlockedIps_model_1.BlockedIPsModel.findOneAndUpdate({ ip: addIp === null || addIp === void 0 ? void 0 : addIp.ip }, {
                isBlocked: true,
                expiresAt: new Date(Date.now() + Constants_1.BLOCKEDIPS_EXPIRES_AT * 60 * 1000),
            }, { new: true });
            return res.status(401).send({
                message: `IP temporarily blocked due to excessive failed login attempts, Unblocks At ${getCount === null || getCount === void 0 ? void 0 : getCount.expiresAt}`,
            });
        }
        return res.status(401).send({ message: "Invalid Credentials!" });
    }
    const accessToken = (0, Jwt_1.createToken)({
        email: req.body.email,
        id: isUserExists._id,
    }, process.env.JWT_SECRET, Constants_1.ACCESS_TOKEN_EXPIRY);
    if (!accessToken) {
        return res
            .status(500)
            .json({ message: "Could not generate access token." });
    }
    const { password, invalidPasswordTimestamps, passwordLastUpdated, createdAt, updatedAt, __v } = isUserExists, safeUser = __rest(isUserExists, ["password", "invalidPasswordTimestamps", "passwordLastUpdated", "createdAt", "updatedAt", "__v"]); // make sure it's a plain object
    return res.status(200).send({ message: { accessToken, safeUser } });
});
exports.signIn = signIn;
const testApi = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ message: "success!!" });
});
exports.testApi = testApi;
