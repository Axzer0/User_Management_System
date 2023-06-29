import {Component, Input, OnInit} from '@angular/core';
import {ContactDetailsInterface} from "../../interface/staff-form-interface";

@Component({
  selector: 'app-contact-details-view',
  templateUrl: './contact-details-view.component.html',
  styleUrls: ['./contact-details-view.component.scss']
})
export class ContactDetailsViewComponent implements OnInit{
  @Input() data: ContactDetailsInterface | null = null
  constructor() {
  }

  ngOnInit(){
  console.log(this.data)
}
}
