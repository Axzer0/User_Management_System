import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CurrentUserService} from "../service/current-user.service";
import {LoadingService} from "../service/loading.service";

@Injectable({
  providedIn: 'root'
})
export class dashboardGuard implements CanActivate {
  constructor(private router: Router, private currentUser: CurrentUserService,private loading: LoadingService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(obs => {
      this.currentUser.currentUser.subscribe(_user => {
        if (_user){
          this.loading.setLoading(false)
          if (!_user?.isVerified){
            this.router.navigate(['/register']).then()
            obs.next(false)
          } else {
            obs.next(true)
          }
        } else {
          this.loading.setLoading(true)
        }
      })
    })
  }
}

