import { CountryModel } from '../../models/country';

export const SAVE_COUNTRY = 'SAVE_COUNTRY';
export const DELETE_COUNTRY = 'DELETE_COUNTRY';
export const UPDATE_COUNTRY_LIST = 'UPDATE_COUNTRY_LIST';

export interface Country {
  country?: string;
  cases?: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    total: number;
  };
  deaths?: { new: string; total: number };
  tests?: { total: number };
  day?: string;
  time?: string;
}

export interface CountryState {
  savedCountries?: Country[];
  countryList?: CountryModel[];
}

interface SaveCountryAction {
  type: typeof SAVE_COUNTRY;
  payload: Country;
}

interface DeleteCountryAction {
  type: typeof DELETE_COUNTRY;
  meta: {
    name: string;
  };
}

interface UpdateCountryListAction {
  type: typeof UPDATE_COUNTRY_LIST;
  payload: CountryModel[];
}

export type CountryActionTypes =
  | SaveCountryAction
  | DeleteCountryAction
  | UpdateCountryListAction;
