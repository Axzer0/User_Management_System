import {ChangeDetectorRef, Component} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

interface UserListObjectInterface{
  uid: string,
  username: string,
  role: string,
  verified: string,
  email: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userList: any = []
  userListSubscription: Subscription = new Subscription()


  tableData: UserListObjectInterface[] = [];
  tableColumns =['uid', 'username', 'email', 'role', 'verified', 'actions'];
  filter = {
    uid: '',
    username: '',
    email: '',
    role: '',
    verification: ''
  }

  sort = {
    uid: 'asc',
    username: 'asc',
    email: 'asc',
    verification: 'asc',
    role: 'asc'
  }

  pageSize = 5


  constructor(private userDBService: UserService,private cdr: ChangeDetectorRef, private router: Router) {
    this.initialDataFetch()
  }

  initialDataFetch(){
    this.userListSubscription = this.userDBService.userList()
      .subscribe(res => {
        console.log(res)
        this.userList = res
        this.generateTableData()
      })
  }

  generateTableData(){
    this.tableData = []
    for (let user of this.userList){
      let row: UserListObjectInterface = {
        email: user?.email || "N/A",
        role: user?.role || "N/A",
        uid: user?.uid || "N/A",
        username: user?.username || "N/A",
        verified: user?.isVerified ? 'Verified': 'Not Verified'
      }
      this.tableData = [...this.tableData, row]
    }

    this.cdr.detectChanges()
  }

  view(id: string){
    this.router.navigate(['/user/' + id]).then()
  }

  ngOnDestroy(): void {
    this.userListSubscription.unsubscribe()
  }
}
