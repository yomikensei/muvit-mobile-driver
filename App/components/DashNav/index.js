import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, RegularText} from 'components/Text';

export default props => {
  const { title, navigation, info, showBackButton } = props;
  return (
    <View style={{ width: '100%', marginBottom: RFValue(10) }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: RFValue(10),
        }}
      >
        {showBackButton ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/back.png')}
              style={{ width: RFValue(22), height: RFValue(14) }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: RFValue(22), height: RFValue(20) }} />
        )}
        <BoldText customstyle={{ fontSize: RFValue(20) }}>{title}</BoldText>
        <View style={{ width: RFValue(20), height: RFValue(20) }} />
      </View>
      <RegularText customstyle={{ color: '#B2B8BD', fontSize: RFValue(12), textAlign: 'center' }}>
        {info}
      </RegularText>
    </View>
  );
};
