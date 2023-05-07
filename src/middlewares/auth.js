require('dotenv').config()
const jwt = require('jsonwebtoken')

/**
 * Middleware for verifying the validity of the JWT token in the header.
 *
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {undefined}
 * @throws {Error} Will throw an error if something goes wrong while verifying the JWT token.
 */

const authentication = async function(req,res,next){
    try{
        // Get token from header
        const token = req.headers["x-api-key"]
    
        // Check if token exists
        if(!token)return res.status(400).send({status:false, message:"Token must be present in the header"})
    
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, function(err, tokenVerify){
            if(err){
                // Return error response if token verification fails
                return res.status(401).send({status:false, message:"unauthentication access"})
            }
            else{
                // If token is verified successfully, attach the tokenVerify object to the request and call the next middleware
                req.tokenVerify = tokenVerify
                next()
            }
        })
    }
    catch(err){
        // Return error response if there is an internal server error
        return res.status(500).send({status:false, message:err.message})
    }
}
module.exports = {authentication}