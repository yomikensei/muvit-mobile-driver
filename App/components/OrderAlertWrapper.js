import React from 'react';
import {connect} from 'react-redux';
import DeliveryAlert from 'components/DeliveryAlert';
import {getOrderDetails, getOrderId, getOrderStage, getOrderType} from 'services/orders/reducer';

export default WrappedComponent =>
  connect(mapStateToProps)(props => {
    const { navigation, details, stage, id, type } = props;
    return (
      <>
        <DeliveryAlert {...{ show: stage === 'PENDING', navigation, details, stage, id, type }} />
        <WrappedComponent />
      </>
    );
  });

const mapStateToProps = state => ({
  details: getOrderDetails(state),
  stage: getOrderStage(state),
  id: getOrderId(state),
  type: getOrderType(state),
});
