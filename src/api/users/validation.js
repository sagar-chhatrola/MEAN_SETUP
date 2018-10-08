const { check, validationResult,body } = require('express-validator/check');
exports.profile = [
	
 body('username','Username is required').isLength({ min: 1 }),
 body('email').isLength({ min:1 }).withMessage('Email is required'),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 1 }).withMessage('password is required'),
  body('password').isLength({ min: 4 }).withMessage('passwd 4 chars long!'),
  function(req,res,next) {
  	try {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
    	res.status(422).json({ "errors": errors.mapped(),"message":"Unprocessable Entity" });
    }else{
    	next();
    }
    
  } catch (err) {
    res.status(422).json({ errors: err.mapped() });
  }
  }
]

