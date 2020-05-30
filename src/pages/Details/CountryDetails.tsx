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
import { useTypedSelector } from '../../store/reducers';
import { Country } from '../../store/country/types';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
    list: string;
  }> {}

const CountryDetails: React.FC<UserDetailPageProps> = ({ match }) => {
  const dispatch = useDispatch();
  const {
    params: { id },
  } = match;
  const [countryName, setCountryName] = useState('');
  const [img, setImg] = useState('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [stats, setStats] = useState<Country>();
  const currentCountry = useTypedSelector(
    (state) => state.country.currentCountry[0]
  );
  const favorites = useTypedSelector(
    (state) => state.country.favoriteCountries
  );

  useEffect(() => {
    const isFavorite = favorites.some((f) => f.id === id);
    setIsFavorite(isFavorite);
  }, [favorites, id]);

  useEffect(() => {
    setStats(currentCountry);
  }, [currentCountry]);

  useEffect(() => {
    dispatch(fetchCountryData(id));
    setCountryName(UtilsService.formatCountryName(id));
  }, [id]);

  useEffect(() => {
    setImg(UtilsService.getImgUrl(countryName));
  }, [countryName]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(deleteFavoriteCountry(id));
    } else {
      dispatch(
        addFavoriteCountry({
          name: countryName,
          img: img,
          id: id,
        })
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={'start'}>
            <IonBackButton defaultHref={'/home'}></IonBackButton>
          </IonButtons>
          <IonTitle>
            <h2 style={{ textAlign: 'center' }}>{countryName} stats</h2>
          </IonTitle>
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
                  <IonCardSubtitle>
                    <p>
                      {stats?.time
                        ? new Intl.DateTimeFormat('en', {
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
                          <h3>Active Cases</h3>
                          <b>
                            {(stats?.cases.total || 0) -
                              (stats?.cases.recovered || 0) -
                              (stats?.deaths.total || 0)}
                          </b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'warning'}>
                          <h3>New Cases</h3>
                          <b>{stats?.cases.new}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Cases</h3>
                          <b>{stats?.cases.total}</b>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'danger'}>
                          <h3>New Deaths</h3>
                          <b>{stats?.deaths.new}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Deaths</h3>
                          <b>{stats?.deaths.total}</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'success'}>
                          <h3>Tests</h3>
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
