import React from 'react';
import { View } from 'react-native';
import { RegularText } from 'components/Text';

export default props => {
  console.log(props);
  return (
    <View>
      <RegularText>Profile View</RegularText>
    </View>
  );
};
