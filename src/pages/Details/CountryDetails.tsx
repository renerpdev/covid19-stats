import React from 'react';
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
} from '@ionic/react';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
    list: string;
  }> {}

const CountryDetails: React.FC<UserDetailPageProps> = ({ match }) => {
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
                  <IonThumbnail>
                    <IonImg
                      src={'https://www.countryflags.io/cu/flat/48.png'}
                    ></IonImg>
                  </IonThumbnail>
                  <IonCardTitle>
                    <h2>Cuba</h2>
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
