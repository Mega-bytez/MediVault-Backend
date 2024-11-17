import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true, unique: true },
    registrationNumber: { type: String, required: true, unique: true },
    mobileNumber: { type: Number },
    password: { type: String },
    profilePicture: { type: String },
    backgroundImage: { type: String },
    workingHours: { type: String },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "vendor",
    },
    region: { type: String },
    town: { type: String },
    street: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    WhatsApp: { type: String },
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
