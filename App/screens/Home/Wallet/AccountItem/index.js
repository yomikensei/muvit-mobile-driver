import React from 'react';
import {View} from 'react-native';
import {BoldText, RegularText} from 'components/Text';
import {RFValue} from 'react-native-responsive-fontsize';

export default ({ backgroundColor, account_number, account_name, bank_name }) => {
  return (
    <View
      style={{
        width: '100%',
        height: RFValue(88),
        backgroundColor,
        borderRadius: RFValue(10),
        paddingEnd: RFValue(13.49),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingStart: RFValue(22),
        marginBottom: RFValue(14),
      }}
    >
      <View style={{ width: '100%' }}>
        <BoldText customstyle={{ color: '#FFF', fontSize: RFValue(25) }}>{account_number}</BoldText>
        <RegularText numberOfLines={1} customstyle={{ color: '#FFF', fontSize: RFValue(14) }}>
          {account_name}
        </RegularText>
        <RegularText customstyle={{ color: '#FFF', fontSize: RFValue(14) }}>
          {bank_name}
        </RegularText>
      </View>
      {/*<TouchableOpacity>*/}
      {/*  <Image*/}
      {/*    source={require('../../../../assets/icons/exit2.png')}*/}
      {/*    style={{ width: RFValue(20), height: RFValue(20) }}*/}
      {/*  />*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};
