require('dotenv').config()
const express = require('express')
const route = require('./src/routes/routes')

const app = express()
app.use(express.json())

app.use('/', route)

app.use("/*", function(req,res){
    res.status(400).send("Provided url is wrong")
})

app.listen(process.env.PORT, () => console.log("App is running on Port",process.env.PORT))