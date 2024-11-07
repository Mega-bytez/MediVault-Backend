import { Router } from "express";
import { addProduct, getAllProduct, vendorProduct } from "../controllers/productControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

const productRouter = Router()

productRouter.post("/addProduct", remoteUpload.array("image", 10), addProduct);
productRouter.get("/getAllProduct", isAuthenticated, getAllProduct);
productRouter.get("/vendorPro", isAuthenticated, vendorProduct);

export default productRouter;