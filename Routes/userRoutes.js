import { Router } from "express";
import { getAllUsers, getProfile, getProfileNoAuth, userDelete, userLogin, userLogout, userRegister, userUpdate } from "../controllers/userControllers.js";
import { remoteUpload } from "../middlewares/uploads.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/register", remoteUpload.fields([{ name: "profilePicture", maxCount: 1 },{ name: "backgroundImage", maxCount: 1 }]), userRegister);
userRouter.post("/login", remoteUpload.none(), userLogin);
userRouter.get("/profile", isAuthenticated, getProfile);
userRouter.get("/profile/:id", getProfileNoAuth);
userRouter.patch("/update", isAuthenticated,  remoteUpload.single("profilePicture"), userUpdate);
userRouter.delete("/delete", isAuthenticated, userDelete);
userRouter.post("/logout", isAuthenticated, userLogout);
userRouter.get("/allUsers", getAllUsers);

export default userRouter;
