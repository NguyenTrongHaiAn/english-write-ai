const express = require('express');
const router = express.Router();

//get registerUser directly from the object that require() returns
const {
  registerUser,
  loginUser,
  // forgotPassword ,
  // logoutUser, 

} = require('../controllers/authController');

router.post('/register', registerUser);
//When an HTTP POST request is sent to the /register URL, Express calls the registerUser function to handle the request.


router.post('/login', loginUser);

// router.post('/forgot-password', forgotPassword);

module.exports = router;
// Export the router so it can be used in other files