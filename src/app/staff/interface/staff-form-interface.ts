export interface BasicDetailsInterface{
  firstName: string,
  middleName?: string,
  lastName: string,
  dob: Date,
  cob: string,
  email: string,
  gender: string,
  other?: string
}

export interface ContactDetailsInterface{
  country: string,
  province: string,
  city: string,
  addressOne: string,
  addressTwo?: string,
  zip: string,
  mobile: number,
  term: string
}
