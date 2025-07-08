import { Types } from "mongoose";

export interface IBlockedIPs {
  ip: string;
  count: number;
  blockedAt: Date;
  userEmail: string;
  expiresAt: Date;
  isBlocked: boolean;
}
