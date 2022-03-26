import express from "express"
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
// import {notFound} from "../middleware/errorMiddleware.js";

const router = express.Router()



// CRUD

// product 전체 불러오는 API
router.get('/', asyncHandler( async(req, res) => {
    const products = await Product.find()
    res.json({
        count: products.length,
        products: products
    })
}))

// 상세 프로덕트 불러오는 api
router.get('/:productID', asyncHandler(async (req, res) => {
    const id = req.params.productID;
    const product = await Product.findById(id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not Found")
    }
}))

router.post('/', asyncHandler(async (req, res) => {

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

    const {name, price, brand, category, desc} = req.body;

    const newProduct = new Product({
        name,
        price,
        brand,
        category,
        description: desc,
    });

    const createdProduct = await newProduct.save();

    res.json({
        msg: "Created Product",
        product: createdProduct,
    })

}))

router.put('/:productID', asyncHandler( async(req, res) => {

    const {name, price, brand, category, desc} = req.body

    const {productID} = req.params;

    const product = await Product.findById(productID);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.description = desc || product.description;

        const updatedProduct = await product.save();
        res.json({
            msg : "updated at " + productID,
            product : updatedProduct
        })
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
}))

router.delete('/', asyncHandler( async(req, res) => {
    await Product.remove();
    res.json({
        msg: 'Deleted all Product'
    })
}))

// 한개의 제품 삭제
router.delete('/:productID', asyncHandler( async (req, res) => {

    const id = req.params.productID;
    // remove delete
    await Product.findByIdAndRemove(id);

    res.json({
        msg: "deleted at "+ id,
    })
}))




export default router;
