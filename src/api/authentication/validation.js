const { check, validationResult,body } = require('express-validator/check');
exports.register = [
	
 body('username','Username is required').isLength({ min: 1 }),
 body('email').isLength({ min:1 }).withMessage('Email is required'),
  
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

exports.login = [
  body('username','Username is required').isLength({ min: 1 }),
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

exports.checkEmail=[
  check('email').isLength({ min:1 }).withMessage('Email is Not Provided'),
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

exports.checkUsername=[
  check('username').isLength({ min:1 }).withMessage('Username is Not Provided'),
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