import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import CountryList from '../../components/CountryList/CountryList';
import { useTypedSelector } from '../../store/reducers';
import { useDispatch } from 'react-redux';
import { fetchCountryList, searchCountry } from '../../store/country/actions';
import { CountryModel } from '../../models/country';

const Home: React.FC = () => {
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const countryList = useTypedSelector(
    (state) => state.country.countryList || []
  );
  const dispatch = useDispatch();

  const handleOnChange = (value: string) => {
    dispatch(searchCountry(value));
  };

  useEffect(() => {
    dispatch(fetchCountryList());
  }, [false]);

  useEffect(() => {
    setCountries(countryList);
  }, [countryList]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar países</IonTitle>
        </IonToolbar>
        <IonItem>
          <IonInput
            onIonChange={(e) => handleOnChange(e.detail.value!)}
            placeholder={'Escriba el nombre (en inlges)'}
            autofocus={true}
            inputMode={'text'}
            clearInput={true}
            autocomplete={'on'}
            spellCheck={true}
          />
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
