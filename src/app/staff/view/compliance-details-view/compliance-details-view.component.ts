import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ComplianceDetailsInterface, ContactDetailsInterface} from "../../interface/staff-form-interface";
import {IdentityTypeList} from "../../../../assets/Forms/optionList";
import {EditDialogComponent} from "../../edit/edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AddressEditForm, BackEditForm,
  CertificationEditForm,
  CVEditForm, FrontEditForm,
  IdentityEditForm,
  PassportEditForm,
  ResidenceEditForm
} from "../../edit/EditForms";
import {MapToLabel} from "../../../shared/functions/helper-functions";
import {CurrentUserService} from "../../../shared/service/current-user.service";


@Component({
  selector: 'app-compliance-details-view',
  templateUrl: './compliance-details-view.component.html',
  styleUrls: ['./compliance-details-view.component.scss']
})
export class ComplianceDetailsViewComponent implements OnInit, OnChanges{
  @Input() data: ComplianceDetailsInterface | any | undefined = null
  @Input() uid: any = ''
  @Output() edit: EventEmitter<any>  = new EventEmitter<any>()
  tabArray: any[] = []

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog,) {
  }

  ngOnChanges(changes: SimpleChanges){
    this.generateTabs()
    if (this.data?.identityType){
      this.data.identityType = MapToLabel(this.data.identityType, IdentityTypeList)
    }
  }

  ngOnInit() {

  }

  generateTabs(){
    this.tabArray = []
    if (this.data){
      Object.keys(this.data).forEach(key => {
        if (this.data && this.data[key]){
          if (this.getTabObject(key, this.data[key])){
            this.tabArray = [...this.tabArray, this.getTabObject(key, this.data?.[key])]
          }
        }
      })
      console.log(this.tabArray)
      this.cdr.detectChanges()
    }
  }

  getTabObject(key: string, data: any){
    switch (key){
      case 'identityType': return null;
      case 'passport': return this.createTabObject(key, this.getIdentityType(), data);
      case 'residence': return this.createTabObject(key,'Residence Permit', data);
      case 'cv': return this.createTabObject(key,'Curriculum Vitae', data);
      case 'certification': return this.createTabObject(key,'Highest Qualification', data);
      case 'address': return this.createTabObject(key,'Proof of Address', data);
      case 'front': return this.createTabObject(key,`${this.getIdentityType()} front`, data);
      case 'back': return this.createTabObject(key,`${this.getIdentityType()} back`, data);
      default: return null
    }
  }

  createTabObject(key: string, label: string, data: any): {label: string, value: any, key: string}{
    return {
      label: label,
      value: data,
      key: key
    }
  }

  getIdentityType(): string{
    let _temp = IdentityTypeList.find(m => m.value === this.data?.identityType)
    if (_temp){
      return _temp.label
    }
    return this.data?.identityType || '';
  }

  view(url: string){
    window.open(url , '_blank');
  }

  onEdit(key: string){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: this.getEditForm(key),
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result)
        this.edit.emit(result)
      }
    });
  }

  getEditForm(key: string){
    switch (key){
      case 'identityType': return null;
      case 'passport': return {
        form: PassportEditForm,
        title: `Update ${this.getIdentityType()}`,
        value: null,
        editFor: key
      };
      case 'residence': return {
        form: ResidenceEditForm,
        title: `Update Residence`,
        value: null,
        editFor: key
      };
      case 'cv': return {
        form: CVEditForm,
        title: `Update CV`,
        value: null,
        editFor: key
      };
      case 'certification': return {
        form: CertificationEditForm,
        title: `Update Qualification`,
        value: null,
        editFor: key
      };
      case 'address': return {
        form: AddressEditForm,
        title: `Update proof of Address`,
        value: null,
        editFor: key
      };
      case 'front': return {
        form: FrontEditForm,
        title: `Update ${this.getIdentityType()} front`,
        value: null,
        editFor: key
      };
      case 'back': return {
        form: BackEditForm,
        title: `Update ${this.getIdentityType()} back`,
        value: null,
        editFor: key
      };
      default: return null
    }
  }
}
