import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const productSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  name: { type: String },
  description: { type: String },
  category: {
    type: String,
    enum: [
      "Over-the-Counter(Medications)",
      "Vitamins and Supplements",
      "Personal Care Product",
      "Medical Equipments and devices",
      "Lifestyle and Wellness",
      "Sexual Health",
    ],
  },
  brandName: { type: String },
  manufacturer: { type: String },
  dosage: { type: String },
  strength: { type: String },
  quantityPerPackage: { type: String },
  prescriptionRequirements: {
    type: String,
    enum: ["prescription", "Over-the-Counter"],
  },
  prescription: { type: String },
  countryOfOrigin: { type: String },
  patient: { type: String, enum: ["adult", "children", "teenage"] },
  symptoms: { type: String },
  image: [{ type: String }],
  thumbImage: { type: String },
  price: { type: Number },
  status: {
    type: String,
    enum: ["available", "Out of stock", "Discontinued"],
    default: "available",
  },
  stockQuantity: { type: Number },
  expiryDate: { type: String },
  precautions: { type: String },
  sideEffect: { type: String },
  storageInstruction: { type: String },
});

productSchema.plugin(toJSON);
export const ProductModel = model("Product", productSchema);
