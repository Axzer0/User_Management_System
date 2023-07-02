import {Component, Input} from '@angular/core';
import {ComplianceDetailsInterface, ContactDetailsInterface} from "../../interface/staff-form-interface";


@Component({
  selector: 'app-compliance-details-view',
  templateUrl: './compliance-details-view.component.html',
  styleUrls: ['./compliance-details-view.component.scss']
})
export class ComplianceDetailsViewComponent {
  @Input() data: ComplianceDetailsInterface | null = null

  constructor() {
  }

  ngOnInit() {
    console.log(this.data)
  }
}
