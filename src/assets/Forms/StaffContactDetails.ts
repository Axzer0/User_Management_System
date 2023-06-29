import {FormInterface} from "../../app/generic-form/form-interface";

export const StaffContactDetails: FormInterface = {
  controls: [
    {
      type: 'dropdown',
      controlName: 'country',
      name: 'Country',
      placeholder: 'Select Country',
      label: 'Select Country',
      order: 1,
      class: 'col-4',
      options: ['Nepal', 'India', 'China', 'USA', 'Australia', 'UK'],
      validation: {
        required: 'Country'
      }
    },
    {
      type: 'dropdown',
      controlName: 'state',
      name: 'state',
      placeholder: 'Select province/state',
      label: 'Select province/state',
      order: 2,
      validation: {
        required: 'Province/State'
      },
      class: 'col-4',
      options: ['Nepal', 'India', 'China', 'USA', 'Australia', 'UK'],
      dependentTo: {
        value: 'country',
        trigger: (value: any) => {
          return !!value
        }
      }
    },
    {
      type: 'dropdown',
      controlName: 'city',
      name: 'city',
      placeholder: 'Select city',
      label: 'Select city',
      order: 3,
      validation: {
        required: 'City'
      },
      class: 'col-4',
      options: ['Nepal', 'India', 'China', 'USA', 'Australia', 'UK'],
      dependentTo: {
        value: 'state',
        trigger: (value: any) => {
          return !!value
        }
      }
    },{
      type: 'text',
      controlName: 'addressOne',
      name: 'addressOne',
      placeholder: 'Address 1',
      label: 'Address 1',
      order: 4,
      class: 'col-12',
      filter: 'alphaNumeric',
      validation: {
        required: 'Address 1',
        max: 50
      }
    },{
      type: 'text',
      controlName: 'addressTwo',
      name: 'addressTwo',
      placeholder: 'Address 2',
      label: 'Address 2',
      order: 5,
      class: 'col-12',
      filter: 'alphaNumeric',
      validation: {
        max: 50
      }
    },{
      type: 'text',
      controlName: 'postal',
      name: 'postal',
      placeholder: 'Postal / Zip code',
      label: 'Postal / Zip code',
      order: 6,
      class: 'col-4',
      filter: 'alphaNumeric',
      validation: {
        required: 'Postal / Zip Code',
        max: 10
      }
    },{
      type: 'text',
      controlName: 'mobile',
      name: 'mobile',
      placeholder: 'Mobile Number',
      label: 'Mobile Number',
      order: 7,
      class: 'col-4',
      filter: 'onlyNumber',
      validation: {
        required: 'Mobile Number',
        max: 15
      }
    }, {
      type: 'dropdown',
      controlName: 'term',
      name: 'term',
      placeholder: 'Term',
      label: 'How long have you been living here',
      order: 8,
      class: 'col-4',
      options: ['Less than 1 year', '1 year', '2 years', '3 years', 'More than 3 years'],
      validation: {
        required: 'Country'
      }
    },
  ]
}
