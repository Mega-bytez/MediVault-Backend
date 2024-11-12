import Joi from "joi";

export const userRegisterValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  licenseNumber: Joi.string().required(),
  registrationNumber: Joi.string().required(),
  mobileNumber: Joi.string().pattern(/^[0-9]+$/),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string().optional(),
  role: Joi.string().valid("user", "vendor"),
  address: Joi.array()
    .items(
      Joi.object({
        region: Joi.string(),
        town: Joi.string(),
        street: Joi.string(),
      })
    )
    .required(),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userUpdateValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  licenseNumber: Joi.string(),
  registrationNumber: Joi.string(),
  mobileNumber: Joi.string().pattern(/^[0-9]+$/),
  password: Joi.string().min(6),
  profilePicture: Joi.string().optional(),
  role: Joi.string().valid("user", "vendor"),
  address: Joi.array().items(
    Joi.object({
      region: Joi.string(),
      town: Joi.string(),
      street: Joi.string(),
    })
  ),
});
