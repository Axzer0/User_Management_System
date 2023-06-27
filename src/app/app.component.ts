import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {ChangeLangService} from "./shared/service/change-lang/change-lang.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AlertService} from "./shared/service/alert.service";
import {FirestoreService} from "./shared/service/firestore.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'User_Management_System';
  useLang: string = 'en'


  constructor(private translate: TranslateService,private _snackBar: MatSnackBar,private userDBService: FirestoreService) {
    translate.setDefaultLang('en');
    ChangeLangService.lang.subscribe((val: string) => {
      translate.use(val)
    })
    AlertService.alert.subscribe((msg: string) => {
      this.alert(msg)
    })

    this.setUser()
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
