require('dotenv').config()
const jwt = require('jsonwebtoken')

const authentication = async function(req,res,next){
    try{
        const token = req.headers["x-api-key"]
    
        if(!token)return res.status(400).send({status:false, msg:"Token must be present in the header"})
    
        jwt.verify(token, process.env.JWT_SECRET, function(err, tokenVerify){
            if(err){
                return res.status(401).send({status:false, msg:"unauthentication access"})
            }
            else{
                req.tokenVerify = tokenVerify
                next()
            }
        })
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}
module.exports = {authentication}