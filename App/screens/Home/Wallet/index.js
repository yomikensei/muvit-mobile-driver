import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { RegularText, MediumText, BoldText } from 'components/Text';
import BaseStyles from 'theme/base';
import AccountItem from './AccountItem';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from 'theme/colors';

export default props => {
  console.log(props);
  return (
    <View style={BaseStyles.dashBackground}>
      <View style={BaseStyles.dashTop}>
        <View style={{ ...BaseStyles.dashSummaryBox, marginBottom: RFValue(17) }}>
          <View>
            <MediumText customstyle={{ fontSize: RFValue(12), color: 'rgba(255,255,255,0.8)' }}>
              Pending Amount
            </MediumText>
            <BoldText customstyle={{ fontSize: RFValue(35), color: '#FFF' }}>5,000</BoldText>
          </View>
          <TouchableOpacity style={BaseStyles.button2}>
            <BoldText customstyle={{ fontSize: RFValue(10), color: colors.primary }}>
              Withdraw
            </BoldText>
          </TouchableOpacity>
        </View>
        <View style={{ ...BaseStyles.dashSummaryBox, marginBottom: RFValue(17) }}>
          <View>
            <MediumText customstyle={{ fontSize: RFValue(12), color: 'rgba(255,255,255,0.8)' }}>
              Total Profit Made
            </MediumText>
            <BoldText customstyle={{ fontSize: RFValue(35), color: '#FFF' }}>22,500</BoldText>
          </View>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <RegularText customstyle={{ color: 'rgba(255,255,255,0.6)', fontSize: RFValue(12) }}>
            next payment date
          </RegularText>
          <BoldText customstyle={{ color: '#FFF', fontSize: RFValue(12) }}>
            Monday, 28th August 2019
          </BoldText>
        </View>
      </View>

      <View style={BaseStyles.dashContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <AccountItem
            backgroundColor={colors.primary}
            account_number="0006566463"
            account_name="Test Driver"
            bank="Access Bank"
          />
          <AccountItem
            backgroundColor={colors.primary}
            account_number="0006566463"
            account_name="Test Driver"
            bank="Access Bank"
          />
          <AccountItem
            backgroundColor={colors.primary}
            account_number="0006566463"
            account_name="Test Driver"
            bank="Access Bank"
          />
          <AccountItem
            backgroundColor={colors.primary}
            account_number="0006566463"
            account_name="Test Driver"
            bank="Access Bank"
          />
        </ScrollView>
      </View>
    </View>
  );
};
