import React from 'react';
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
import './Favorites.scss';
import _ from 'lodash';
import CountriesJson from '../../assets/countries.json';
import CountryList from '../../components/CountryList/CountryList';

const Favorites: React.FC = () => {
  const getCountryCode = (countryName: string) => {
    const country = _.find(
      CountriesJson,
      (e) => e.name.toLowerCase().indexOf(countryName.toLowerCase()) >= 0
    );
    return !_.isNil(country) ? country.code : '';
  };
  const getImgUrl = (name: string) => {
    const code = getCountryCode(name.toLowerCase());
    return `https://www.countryflags.io/${code}/flat/48.png`;
  };
  const getCountries = () => {
    return [
      { name: 'Germany', img: getImgUrl('Germany') },
      { name: 'cuba', img: getImgUrl('cuba') },
      { name: 'Belgium', img: getImgUrl('Belgium') },
    ];
  };
  const countries = getCountries();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis favoritos</IonTitle>
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
