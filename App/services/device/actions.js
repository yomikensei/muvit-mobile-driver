import * as types from './constants';

export const updateDeviceRequest = () => ({
  type: types.UPDATE_DEVICE_REQUEST,
});

export const updateDeviceSuccess = ({ device }) => ({
  type: types.UPDATE_DEVICE_SUCCESS,
  device,
});

export const updateDeviceFailure = () => ({
  type: types.UPDATE_DEVICE_FAILURE,
});
