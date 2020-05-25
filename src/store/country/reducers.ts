import {
  CountryActionTypes,
  CountryState,
  FETCH_COUNTRY_DATA_FULFILLED,
  FETCH_COUNTRY_DATA_PENDING,
  FETCH_COUNTRY_DATA_REJECTED,
  FETCH_COUNTRY_LIST_FULFILLED,
  FETCH_COUNTRY_LIST_PENDING,
  FETCH_COUNTRY_LIST_REJECTED,
  UPDATE_COUNTRY_LIST,
  UPDATE_FAVORITES,
} from './types';
import { CountryModel } from '../../models/country';
import LocalStorageService from '../../services/localStorage';
import UtilsService from '../../services/utils';

const initialState: CountryState = {
  countryList: [],
  currentCountry: [],
  favoriteCountries: LocalStorageService.getFavoriteCountries(),
  isLoading: false,
  errors: [],
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
    case UPDATE_FAVORITES:
      return {
        ...state,
        favoriteCountries: [...action.payload],
      };
    case FETCH_COUNTRY_LIST_FULFILLED:
      const countries: CountryModel[] = action.payload.data.response.map(
        (c) => {
          return {
            name: c,
            img: UtilsService.getImgUrl(c),
          };
        }
      );
      LocalStorageService.updateCountryList(countries);
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
