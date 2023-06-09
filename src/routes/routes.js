const express = require('express')
const router = express.Router()
const {fetchData} = require('../controller/priceAPI')
const {createUser, login} = require('../controller/userController')
const {authentication} = require('../middlewares/auth')

/*----------------- Create User --------------- */
router.post("/createUser", createUser)

/*----------------- Login User --------------- */
router.post("/api/login", login)

/*----------------- Get Flights Schedule --------------- */
router.get('/flights', authentication , fetchData)


/*----------------- for test purpose --------------- */
router.get('/test', (req, res) => {
    res.send("please refer to routes paths...")
})
module.exports = router