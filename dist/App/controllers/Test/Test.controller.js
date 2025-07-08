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
exports.update = exports.get = exports.getList = exports.create = void 0;
const Test_model_1 = __importDefault(require("./Test.model"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Test_model_1.default.create(req.body);
        return res.status(200).send({ message: "success!" });
    }
    catch (error) {
        return res.send({ message: error });
    }
});
exports.create = create;
const getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Test_model_1.default.find({});
        return res.status(200).send({ message: response });
    }
    catch (error) {
        return res.send({ message: error });
    }
});
exports.getList = getList;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Test_model_1.default.findOne({ _id: req.params.id });
        return res.status(200).send({ message: response });
    }
    catch (error) {
        return res.send({ message: error });
    }
});
exports.get = get;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Test_model_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
        return res.status(200).send({ message: "Updated Successfully!", response });
    }
    catch (error) {
        return res.send({ message: error });
    }
});
exports.update = update;
