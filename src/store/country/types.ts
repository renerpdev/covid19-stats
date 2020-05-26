import { CountryModel } from '../../models/country';

// SYNC
export const UPDATE_COUNTRY_LIST = 'UPDATE_COUNTRY_LIST';
export const REMOVE_FAVORITE_COUNTRY = 'REMOVE_FAVORITE_COUNTRY';
export const ADD_FAVORITE_COUNTRY = 'ADD_FAVORITE_COUNTRY';
export const UPDATE_NOTIFICATION_MSG = 'UPDATE_NOTIFICATION_MSG';

// ASYNC
export const FETCH_COUNTRY_LIST = 'FETCH_COUNTRY_LIST';
export const FETCH_COUNTRY_LIST_FULFILLED = 'FETCH_COUNTRY_LIST_FULFILLED';
export const FETCH_COUNTRY_LIST_PENDING = 'FETCH_COUNTRY_LIST_PENDING';
export const FETCH_COUNTRY_LIST_REJECTED = 'FETCH_COUNTRY_LIST_REJECTED';

export const FETCH_COUNTRY_DATA = 'FETCH_COUNTRY_DATA';
export const FETCH_COUNTRY_DATA_FULFILLED = 'FETCH_COUNTRY_DATA_FULFILLED';
export const FETCH_COUNTRY_DATA_PENDING = 'FETCH_COUNTRY_DATA_PENDING';
export const FETCH_COUNTRY_DATA_REJECTED = 'FETCH_COUNTRY_DATA_REJECTED';

export interface Country {
  country: string;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths: { new: string; total: number };
  tests: { total: number };
  day: string;
  time: string;
}

export interface CountryState {
  currentCountry: Country[];
  favoriteCountries: CountryModel[];
  countryList: CountryModel[];
  errors: any[];
  isLoading: boolean;
  notificationMsg: string;
}

interface UpdateCountryListAction {
  type: typeof UPDATE_COUNTRY_LIST;
  payload: CountryModel[];
}
export interface AddFavoriteCountryAction {
  type: typeof ADD_FAVORITE_COUNTRY;
  payload: CountryModel;
}
interface RemoveFavoriteCountryAction {
  type: typeof REMOVE_FAVORITE_COUNTRY;
  payload: string;
}

interface UpdateNotificationMsgAction {
  type: typeof UPDATE_NOTIFICATION_MSG;
  payload: string;
}

interface FetchCountryListAction {
  type: typeof FETCH_COUNTRY_LIST;
  payload: CountryModel[];
}

interface FetchCountryDataAction {
  type: typeof FETCH_COUNTRY_DATA;
  payload: CountryModel[];
}

interface FetchFulfilledAction {
  type:
    | typeof FETCH_COUNTRY_LIST_FULFILLED
    | typeof FETCH_COUNTRY_DATA_FULFILLED;
  payload: { data: { response: string[] } };
}

interface FetchRejectedAction {
  type: typeof FETCH_COUNTRY_LIST_REJECTED | typeof FETCH_COUNTRY_DATA_REJECTED;
  payload: { data: { errors: [] } };
}
interface FetchPendingAction {
  type: typeof FETCH_COUNTRY_LIST_PENDING | typeof FETCH_COUNTRY_DATA_PENDING;
}

export type CountryActionTypes =
  | UpdateCountryListAction
  | AddFavoriteCountryAction
  | RemoveFavoriteCountryAction
  | FetchCountryListAction
  | FetchCountryDataAction
  | FetchFulfilledAction
  | FetchPendingAction
  | FetchRejectedAction
  | UpdateNotificationMsgAction;
