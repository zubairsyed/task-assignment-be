"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedIPsModel = exports.BLOCKEDIP_DOCUMENT = void 0;
const mongoose_1 = require("mongoose");
exports.BLOCKEDIP_DOCUMENT = "blocked-ips";
const schema = new mongoose_1.Schema({
    ip: { type: String },
    count: { type: Number },
    blockedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
    userEmail: { type: String },
    isBlocked: { type: Boolean, default: false },
});
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.BlockedIPsModel = (0, mongoose_1.model)(exports.BLOCKEDIP_DOCUMENT, schema);
