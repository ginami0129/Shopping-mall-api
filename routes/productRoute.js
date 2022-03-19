import express from "express"
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

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
    res.json(product);
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

    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.desc,
    });

    const createdProduct = await newProduct.save();

    res.json({
        msg: "Created Product",
        product: createdProduct,
    })

}))

router.put('/', (req, res) => {
    res.json( {
        msg: 'Updated Product'
    })
})

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
