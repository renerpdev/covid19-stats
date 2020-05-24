import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Home.scss';
import CountryList from '../../components/CountryList/CountryList';
import _ from 'lodash';
import CountriesJson from '../../assets/countries.json';
import { Country } from '../../models/country';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
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
  const handleOnChange = (value: string) => {
    if (_.isEmpty(value)) {
      setCountries([]);
    }
    if (value.length < 3) {
      return;
    }
    setText(value);
    console.log(value);
  };
  const c = getCountries();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCountries(c);
      setLoading(false);
    }, 1000);
  }, [text]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar países</IonTitle>
        </IonToolbar>
        <IonItem>
          <IonInput
            onIonChange={(e) => handleOnChange(e.detail.value!)}
            placeholder={'Escriba el nombre'}
            autofocus={true}
            inputMode={'text'}
            clearInput={true}
            autocomplete={'on'}
            spellCheck={true}
          />
          {loading && <IonSpinner />}
        </IonItem>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg={'8'} offsetLg={'2'}>
              <CountryList countries={countries} type={'all'} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
