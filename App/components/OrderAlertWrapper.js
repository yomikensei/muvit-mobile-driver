import React from 'react';
import DeliveryAlert from 'components/DeliveryAlert';

export default WrappedComponent => props => {
  const { navigation } = props;
  return (
    <>
      <DeliveryAlert show={false} navigation={navigation} />
      <WrappedComponent />
    </>
  );
};
