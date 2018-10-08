const { check, validationResult,body } = require('express-validator/check');
exports.newBlog = [
	
 body('title','title is required').isLength({ min: 1 }),
 body('body').isLength({ min:1 }).withMessage('body is required'),
  body('createdBy').isLength({ min: 1 }).withMessage('creator is required'),
  
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

