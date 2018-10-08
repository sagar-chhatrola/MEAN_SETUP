const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique : true,
    lowercase:true
  },
  email: {
    type: String,
    required : true,
    unique : true,
    lowercase:true
  },
  password: {
  	type : String,
  	required : true
  }
})

UserSchema.pre('save',function(next){
  var hash = bcrypt.hashSync(this.password, salt);
  this.password= hash
  return next()

})

UserSchema.methods.comparePassword=(password,jwtpwd)=>{
  return bcrypt.compareSync(password,jwtpwd)
}

const User = mongoose.model('User', UserSchema)

module.exports = User
