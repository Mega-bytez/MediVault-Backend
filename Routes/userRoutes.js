import { Router } from "express";
import { userLogin, userRegister } from "../controllers/userControllers.js";
import { remoteUpload } from "../middlewares/uploads.js";

const userRouter = Router();

userRouter.post("/register", remoteUpload.single("profilePicture"), userRegister);
userRouter.post("/login", userLogin);

export default userRouter;
