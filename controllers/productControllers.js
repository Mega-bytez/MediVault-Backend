import { ProductModel } from "../models/productModels.js";
import { addProductValidator } from "../validators/ProductValidators.js";

export const addProduct = async (req, res, next) => {
  try {
    // if (!req.files || req.files.length === 0) {
    //   return res.status(404).json("No file added");
    // }
    const { error, value } = addProductValidator.validate({
      ...req.body,
      image: req?.files?.map((file) => file.filename),
    });
    if (error) {
      res.status(422).json(error);
    }
    const newProduct = await ProductModel.create({
      ...value,
      user: req.auth.id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
    const product = await ProductModel.find(JSON.parse(filter))
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const vendorProduct = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}", limit = 100, skip = 0 } = req.query;
    const product = await ProductModel.find({
      ...JSON.parse(filter),
      user: req.auth.id,
    })
      .sort(JSON.parse(sort))
      .limit(limit)
      .skip(skip);
    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
