import * as types from './constants';

const initialState = {
  order_details: {},
  order_type: null,
  order_id: null,
  stage: null,
};

export default (state = initialState, action) => {
  const { order_details, order_type, order_id } = action;

  switch (action.type) {
    case types.NEW_ORDER:
      return {
        order_details,
        order_type,
        order_id,
        stage: 'PENDING',
      };

    case types.ACCEPT_ORDER:
      return {
        ...state,
        stage: 'ARRIVING',
      };

    case types.COMPLETE_ORDER:
      return { ...initialState, order_type: state.order_type, stage: 'COMPLETE' };

    case types.REJECT_ORDER:
      return initialState;

    case types.COMMENCE_ORDER:
      return {
        ...state,
        stage: 'ONGOING',
      };

    default:
      return state;
  }
};

export const getOrderStage = state => state.app.entities.orders.stage;
export const getOrderDetails = state => state.app.entities.orders.order_details;
export const getOrderType = state => state.app.entities.orders.order_type;
export const getOrderId = state => state.app.entities.orders.order_id;
