import {Component, Input} from '@angular/core';
import {BasicDetailsInterface} from "../../interface/staff-form-interface";

@Component({
  selector: 'app-basic-details-view',
  templateUrl: './basic-details-view.component.html',
  styleUrls: ['./basic-details-view.component.scss']
})
export class BasicDetailsViewComponent {
  @Input() data: BasicDetailsInterface | null = null

  constructor() {
  }
}
