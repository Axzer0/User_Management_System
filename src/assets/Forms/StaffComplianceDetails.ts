import {FormInterface} from "../../app/generic-form/form-interface";

export const StaffComplianceDetails: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'residence',
      name: 'residence',
      placeholder: 'Residence',
      label: 'Residence',
      order: 1,
      class: 'col-4',
      validation: {
        required: 'Residence',
      }
    }
  ]
}
