import { expressjwt } from "express-jwt";
import { UserModel } from "../models/userModels.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_PRIVATE_KEY,
  algorithms: ["HS256"],
});

export const hasPermissions = (action) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.auth.id);
      const permission = permissions.find((value) => value.role === user.role);
      if (!permission) {
        return res.status(403).json("No permission allowed");
      }
      if (permission.actions.includes(action)) {
        next();
      } else {
        return res.status(403).json("Action Not allowed");
      }
    } catch (error) {
      next(error);
    }
  };
};
