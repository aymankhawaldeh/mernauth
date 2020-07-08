  
const express = require('express');
const { signup, signin, signout  } = require('../controlers/auth');
const { userById } = require('../controlers/user');

const { userSignupValidator} = require('../validator/run.js')
const {runValidator} = require('../validator')
const router = express.Router();


router.post('/signup', userSignupValidator, runValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// any route containing :userId, our app will first execute userByID()
router.param('userId', userById);





module.exports = router;
