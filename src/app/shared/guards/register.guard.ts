import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CurrentUserService} from "../service/current-user.service";

@Injectable({
  providedIn: 'root'
})
export class registerGuard implements CanActivate {

  constructor(private router: Router, private currentUser: CurrentUserService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.currentUser.currentUser$.subscribe(_user => {
        console.log(_user)
        if (_user?.isVerified){
          this.router.navigate(['/dashboard']).then()
          obs.next(false)
        } else {
          obs.next(true)
        }
      })
    })
  }
}

