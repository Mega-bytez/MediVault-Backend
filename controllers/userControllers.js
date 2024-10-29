import { UserModel } from "../models/userModels.js";
import { userRegisterValidator } from "../validators/userValidators.js";
import bcrypt from "bcryptjs";

export const userRegister = async (req, res, next) => {
  try {
    // validate user input
    const { error, value } = userRegisterValidator.validate({
        ...value,
        profilePicture: req.file?.filename
    });
    if (error) {
      return res.status(422).json(error);
    } else {
      // check for user availability
      const user = await UserModel.findOne({ email: value.email });
      if (user) {
        return res.status(409).json("User already exist");
      } else {
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        // Creating a new user in the database and adding the hashed password to it
        await UserModel.create ({
            ...value,
            password: hashedPassword
        })
      }
    }
    res.status(201).json("You have been successfully registered")
  } catch (error) {
    next(error);
  }
};
