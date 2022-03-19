import express from "express"

const router = express.Router()



// CRUD
router.get('/', (req, res) => {
    res.json({
        msg: 'Product Get!'
    })
})

router.post('/',(req, res) => {

    const userInput = {
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        description: req.body.desc
    }

    res.json({
        msg: 'Created Product',
        product: userInput
    })

})

router.put('/', (req, res) => {
    res.json( {
        msg: 'Updated Product'
    })
})

router.delete('/', (req, res) => {
    res.json({
        msg: 'Deleted Product'
    })
})




export default router;
