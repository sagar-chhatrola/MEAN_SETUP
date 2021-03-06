import {Injectable} from '@angular/core'
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import {AuthService} from './../services/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  redirectUrl
  constructor(private auth:AuthService,private router:Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
  	if(this.auth.isLoggedIn()){
    return true
	}
	else{
		this.redirectUrl=state.url
		this.router.navigate(['login'])
		return false
	}
  }
}