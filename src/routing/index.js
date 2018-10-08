const router = require('express').Router()
const users = require('./../api/users/routes')
const blogs = require('./../api/blog/routes')
const auth = require('./../api/authentication/routes')
const jwt = require('jsonwebtoken')
const path = require('path')
router.use('/auth',auth)
/*router.use('/',async (req,res) => {
  
  res.sendFile(path.join(__dirname+'./../../client/dist/client/index.html'))
})*/
router.use((req,res,next)=>{
	let token=req.headers['authorization']
	if(!token){
		res.json({success:false,message:'No token provided'})
	}
	else{
		jwt.verify(token,'JWT_SECRET',(err,decoded)=>{
		if(err){
			res.json({success:false,message:'Token Invalid'+err})
		}
		else{
			req.decoded=decoded
			next()
		}
	})
	}
})
router.use('/users', users)
router.use('/blogs', blogs)
module.exports = router
