import { CountryModel } from '../models/country';
import _ from 'lodash';

const PREFIX = 'cov19-';
const FAVORITE = 'favorites';
const LIST = 'country-list';

const getItem = (key: string) => {
  const result = localStorage.getItem(`${PREFIX}${key}`) || null;
  return !_.isNil(result) ? JSON.parse(result) : [];
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
  const favorites = getFavoriteCountries();
  if (isFavorite(country.id)) {
    return favorites;
  }
  const newFavorites = [...favorites, country];
  setItem(FAVORITE, newFavorites);
  return newFavorites;
};
const removeFavoriteCountry = (name: string) => {
  const favorites = getFavoriteCountries();
  const newFavorites = favorites.filter(
    (c: CountryModel) => c.id.toLowerCase() !== name.toLowerCase()
  );
  setItem(FAVORITE, newFavorites);
  return newFavorites;
};
const isFavorite = (id: string) => {
  const favorites = getFavoriteCountries();
  return _.some(favorites, (f) =>
    _.isEqual(f.id.toLowerCase(), id.toLowerCase())
  );
};

export default {
  updateCountryList,
  getCountryList,
  removeFavoriteCountry,
  addFavoriteCountry,
  getFavoriteCountries,
  isFavorite,
};
