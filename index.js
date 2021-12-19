// We use "require" to be able to use and load modules from separate files.
const express = require("express");

/* 
Calls the express function "express()" and puts new Express application 
inside the app variable (to start a new Express application).
*/
const app = express();
const mongoose = require("mongoose");

// Enable CORS for all the request.
const cors = require("cors");
const router = require("./api/API");
const path = require("path");

// npm package that automatically loads environment variables from a .env file into the process.env object.
require("dotenv").config();

// Middleware that can be used to enable CORS with various options.
app.use(cors());

// Middleware/ method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json());

// Middleware for the routes served by the specific router
app.use("/api", router);

/* 
Middleware thats loads the result of (express.static). So the result will be a function that express 
understands as a middleware. Then this function takes a path, and returns a middleware that serves 
all files in that path to "/client"
*/
app.use(express.static(path.join(__dirname, "/client")));

// Method to connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log("Connected to db")
);

// Variable to tell us on which port the server should listen for the routing to work properly.
const PORT = process.env.PORT;

// This function is to bind and listen the connections on the specified port.
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
