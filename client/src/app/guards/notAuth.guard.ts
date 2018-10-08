import {Injectable} from '@angular/core'
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router'
import {AuthService} from './../services/auth.service'

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
  	if(this.auth.isLoggedIn()){
      this.router.navigate(['/'])
      return false
    }
  	else{
  		return true
    }
	
  }
}