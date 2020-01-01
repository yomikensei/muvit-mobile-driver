import * as types from './constants';

export const newOrder = ({ order_details, order_type, order_id }) => ({
  type: types.NEW_ORDER,
  order_details,
  order_type,
  order_id,
});

export const acceptOrder = ({ order_details, order_type, order_id }) => ({
  type: types.ACCEPT_ORDER,
  order_details,
  order_type,
  order_id,
});

export const rejectOrder = () => ({
  type: types.REJECT_ORDER,
});

export const commenceOrder = ({ order_details, order_type, order_id }) => ({
  type: types.COMMENCE_ORDER,
  order_details,
  order_type,
  order_id,
});

export const completeOrder = () => ({
  type: types.COMPLETE_ORDER,
});
