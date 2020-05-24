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
import { Country } from '../../models/country';

interface ContainerProps {
  countries: Country[];
  type: 'all' | 'favs';
}

const CountryList: React.FC<ContainerProps> = ({ countries, type }) => {
  return (
    <IonList>
      {countries.map((country, i) => (
        <IonItemSliding key={i}>
          <IonItem
            detail={true}
            routerLink={`/details/${type}/1`}
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
          <IonItemOptions side="end">
            <IonItemOption onClick={() => {}}>Guardar</IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default CountryList;
