import { CountryModel } from '../models/country';
import { Country } from '../store/country/types';
import _ from 'lodash';

const PREFIX = 'cov19-';
const FAVORITE = 'favorites';
const LIST = 'country-list';

const getItem = (key: string) => {
  const result = JSON.parse(localStorage.getItem(`${PREFIX}${key}`) || '');
  return !_.isEmpty(result) ? result : [];
};
const setItem = (key: string, data: any) => {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(data));
};

const getCountryList = () => {
  return getItem(LIST);
};
const updateCountryList = (list: CountryModel[]) => {
  setItem(LIST, list);
};

const getFavoriteCountries = () => {
  return getItem(FAVORITE);
};
const addFavoriteCountry = (country: CountryModel) => {
  const storedCountries = getCountryList();
  const newFavorites = [...storedCountries, country];
  setItem(FAVORITE, newFavorites);
  return newFavorites;
};
const removeFavoriteCountry = (name: string) => {
  const storedCountries = getCountryList();
  const newFavorites = storedCountries.filter(
    (c: CountryModel) => c.name.toLowerCase() !== name.toLowerCase()
  );
  setItem(FAVORITE, newFavorites);
  return newFavorites;
};

export default {
  updateCountryList,
  getCountryList,
  removeFavoriteCountry,
  addFavoriteCountry,
  getFavoriteCountries,
};
