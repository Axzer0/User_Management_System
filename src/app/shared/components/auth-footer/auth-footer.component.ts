import { Component } from '@angular/core';
import {ChangeLangService} from "../../service/change-lang/change-lang.service";

@Component({
  selector: 'app-auth-footer',
  templateUrl: './auth-footer.component.html',
  styleUrls: ['./auth-footer.component.scss']
})
export class AuthFooterComponent {
  language: string = 'en'

  constructor(private changeLang: ChangeLangService) {
  }

  onChange(e: any){
    console.log(e)
    this.changeLang.changeLang(e)
  }
}
