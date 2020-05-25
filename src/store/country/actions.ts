import {
  CountryActionTypes,
  FETCH_COUNTRY_LIST,
  UPDATE_COUNTRY_LIST,
  UPDATE_FAVORITES,
} from './types';
import { CountryModel } from '../../models/country';
import AxiosService from '../../services/axios';
import LocalStorageService from '../../services/localStorage';

export const fetchCountryList = () => {
  return {
    type: FETCH_COUNTRY_LIST,
    payload: AxiosService.getCountryList(),
  };
};

export function addFavoriteCountry(
  newCountry: CountryModel
): CountryActionTypes {
  return {
    type: UPDATE_FAVORITES,
    payload: [...LocalStorageService.addFavoriteCountry(newCountry)],
  };
}

export function deleteFavoriteCountry(name: string): CountryActionTypes {
  return {
    type: UPDATE_FAVORITES,
    payload: [...LocalStorageService.removeFavoriteCountry(name)],
  };
}

export function getFavoriteCountries(): CountryActionTypes {
  const results = LocalStorageService.getFavoriteCountries();
  return {
    type: UPDATE_FAVORITES,
    payload: results,
  };
}

export function searchCountry(countryName: string): CountryActionTypes {
  const results = LocalStorageService.getCountryList().filter(
    (c: CountryModel) =>
      c.name.toLowerCase().indexOf(countryName.toLowerCase()) >= 0
  );
  return {
    type: UPDATE_COUNTRY_LIST,
    payload: results,
  };
}
