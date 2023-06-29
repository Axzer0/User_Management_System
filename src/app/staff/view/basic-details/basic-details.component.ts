import {Component, Input} from '@angular/core';
import {BasicDetailsInterface} from "../../interface/staff-form-interface";

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.scss']
})
export class BasicDetailsComponent {
  @Input() data: BasicDetailsInterface | null = null

  constructor() {
  }
}
