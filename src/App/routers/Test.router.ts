import { Router } from "express";
import {
  create,
  get,
  getList,
  update,
} from "../controllers/Test/Test.controller";

const testRouter = Router();

testRouter.post("/", create);
testRouter.get("/:id", get);
testRouter.patch("/:id", update);
testRouter.get("/", getList);

export default testRouter;
