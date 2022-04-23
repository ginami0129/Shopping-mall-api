import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import path from "path";

const getProducts = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({
    count: products.length,
    page,
    pages: Math.ceil(count / pageSize),
    products: products,
  });
});

const getProductByID = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  const id = req.params.productID;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  // const userInput = {
  //     name: req.body.name,
  //     price: req.body.price,
  //     brand: req.body.brand,
  //     description: req.body.desc
  // }
  //
  // res.json({
  //     msg: 'Created Product',
  //     product: userInput
  // })
  console.log(req.file.path);
  const { name, price, brand, category, desc } = req.body;

  const newProduct = new Product({
    name,
    price,
    brand,
    category,
    description: desc,
    image: req.file.path,
  });

  const createdProduct = await newProduct.save();

  res.json({
    msg: "Created Product",
    product: createdProduct,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  const { name, price, brand, category, desc } = req.body;

  const { productID } = req.params;

  const product = await Product.findById(productID);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.description = desc || product.description;

    const updatedProduct = await product.save();
    res.json({
      msg: "updated at " + productID,
      product: updatedProduct,
    });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

const deleteAllProduct = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  await Product.remove();
  res.json({
    msg: "Deleted all Product",
  });
});

const deleteAProduct = asyncHandler(async (req, res) => {
  // #swagger.tags = ['Products']
  const id = req.params.productID;
  // remove delete
  await Product.findByIdAndRemove(id);

  res.json({
    msg: "deleted at " + id,
  });
});

export {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteAllProduct,
  deleteAProduct,
};
