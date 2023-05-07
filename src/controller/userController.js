require('dotenv').config()
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isValidString, isValidName, isValidEmail, isValidPassword } = require('../validation/validation')


/**
 * Creates a user with the given name, email, and password.
 * 
 * @function
 * @async
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {Promise} A Promise that resolves with a JSON object containing the status of the operation and any relevant data.
 */

const createUser = async function (req, res) {
    try {
        const data = req.body
        const { name, email, password } = data

        /*------------------------Checking body is empty or not----------------------------------*/
        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please provide data in request body" }) }

        /*------------------------Checking fileds are present or not-----------------------------*/
        if (!name) { return res.status(400).send({ status: false, message: "name is required" }) }
        if (!email) { return res.status(400).send({ status: false, message: "email is required" }) }
        if (!password) { return res.status(400).send({ status: false, message: "password is required" }) }

        /*-------------------Checking fileds values are empty or not-----------------------------*/
        if (!(isValidString(name))) { return res.status(400).send({ status: false, message: "name is empty" }) }
        if (!(isValidString(email))) { return res.status(400).send({ status: false, message: "email is empty" }) }
        if (!(isValidString(password))) { return res.status(400).send({ status: false, message: "password is empty" }) }

        /*-------------------Checking mail is unique or not---------------------------*/
        const duplicateEmail = await userModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({ status: false, message: "email already exists" })

        /*-------------------performing regex validation-----------------------------*/
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "name should include alphabets only" });
        }

        if (!(isValidEmail(email))) { return res.status(400).send({ status: false, message: "Please enter a valid email address in the format of youremail@gmail.com" }) }

        if (!(isValidPassword(password))) { return res.status(400).send({ status: false, message: "password must contain one special character with lenght between 8 to 15" }) }

        /*-------------------Hasing Password---------------------------*/
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword

        /*-------------------Creating Data---------------------------*/
        const createData = await userModel.create(req.body)

        return res.status(201).send({ status: true, data: createData })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


/**
 * This function handles user login requests. 
 *
 * @function
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The HTTP response containing the token and a status code.
 * @throws {Object} An error message and status code if an error occurs.
 */

const login = async function (req, res) {
    try {

        const { email, password } = req.body

        /*------------------------Checking body is empty or not-----------------------------------*/
        if (Object.keys(req.body).length == 0) { return res.status(400).send({ status: false, message: "Please provide email and password in body" }) }

        /*------------------------Checking fileds are present or not-----------------------------------*/
        if (!email) { return res.status(400).send({ status: false, message: "email is required" }) }
        if (!password) { return res.status(400).send({ status: false, message: "password is required" }) }

        /*------------------------Checking fileds values are empty or not-----------------------------------*/
        if (!(isValidString(email))) { return res.status(400).send({ status: false, message: "email is empty." }) }
        if (!(isValidString(password))) { return res.status(400).send({ status: false, message: "password is empty." }) }

        /*-------------------------------  Checking user in DB  -----------------------------------*/
        const foundUser = await userModel.findOne({ email: email })
        if (!foundUser) return res.status(400).send({ status: false, message: "email is not registered" })

        /*-------------------------------  fetching password  -----------------------------------*/
        const hashPassword = foundUser.password

        /*--------------------------- Comparing password & generating token  -------------------------*/
        bcrypt.compare(password, hashPassword, function (err, result) {
            if (result) {
                let token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET)
                res.setHeader("x-api-key", token)
                return res.status(200).send({ status: true, token: token })
            } else {
                return res.status(400).send({ status: false, message: "Invalid Password" })
            }
        })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createUser, login }