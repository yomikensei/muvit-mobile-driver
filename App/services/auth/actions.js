import * as types from './constants';

export const signupRequest = ({ credentials }) => ({
  type: types.SIGNUP_REQUEST,
  credentials,
});

export const signupSuccess = ({ authInfo, device, wallet }) => ({
  type: types.SIGNUP_SUCCESS,
  authInfo,
  device,
  wallet,
});

export const signupFailure = ({ error }) => ({
  type: types.SIGNUP_FAILURE,
  error,
});

export const loginRequest = ({ credentials }) => ({
  type: types.LOGIN_REQUEST,
  credentials,
});

export const loginSuccess = ({ authInfo, device, wallet }) => ({
  type: types.LOGIN_SUCCESS,
  authInfo,
  device,
  wallet,
});

export const loginFailure = ({ error }) => ({
  type: types.LOGIN_FAILURE,
  error,
});

export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

export const logoutFailure = () => ({
  type: types.LOGOUT_FAILURE,
});

export const logout = () => ({
  type: types.LOGOUT,
});
