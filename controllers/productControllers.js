import { ProductModel } from "../models/productModels.js";
import {
  addProductValidator,
  updateProductValidator,
} from "../validators/ProductValidators.js";

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

export const getOneProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json("No product available");
    }
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

export const updateProduct = async (req, res, next) => {
  try {
    const { error, value } = updateProductValidator.validate({
      ...req.body,
      image: req.file?.filename,
    });
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.id },
      { ...req.body, image: req.filename?.filename },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json("Update wasn't succesful");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: req.params.id,
      user: req.auth.id,
    });
    if (!deletedProduct) {
      res.status(404).json("Nothing to delete");
    }
    res.status(200).json("User Deleted sucessfully");
  } catch (error) {
    next(error);
  }
};

export const countProduct = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const count = await ProductModel.countDocuments({
      ...JSON.parse(filter),
      user: req.auth.id,
    });
    return res.status(200).json({ count: count });
  } catch (error) {
    next(error);
  }
};
export const countAllProduct = async (req, res, next) => {
  try {
    const { filter = "{}" } = req.query;
    const count = await ProductModel.countDocuments(JSON.parse(filter));
    return res.status(200).json({ count: count });
  } catch (error) {
    next(error);
  }
};
