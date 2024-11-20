import { Router } from "express";
import { addProduct, countAllProduct, countProduct, deleteProduct, getAllProduct, getOneProduct, updateProduct, vendorProduct, vendorProductNoId } from "../controllers/productControllers.js";
import { hasPermissions, isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

const productRouter = Router()

productRouter.post("/products",  isAuthenticated, hasPermissions("add_VendorProduct"), remoteUpload.fields([{ name: "image", maxCount: 10 },{ name: "thumbImage", maxCount: 1 }]), addProduct);

productRouter.get("/products", getAllProduct);
productRouter.get("/products/me", isAuthenticated, hasPermissions("view_VendorProduct"), vendorProduct);
productRouter.get("/products/count", isAuthenticated, hasPermissions("count_AllProduct"), countAllProduct);
productRouter.get("/products/:id", getOneProduct);
productRouter.get("/products/vendors/:id", vendorProductNoId);
productRouter.patch("/products/:id", isAuthenticated, hasPermissions("update_VendorProduct"), remoteUpload.fields([{ name: "image", maxCount: 10 },{ name: "thumbImage", maxCount: 1 }]), updateProduct);
productRouter.delete("/products/:id", isAuthenticated, hasPermissions("delete_VendorProduct"), deleteProduct);
productRouter.get("/products/me/count", isAuthenticated, hasPermissions("count_VendorProduct"), countProduct);


export default productRouter;
