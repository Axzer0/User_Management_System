import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {FirestoreService} from "../../shared/service/firestore.service";
import {CurrentUserService} from "../../shared/service/current-user.service";

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent implements OnInit{

  sideMenu: any[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'home'
    },
    {
      label: 'User List',
      path: '/staff',
      icon: 'supervised_user_circle'
    },
    {
      label: 'Staff List',
      path: '/staff',
      icon: 'verified_user'
    },
    {
      label: 'Profile',
      path: '/dashboard',
      icon: 'contacts'
    },
  ]

  user: any

  constructor(private authService: AuthService,
              private currentUser: CurrentUserService,
              private dbService: FirestoreService) {
  }

  ngOnInit() {
    this.user = this.currentUser.currentUser.getValue()
  }

  logout(){
    this.authService.logout()
  }
}
