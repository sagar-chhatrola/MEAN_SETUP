import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from './../../services/auth.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	form:FormGroup
	message:any
	messageClass:any
	processing:boolean

	emailValid:any
	emailMessage:any
	usernameValid:any
	usernameMessage:any
  constructor(private formBuilder:FormBuilder,private auth:AuthService,public router:Router) {
  	this.createForm()
   }
   ngOnInit() {

  }
   createForm(){
	   	this.form = this.formBuilder.group({
	   		email:['',Validators.compose([
	   			Validators.required,
	   			Validators.minLength(3),
	   			Validators.maxLength(20)
	   			])],
	   		username:['',Validators.compose([
	   			Validators.required,
	   			Validators.minLength(3),
	   			Validators.maxLength(20)
	   			])],
	   		password:['',Validators.compose([
	   			Validators.required,
	   			Validators.minLength(3),
	   			Validators.maxLength(20)
	   			])],
	   		confirm:['',Validators.required]
	   	},{validator:this.matchingPassword('password','confirm')})
   }
  	
  	disableForm(){
  		this.form.controls['username'].disable()
  		this.form.controls['email'].disable()
  		this.form.controls['password'].disable()
  		this.form.controls['confirm'].disable()
  	}
  	enableForm(){
  		this.form.controls['username'].enable()
  		this.form.controls['email'].enable()
  		this.form.controls['password'].enable()
  		this.form.controls['confirm'].enable()
  	}
  register(){
  	this.processing=true
  	this.disableForm()
  	const user={
  		username:this.form.get('username').value,
  		email:this.form.get('email').value,
  		password:this.form.get('password').value
  	}
  	this.auth.registerUser(user).subscribe((res)=>{
  		console.log(res['success'])
  		if(res['success']){
        let self=this
  			this.message=res['message']
  			this.messageClass='alert alert-success'
  			setTimeout(function(){
  				self.router.navigate(['login'])
  			},2000)

  		}
  		else{
  			this.message=res['message']
  			this.messageClass='alert alert-danger'
  			this.processing=false
  			this.enableForm()
  		}
  	},(err)=>{
  		console.log(err)
  	})
  	
  }

  checkEmail(){
  	this.auth.checkEmail(this.form.get('email').value).subscribe((res)=>{
  		if(res['success']){
  			this.emailValid=true
  			this.emailMessage=res['message']
  		}
  		else{
  			this.emailValid=false
  			this.emailMessage=res['message']
  		}
  	},(err)=>{

  	})
  }
  checkUsername(){
  	this.auth.checkUsername(this.form.get('username').value).subscribe((res)=>{
  		if(res['success']){
     
  			this.usernameValid=true
  			this.usernameMessage=res['message']
  		}
  		else{
  			this.usernameValid=false
  			this.usernameMessage=res['message']
  		}
  	},(err)=>{

  	})
  }
  matchingPassword(password,confirm){
  	return (group:FormGroup)=>{
  		if(group.controls[password].value==group.controls[confirm].value){
  			return null
  		}
  		else{
  			return {matchingPassword:true}
  		}
  	}
  }
}
