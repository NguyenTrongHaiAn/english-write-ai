const express =require('express');

const cors = require('cors');

//use dotnev library in current file
// config : used to read .env file and put variables into process.env
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
//Load the auth.js file in the routes folder

// create Express app .The app variable is the object that represents the web server.
const app = express();

app.use(cors());
// Use the cors middleware to allow cross-origin requests
app.use(express.json());
// Use the express.json() middleware to parse JSON request bodies
//Middleware helps parse JSON in request body into req.body

app.use('/api/auth', authRoutes);
//When there is a request to a path starting with /api/auth, then pass the further processing to the router authRoutes
const PORT = process.env.PORT || 3001;
// auto take port from .env file or use 3001 as default
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Start the server and listen on the specified port
// Log a message to the console when the server is running