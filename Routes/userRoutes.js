import { Router } from "express";
import { userRegister } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/addUser", userRegister);

export default userRouter;
