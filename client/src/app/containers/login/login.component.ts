import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {AuthService} from './../../services/auth.service'
import {AuthGuard} from './../../guards/auth.guard'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  	form:FormGroup
	message:any
	messageClass:any
	processing:boolean	
	previousUrl
  constructor(private formBuilder:FormBuilder,private auth:AuthService,public router:Router,private authGuard:AuthGuard) {
  	this.createForm()
   }

  ngOnInit() {
  	if(this.authGuard.redirectUrl){
  		this.messageClass='alert alert-danger'
  		this.message='You must be logged in to view that page'
  		this.previousUrl=this.authGuard.redirectUrl
  		this.authGuard.redirectUrl=undefined
  	}
  }


   createForm(){
	   	this.form = this.formBuilder.group({
	   		
	   		username:['',Validators.compose([
	   			Validators.required,
	   			Validators.minLength(3),
	   			Validators.maxLength(20)
	   			])],
	   		password:['',Validators.compose([
	   			Validators.required,
	   			Validators.minLength(3),
	   			Validators.maxLength(20)
	   			])]
	   	})
   }
  	
  	disableForm(){
  		this.form.controls['username'].disable()
  		
  		this.form.controls['password'].disable()
  		
  	}
  	enableForm(){
  		this.form.controls['username'].enable()
  		
  		this.form.controls['password'].enable()
  		
  	}
  login(){
  	this.processing=true
  	this.disableForm()
  	const user={
  		username:this.form.get('username').value,
  		
  		password:this.form.get('password').value
  	}

  	this.auth.loginUser(user).subscribe((res)=>{
  		console.log(res)
  		if(res['success']){
  			this.auth.storeUserData(res['data'].token,res['data'].user)
  			this.auth.createHeader()
  			this.message=res['message']
  			this.messageClass='alert alert-success'
  				if(this.previousUrl){
  					this.router.navigate([this.previousUrl])
  				}
  				else{
  				this.router.navigate(['dashboard'])
  				}
  			

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
}
