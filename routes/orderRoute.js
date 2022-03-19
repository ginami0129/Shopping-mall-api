import express from "express"

const router = express.Router()


router.get("/", (req, res) => {
    res.json({
        msg: 'Read order'
    })
})

router.post('/', (req, res) => {
    res.json({
        msg: 'Create order'
    })
})

router.put('/', (req, res) => {
    res.json({
        msg: 'Update order'
    })
})

// 장바구니 삭제
router.delete('/', (req, res) => {
    res.json({
        msg: 'Delete order'
    })
})






export default router;