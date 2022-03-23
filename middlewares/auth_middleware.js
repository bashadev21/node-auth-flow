const { body, validationResult } = require('express-validator');

const authValidation=(req,res,next)=>{
    
   return [
    body('name').notEmpty().isString(),
    body('email').isEmail().notEmpty(),
    body('password').isLength({
        min:5,
        max:20
    }),
    
     next()
   ]
   

}

module.exports = {
    authValidation
}