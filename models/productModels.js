import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const productSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  countryOfOrigin: {
    type: String,
  },
  audience: { type: String, enum: ["adult", "children", "Teenage"] },
  symptoms: {
    type: String,
  },
  dosage: {
    type: String,
  },
  image: 
    [{type: String}],
});

productSchema.plugin(toJSON);
export const ProductModel = model("Product", productSchema);
