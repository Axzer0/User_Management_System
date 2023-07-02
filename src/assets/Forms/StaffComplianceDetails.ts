import {FormInterface} from "../../app/generic-form/form-interface";
import {IdentityTypeList} from "./optionList";

export const StaffComplianceDetails: FormInterface = {
  controls: [
    {
      type: 'dropdown',
      controlName: 'identityType',
      name: 'Identity Type',
      placeholder: 'Identity Type',
      label: 'Identity Type',
      order: 1,
      class: 'col-12',
      options: IdentityTypeList,
      validation: {
        required: 'Identity type'
      }
    },
    {
      type: 'file',
      controlName: 'residence',
      name: 'residence',
      placeholder: 'Residence Permit',
      label: 'Residence Permit',
      order: 3,
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      }
    },{
      type: 'file',
      controlName: 'address',
      name: 'address',
      placeholder: 'Proof of Address',
      label: 'Proof of Address',
      order: 4,
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Proof of Address'
      }
    },{
      type: 'file',
      controlName: 'cv',
      name: 'cv',
      placeholder: 'CV',
      label: 'CV',
      order: 5,
      filter: {
        size: 3,
        type: '.pdf',
      },
      validation: {
        required: 'CV'
      }
    },{
      type: 'file',
      controlName: 'certification',
      name: 'certification',
      placeholder: 'Highest Qualification',
      label: 'Highest Qualification',
      order: 6,
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Highest Qualification'
      }
    },
    {
      type: 'file',
      controlName: 'passport',
      name: 'passport',
      placeholder: 'Passport',
      label: 'Passport',
      order: 2,
      class: 'col-12',
      validation: {
        required: 'Passport'
      },
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      dependentTo: {
        value: 'identityType',
        trigger: (value: any) => {
          return value === 'passport'
        }
      }
    },
    {
      type: 'file',
      controlName: 'front',
      name: 'front',
      placeholder: 'Front side',
      label: 'Front side',
      order: 2,
      validation: {
        required: 'Front side'
      },
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      dependentTo: {
        value: 'identityType',
        trigger: (value: any) => {
          return (value && value !== 'passport')
        }
      }
    },
    {
      type: 'file',
      controlName: 'back',
      name: 'back',
      placeholder: 'Back side',
      label: 'Back side',
      order: 2,
      validation: {
        required: 'Back side'
      },
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      dependentTo: {
        value: 'identityType',
        trigger: (value: any) => {
          return (value && value !== 'passport')
        }
      }
    }
  ]
}
