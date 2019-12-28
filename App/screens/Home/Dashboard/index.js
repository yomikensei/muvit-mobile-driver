import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import BaseStyles from 'theme/base';
import { MediumText, BoldText } from 'components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from 'theme/colors';

export default props => {
  const [tab, setTab] = useState('RIDES');

  const {
    navigation: { navigate },
  } = props;
  return (
    <View style={BaseStyles.dashBackground}>
      <View style={BaseStyles.dashTop}>
        <View style={BaseStyles.dashSummaryBox}>
          <View>
            <MediumText customstyle={{ fontSize: RFValue(12), color: 'rgba(255,255,255,0.8)' }}>
              Total Profit Made
            </MediumText>
            <BoldText customstyle={{ fontSize: RFValue(35), color: '#FFF' }}>50,000</BoldText>
          </View>
          <TouchableOpacity
            onPress={() => navigate('Wallet')}
            style={BaseStyles.button2}
          >
            <BoldText customstyle={{ fontSize: RFValue(10), color: colors.primary }}>View</BoldText>
          </TouchableOpacity>
        </View>
      </View>
      <View style={BaseStyles.dashContent}>
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
                tab === 'RIDES'
                  ? { fontSize: RFValue(10), color: '#FFF' }
                  : { fontSize: RFValue(10) }
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
      </View>
    </View>
  );
};
