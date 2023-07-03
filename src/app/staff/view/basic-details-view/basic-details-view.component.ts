import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {BasicDetailsInterface} from "../../interface/staff-form-interface";
import {MapToLabel} from "../../../shared/functions/helper-functions";
import {CountryList, GenderList} from "../../../../assets/Forms/optionList";

@Component({
  selector: 'app-basic-details-view',
  templateUrl: './basic-details-view.component.html',
  styleUrls: ['./basic-details-view.component.scss']
})
export class BasicDetailsViewComponent implements OnChanges{
  @Input() data: BasicDetailsInterface | null | undefined = null

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data?.cob){
      this.data.cob = MapToLabel(this.data.cob, CountryList)
    }
    if (this.data?.gender){
      this.data.gender = MapToLabel(this.data.gender, GenderList)
    }
  }


}
