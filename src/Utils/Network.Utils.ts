export const getIP = (req: any) => {
  try {
    const conRemoteAddress = req.connection.conRemoteAddress;
    const sockRemoteAddress = req.socket?.remoteAddress;
    const xRealIP = req.headers["x-real-ip"];
    const xFOrwardedForIP = (() => {
      const xFOrwardedFor = req.headers["x-forwarded-for"];
      if (xFOrwardedFor) {
        const ips = xFOrwardedFor.split(",").map((ip: any) => ip.trim());
        return ips[0];
      }
    })();
    return xFOrwardedForIP || xRealIP || sockRemoteAddress || conRemoteAddress;
  } catch (err) {
    return "";
  }
};
