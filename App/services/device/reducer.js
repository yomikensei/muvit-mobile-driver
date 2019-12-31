import * as types from './constants';
import * as authTypes from 'services/auth/constants';

const initialState = {
  device: {},
  fetchDevice: {
    inProgress: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DEVICE_REQUEST:
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          inProgress: true,
        },
      };

    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
    case types.UPDATE_DEVICE_SUCCESS:
      return {
        ...state,
        device: action.device,
        fetchDevice: {
          ...state.fetchDevice,
          inProgress: false,
        },
      };

    case types.UPDATE_DEVICE_FAILURE:
      return {
        ...state,
        fetchDevice: {
          ...state.fetchDevice,
          inProgress: false,
        },
      };

    default:
      return state;
  }
};

export const getFCMToken = state => state.app.entities.device.device.fcm_token;
export const getDeviceId = state => state.app.entities.device.device.id;
export const getDevice = state => state.app.entities.device.device;
