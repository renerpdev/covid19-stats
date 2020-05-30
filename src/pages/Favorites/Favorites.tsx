import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { CountryModel } from '../../models/country';
import { useTypedSelector } from '../../store/reducers';
import CountryList from '../../components/CountryList/CountryList';

const Favorites: React.FC = () => {
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const favorites = useTypedSelector(
    (state) => state.country.favoriteCountries
  );

  useEffect(() => {
    setCountries(favorites);
  }, [favorites]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1 style={{ textAlign: 'center' }}>My Favorites</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg={'8'} offsetLg={'2'}>
              <CountryList countries={countries} type={'favs'} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
