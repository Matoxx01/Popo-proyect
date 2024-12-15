import React, { useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonItem,
  IonMenu,
  IonList,
  IonLabel,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const menuRef = useRef<HTMLIonMenuElement | null>(null);

  const handleAccount = () => {
    menuRef.current?.close();
    history.push('/Account');
  };

  const handleLogin = () => {
    menuRef.current?.close();
    history.push('/Login');
  };

  const handleAddPoop = () => {
    menuRef.current?.close();
    history.push('/Addpoop');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Poop App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonMenu ref={menuRef} contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menú</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="main-content" fullscreen>
          <IonList>
            {isLoggedIn ? (
              <IonItem button onClick={handleAccount}>
                <IonLabel>Mi cuenta</IonLabel>
              </IonItem>
            ) : (
              <IonItem button onClick={handleLogin}>
                <IonLabel>Login</IonLabel>
              </IonItem>
            )}
            {isLoggedIn && (
              <IonItem button onClick={handleAddPoop}>
                <IonLabel>Agrega tu Poop</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonContent>
      </IonMenu>
      <IonContent id="main-content" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}

export default Home;
