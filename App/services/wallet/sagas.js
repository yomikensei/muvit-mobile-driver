import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from './constants';
import * as actions from './actions';
import api from 'services/api';

function* fetchWallet() {
  try {
    const {
      data: { data: wallet },
    } = yield call(api, {
      method: 'GET',
      url: '/wallet',
    });
    console.log(wallet);
    yield put(actions.fetchWalletSuccess({ wallet }));
  } catch (e) {
    console.log(e.response ? e.response : e);
    yield put(actions.fetchWalletFailure());
  }
}

export function* fetchWalletSaga() {
  yield takeLatest(types.FETCH_WALLET_REQUEST, fetchWallet);
}
