"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIP = void 0;
const getIP = (req) => {
    var _a;
    try {
        const conRemoteAddress = req.connection.conRemoteAddress;
        const sockRemoteAddress = (_a = req.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress;
        const xRealIP = req.headers["x-real-ip"];
        const xFOrwardedForIP = (() => {
            const xFOrwardedFor = req.headers["x-forwarded-for"];
            if (xFOrwardedFor) {
                const ips = xFOrwardedFor.split(",").map((ip) => ip.trim());
                return ips[0];
            }
        })();
        return xFOrwardedForIP || xRealIP || sockRemoteAddress || conRemoteAddress;
    }
    catch (err) {
        return "";
    }
};
exports.getIP = getIP;
