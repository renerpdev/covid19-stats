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
} from '../../store/country/actions';
import { useDispatch } from 'react-redux';
import UtilsService from '../../services/utils';
import LocalStorage from '../../services/localStorage';

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

  useEffect(() => {
    setIsFavorite(LocalStorage.isFavorite(countryName));
  });

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
                    <p>Lunes 12/02/20 12:12 pm </p>
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'primary'}>
                          <h3>Casos Activos</h3>
                          <b>45</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'warning'}>
                          <h3>Casos Nuevos</h3>
                          <b>12</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Casos</h3>
                          <b>425</b>
                        </IonLabel>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'danger'}>
                          <h3>Muertes Nuevas</h3>
                          <b>15</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel>
                          <h3>Total Muertes</h3>
                          <b>15</b>
                        </IonLabel>
                      </IonCol>
                      <IonCol size={'12'} sizeSm={'6'} sizeMd={'4'}>
                        <IonLabel color={'success'}>
                          <h3>Análisis</h3>
                          <b>3240</b>
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
