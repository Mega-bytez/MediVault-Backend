import { Router } from "express";
import { getProfile, userDelete, userLogin, userLogout, userRegister, userUpdate } from "../controllers/userControllers.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", remoteUpload.single("profilePicture"), userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.patch("/update", isAuthenticated, userUpdate);
userRouter.delete("/delete", isAuthenticated, userDelete);
userRouter.post("/logout", isAuthenticated, userLogout);

export default userRouter;
