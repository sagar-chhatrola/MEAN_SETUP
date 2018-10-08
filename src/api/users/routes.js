const router = require('express').Router()
const controller = require('./controller')
const validation = require('./validation')
const User = require('./model')
const path = require('path')
const jwt = require('jsonwebtoken')

router.get('/profile',async (req,res) => {
 let userId=req.decoded.userId 
 User.findOne({_id:userId}).select('username email').exec((err,user)=>{
 	if(err){
 		return res.json({success:false,message:err})
 	}
 	else{
 		if(!user){
 			return res.json({success:false,message:'User not found'})
 		}
 		else{
 			return res.json({success:true,message:'Get profile successfully',data:user})
 		}
 	}
 })
})



module.exports = router
