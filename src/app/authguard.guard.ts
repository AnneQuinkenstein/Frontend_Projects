import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {UserService} from "./shared/user.service";

/*export const authguardGuard: CanActivateFn = (route, state) => {
    return this.us.isAuthenticated()
      ? true
      : this.router.parseUrl('/login');
};*/


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(
    private us: UserService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    return this.us.isLoggedIn()
      ? true
      : this.router.parseUrl('/login');
  }

}
