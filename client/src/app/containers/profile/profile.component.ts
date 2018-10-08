import { Component, OnInit } from '@angular/core';
import {AuthService} from './../../services/auth.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	username
	email
  constructor(private auth:AuthService) { }

  ngOnInit() {
  	this.auth.get('users/profile').subscribe((res)=>{
  		console.log(res)
  			this.username=res['data'].username
  		this.email=res['data'].email

  		
  	},(err)=>{
  		console.log(err)
  	})
  }

}
