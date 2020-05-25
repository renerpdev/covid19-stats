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
import { deleteFavoriteCountry } from '../../store/country/actions';

interface ContainerProps {
  countries: CountryModel[];
  type: 'all' | 'favs';
}

const CountryList: React.FC<ContainerProps> = ({ countries, type }) => {
  const dispatch = useDispatch();

  const handleDelete = (country: string) => {
    dispatch(deleteFavoriteCountry(country));
  };
  return (
    <IonList>
      {countries.map((country, i) => (
        <IonItemSliding key={i}>
          <IonItem
            detail={true}
            routerLink={`/details/${type}/${country.name}`}
            routerDirection="forward"
          >
            <IonThumbnail slot="start">
              <IonImg src={country.img} />
            </IonThumbnail>
            <IonLabel>
              <h2>{country.name}</h2>
              <p>Haga click para ver los detalles</p>
            </IonLabel>
          </IonItem>
          {type === 'favs' && (
            <IonItemOptions side="end">
              <IonItemOption
                onClick={() => handleDelete(country.name)}
                color={'danger'}
              >
                Remover
              </IonItemOption>
            </IonItemOptions>
          )}
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default CountryList;
