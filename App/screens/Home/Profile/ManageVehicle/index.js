import React from 'react';
import { View } from 'react-native';
import { RegularText } from 'components/Text';
import DashNav from 'components/DashNav';
import BaseStyles from 'theme/base';

export default props => {
  const { navigation } = props;

  return (
    <View style={BaseStyles.background}>
      <DashNav
        navigation={navigation}
        title="Manage Vehicle"
        info="Here you can manage your vehicle"
      />
      <RegularText>Manage vehicle view</RegularText>
    </View>
  );
};
