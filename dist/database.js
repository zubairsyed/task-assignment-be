"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbInit = () => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", true);
    mongoose_1.default
        .connect("mongodb+srv://mongoProd:Mz3g3Ip4iweFxTMg@cluster0.bqvornw.mongodb.net/")
        .then(() => {
        console.log("mongoose connected!");
    })
        .catch((err) => {
        console.log("mongoose error!");
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("Mongoose connection done!");
    });
    mongoose_1.default.connection.on("disconnected", () => {
        console.log("Mongoose got disconnected done!");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("Error Connecting Mongoose!", err);
    });
    process.on("SIGINT", () => {
        mongoose_1.default.connection.close();
        console.log("Mongoose connection disconnected due to app  termination");
        process.exit(0);
    });
});
exports.default = dbInit;
