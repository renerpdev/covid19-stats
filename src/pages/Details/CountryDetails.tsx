import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonPage,
  IonToolbar,
  IonContent,
  IonHeader,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonThumbnail,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { star } from 'ionicons/icons';
import {
  addFavoriteCountry,
  deleteFavoriteCountry,
  fetchCountryData,
} from '../../store/country/actions';
import { useDispatch } from 'react-redux';
import UtilsService from '../../services/utils';
import LocalStorage from '../../services/localStorage';
import { useTypedSelector } from '../../store/reducers';
import { Country } from '../../store/country/types';

interface UserDetailPageProps
  extends RouteComponentProps<{
    name: string;
    list: string;
  }> {}

const CountryDetails: React.FC<UserDetailPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const {
    params: { name: countryName },
  } = match;
  const img = UtilsService.getImgUrl(countryName);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [stats, setStats] = useState<Country>();
  const currentCountry = useTypedSelector(
    (state) => state.country.currentCountry
  );

  useEffect(() => {
    setIsFavorite(LocalStorage.isFavorite(countryName));
  });

  useEffect(() => {
    setStats(currentCountry[0]);
  }, [currentCountry]);

  useEffect(() => {
    dispatch(fetchCountryData(countryName));
  }, [false]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteFavoriteCountry(countryName));
    } else {
      dispatch(
        addFavoriteCountry({
          name: countryName,
          img: img,
        })
      );
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/home'}></IonBackButton>
          </IonButtons>
          <IonTitle>Country Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol sizeLg={'8'} offsetLg={'2'}>
              <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonThumbnail slot={'start'}>
                      <IonImg src={img} />
                    </IonThumbnail>
                    <IonIcon
                      onClick={toggleFavorite}
                      slot={'end'}
                      icon={star}
                      color={isFavorite ? 'warning' : 'default'}
                    />
                  </IonItem>
                  <IonCardTitle>
                    <h2>{countryName}</h2>
                  </IonCardTitle>
                  <IonCardSubtitle>
                    <p>
                      {stats?.time
                        ? new Intl.DateTimeFormat('es', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: true,
                          }).format(new Date(stats.time))
                        : ''}
                    </p>
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'primary'}>
                          <h3>Casos Activos</h3>
                          <b>{stats?.cases.active}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'warning'}>
                          <h3>Casos Nuevos</h3>
                          <b>{stats?.cases.new}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Casos</h3>
                          <b>{stats?.cases.total}</b>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'danger'}>
                          <h3>Muertes Nuevas</h3>
                          <b>{stats?.deaths.new}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Muertes</h3>
                          <b>{stats?.deaths.total}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'success'}>
                          <h3>Análisis Hechos</h3>
                          <b>{stats?.tests.total}</b>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CountryDetails;
