import React from 'react';
import {
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonThumbnail,
} from '@ionic/react';
import { CountryModel } from '../../models/country';
import { useDispatch } from 'react-redux';
import {
  addFavoriteCountry,
  deleteFavoriteCountry,
} from '../../store/country/actions';

interface ContainerProps {
  countries: CountryModel[];
  type: 'all' | 'favs';
}

const CountryList: React.FC<ContainerProps> = ({ countries, type }) => {
  const dispatch = useDispatch();

  const deleteFavorite = (country: string) => {
    dispatch(deleteFavoriteCountry(country));
  };
  const addFavorite = (country: CountryModel) => {
    dispatch(addFavoriteCountry(country));
  };
  const isFavsType = () => type === 'favs';

  return (
    <IonList>
      {countries.map((country, i) => (
        <IonItemSliding key={i}>
          <IonItem
            detail={true}
            routerLink={`/details/${type}/${country.id}`}
            routerDirection="forward"
          >
            <IonThumbnail slot="start">
              <IonImg src={country.img} />
            </IonThumbnail>
            <IonLabel>
              <h2>{country.name}</h2>
              <p>Click to see all stats</p>
            </IonLabel>
          </IonItem>
          <IonItemOptions side="end">
            {isFavsType() && (
              <IonItemOption
                onClick={() => deleteFavorite(country.id)}
                color={'danger'}
              >
                Remover
              </IonItemOption>
            )}
            {!isFavsType() && (
              <IonItemOption
                onClick={() => addFavorite(country)}
                color={'secondary'}
              >
                Guardar
              </IonItemOption>
            )}
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default CountryList;
