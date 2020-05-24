import { CountryActionTypes } from '../country/types';

export default (store: any) => (next: any) => (action: CountryActionTypes) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};
