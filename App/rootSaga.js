/* eslint-disable no-unused-vars */
import { all, delay, put, select, take } from 'redux-saga/effects';
import { PermissionsAndroid } from 'react-native';
import { firebase } from '@react-native-firebase/messaging';
import * as authSagas from './services/auth/sagas';
import * as deviceSagas from './services/device/sagas';
import * as walletSagas from './services/wallet/sagas';
import { getIsLoggedIn } from './services/auth/reducer';
import { fetchWalletRequest } from './services/wallet/actions';
import { getFCMToken } from './services/device/reducer';
import { updateDeviceRequest } from './services/device/actions';

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
  yield put(fetchWalletRequest());
}

function* pullData() {
  yield take('persist/REHYDRATE');
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn);
    if (isLoggedIn) yield fetchData();

    yield delay(1000 * 60 * 2);
  }
}

function* pushData() {
  yield take('persist/REHYDRATE');
  while (true) {
    const isLoggedIn = yield select(getIsLoggedIn);
    if (isLoggedIn) {
      const _fcm_token = yield select(getFCMToken);
      const fcm_token = yield firebase.messaging().getToken();
      if (_fcm_token !== fcm_token) yield put(updateDeviceRequest());
    }

    yield delay(1000 * 60 * 5);
  }
}

export default function* rootSaga() {
  yield all([
    authSagas.loginSaga(),
    authSagas.signupSaga(),
    authSagas.logoutSaga(),
    deviceSagas.updateDeviceSaga(),
    walletSagas.fetchWalletSaga(),
    pullData(),
    pushData(),
    requestApplicationPermissions(),
  ]);
}
