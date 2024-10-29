import { Router } from "express";
import { userRegister } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/addUser", remoteUpload.single("profilePicture"), userRegister);

export default userRouter;
