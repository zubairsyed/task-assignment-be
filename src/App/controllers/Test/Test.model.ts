import { model, Schema } from "mongoose";
import { ITest } from "../../../libs/Types/Test.Type";

export const TEST_DOCUMENT = "test";

const schema = new Schema<ITest>({
  title: String,
  description: String,
});

const TestModel = model<ITest>(TEST_DOCUMENT, schema);
export default TestModel;
