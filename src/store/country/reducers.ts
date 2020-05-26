import {
  ADD_FAVORITE_COUNTRY,
  CountryActionTypes,
  CountryState,
  FETCH_COUNTRY_DATA_FULFILLED,
  FETCH_COUNTRY_DATA_PENDING,
  FETCH_COUNTRY_DATA_REJECTED,
  FETCH_COUNTRY_LIST_FULFILLED,
  FETCH_COUNTRY_LIST_PENDING,
  FETCH_COUNTRY_LIST_REJECTED,
  REMOVE_FAVORITE_COUNTRY,
  UPDATE_COUNTRY_LIST,
  UPDATE_NOTIFICATION_MSG,
} from './types';
import { CountryModel } from '../../models/country';
import LocalStorageService from '../../services/localStorage';
import UtilsService from '../../services/utils';

const initialState: CountryState = {
  countryList: [],
  currentCountry: [],
  favoriteCountries: LocalStorageService.getFavorites(),
  isLoading: false,
  errors: [],
  notificationMsg: '',
};

export function countryReducer(
  state = initialState,
  action: CountryActionTypes
): CountryState {
  switch (action.type) {
    case UPDATE_COUNTRY_LIST:
      return {
        ...state,
        countryList: [...action.payload],
      };
    case ADD_FAVORITE_COUNTRY:
      const filter = state.favoriteCountries.filter(
        (c: CountryModel) => c.id !== action.payload.id
      );
      const newFavorites = [...filter, action.payload];
      LocalStorageService.setFavoritesCountries(newFavorites);
      return {
        ...state,
        favoriteCountries: [...newFavorites],
      };
    case REMOVE_FAVORITE_COUNTRY:
      const favorites = state.favoriteCountries.filter(
        (c: CountryModel) => c.id !== action.payload
      );
      LocalStorageService.setFavoritesCountries(favorites);
      return {
        ...state,
        favoriteCountries: [...favorites],
      };
    case UPDATE_NOTIFICATION_MSG:
      return {
        ...state,
        notificationMsg: action.payload,
      };
    case FETCH_COUNTRY_LIST_FULFILLED:
      const countries: CountryModel[] = action.payload.data.response.map(
        (c): CountryModel => {
          const name = UtilsService.formatCountryName(c);
          return {
            name: name,
            id: c,
            img: UtilsService.getImgUrl(name),
          };
        }
      );
      LocalStorageService.setCountryList(countries);
      return {
        ...state,
        countryList: [...countries],
        isLoading: false,
      };
    case FETCH_COUNTRY_LIST_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_COUNTRY_LIST_REJECTED:
      return {
        ...state,
        isLoading: false,
        errors: [...action.payload.data.errors],
      };
    case FETCH_COUNTRY_DATA_FULFILLED:
      const country: any = action.payload.data.response[0];
      return {
        ...state,
        currentCountry: [country],
        isLoading: false,
      };
    case FETCH_COUNTRY_DATA_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_COUNTRY_DATA_REJECTED:
      return {
        ...state,
        isLoading: false,
        errors: [...action.payload.data.errors],
      };
    default:
      return state;
  }
}
