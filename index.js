require('dotenv').config()
const express = require('express')
const route = require('./src/routes/routes')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173"]
}))

// Add the middleware function here
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', route)

app.use("/*", function (req, res) {
    res.status(400).send("Provided url is wrong")
})

app.listen(process.env.PORT, () => console.log("App is running on Port", process.env.PORT))