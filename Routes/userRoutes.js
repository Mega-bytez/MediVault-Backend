import { Router } from "express";
import { getAllUsers, getProfile, userDelete, userLogin, userLogout, userRegister, userUpdate } from "../controllers/userControllers.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", remoteUpload.single("profilePicture"), userRegister);
userRouter.post("/login", remoteUpload.none(), userLogin);
userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.patch("/update", isAuthenticated,  remoteUpload.single("profilePicture"), userUpdate);
userRouter.delete("/delete", isAuthenticated, userDelete);
userRouter.post("/logout", isAuthenticated, userLogout);
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
