import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ChangeLangService} from "./shared/service/change-lang/change-lang.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertService} from "./shared/service/alert.service";
import {FirestoreService} from "./shared/service/firestore.service";
import {Observable} from "rxjs";
import {LoadingService} from "./shared/service/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy{
  title = 'User_Management_System';
  useLang: string = 'en'
  loading$: Observable<boolean>


  constructor(private translate: TranslateService,
              private _snackBar: MatSnackBar,
              private loading: LoadingService,
              private userDBService: FirestoreService) {
    translate.setDefaultLang('en');
    ChangeLangService.lang.subscribe((val: string) => {
      translate.use(val)
    })
    AlertService.alert.subscribe((msg: string) => {
      this.alert(msg)
    })
    this.setUser()
    this.loading$ = this.loading.loading$
  }

  setUser(): void{
    if (localStorage.getItem('user')){
      let _user = JSON.parse(localStorage.getItem('user') || '{}')
      this.userDBService.fetchCurrentUser(_user.uid)
    }
  }

  ngOnDestroy() {
    ChangeLangService.lang.unsubscribe()
    AlertService.alert.unsubscribe()
  }

  alert(msg: string): void{
    if (!msg) return
    this._snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000
    });
  }
}
