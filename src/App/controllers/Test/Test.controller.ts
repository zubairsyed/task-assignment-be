import { Request, Response, NextFunction } from "express";
import TestModel from "./Test.model";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await TestModel.create(req.body);
    return res.status(200).send({ message: "success!" });
  } catch (error) {
    return res.send({ message: error });
  }
};

export const getList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await TestModel.find({});
    return res.status(200).send({ message: response });
  } catch (error) {
    return res.send({ message: error });
  }
};

export const get = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await TestModel.findOne({ _id: req.params.id });
    return res.status(200).send({ message: response });
  } catch (error) {
    return res.send({ message: error });
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await TestModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.status(200).send({ message: "Updated Successfully!", response });
  } catch (error) {
    return res.send({ message: error });
  }
};
