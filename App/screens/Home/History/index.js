import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { RegularText, MediumText, BoldText } from 'components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from 'theme/colors';
import BaseStyles from 'theme/base';
import DashNav from 'components/DashNav';

export default props => {
  const [tab, setTab] = useState('RIDES');
  const [rides, setRides] = useState({});
  const [deliveries, setDeliveries] = useState({});

  const { navigation } = props;
  return (
    <View style={BaseStyles.background}>
      <DashNav
        navigation={navigation}
        title="History"
        info="Rides and deliveries history for all time"
      />

      <View style={BaseStyles.tabs}>
        <TouchableOpacity
          onPress={() => setTab('RIDES')}
          style={
            tab === 'RIDES'
              ? { ...BaseStyles.tabButton, backgroundColor: colors.primary }
              : BaseStyles.tabButton
          }
        >
          <MediumText
            customstyle={
              tab === 'RIDES' ? { fontSize: RFValue(10), color: '#FFF' } : { fontSize: RFValue(10) }
            }
          >
            Rides
          </MediumText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('DELIVERIES')}
          style={
            tab === 'DELIVERIES'
              ? { ...BaseStyles.tabButton, backgroundColor: colors.primary }
              : BaseStyles.tabButton
          }
        >
          <MediumText
            customstyle={
              tab === 'DELIVERIES'
                ? { fontSize: RFValue(10), color: '#FFF' }
                : { fontSize: RFValue(10) }
            }
          >
            Deliveries
          </MediumText>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <RegularText>History View</RegularText>
      </ScrollView>
    </View>
  );
};
