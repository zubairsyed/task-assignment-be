import { IUser } from "../../../libs/Types/Users.Type";
import joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = joi.extend(joiPasswordExtendCore);

export const signUpValidation = joi.object({
  name: joi.string().min(3).max(25).trim(true).required(),
  email: joi.string().email().min(9).max(100).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .messages({
      "password.minOfUppercase":
        "{#label} should contain at least {#min} uppercase character",
      "password.minOfSpecialCharacters":
        "{#label} should contain at least {#min} special character",
      "password.minOfLowercase":
        "{#label} should contain at least {#min} lowercase character",
      "password.minOfNumeric":
        "{#label} should contain at least {#min} numeric character",
      "password.noWhiteSpaces": "{#label} should not contain white spaces",
    })
    .min(5)
    .required(),
});
