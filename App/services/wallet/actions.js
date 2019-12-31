import * as types from './constants';

export const fetchWalletRequest = () => ({
  type: types.FETCH_WALLET_REQUEST,
});

export const fetchWalletSuccess = ({ wallet }) => ({
  type: types.FETCH_WALLET_SUCCESS,
  wallet,
});

export const fetchWalletFailure = () => ({
  type: types.FETCH_WALLET_FAILURE,
});
