const express = require('express')
const router = express.Router()
const {fetchData} = require('../controller/priceAPI')
const {createUser, login} = require('../controller/userController')
const {authentication} = require('../middlewares/auth')

/*----------------- Create User --------------- */
router.post("/createUser", createUser)

/*----------------- Login User --------------- */
router.post("/api/login", login)


// authentication ,
router.get('/flights', authentication , fetchData)

module.exports = router