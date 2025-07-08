import jwt from "jsonwebtoken";

export const createToken = (payload: any, secret: any, expiresIn: any) => {
  try {
    return jwt.sign(payload, secret, { expiresIn });
  } catch (error) {
    return null;
  }
};

export const verifyToken = (token: any, secret: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err: any, decoded: any) => {
      if (err) return resolve(null);
      resolve(decoded);
    });
  });
};
