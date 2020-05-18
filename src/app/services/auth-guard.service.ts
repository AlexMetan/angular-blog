import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router:Router,
    private auth:AuthService
  ) { }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot){
    if(this.auth.isLoggedIn()){
      return true
    }
    else {
      this.router.navigate(['sign-in'],{
        queryParams:{
          path:route.routeConfig.path
        }
      });
      return false;
    }
  }

}
