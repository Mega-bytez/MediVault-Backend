import { UserModel } from "../models/userModels.js";
import { userRegisterValidator } from "../validators/userValidators.js";
import bcrypt from "bcryptjs";

export const userRegister = async (req, res, next) => {
  try {
    // Validate user input
    const { error, value } = userRegisterValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }

    // Check if the user already exists
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(409).json("User already exists");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create a new user in the database
    await UserModel.create({
      ...value,
      password: hashedPassword,
    });

    return res.status(201).json("You have been successfully registered");
  } catch (error) {
    console.log(error);
    next(error);
  }
};
