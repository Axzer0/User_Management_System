export interface BasicDetailsInterface{
  firstName: string,
  middleName?: string,
  lastName: string,
  dob: Date | string,
  cob: string,
  email: string,
  gender: string,
  other?: string
}

export interface ContactDetailsInterface{
  country: string,
  state: string,
  city: string,
  addressOne: string,
  addressTwo?: string,
  zip: string,
  mobile: number,
  term: string
}

export interface ComplianceDetailsInterface{
  identityType: string,
  residence?: {
    type: string,
    file: File | string
  },
  front?: {
    type: string,
    file: File | string
  },
  back?: {
    type: string,
    file: File | string
  },
  passport?: {
    type: string,
    file: File | string
  },
  cv: {
    type: string,
    file: File | string
  },
  certification: {
    type: string,
    file: File | string
  },
  address: {
    type: string,
    file: File | string
  }
}
