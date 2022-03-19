import express from "express"

const router = express.Router()



// CRUD
router.get('/', (req, res) => {
    res.json({
        msg: 'Product Get!'
    })
})

router.post('/',(req, res) => {
    res.json({
        msg: 'Created Product'
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
