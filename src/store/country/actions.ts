import {
  ADD_FAVORITE_COUNTRY,
  CountryActionTypes,
  FETCH_COUNTRY_DATA,
  FETCH_COUNTRY_LIST,
  REMOVE_FAVORITE_COUNTRY,
  UPDATE_COUNTRY_LIST,
  UPDATE_NOTIFICATION_MSG,
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
export const fetchCountryData = (country: string) => {
  return {
    type: FETCH_COUNTRY_DATA,
    payload: AxiosService.getCountryStats(country),
  };
};

export function addFavoriteCountry(
  newCountry: CountryModel
): CountryActionTypes {
  return {
    type: ADD_FAVORITE_COUNTRY,
    payload: newCountry,
  };
}

export function deleteFavoriteCountry(id: string): CountryActionTypes {
  return {
    type: REMOVE_FAVORITE_COUNTRY,
    payload: id,
  };
}

export function updateNotificationMsg(msg: string): CountryActionTypes {
  return {
    type: UPDATE_NOTIFICATION_MSG,
    payload: msg,
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
