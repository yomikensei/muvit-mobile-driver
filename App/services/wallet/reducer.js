import * as types from './constants';
import * as authTypes from 'services/auth/constants';

const initialState = {
  wallet: {
    balance: 0,
    total_profit: 0,
  },
  fetchWallet: {
    inProgress: false,
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_WALLET_REQUEST:
      return {
        ...state,
        fetchWallet: {
          ...state.fetchWallet,
          inProgress: true,
        },
      };
      
    case authTypes.LOGIN_SUCCESS:
    case authTypes.SIGNUP_SUCCESS:
    case types.FETCH_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.wallet,
        fetchWallet: {
          ...state.fetchWallet,
          inProgress: false,
        },
      };
    case types.FETCH_WALLET_FAILURE:
      return {
        ...state,
        fetchWallet: {
          ...state.fetchWallet,
          inProgress: false,
        },
      };

    default:
      return state;
  }
};


export const getWallet = state => state.app.entities.wallet.wallet;

export const getBalance  = state => state.app.entities.wallet.balance;

export const getTotalProfit = state => state.app.entities.wallet.total_profit;
