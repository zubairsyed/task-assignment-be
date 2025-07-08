"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_DOCUMENT = void 0;
const mongoose_1 = require("mongoose");
exports.USER_DOCUMENT = "users";
const schema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        index: true,
    },
    invalidPasswordTimestamps: {
        type: [Date],
    },
    password: {
        type: String,
    },
    passwordLastUpdated: {
        type: Date,
    },
}, { timestamps: true });
const UsersModel = (0, mongoose_1.model)(exports.USER_DOCUMENT, schema);
exports.default = UsersModel;
