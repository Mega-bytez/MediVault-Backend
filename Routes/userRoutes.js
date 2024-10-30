import { Router } from "express";
import { userRegister } from "../controllers/userControllers.js";
import { remoteUpload } from "../middlewares/uploads.js";

const userRouter = Router();

userRouter.post("/addUser", remoteUpload.single("profilePicture"), userRegister);

export default userRouter;
