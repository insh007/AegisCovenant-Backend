require('dotenv').config()  // Load environment variables from .env file
const express = require('express')  // Import the Express framework
const mongoose = require('mongoose')    // Import the Mongoose library
const route = require('./src/routes/routes')    // Import the routes
const cors = require('cors')    // Import the CORS library

const app = express()    // Create an instance of Express
app.use(express.json()) // Enable JSON parsing

// Enable CORS for specific origins
app.use(cors({
    origin: ["http://localhost:5173", "https://ages-covenants-app.onrender.com"]
}))

// Add the middleware function here
// Set headers for CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_STRING, {
    useNewUrlParser: true
}, mongoose.set("strictQuery", false))
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err))


app.use('/', route) // Set the base route for the application

app.use("/*", function (req, res) {
    res.send("Backend is deployed successfully, to check hit /test")
})

// Start the application on the specified port
app.listen(process.env.PORT, () => console.log("App is running on Port", process.env.PORT))