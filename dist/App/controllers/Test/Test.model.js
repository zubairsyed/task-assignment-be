"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_DOCUMENT = void 0;
const mongoose_1 = require("mongoose");
exports.TEST_DOCUMENT = "test";
const schema = new mongoose_1.Schema({
    title: String,
    description: String,
});
const TestModel = (0, mongoose_1.model)(exports.TEST_DOCUMENT, schema);
exports.default = TestModel;
