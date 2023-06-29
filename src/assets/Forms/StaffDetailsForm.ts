import {FormInterface} from "../../app/generic-form/form-interface";
import {validMatch} from "../../app/shared/functions/customValidators";

export const StaffDetailsForm: FormInterface = {
  validator:  {
    validate: validMatch('email', 'confirmEmail'),
    message: 'Warning: Email and Confirm email must match'
  },
  controls: [
    {
      type: 'text',
      controlName: 'firstName',
      name: 'fName',
      placeholder: 'First Name',
      label: 'First Name',
      order: 1,
      class: 'col-4',
      validation: {
        required: 'First Name',
        max: 50
      }
    },
    {
      type: 'text',
      controlName: 'middleName',
      name: 'mName',
      placeholder: 'Middle Name',
      label: 'Middle Name',
      order: 2,
      class: 'col-4',
      validation: {
        max: 50
      }
    },
    {
      type: 'text',
      controlName: 'lastName',
      name: 'lName',
      placeholder: 'Last Name',
      label: 'Last Name',
      class: 'col-4',
      order: 3,
      validation: {
        required: 'Last Name',
        max: 50
      }
    },
    {
      type: 'date',
      controlName: 'dob',
      name: 'Date-of-birth',
      placeholder: 'Select date of birth',
      label: 'Select date of birth',
      order: 4,
      validation: {
        required: 'Date of Birth',
        matDatepickerFilter: 'DOB cannot be in the future'
      },
      filter: (date: Date | null) => {
        date = date || new Date();
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate()-1)
        return date <= currentDate;
      }
    },
    {
      type: 'dropdown',
      controlName: 'cob',
      name: 'Country-of-birth',
      placeholder: 'Select Country of Birth',
      label: 'Select Country of Birth',
      order: 5,
      options: ['Nepal', 'India', 'China', 'USA', 'Australia', 'UK'],
      validation: {
        required: 'Country of Birth'
      }
    },
    {
      type: 'text',
      controlName: 'email',
      name: 'email',
      placeholder: 'Email',
      label: 'Email',
      order: 6,
      validation: {
        required: 'Email',
        max: 100,
        email: true
      },
    },
    {
      type: 'text',
      controlName: 'confirmEmail',
      name: 'confirmEmail',
      placeholder: 'Confirm Email',
      label: 'Confirm-Email',
      order: 7,
      validation: {
        required: 'Email Confirmation',
        max: 100,
        email: true,
        match: 'email'
      }
    },
    {
      type: 'dropdown',
      controlName: 'gender',
      name: 'Gender',
      placeholder: 'Select Gender',
      label: 'Gender',
      order: 8,
      options: ['Male', 'Female', 'Others'],
      validation: {
        required: 'Gender'
      }
    },
    {
      type: 'text',
      controlName: 'other',
      name: 'other',
      placeholder: 'e.g. trans female',
      label: 'Specify gender',
      order: 9,
      validation: {
        required: 'Gender'
      },
      dependentTo: {
        value: 'gender',
        trigger: (value: any) => {
          return value === 'Others'
        }
      }
    },
  ]
}
