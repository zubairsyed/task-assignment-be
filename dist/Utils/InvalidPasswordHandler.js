"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUnblockUser = void 0;
const date_fns_1 = require("date-fns");
const shouldUnblockUser = (lastTimestamp, resendAfterMinutes) => {
    const currentTime = new Date().toISOString();
    const validateLastTimestamp = (0, date_fns_1.addMinutes)(new Date(lastTimestamp), resendAfterMinutes).toISOString();
    const unblockUserTimeStamp = currentTime > validateLastTimestamp;
    return { validateLastTimestamp, unblockUserTimeStamp };
};
exports.shouldUnblockUser = shouldUnblockUser;
