import Joi from "joi";

export const addProductValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string()
  .valid(
    "Over-the-Counter(Medications)",
    "Vitamins and Supplements",
    "Personal Care Product",
    "Medical Equipments and devices",
    "Lifestyle and Wellness",
    "Sexual Health"
  ),
  brandName: Joi.string(),
  manufacturer: Joi.string(),
  dosage: Joi.string(),
  strength: Joi.string(),
  quantityPerPackage: Joi.string(),
  prescriptionRequirements: Joi.string(),
  countryOfOrigin: Joi.string(),
  patient: Joi.string().valid("adult", "children", "teenage"),
  symptoms: Joi.string(),
  dosage: Joi.string(),
  image: Joi.array().optional(),
  thumbImage: Joi.string().optional(),
  price: Joi.number(),
  stockQuantity: Joi.number(),
  expiryDate: Joi.string(),
  precautions: Joi.string(),
  sideEffect: Joi.string(),
  storageInstruction: Joi.string(),
});

// allow(null, '').iso()

export const updateProductValidator = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.string()
  .valid(
    "Over-the-Counter(Medications)",
    "Vitamins and Supplements",
    "Personal Care Product",
    "Medical Equipments and devices",
    "Lifestyle and Wellness",
    "Sexual Health"
  ),
  brandName: Joi.string(),
  manufacturer: Joi.string(),
  dosage: Joi.string(),
  strength: Joi.string(),
  quantityPerPackage: Joi.string(),
  prescriptionRequirements: Joi.string(),
  countryOfOrigin: Joi.string(),
  patient: Joi.string().valid("adult", "children", "teenage"),
  symptoms: Joi.string(),
  dosage: Joi.string(),
  image: Joi.array().optional(),
  thumbImage: Joi.string().optional(),
  price: Joi.number(),
  stockQuantity: Joi.number(),
  expiryDate: Joi.string(),
  precautions: Joi.string(),
  sideEffect: Joi.string(),
  storageInstruction: Joi.string(),
});
