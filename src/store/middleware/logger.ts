import {
  ADD_FAVORITE_COUNTRY,
  CountryActionTypes,
  REMOVE_FAVORITE_COUNTRY,
} from '../country/types';
import { updateNotificationMsg } from '../country/actions';

export default (store: any) => (next: any) => (action: CountryActionTypes) => {
  if (action.type === ADD_FAVORITE_COUNTRY) {
    store.dispatch(updateNotificationMsg('Se ha agregado un nuevo favorito'));
  }
  if (action.type === REMOVE_FAVORITE_COUNTRY) {
    store.dispatch(updateNotificationMsg('Se ha eliminado un favorito'));
  }
  return next(action);
};
