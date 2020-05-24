import {
  Country,
  CountryActionTypes,
  DELETE_COUNTRY,
  SAVE_COUNTRY,
  UPDATE_COUNTRY_LIST,
} from './types';
import { CountryModel } from '../../models/country';

export function addCountry(newCountry: Country): CountryActionTypes {
  return {
    type: SAVE_COUNTRY,
    payload: newCountry,
  };
}

export function deleteCountry(name: string): CountryActionTypes {
  return {
    type: DELETE_COUNTRY,
    meta: {
      name,
    },
  };
}
export function updateCountryList(list: CountryModel[]): CountryActionTypes {
  return {
    type: UPDATE_COUNTRY_LIST,
    payload: list,
  };
}
