import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {API_ROOT} from '../constants/api' 
import {Router} from '@angular/router'
import { tokenNotExpired } from 'angular2-jwt';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken
  user
  header

   
  constructor(public http:HttpClient,private router:Router) {
  this.header={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      })
    } 
  }
  createHeader(){
      this.header={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': localStorage.getItem('token')
      })
    } 
  }
  registerUser(user){
  	let data=this.http.post(API_ROOT+'auth/register',user)
  	return data;
  }
  loginUser(user){
    let data=this.http.post(API_ROOT+'auth/login',user)
    return data;
  }

  logout(){
    this.authToken=null
    this.user=null
    localStorage.clear()
    this.router.navigate(['/'])

  }
  isLoggedIn() {
  return tokenNotExpired();
}
  checkUsername(username){
  	let data=this.http.get(API_ROOT+'auth/checkUsername/'+username)
  	return data;
  }

  checkEmail(email){
  	let data=this.http.get(API_ROOT+'auth/checkEmail/'+email)
  	return data;
  }

    storeUserData(token,user){
    this.authToken=token
    this.user=user
    localStorage.setItem('token',token)
    localStorage.setItem('user',JSON.stringify(user))
    
  }

  get(url){
     let data= this.http.get(API_ROOT+url,this.header)
     return data
  }
  post(url,data){
     return this.http.post(API_ROOT+url,data,this.header)
  }
  put(url,data){
    return this.http.put(API_ROOT+url,data,this.header)
  }
  delete(url,data){
    return this.http.delete(API_ROOT+url,this.header)
  }
}
