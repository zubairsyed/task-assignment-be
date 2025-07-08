"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_PASSWORD_BLOCK_EXPIRY = exports.ACCESS_TOKEN_EXPIRY = exports.BLOCKEDIPS_EXPIRES_AT = exports.GLOBAL_MAXIMUM_REQUESTS = exports.GLOBAL_RATE_LIMIT_DURATION = void 0;
exports.GLOBAL_RATE_LIMIT_DURATION = 5 * 60 * 1000; // 5 minutes
exports.GLOBAL_MAXIMUM_REQUESTS = 150;
exports.BLOCKEDIPS_EXPIRES_AT = 15; // minutes
exports.ACCESS_TOKEN_EXPIRY = "1h"; // 1h
exports.INVALID_PASSWORD_BLOCK_EXPIRY = 15;
