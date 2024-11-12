import { Router } from "express";
import { addProduct, countAllProduct, countProduct, deleteProduct, getAllProduct, getOneProduct, updateProduct, vendorProduct } from "../controllers/productControllers.js";
import { hasPermissions, isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

const productRouter = Router()

productRouter.post("/addProduct",  isAuthenticated, hasPermissions("add_VendorProduct"), remoteUpload.fields([{ name: "image", maxCount: 10 },{ name: "thumbImage", maxCount: 1 }]), addProduct);
productRouter.get("/getAllProduct", isAuthenticated, hasPermissions("view_AllProduct"), getAllProduct);
productRouter.get("/getOneProduct/:id", isAuthenticated, hasPermissions("view_OneProduct"), getOneProduct);
productRouter.get("/vendorPro", isAuthenticated, hasPermissions("view_VendorProduct"), vendorProduct);
productRouter.patch("/update/:id", isAuthenticated, hasPermissions("add_VendorProduct"), updateProduct);
productRouter.delete("/delete/:id", isAuthenticated, hasPermissions("delete_VendorProduct"), deleteProduct);
productRouter.get("/countVendor", isAuthenticated, hasPermissions("update_VendorProduct"), countProduct);
productRouter.get("/countAllProduct", isAuthenticated, hasPermissions("count_AllProduct"), countAllProduct);

export default productRouter;
