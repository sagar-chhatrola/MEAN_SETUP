const User = require('./model')

exports.read = async (req,res) => {
  return User.find()
}

exports.create = async ({ data = {} } = {}) => {
  return User.create(data)
}

exports.save = async (data)=>{
	
	let user= new User()
	user.username= data.username
	user.email= data.email
	user.password= data.password
	let json= await user.save(async (err,user)=>{
		
		if(err){
			if(err.code==11000){
				console.log(user,err.code)
				 return {success:false,message:"Username or email already exist"}
			}
			else{
				 return {success:false,message:"Could not save user Error."}
			}
		}
		else{
			 return {success:true,message:"You are successfully registered"}
		}
	})

	console.log(json)
}
