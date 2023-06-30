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
      placeholder: 'Residence',
      label: 'Residence',
      order: 3,
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Residence'
      }
    },{
      type: 'file',
      controlName: 'id',
      name: 'id',
      placeholder: 'id',
      label: 'id',
      order: 4,
      validation: {
        required: 'ID'
      }
    },
    {
      type: 'file',
      controlName: 'document',
      name: 'document',
      placeholder: 'Choose Document',
      label: 'Choose Document',
      order: 2,
      class: 'col-12',
      validation: {
        required: 'Document'
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
      dependentTo: {
        value: 'identityType',
        trigger: (value: any) => {
          return (value && value !== 'passport')
        }
      }
    }
  ]
}
