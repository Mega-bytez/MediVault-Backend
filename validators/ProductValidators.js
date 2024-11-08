import Joi from "joi";

export const addProductValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  manufacturer: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  symptoms: Joi.string().required(),
  audience: Joi.string().valid(
    "adult",
    "children",
    "Teenage",
  ),
  dosage: Joi.string().required(),
  image: Joi.array().optional(),
});

export const updateProductValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  manufacturer: Joi.string(),
  countryOfOrigin: Joi.string(),
  symptoms: Joi.string(),
  audience: Joi.string().valid(
    "adult",
    "children",
    "Teenage",
  ),
  dosage: Joi.string(),
  image: Joi.array().optional(),
});
