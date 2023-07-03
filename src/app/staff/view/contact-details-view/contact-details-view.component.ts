import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ContactDetailsInterface} from "../../interface/staff-form-interface";
import {MapToLabel} from "../../../shared/functions/helper-functions";
import {CountryList, GenderList, LivingTerms} from "../../../../assets/Forms/optionList";

@Component({
  selector: 'app-contact-details-view',
  templateUrl: './contact-details-view.component.html',
  styleUrls: ['./contact-details-view.component.scss']
})
export class ContactDetailsViewComponent implements OnChanges{
  @Input() data: ContactDetailsInterface | null | undefined = null
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data?.country){
      this.data.country = MapToLabel(this.data.country, CountryList)
    }
    if (this.data?.state){
      this.data.state = MapToLabel(this.data.state, CountryList)
    }
    if (this.data?.city){
      this.data.city = MapToLabel(this.data.city, CountryList)
    }
    if (this.data?.term){
      this.data.term = MapToLabel(this.data.term, LivingTerms)
    }
  }
}
