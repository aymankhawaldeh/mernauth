const {validationResult, check} = require('express-validator');

exports.runValidator = (req, res, next) => {
   
    // check for errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    next();
};


