import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {FirestoreService} from "../../shared/service/firestore.service";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit{

  user: any

  constructor(private authService: AuthService, private dbService: FirestoreService) {
  }

  ngOnInit() {
    this.user = this.dbService.userList()
  }

  logout(){
    this.authService.logout()
  }
}
