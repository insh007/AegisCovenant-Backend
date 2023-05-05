const express = require('express')
const router = express.Router()
const {fetchData} = require('../controller/priceAPI')

router.get('/test-me', (req, res) => {
    res.send("test is done")
})


router.get('/flights', fetchData)

module.exports = router