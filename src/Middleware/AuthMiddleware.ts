import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../libs/service-utils/Jwt";

const startsWithAny = (string: any, prefixes: any) =>
  prefixes.some((prefix: any) => string.startsWith(prefix));

const isAuthRoute = (path: string): boolean => path.startsWith("/auth");

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (isAuthRoute(req?.path)) {
      return next();
    }
    const authHeader = req.headers.authorization;

    // Check if Authorization header is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Authorization token missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];
    // Validate token
    const decoded = await verifyToken(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
