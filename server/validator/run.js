const {check} = require('express-validator');

exports.createPostValidator = [

    check('title')
    .not()
    .isEmpty()
    .withMessage('Write a title')
    ,
    check('title')
    .isLength({
        min: 4,
         max: 150
    })
    .withMessage('Title must be between 4 to 150 characters')
    ,
    check('body')
    .not()
    .isEmpty()
        .withMessage('Write a body'),
    check('body')
    .isLength({  min: 4,
        max: 2000})
    .withMessage('Body must be between 4 to 2000 characters')
];


exports.userSignupValidator = [

    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required')
    ,
    check('email')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .matches(/.+\@.+\..+/)
    .withMessage('You must write a valid E-mail')
    .isLength({
        min: 4,
        max: 2000
    })
    .isEmail()
    .withMessage('Must be a valid email adress'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Must type a password')
    .isLength({min: 6})
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
   

]





