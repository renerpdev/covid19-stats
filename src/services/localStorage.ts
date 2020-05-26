import { CountryModel } from '../models/country';
import _ from 'lodash';

const PREFIX = 'cov19-';
const FAVORITES = 'favorites';
const COUNTRY_LIST = 'country-list';

const getItem = (key: string) => {
  const result = localStorage.getItem(`${PREFIX}${key}`) || null;
  return !_.isNil(result) ? JSON.parse(result) : [];
};
const setItem = (key: string, data: CountryModel[]) => {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
};

const getCountryList = () => {
  return getItem(COUNTRY_LIST);
};

const getFavorites = () => {
  return getItem(FAVORITES);
};
const setCountryList = (list: CountryModel[]) => {
  setItem(COUNTRY_LIST, list);
};

const setFavoritesCountries = (countries: CountryModel[]) => {
  setItem(FAVORITES, countries);
};

export default {
  setCountryList,
  getCountryList,
  getFavorites,
  setFavoritesCountries,
};
