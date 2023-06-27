import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  currentPage: string = 'basic'

  formStatus = [
    {
      index: 0,
      name: 'Basic Details'
    },
    {
      index: 1,
      name: 'Contact Details'
    },
    {
      index: 2,
      name: 'Compliance Details'
    },

  ]

  constructor() {
  }

  ngOnInit() {
  }

  submitBasicDetails(){
    // on basic details submit
  }


  submitContactDetails(){
    // on contact details submit
  }

  submitDocumentDetails(){
    // on compliance details submit
  }

  checkFormCompletion(){
    //test which forms have been completed if verification is still incomplete
  }
}
