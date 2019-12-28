import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import startsWith from 'lodash/startsWith';
import { createLogger } from 'redux-logger';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const middleware = [];

const reactNavigationReduxMiddleware = createReactNavigationReduxMiddleware(state => state.nav);

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

middleware.push(reactNavigationReduxMiddleware);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => !startsWith(action.type, '@@redux-form'),
  });
  middleware.push(logger);
}

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middleware));

  const persistor = persistStore(store);
  // Please if you feel the need to remove the next line
  // please just comment it out
  // persistor.purge();
  // clearState();

  sagaMiddleware.run(rootSaga);
  return {
    persistor,
    store,
  };
};

export default configureStore;
