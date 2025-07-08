"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expiresIn) => {
    try {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    }
    catch (error) {
        return null;
    }
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err)
                return resolve(null);
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
