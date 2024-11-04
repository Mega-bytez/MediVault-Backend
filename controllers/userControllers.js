import { UserModel } from "../models/userModels.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/userValidators.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

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

export const userLogin = async (req, res, next) => {
  try {
    // validate details that was inputed
    const { error, value } = userLoginValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // check if user is in the database with their email
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.status(404).json("Invalid Credentials");
    }
    // Check for the validity of the password
    const correctPassword = bcrypt.compare(value.password, user.password);
    if (!correctPassword) {
      return res.status(404).json("Invalid Credentials");
    }
    // Now generate a token for user after login
    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });
    res.json({
      message: "User logged In",
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
