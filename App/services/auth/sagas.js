/* eslint-disable no-unused-vars */
import { call, put, takeLatest } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { firebase } from '@react-native-firebase/messaging';
import Snackbar from 'react-native-snackbar';

import * as types from './constants';
import * as actions from './actions';
import api from '../api';
import { saveState } from '../../localStorage';

function* login({ credentials }) {
  try {
    const fcm_token = yield firebase.messaging().getToken();
    const os = yield DeviceInfo.getBaseOs();
    const os_api_level = yield DeviceInfo.getApiLevel();
    const manufacturer = yield DeviceInfo.getManufacturer();
    const device = {
      fcm_token,
      manufacturer,
      model: DeviceInfo.getModel(),
      os,
      os_version: DeviceInfo.getSystemVersion(),
      os_api_level,
      uuid: DeviceInfo.getUniqueId(),
    };

    const {
      data: {
        data: { user, token },
      },
    } = yield call(api, {
      url: '/user/login',
      data: { ...credentials, role: ['user', 'driver'], device },
      method: 'post',
    });
    yield put(actions.loginSuccess({ authInfo: { user } }));
    yield saveState({ user, token });
    yield put(
      NavigationActions.navigate({
        routeName: 'Home',
      })
    );
  } catch (error) {
    console.log(error.response);
    yield put(actions.loginFailure({ error: error.response.data.message }));
    yield Snackbar.show({
      title: 'Error loggin in, please check your credentials',
      duration: Snackbar.LENGTH_SHORT,
    });
  }
}

function* signup({ credentials }) {
  try {
    const fcm_token = yield firebase.messaging().getToken();
    const os = yield DeviceInfo.getBaseOs();
    const os_api_level = yield DeviceInfo.getApiLevel();
    const manufacturer = yield DeviceInfo.getManufacturer();
    const device = {
      fcm_token,
      manufacturer,
      model: DeviceInfo.getModel(),
      os,
      os_version: DeviceInfo.getSystemVersion(),
      os_api_level,
      uuid: DeviceInfo.getUniqueId(),
    };

    const {
      data: {
        data: { user, token },
      },
    } = yield call(api, {
      url: '/user/signup',
      data: { ...credentials, role: ['user'], device },
      method: 'post',
    });

    yield put(actions.signupSuccess({ authInfo: { user } }));
    yield saveState({ user, token });
    yield put(
      NavigationActions.navigate({
        routeName: 'Home',
      })
    );
  } catch (e) {
    yield put(actions.signupFailure({}));
    console.log(e.response ? e.response : e);
  }
}

export function* logout() {
  yield put(
    NavigationActions.navigate({
      routeName: 'Login',
    })
  );
}

export function* logoutSaga() {
  yield takeLatest(types.LOGOUT, logout);
}

export function* loginSaga() {
  yield takeLatest(types.LOGIN_REQUEST, login);
}

export function* signupSaga() {
  yield takeLatest(types.SIGNUP_REQUEST, signup);
}
