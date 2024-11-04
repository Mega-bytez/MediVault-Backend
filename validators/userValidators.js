import Joi from "joi";

export const userRegisterValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().pattern(/^[0-9]+$/),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string().optional(),
  dateOfBirth: Joi.date().required(),
  role: Joi.string().valid("user", "vendor").required(),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})