import { call, put, select, takeLatest } from 'redux-saga/effects';
import DeviceInfo from 'react-native-device-info';
import { firebase } from '@react-native-firebase/messaging';

import { getDeviceId } from './reducer';
import * as types from './constants';
import * as actions from './actions';
import api from 'services/api';

function* updateDevice() {
  try {
    const device_id = yield select(getDeviceId);

    const fcm_token = yield firebase.messaging().getToken();
    const os = yield DeviceInfo.getBaseOs();
    const os_api_level = yield DeviceInfo.getApiLevel();
    const manufacturer = yield DeviceInfo.getManufacturer();
    const _device = {
      fcm_token,
      manufacturer,
      model: DeviceInfo.getModel(),
      os,
      os_version: DeviceInfo.getSystemVersion(),
      os_api_level,
      uuid: DeviceInfo.getUniqueId(),
    };

    const {
      data: { data: device },
    } = yield call(api, {
      url: `/device/${device_id}`,
      method: 'PATCH',
      data: _device,
    });

    yield put(actions.updateDeviceSuccess({ device }));
  } catch (e) {
    console.log(e.response ? e.response : e);
    yield put(actions.updateDeviceFailure());
  }
}

export function* updateDeviceSaga() {
  yield takeLatest(types.UPDATE_DEVICE_REQUEST, updateDevice);
}
