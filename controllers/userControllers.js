import { UserModel } from "../models/userModels.js";
import { mailTransporter } from "../utils/mail.js";
import { signUpTemplate } from "../utils/templates.js";
import {
  userLoginValidator,
  userRegisterValidator,
  userUpdateValidator,
} from "../validators/userValidators.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    // Validate user input
    if (typeof req.body.address === "string") {
      req.body.address = JSON.parse(req.body.address);
    }
    const { error, value } = userRegisterValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
      backgroundImage: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }

    // Check if the user already exists
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(409).json("Pharmacy already exists");
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(value.password, 10);

    // Create a new user in the database
    await UserModel.create({
      ...value,
      password: hashedPassword,
    });
    await mailTransporter.sendMail({
      from: `MEDIVAULT<bboaduboateng2000@gmail.com>`,
      to: value.email,
      subject: "Registration with MedVault",
      html: signUpTemplate(`<p>${value.name} has been registered sucessfully with Medvault </p>
      <p> Thank you for registering `,)
      
    })

    return res
      .status(201)
      .json("Your Pharmacy have been successfully registered");
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
    return res.json({
      message: "User logged In",
      accessToken: token,
      name: `${user.name}`,
      profilePicture: `${user.profilePicture}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.auth.id);
    if (!user) {
      res.status(404).json("No user available");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getProfileNoAuth = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404).json("No user available");
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  try {
    if (typeof req.body.address === "string") {
      req.body.address = JSON.parse(req.body.address);
    }
    const { error, value } = userUpdateValidator.validate({
      ...req.body,
      profilePicture: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }
    const updateProfile = await UserModel.findByIdAndUpdate(
      req.auth.id,
      value,
      { new: true }
    );
    if (!updateProfile) {
      return res.status(404).json("Update was unsucessful");
    }
    return res.status(200).json({
      message: "Update is sucessful",
      details: updateProfile,
    });
  } catch (error) {
    next(error);
  }
};

export const userDelete = async (req, res, next) => {
  try {
    const deleteUser = await UserModel.findByIdAndDelete(req.auth.id);
    if (!deleteUser) {
      return res.status(404).json("Unable to delete user");
    }
    res.status(200).json("User deleted Sucessfully");
  } catch (error) {
    next(error);
  }
};

export const userLogout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "No token available" });
    }
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 100);
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      res.status(404).json("No Users in the database");
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
