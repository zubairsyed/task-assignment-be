import { model, Schema } from "mongoose";
import { IBlockedIPs } from "../../../libs/Types/BlockedIps.Type";

export const BLOCKEDIP_DOCUMENT = "blocked-ips";

const schema = new Schema<IBlockedIPs>({
  ip: { type: String },
  count: { type: Number },
  blockedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  userEmail: { type: String },
  isBlocked: { type: Boolean, default: false },
});

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const BlockedIPsModel = model<IBlockedIPs>(BLOCKEDIP_DOCUMENT, schema);
