import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UsersModel from "./Users.model";
import { IUser } from "../../../libs/Types/Users.Type";
import { shouldUnblockUser } from "../../../Utils/InvalidPasswordHandler";
import { createToken } from "../../../libs/service-utils/Jwt";
import {
  ACCESS_TOKEN_EXPIRY,
  BLOCKEDIPS_EXPIRES_AT,
  INVALID_PASSWORD_BLOCK_EXPIRY,
} from "../../../libs/Constants/Constants";
import { BlockedIPsModel } from "../BlockedIps/BlockedIps.model";
import { getIP } from "../../../Utils/Network.Utils";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  const isUserExists = await UsersModel.findOne({
    email: req.body.email,
  })
    .lean()
    .exec();
  if (isUserExists) {
    res.status(409).send("User already exists, please login!");
    return;
  }
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const newUser = await UsersModel.create<IUser>({
    ...req.body,
    passwordLastUpdated: new Date(),
  });
  res.status(200).send({ message: `Sign-Up Success!`, user: newUser });
  return;
};

export const signIn = async (req: Request, res: Response): Promise<any> => {
  const isUserExists: any = await UsersModel.findOne({
    email: req.body.email,
  })
    .lean()
    .exec();
  if (!isUserExists) {
    return res.status(401).send("Email or Password are incorrect!");
  }
  const invalidPasswordCount = isUserExists?.invalidPasswordTimestamps;
  if (invalidPasswordCount.length >= 5) {
    const unblockUser = shouldUnblockUser(
      invalidPasswordCount[invalidPasswordCount.length - 1],
      INVALID_PASSWORD_BLOCK_EXPIRY
    );
    if (!unblockUser.unblockUserTimeStamp) {
      return res.status(403).send({
        message: `You are temporarily blocked, due to too many invalid attempts!, ${new Date(
          unblockUser.validateLastTimestamp
        )}`,
      });
    }
    await UsersModel.findByIdAndUpdate(
      { _id: isUserExists._id },
      { $set: { invalidPasswordTimestamps: [] } }
    );
  }
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    isUserExists?.password
  );

  if (!isPasswordValid) {
    const updateInvalidPasswordCount = await UsersModel.findByIdAndUpdate(
      { _id: isUserExists._id },
      { $push: { invalidPasswordTimestamps: new Date().toISOString() } }
    );
    const ip = getIP(req);
    const addIp: any = await BlockedIPsModel.findOneAndUpdate(
      { ip: ip },
      {
        $inc: { count: 1 },
        $push: { invalidPasswordTimestamps: new Date().toISOString() },
        expiresAt: null,
      },
      { upsert: true, new: true }
    );
    if (addIp?.count >= 15) {
      const getCount: any = await BlockedIPsModel.findOneAndUpdate(
        { ip: addIp?.ip },
        {
          isBlocked: true,
          expiresAt: new Date(Date.now() + BLOCKEDIPS_EXPIRES_AT * 60 * 1000),
        },
        { new: true }
      );
      return res.status(401).send({
        message: `IP temporarily blocked due to excessive failed login attempts, Unblocks At ${getCount?.expiresAt}`,
      });
    }
    return res.status(401).send({ message: "Invalid Credentials!" });
  }
  const accessToken = createToken(
    {
      email: req.body.email,
      id: isUserExists._id,
    },
    process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY
  );
  if (!accessToken) {
    return res
      .status(500)
      .json({ message: "Could not generate access token." });
  }
  const {
    password,
    invalidPasswordTimestamps,
    passwordLastUpdated,
    createdAt,
    updatedAt,
    __v,
    ...safeUser
  } = isUserExists; // make sure it's a plain object
  return res.status(200).send({ message: { accessToken, safeUser } });
};

export const testApi = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  return res.status(200).send({ message: "success!!" });
};
