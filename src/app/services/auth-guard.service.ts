import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService,
              private router: Router) {

  }
  //check if this route can be activated.
  //capture the url they are trying to access directly.
  
  canActivate(route, state: RouterStateSnapshot){
    if(this.authService.isLoggedIn()) return true;

    this.router.navigate(['/login'],{ queryParams: {
                                                    returnUrl: state.url
                                                   }
                                    }
                        );
    return false;
  }

}
