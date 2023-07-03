import {CountryList, GenderList, LivingTerms} from "../../../assets/Forms/optionList";
export const MapGender = (val: string): string =>{
  let _temp = GenderList.find(m => m.value == val)
  if (!_temp){
    return 'others'
  }
  return val
}

export const MapCountry = (name: string): string =>{
  let _temp = CountryList.find(m => m.label == name)
  if (_temp){
    console.log(_temp)
    return _temp.value
  }
  return name
}

export const MapTerm = (val: string): string => {
  let _temp = LivingTerms.find(m => m.label == val)
  if (_temp){
    return _temp.value
  }
  return val
}

export const MapToLabel = (val: string, list: any[]):string => {
  let _temp = list.find(m => m.value == val)
  if (_temp){
    return _temp.label
  }
  return val
}
