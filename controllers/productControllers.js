import { ProductModel } from "../models/productModels.js";
import { addProductValidator } from "../validators/ProductValidators.js";

export const addProduct = async (req, res, next) => {
  try {
    if(!req.files || req.files.length === 0){
        return res.status(404).json("No file added")
    }
    const { error, value } = await addProductValidator.validate({
      ...req.body,
      image: req.files.map((file) => file.filename),
    });
    if (error) {
      res.status(422).json(error);
    }
    const newProduct = await ProductModel.create({
        ...value,
        user: req.auth.id
    })
    res.status(201).json(newProduct)
  } catch (error) {
    next(error);
  }
};
