/**
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { PersistorProvider } from 'services/contexts';
import Navigator from 'screens';
import configureStore from './configureStore';

const reduxStore = configureStore();

console.disableYellowBox = true;

export default () => {
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
