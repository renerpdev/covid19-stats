import {
  CountryActionTypes,
  CountryState,
  DELETE_COUNTRY,
  SAVE_COUNTRY,
  UPDATE_COUNTRY_LIST,
} from './types';

const initialState: CountryState = {
  countryList: [
    {
      name: 'cuba',
      img: '',
    },
  ],
  savedCountries: [],
};

export function countryReducer(
  state = initialState,
  action: CountryActionTypes
): CountryState {
  switch (action.type) {
    case SAVE_COUNTRY:
      return {
        savedCountries: [...state.savedCountries, action.payload],
      };
    case DELETE_COUNTRY:
      return {
        savedCountries: state.savedCountries?.filter(
          ({ country }) => country !== action.meta.name
        ),
      };
    case UPDATE_COUNTRY_LIST:
      return {
        countryList: [...action.payload],
      };
    default:
      return state;
  }
}
