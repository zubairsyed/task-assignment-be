import mongoose from "mongoose";

const dbInit = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(
      "mongodb+srv://mongoProd:Mz3g3Ip4iweFxTMg@cluster0.bqvornw.mongodb.net/"
    )

    .then(() => {
      console.log("mongoose connected!");
    })
    .catch((err) => {
      console.log("mongoose error!");
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connection done!");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose got disconnected done!");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error Connecting Mongoose!", err);
  });

  process.on("SIGINT", () => {
    mongoose.connection.close();
    console.log("Mongoose connection disconnected due to app  termination");
    process.exit(0);
  });
};

export default dbInit;
