require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true
}, mongoose.set("strictQuery", false))
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err))

app.use('/', route)

app.use("/*", function (req, res) {
    res.status(400).send("Backend is deployed successfully, to check hit /test")
})

app.listen(process.env.PORT, () => console.log("App is running on Port", process.env.PORT))