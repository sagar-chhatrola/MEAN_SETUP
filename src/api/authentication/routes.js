const router = require('express').Router()
const controller = require('./controller')
const validation = require('./validation')
const User = require('./../users/model')
const path = require('path')
const jwt = require('jsonwebtoken')



router.post('/register',validation.register, async (req,res) => {
  const body = req.body
  let user= new User()
  user.username= body.username
  user.email= body.email
  user.password= body.password
  user.save(async (err,user)=>{
		
		if(err){
			if(err.code==11000){
				console.log(user,err.code)
				 res.json({success:false,message:"Username or email already exist"})
			}
			else{
				 res.json({success:false,message:"Could not save user Error."})
			}
		}
		else{
			 res.json({success:true,message:"You are successfully registered"})
		}
	})
})

router.post('/login',validation.login,async (req,res)=>{
	let username = req.body.username
	let password = req.body.password.toLowerCase()
	User.findOne({username:username},(err,user)=>{
		if(err){
			res.json({success:false,message:err})
		}
		else{
			if(!user){
				res.json({success:false,message:'User Not Found'})
			}
			else{
				let validPassword = user.comparePassword(password,user.password)
				if(!validPassword){
					res.json({success:false,message:"Invalid password"})
				}
				else{
					let jwt_token=jwt.sign({userId:user._id},'JWT_SECRET',{expiresIn:'24h'})
					let data={}
					data['token']=jwt_token
					data['user']={username:user.username}
					res.json({success:true,message:"Login successfully",data:data})
				}
			}
		}
	})
})

router.get('/checkEmail/:email',validation.checkEmail,(req,res)=>{
	User.findOne({email:req.params.email},(err,user)=>{
		if(err){
			return res.json({success:false,message:err})
		}
		else{
			if(user){
				return res.json({success:false,message:"E-mail is already taken"})
			}
			else{
				return res.json({success:true,message:"E-mail is available"})
			}
		}
	})
})

router.get('/checkUsername/:username',validation.checkUsername,(req,res)=>{
	User.findOne({username:req.params.username},(err,user)=>{
		if(err){
			return res.json({success:false,message:err})
		}
		else{
			if(user){
				return res.json({success:false,message:"Username is already taken"})
			}
			else{
				return res.json({success:true,message:"Username is available"})
			}
		}
	})
})

module.exports = router
