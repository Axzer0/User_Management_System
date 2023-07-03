import {FormInterface} from "../../generic-form/form-interface";
import {IdentityTypeList} from "../../../assets/Forms/optionList";

export const IdentityEditForm: FormInterface = {
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

export const PassportEditForm: FormInterface = {
  controls: [
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
      }
    }
  ]
}

export const FrontEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'front',
      name: 'front',
      placeholder: 'Front side',
      label: 'Front side',
      order: 2,
      class: 'col-12',
      validation: {
        required: 'Front side'
      },
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      }
    }
  ]
}

export const BackEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'back',
      name: 'back',
      placeholder: 'Back side',
      label: 'Back side',
      order: 2,
      class: 'col-12',
      validation: {
        required: 'Back side'
      },
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      }
    }
  ]
}

export const CVEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'cv',
      name: 'cv',
      placeholder: 'CV',
      label: 'CV',
      order: 5,
      class: 'col-12',
      filter: {
        size: 3,
        type: '.pdf',
      },
      validation: {
        required: 'CV'
      }
    }
  ]
}

export const CertificationEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'certification',
      name: 'certification',
      placeholder: 'Highest Qualification',
      label: 'Highest Qualification',
      order: 6,
      class: 'col-12',
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Highest Qualification'
      }
    }
  ]
}

export const ResidenceEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'residence',
      name: 'residence',
      placeholder: 'Residence Permit',
      label: 'Residence Permit',
      order: 3,
      class: 'col-12',
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Residence'
      }
    }
  ]
}

export const AddressEditForm: FormInterface = {
  controls: [
    {
      type: 'file',
      controlName: 'address',
      name: 'address',
      placeholder: 'Proof of Address',
      label: 'Proof of Address',
      order: 4,
      class: 'col-12',
      filter: {
        size: 3,
        type: '.pdf, .png, .jpg, .jpeg',
      },
      validation: {
        required: 'Proof of Address'
      }
    }
  ]
}
