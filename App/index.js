/**
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { PersistorProvider } from 'services/contexts';
import Navigator from 'screens';
import configureStore from './configureStore';

const reduxStore = configureStore();

console.disableYellowBox = true;

export default () => {
  const configureBackgroundLocation = () => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 0,
      distanceFilter: 0,
      notificationTitle: '',
      notificationText: '',
      startForeground: true,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000 * 10,
      fastestInterval: 1000 * 3,
      activitiesInterval: 1000 * 3,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on('location', location => {
      BackgroundGeolocation.startTask(taskKey => {
        console.log(location);
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.checkStatus(status => {
      BackgroundGeolocation.start();
    });
  };

  useEffect(() => {
    configureBackgroundLocation();
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
