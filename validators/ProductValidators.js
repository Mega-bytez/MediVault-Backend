import Joi from "joi";

export const addProductValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(
      "Over-the-Counter(Medications)",
      "Vitamins and Supplements",
      "Personal Care Product",
      "Medical Equipments and devices",
      "Lifestyle and Wellness",
      "Sexual Health"
    ),
  brandName: Joi.string(),
  manufacturer: Joi.string().required(),
  dosage: Joi.string().required(),
  strength: Joi.string().required(),
  quantityPerPackage: Joi.string().required(),
  prescriptionRequirements: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  patient: Joi.string().valid("adult", "children", "Teenage"),
  symptoms: Joi.string(),
  dosage: Joi.string().required(),
  image: Joi.array().optional(),
  thumbImage: Joi.string(),
  price: Joi.string(),
  stockQuantity: Joi.number(),
  expiryDate: Joi.date().iso().required(),
  precautions: Joi.string(),
  sideEffect: Joi.string(),
  storageInstruction: Joi.string(),
});

export const updateProductValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(
      "Over-the-Counter(Medications)",
      "Vitamins and Supplements",
      "Personal Care Product",
      "Medical Equipments and devices",
      "Lifestyle and Wellness",
      "Sexual Health"
    ),
  brandName: Joi.string(),
  manufacturer: Joi.string().required(),
  dosage: Joi.string().required(),
  strength: Joi.string().required(),
  quantityPerPackage: Joi.string().required(),
  prescription: Joi.string().required(),
  countryOfOrigin: Joi.string().required(),
  audience: Joi.string().valid("adult", "children", "Teenage"),
  symptoms: Joi.string(),
  dosage: Joi.string().required(),
  image: Joi.array().optional(),
  thumbImage: Joi.string(),
  price: Joi.string(),
  expiryDate: Joi.string(),
  precaution: Joi.string(),
  sideEffect: Joi.string(),
  storageInstruction: Joi.string(),
});
