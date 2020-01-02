import * as types from './constants';

export const newOrder = ({ order_details, order_type, order_id }) => ({
  type: types.NEW_ORDER,
  order_details,
  order_type,
  order_id,
});

export const acceptOrder = () => ({
  type: types.ACCEPT_ORDER,
});

export const rejectOrder = () => ({
  type: types.REJECT_ORDER,
});

export const commenceOrder = () => ({
  type: types.COMMENCE_ORDER,
});

export const completeOrder = () => ({
  type: types.COMPLETE_ORDER,
});
