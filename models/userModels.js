import { model, Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String },
    password: { type: String },
    profilePicture: { type: String },
    dateOfBirth: { type: Date },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "vendor",
    },
  },
  { timestamps: true }
);

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
