import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {StaffService} from "../service/staff.service";
import {UserService} from "../../user/service/user.service";
import {finalize, Subscription} from "rxjs";
import {Router} from "@angular/router";

interface StaffTableObjectInterface{
  id: number,
  uid: string,
  name: string,
  email: string,
  gender: string,
  number: string
}

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.scss']
})
export class StaffTableComponent implements OnDestroy{

  staffList: any = []
  staffListSubscription: Subscription = new Subscription()


  tableData: StaffTableObjectInterface[] = [];
  tableColumns =['id', 'name', 'email', 'gender', 'number', 'actions'];
  filter = {
    email: '',
    gender: '',
    number: '',
  }

  sort = {
    id: 'asc',
    name: 'asc',
    email: 'asc',
    mobile: 'asc',
  }

  pageSize = 5


  constructor(private staffDBService: StaffService,private cdr: ChangeDetectorRef, private router: Router) {
    this.initialDataFetch()
  }

  initialDataFetch(){
    this.staffListSubscription = this.staffDBService.staffList$
      .subscribe(res => {
        this.staffList = res
        this.generateTableData()
      })
  }

  generateTableData(){
    let i = 1
    this.tableData = []
    for (let staff of this.staffList){
      let basic = staff.basic || null
      let contact = staff.contact || null
      let compliance = staff.compliance || null
      let name  = `${staff.basic?.firstName} ${staff.basic.middleName ? staff.basic.middleName + ' ' + staff.basic.lastName : staff.basic.lastName}`
      let row: StaffTableObjectInterface = {
        id: i,
        name: name,
        email: basic?.email,
        gender: basic?.gender,
        number: contact?.mobile ? contact?.mobile : 'N/A',
        uid: staff.uid,
      }
      this.tableData = [...this.tableData, row]
      i++
    }
    this.cdr.detectChanges()
  }

  view(id: string){
    console.log(id)
    this.router.navigate(['/staff/' + id]).then()
  }

  ngOnDestroy(): void {
    this.staffListSubscription.unsubscribe()
  }
}
