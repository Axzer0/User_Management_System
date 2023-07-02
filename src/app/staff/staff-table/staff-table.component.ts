import {ChangeDetectorRef, Component} from '@angular/core';
import {StaffService} from "../service/staff.service";
import {UserService} from "../../user/service/user.service";
import {finalize} from "rxjs";

interface StaffTableObjectInterface{
  id: number,
  uid: string,
  name: string,
  email: string,
  gender: string,
  number: number,
  registration: string
}

@Component({
  selector: 'app-staff-table',
  templateUrl: './staff-table.component.html',
  styleUrls: ['./staff-table.component.scss']
})
export class StaffTableComponent {

  staffList: any = []

  tableData: StaffTableObjectInterface[] = [];
  tableColumns =['id', 'name', 'email', 'gender', 'number', 'registration'];
  filter = {
    email: '',
    gender: '',
    number: '',
    registration: ''
  }

  sort = {
    id: 'asc',
    name: 'asc',
    email: 'asc',
    mobile: 'asc',
  }

  pageSize = 5


  constructor(private staffDBService: StaffService,private cdr: ChangeDetectorRef) {
    this.initialDataFetch()
  }

  initialDataFetch(){
    this.staffDBService.staffList$
      .subscribe(res => {
        this.staffList = res
        this.generateTableData()
      })
  }

  generateTableData(){
    let i = 1
    for (let staff of this.staffList){
      let basic = staff.basic || null
      let contact = staff.contact || null
      let compliance = staff.compliance || null
      let registrationStatus = basic && contact && compliance ? 'Registered' : 'Unregistered'
      let name  = `${staff.basic?.firstName} ${staff.basic.middleName ? staff.basic.middleName + ' ' + staff.basic.lastName : staff.basic.lastName}`
      let row: StaffTableObjectInterface = {
        id: i,
        name: name,
        email: basic?.email,
        gender: basic?.gender,
        number: contact?.mobile,
        registration: registrationStatus,
        uid: staff.uid,
      }
      this.tableData = [...this.tableData, row]
      i++
    }
    this.repeater()
    this.cdr.detectChanges()
    console.log(this.tableData)
  }

  repeater(){
    for (let i = 0; i < 10 ;i++){
      this.tableData = [...this.tableData, ...this.tableData]
    }
  }
}
