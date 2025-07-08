"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_1 = require("joi-password");
const joiPassword = joi_1.default.extend(joi_password_1.joiPasswordExtendCore);
exports.signUpValidation = joi_1.default.object({
    name: joi_1.default.string().min(3).max(25).trim(true).required(),
    email: joi_1.default.string().email().min(9).max(100).required(),
    password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .messages({
        "password.minOfUppercase": "{#label} should contain at least {#min} uppercase character",
        "password.minOfSpecialCharacters": "{#label} should contain at least {#min} special character",
        "password.minOfLowercase": "{#label} should contain at least {#min} lowercase character",
        "password.minOfNumeric": "{#label} should contain at least {#min} numeric character",
        "password.noWhiteSpaces": "{#label} should not contain white spaces",
    })
        .min(5)
        .required(),
});
