/* eslint-disable no-unused-vars */
import { all, delay, put, select, take } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import * as authSaga from './services/auth/sagas';
import { getIsLoggedIn } from './services/auth/reducer';

async function requestApplicationPermissions() {
  try {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    ]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

export function* fetchData() {
  // yield put(fetchCardsRequest());
  // yield put(fetchDeliveriesRequest());
  // yield put(fetchRidesRequest());
}

function* pullData() {
  yield take('persist/REHYDRATE');
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn);
    if (isLoggedIn) {
      yield fetchData();
    }
    yield delay(1000 * 60 * 2);
  }
}

export default function* rootSaga() {
  yield all([
    authSaga.loginSaga(),
    authSaga.signupSaga(),
    authSaga.logoutSaga(),
    pullData(),
    requestApplicationPermissions(),
  ]);
}
