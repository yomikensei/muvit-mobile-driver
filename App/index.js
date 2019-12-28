/**
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { firebase } from '@react-native-firebase/messaging';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { PersistorProvider } from 'services/contexts';
import Navigator from 'screens';
import configureStore from './configureStore';

const reduxStore = configureStore();

console.disableYellowBox = true;

export default () => {
  const fetchToken = async () => {
    const fcm_token = await firebase.messaging().getToken();
    console.log(fcm_token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Provider store={reduxStore.store}>
      <PersistGate persistor={reduxStore.persistor}>
        <PersistorProvider value={{ persistor: reduxStore.persistor }}>
          <Navigator />
        </PersistorProvider>
      </PersistGate>
    </Provider>
  );
};
