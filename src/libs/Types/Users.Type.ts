export interface IUser {
  name: string;
  email: string;
  password?: string;
  passwordLastUpdated?: Date;
  invalidPasswordTimestamps?: Date[];
}
