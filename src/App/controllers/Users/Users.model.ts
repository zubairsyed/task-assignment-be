import { model, Schema } from "mongoose";
import { IUser } from "../../../libs/Types/Users.Type";

export const USER_DOCUMENT = "users";

const schema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

const UsersModel = model<IUser>(USER_DOCUMENT, schema);
export default UsersModel;
